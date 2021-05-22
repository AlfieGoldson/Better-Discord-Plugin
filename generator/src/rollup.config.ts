import { InputOptions, OutputOptions } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';

export const getRollupInput = (entryFile: string): InputOptions => ({
    input: entryFile,
    plugins: [
        nodeResolve({
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
        }),
        babel({
            presets: ['@babel/preset-react'],
            babelHelpers: 'bundled',
        }),
        ts(),
    ],
});

export const getRollupOutput = (): OutputOptions => ({
    format: 'es',
    exports: 'auto',
    strict: false,
});
