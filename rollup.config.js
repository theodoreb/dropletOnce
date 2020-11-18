import { terser } from 'rollup-plugin-terser';
import buble from '@rollup/plugin-buble';
import pkg from './package.json';

/**
 * Configuration for non minified files to keep documentation for IDE auto
 * completion.
 */
const step1 = {
  out: {
    name: 'once',
    // Add version and date to generated files.
    banner: `/* once - v${pkg.version} - ${
      new Date().toJSON().split('T')[0]
    } */`,
  },
  plugins: [],
};

/**
 * Configuration for production file generation.
 *
 * @type {Object}
 */
const step2 = {
  out: {
    ...step1.out,
    sourcemap: true,
  },
  plugins: [
    // Transform down to ES5, do not error out on export/import lines.
    buble({ transforms: { modules: false } }),
    // Minify resulting ES5 code, keep banner comment.
    terser({
      format: { comments: /^ once/ },
    }),
  ],
};

export default [
  {
    input: 'src/once.js',
    output: [
      { ...step1.out, file: pkg.browser.replace('.min', ''), format: 'iife' },
      { ...step1.out, file: pkg.main.replace('.min', ''), format: 'esm' },
      { ...step1.out, file: pkg.umd.replace('.min', ''), format: 'umd' },
    ],
    plugins: step1.plugins,
  },
  {
    input: 'src/once.js',
    output: [
      { ...step2.out, file: pkg.browser, format: 'iife' },
      { ...step2.out, file: pkg.main, format: 'esm' },
      { ...step2.out, file: pkg.umd, format: 'umd' },
    ],
    plugins: step2.plugins,
  },
];
