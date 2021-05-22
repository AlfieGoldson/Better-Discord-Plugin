import { InputOptions, OutputOptions, Plugin } from 'rollup';
import { babel } from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import ts from '@rollup/plugin-typescript';

export const getRollupInput = (entryFile: string, formatString: Plugin): InputOptions => ({
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
        formatString,
    ],
});

export const getRollupOutput = (releaseFile: string): OutputOptions => ({
    file: releaseFile,
    format: 'es',
    exports: 'auto',
    strict: false,
});
