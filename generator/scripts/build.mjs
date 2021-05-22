#!/usr/bin/env zx

import path from 'path';
import fs from 'fs';
import { exit } from 'process';
import { rollup } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';

const repoLink = 'https://raw.githubusercontent.com/AlfieGoldson/Better-Discord-Plugin';
const templatesPath = `${repoLink}/master/generator/templates`;

const [pluginTemplateRes, installScriptRes] = await Promise.all([
    await fetch(`${templatesPath}/plugin.js`),
    await fetch(`${templatesPath}/installscript.js`),
]);

if (!pluginTemplateRes.ok) {
    console.error('Failed to fetch plugin template');
    exit(1);
}

const pluginTemplate = await pluginTemplateRes.text();

if (!installScriptRes.ok) {
    console.error('Failed to fetch installscript template');
    exit(1);
}

const installScript = await installScriptRes.text();

await $`mkdir -p ./dist`;

const workingDir = process.cwd();

const [, , , ...pluginsList] = process.argv;
const buildConfig = JSON.parse(fs.readFileSync(path.join(workingDir, '.bdrc')));

console.log(buildConfig);

const pluginsPath = path.isAbsolute(buildConfig.pluginsFolder)
    ? buildConfig.pluginsFolder
    : path.join(workingDir, buildConfig.pluginsFolder);

const releasePath = path.isAbsolute(buildConfig.releaseFolder)
    ? buildConfig.releaseFolder
    : path.join(workingDir, buildConfig.releaseFolder);

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

console.log(pluginsList);

const pluginsToBuild =
    pluginsList.length > 0
        ? pluginsList
        : fs.readdirSync(pluginsPath).filter((f) => fs.lstatSync(path.join(pluginsPath, f)).isDirectory());

console.log('');
console.log(`Building ${pluginsToBuild.length} plugin${pluginsToBuild.length > 1 ? 's' : ''}`);
console.time('Build took');

pluginsToBuild.forEach(async (pluginName) => {
    const pluginPath = path.join(pluginsPath, pluginName);
    const configPath = path.join(pluginPath, '.bdplugin');
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
    console.log(releaseFile);
    try {
        const bundle = await rollup({
            input: entryFile,
            plugins: [
                nodeResolve({
                    extensions: ['.js', '.jsx', '.ts', '.tsx'],
                }),
                babel({
                    presets: ['@babel/preset-react'],
                    babelHelpers: 'bundled',
                }),
                json(),
                ts(),
            ],
        });

        await bundle.write({
            output: {
                file: releaseFile,
                format: 'cjs',
                exports: 'auto',
            },
        });
    } catch (e) {
        console.error(e);
    }

    if (!fs.existsSync(releaseFile)) {
        console.error('Rollup Build Failed');
        return;
    }

    const content = require(releaseFile);

    let result = formatString(pluginTemplate, {
        PLUGIN_NAME: pluginName,
        CONFIG: `const config = ${JSON.stringify(config).replace(/"((?:[A-Za-z]|[0-9]|_)+)"\s?:/g, '$1:')};`,
        INNER: `const plugin = ${content};`,
        WEBSITE: config.info.github ?? '',
        SOURCE: config.info.githubRaw ?? '',
        UPDATE_URL: config.info.githubRaw ?? '',
        VERSION: config.info.version ?? '',
        PATREON: config.info.patreonLink ?? '',
        PAYPAL: config.info.paypalLink ?? '',
        AUTHOR_LINK: config.info.authorLink ?? '',
        INVITE_CODE: config.info.inviteCode ?? '',
        INSTALL_SCRIPT: config.info.addInstallScript ? installScript : '',
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
