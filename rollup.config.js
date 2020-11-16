import { terser } from 'rollup-plugin-terser';
import buble from '@rollup/plugin-buble';
import replace from '@rollup/plugin-replace';
import pkg from './package.json';

const plugins = [
  replace({
    __VERSION__: pkg.version,
  }),
  buble({
    transforms: {
      modules: false,
    },
  }),
  terser({
    module: true,
  }),
];

export default [
  {
    input: 'src/once.js',
    output: {
      name: 'once',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true,
    },
    plugins,
  },
  {
    input: 'src/once.jquery.js',
    output: {
      file: 'dist/once.jquery.min.js',
      format: 'iife',
      sourcemap: true,
    },
    plugins,
  },
];
