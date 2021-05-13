import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { addPluginMetadata } from './plugins/add-plugin-metadata';

export default {
    input: 'src/index.js',
    output: {
        file: 'lib/Corehalla.plugin.js',
        format: 'cjs',
        sourcemap: false,
        strict: false,
    },
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx'],
        }),
        babel({
            presets: ['@babel/preset-react'],
        }),
        json(),
        addPluginMetadata({ metaFile: 'src/plugin.meta.json' }),
    ],
};
