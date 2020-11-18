import { terser } from 'rollup-plugin-terser';
import buble from '@rollup/plugin-buble';
import pkg from './package.json';

const plugins = [
  // Transform down to ES5, do not error out on export/import lines.
  buble({ transforms: { modules: false } }),
  // Minify resulting ES5 code, keep banner comment.
  terser({
    format: { comments: /^ once/ },
  }),
];

const output = {
  name: 'once',
  sourcemap: 'hidden',
  // Add version and date to generated files.
  banner: `/* once - v${pkg.version} - ${new Date().toJSON().split('T')[0]} */`,
};

export default [
  {
    input: 'src/once.js',
    output: [
      { ...output, file: pkg.browser, format: 'iife' },
      { ...output, file: pkg.main, format: 'esm' },
      { ...output, file: pkg.umd, format: 'umd' },
    ],
    plugins,
  },
];
