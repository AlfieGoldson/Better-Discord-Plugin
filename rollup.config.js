import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { addPluginMetadata } from './plugins/add-plugin-metadata';
import ts from '@rollup/plugin-typescript';
import { config } from 'dotenv';
config();

const { DIST_URL } = process.env;

const pluginName = 'Corehalla';

export default {
    // input: 'src/index.tsx',
    output: {
        format: 'cjs',
    },
    // output: [
    //     {
    //         file: `lib/${pluginName}.plugin.js`,
    //         format: 'cjs',
    //         sourcemap: false,
    //         strict: false,
    //     },
    //     {
    //         file: `${DIST_URL}/${pluginName}.plugin.js`,
    //         format: 'cjs',
    //         sourcemap: false,
    //         strict: false,
    //     },
    // ],
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
        // addPluginMetadata({ metaFile: 'src/plugin.meta.js', deleteMetaFile: true }),
    ],
};
