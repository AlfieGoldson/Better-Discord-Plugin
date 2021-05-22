import { mkdir, readFile, writeFile } from 'fs/promises';
import { exit } from 'process';
import path from 'path';

const cacheFolder = '.bdcache';
const repoLink = 'https://raw.githubusercontent.com/AlfieGoldson/Better-Discord-Plugin';
const templatesPath = `${repoLink}/master/generator/templates`;

export const templatesCache = async (forceReload = false) => {
    await mkdir(cacheFolder, { recursive: true });

    try {
        if (forceReload) throw 'Reload files.';

        const [pluginTemplate, installScript] = await Promise.all([
            (await readFile(path.join(cacheFolder, 'plugin.js'))).toString(),
            (await readFile(path.join(cacheFolder, 'installscript.js'))).toString(),
        ]);

        return { pluginTemplate, installScript };
    } catch (e) {
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

        await Promise.all([
            await writeFile(path.join(cacheFolder, 'plugin.js'), pluginTemplate),
            await writeFile(path.join(cacheFolder, 'installscript.js'), installScript),
        ]);

        return { pluginTemplate, installScript };
    }
};
