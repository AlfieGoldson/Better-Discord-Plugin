#!/usr/bin/env zx

import path from 'path';
import fs from 'fs';

const [, , , ...pluginsList] = process.argv;
const buildConfig = JSON.parse(fs.readFileSync(path.join(__dirname, '../.bdrc')));

console.log(buildConfig);

const pluginsPath = path.isAbsolute(buildConfig.pluginsFolder)
    ? buildConfig.pluginsFolder
    : path.join(__dirname, '..', buildConfig.pluginsFolder);

const releasePath = path.isAbsolute(buildConfig.releaseFolder)
    ? buildConfig.releaseFolder
    : path.join(__dirname, '..', buildConfig.releaseFolder);

const bdFolder =
    (process.platform === 'win32'
        ? process.env.APPDATA
        : process.platform === 'darwin'
        ? `${process.env.HOME}/Library/Preferences`
        : process.env.XDG_CONFIG_HOME
        ? process.env.XDG_CONFIG_HOME
        : `${process.env.HOME}/.config`) + '/BetterDiscord/';

const formatString = (input, values) =>
    Object.entries(values).reduce(
        (output, [key, val]) => output.replace(new RegExp(`//${key}//`, 'g'), val),
        input ?? '',
    );

const template = fs.readFileSync(path.join(__dirname, 'template.js')).toString();

console.log(pluginsList);

const pluginsToBuild =
    pluginsList ?? fs.readdirSync(pluginsPath).filter((f) => fs.lstatSync(path.join(pluginsPath, f)).isDirectory());

console.log('');
console.log(`Building ${pluginsToBuild.length} plugin${pluginsToBuild.length > 1 ? 's' : ''}`);
console.time('Build took');

pluginsToBuild.forEach(async (pluginName) => {
    const pluginPath = path.join(pluginsPath, pluginName);
    const configPath = path.join(pluginPath, '.bdrc');
    console.log(`Building ${pluginName} from ${configPath}`);

    if (!fs.existsSync(configPath)) {
        console.error(`Could not find "${configPath}". Skipping...`);
        return;
    }

    const config = JSON.parse(fs.readFileSync(configPath));
    const entryFile = path.join(pluginPath, config.main || 'index.js');

    const releaseDir = path.join(releasePath, pluginName);
    if (!fs.existsSync(releaseDir)) fs.mkdirSync(releaseDir);

    const releaseFilename = `${pluginName}.plugin.js`;
    const releaseFile = path.join(releaseDir, releaseFilename);

    await $`./node_modules/.bin/rollup -c rollup.config.js --i ${entryFile} --o ${releaseFile}`;

    if (!fs.existsSync(releaseFile)) {
        console.error('Rollup Build Failed');
        return;
    }

    const content = require(releaseFile);

    let result = formatString(template, {
        PLUGIN_NAME: pluginName,
        CONFIG: `const config = JSON.stringify(config).replace(/"((?:[A-Za-z]|[0-9]|_)+)"\s?:/g, '$1:');`,
        INNER: `const plugin = ${content};`,
        WEBSITE: config.info.github || formatString(buildConfig.github, { PLUGIN_NAME: pluginName }),
        SOURCE: config.info.github_raw || formatString(buildConfig.githubRaw, { PLUGIN_NAME: pluginName }),
        UPDATE_URL: config.info.github_raw || formatString(buildConfig.githubRaw, { PLUGIN_NAME: pluginName }),
        VERSION: config.info.version ?? '',
        PATREON: buildConfig.patreonLink ?? '',
        PAYPAL: buildConfig.paypalLink ?? '',
        AUTHOR_LINK: buildConfig.authorLink ?? '',
        INVITE_CODE: buildConfig.inviteCode ?? '',
        INSTALL_SCRIPT: buildConfig.addInstallScript
            ? fs.readFileSync(path.join(__dirname, 'installscript.js')).toString()
            : '',
    });

    if (buildConfig.addInstallScript) result = result + '\n/*@end@*/';

    fs.writeFileSync(releaseFile, result);
    if (buildConfig.copyToBD) {
        console.log(`Copying ${pluginName} to BD folder`);
        fs.writeFileSync(path.join(bdFolder, 'plugins', releaseFilename), result);
    }
    console.log(`${pluginName} built successfully`);
    console.log(`${pluginName} saved as ${releaseFile}`);
});

console.timeEnd('Build took');
