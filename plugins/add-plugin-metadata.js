import path from 'path';
import fs from 'fs/promises';

export const addPluginMetadata = (options = {}) => {
	const { metaFile } = options;
	let outputFile = '';

	return {
		name: 'add-plugin-metadata',
		options: async (e) => {
			// console.log('a', e);
			outputFile = e.output[0].file;
		},
		closeBundle: async (e) => {
			console.log('bruh');
			const metaStr = await fs.readFile(path.join(__dirname, metaFile));
			const meta = JSON.parse(metaStr);

			if (!meta || !meta.info) return;

			const outputMeta = `/**${Object.entries(meta.info).reduce(
				(outMeta, [key, value]) => `${outMeta}\n * @${key} ${value}`,
				''
			)}\n */`;
			console.log(outputMeta);

			const out = await fs.readFile(outputFile);
			await fs.writeFile(outputFile, `${outputMeta}\n\n${out}`);
			// console.log(out);
			// console.log(outputFile);
		},
	};
};
