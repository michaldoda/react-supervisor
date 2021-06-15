import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import packageJson from './package.json';

export default [
    {
        input: './src/index.js',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            }
        ],
        plugins: [
            babel({
                exclude: 'node_modules/**',
                runtimeHelpers: true
            }),
            commonjs()
        ],
        external: id => /^react|react-dom/.test(id)
    },
];