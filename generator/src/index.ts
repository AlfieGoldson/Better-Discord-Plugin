import path from 'path';
import { readdirSync, lstatSync } from 'fs';
import { writeFile, readFile, mkdir } from 'fs/promises';
import { exit } from 'process';
import { buildPlugin } from './buildPlugin';

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

const workingDir = process.cwd();

const [, , , ...pluginsList] = process.argv;

try {
    const buildConfigRaw = await readFile(path.join(workingDir, '.bdrc'));
    const buildConfig = JSON.parse(buildConfigRaw.toString());

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

    console.log(pluginsList);

    const pluginsToBuild =
        pluginsList.length > 0
            ? pluginsList
            : readdirSync(pluginsPath).filter((f) => lstatSync(path.join(pluginsPath, f)).isDirectory());

    console.log('');
    console.log(`Building ${pluginsToBuild.length} plugin${pluginsToBuild.length > 1 ? 's' : ''}`);
    console.time('Build took');

    pluginsToBuild.forEach(async (pluginName) => {
        try {
            const pluginPath = path.join(pluginsPath, pluginName);
            const releaseDir = path.join(releasePath, pluginName);

            await mkdir(releaseDir, { recursive: true });

            const releaseFilename = `${pluginName}.plugin.js`;
            const releaseFile = path.join(releaseDir, releaseFilename);

            const bundle = await buildPlugin(pluginName, {
                pluginPath,
                pluginTemplate,
                installScript: buildConfig.addInstallScript && installScript ? installScript : '',
            });

            await writeFile(releaseFile, bundle);
            console.log(`${pluginName} saved as ${releaseFile}`);

            if (buildConfig.copyToBD) {
                console.log(`Copying ${pluginName} to BD folder`);
                await writeFile(path.join(bdFolder, 'plugins', releaseFilename), bundle);
            }
        } catch (e) {
            console.error(e);
            return;
        }
    });

    console.timeEnd('Build took');
} catch (e) {
    console.error(e);
    exit(1);
}
