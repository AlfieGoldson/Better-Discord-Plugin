import path from 'path';
import { readdirSync, lstatSync } from 'fs';
import { readFile, mkdir } from 'fs/promises';
import { exit } from 'process';
import { buildPlugin } from './buildPlugin';
import { templatesCache } from './templatesCache';

const { installScript, pluginTemplate } = await templatesCache();

const workingDir = process.cwd();

const [, , , ...args] = process.argv;
const pluginsList = args.filter((arg) => !arg.startsWith('-') && !arg.startsWith('--'));
// const watch = args.find((arg) => arg === '-w' || arg === '--watch');

try {
    const buildConfigRaw = await readFile(path.join(workingDir, '.bdrc.json'));
    const buildConfig = JSON.parse(buildConfigRaw.toString());

    const pluginsPath = path.isAbsolute(buildConfig.pluginsFolder)
        ? buildConfig.pluginsFolder
        : path.join(workingDir, buildConfig.pluginsFolder);

    const releasePath = path.isAbsolute(buildConfig.releaseFolder)
        ? buildConfig.releaseFolder
        : path.join(workingDir, buildConfig.releaseFolder);

    // const bdFolder =
    //     buildConfig.BDFolder ??
    //     `${
    //         process.platform === 'win32'
    //             ? process.env.APPDATA
    //             : process.platform === 'darwin'
    //             ? `${process.env.HOME}/Library/Preferences`
    //             : process.env.XDG_CONFIG_HOME
    //             ? process.env.XDG_CONFIG_HOME
    //             : `${process.env.HOME}/.config`
    //     }/BetterDiscord`;

    console.log(pluginsList);

    const pluginsToBuild =
        pluginsList.length > 0
            ? pluginsList
            : readdirSync(pluginsPath).filter((f) => lstatSync(path.join(pluginsPath, f)).isDirectory());

    console.log('');
    console.log(`Building ${pluginsToBuild.length} plugin${pluginsToBuild.length > 1 ? 's' : ''}`);
    console.time('Build took');

    const pluginsPromises = pluginsToBuild.map(async (pluginName) => {
        try {
            const pluginPath = path.join(pluginsPath, pluginName);
            const releaseDir = path.join(releasePath, pluginName);

            await mkdir(releaseDir, { recursive: true });

            const releaseFilename = `${pluginName}.plugin.js`;
            const releaseFile = path.join(releaseDir, releaseFilename);

            await buildPlugin(pluginName, {
                pluginPath,
                releaseFile,
                pluginTemplate,
                installScript: buildConfig.addInstallScript && installScript ? installScript : '',
            });

            console.log(`${pluginName} saved as ${releaseFile}`);
        } catch (e) {
            console.error(e);
            return;
        }
    });

    await Promise.all(pluginsPromises);

    console.timeEnd('Build took');
} catch (e) {
    console.error(e);
    exit(1);
}
