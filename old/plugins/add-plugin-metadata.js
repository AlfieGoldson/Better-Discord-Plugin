import path from 'path';
import fs from 'fs/promises';

export const addPluginMetadata = (options = {}) => {
    const { metaFile, deleteMetaFile } = options;
    let outputFile = '';

    return {
        name: 'add-plugin-metadata',
        options: async ({ output }) => {
            outputFile = output[0].file;
        },
        closeBundle: async () => {
            const { meta } = await import(path.join(__dirname, metaFile));

            if (!meta || !meta.info) return;

            const outputMeta = `/**${Object.entries(meta.info).reduce(
                (outMeta, [key, value]) => `${outMeta}\n * @${key} ${value}`,
                '',
            )}\n */`;

            const out = await fs.readFile(outputFile);
            await fs.writeFile(outputFile, `${outputMeta}\n\n${out}`);
            if (deleteMetaFile) await fs.unlink(metaFile);
        },
    };
};
