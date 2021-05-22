import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';

export default {
    input: 'src/index.ts',
    output: {
        format: 'es',
        file: 'dist/build.mjs',
        banner: '#!/usr/bin/env zx\n',
    },
    plugins: [
        nodeResolve({
            extensions: ['.ts'],
        }),
        ts(),
    ],
    external: [
        'rollup',
        'path',
        'fs',
        'fs/promises',
        'process',
        '@rollup/plugin-babel',
        '@rollup/plugin-node-resolve',
        '@rollup/plugin-typescript',
        'module',
    ],
};
