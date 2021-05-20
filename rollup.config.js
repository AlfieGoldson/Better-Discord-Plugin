import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import { nodeResolve } from '@rollup/plugin-node-resolve';
// import { addPluginMetadata } from './plugins/add-plugin-metadata';
import ts from '@rollup/plugin-typescript';
import { config } from 'dotenv';
config();

export default {
    output: {
        format: 'cjs',
        exports: 'auto',
    },
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
};
