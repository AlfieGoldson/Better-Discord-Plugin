import path from 'path';
import { constants } from 'fs';
import { access, readFile } from 'fs/promises';
import { rollup } from 'rollup';
import { getRollupInput, getRollupOutput } from './rollup.config';
import { formatString } from './formatString';

interface BuildOptions {
    pluginPath: string;
    pluginTemplate: string;
    installScript?: string;
}

const getPluginConfig = async (configPath: string) => {
    try {
        await access(configPath, constants.R_OK);

        const configRaw = await readFile(configPath);
        const config = JSON.parse(configRaw.toString());

        return config;
    } catch {
        throw new Error(`Could not find "${configPath}". Skipping...`);
    }
};

const bundlePlugin = async (entryFile: string): Promise<string> => {
    try {
        const bundle = await rollup(getRollupInput(entryFile));
        const { output } = await bundle.generate(getRollupOutput());
        return output[0].code;
    } catch (e) {
        throw e;
    }
};

export const buildPlugin = async (
    pluginName: string,
    { pluginPath, installScript, pluginTemplate }: BuildOptions,
): Promise<string> => {
    try {
        const configPath = path.join(pluginPath, '.bdplugin.json');
        console.log(`Building ${pluginName} from ${configPath}`);
        const config = await getPluginConfig(configPath);
        const entryFile = path.join(pluginPath, config.main || 'index.js');

        const contentModule = await bundlePlugin(entryFile);
        const content = await import(`data:text/javascript;base64,${btoa(contentModule)}`);

        let result = formatString(pluginTemplate, {
            PLUGIN_NAME: pluginName,
            CONFIG: `const config = ${JSON.stringify(config).replace(/"((?:[A-Za-z]|[0-9]|_)+)"\s?:/g, '$1:')};`,
            INNER: `const plugin = ${content.default};`,
            WEBSITE: config.info.github ?? '',
            SOURCE: config.info.githubRaw ?? '',
            UPDATE_URL: config.info.githubRaw ?? '',
            VERSION: config.info.version ?? '',
            PATREON: config.info.patreonLink ?? '',
            PAYPAL: config.info.paypalLink ?? '',
            AUTHOR_LINK: config.info.authorLink ?? '',
            INVITE_CODE: config.info.inviteCode ?? '',
            INSTALL_SCRIPT: installScript ?? '',
        });

        if (installScript) result += '\n/*@end@*/';

        console.log(`${pluginName} built successfully`);

        return result;
    } catch (e) {
        throw e;
    }
};
