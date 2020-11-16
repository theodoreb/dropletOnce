import { terser } from 'rollup-plugin-terser';
import buble from '@rollup/plugin-buble';
import pkg from './package.json';

const plugins = [
  // Transform down to ES5, do not error out on export/import lines.
  buble({ transforms: { modules: false } }),
  // Minify resulting ES5 code, allow top-level mangling and keep banner comment.
  terser({ module: true, format: { comments: /^ v/ } }),
];

// Add version and date to generated files.
const banner = `/* v${pkg.version} - ${new Date().toJSON().split('T')[0]} */`;

export default [
  {
    input: 'src/once.js',
    output: {
      name: 'once',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
      banner,
    },
    plugins,
  },
  {
    input: 'src/once.jquery.js',
    output: {
      file: 'dist/once.jquery.min.js',
      format: 'iife',
      sourcemap: true,
      banner,
    },
    plugins,
  },
];
