/* eslint-env node */
import { DEFAULT_EXTENSIONS } from '@babel/core';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';

const path = require('path');
const pkg = require(path.join(__dirname, './package.json'));
const extensions = [...DEFAULT_EXTENSIONS, '.ts', '.tsx'];
const globals = {
  react: 'React',
  'react-dom': 'ReactDOM',
};
const external = Object.keys(globals);
const input = 'src/index.jsx';

const plugins = [
  nodeResolve({
    extensions,
    dedupe: external,
  }),
  commonjs({
    exclude: 'src/**',
  }),
  babel({
    exclude: 'node_modules/**',
    extensions,
  }),
  replace({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
].filter(Boolean);

export default [
  {
    input,
    output: {
      file: './dist/bundle.js',
      format: 'umd',
      name: 'JSToCSSTheme',
      globals,
      esModule: false,
      sourcemap: true,
    },
    plugins: plugins.concat(terser()),
    external,
  },
  {
    input,
    output: {
      dir: './dist/esm/',
      format: 'esm',
      globals,
    },
    plugins,
    external,
  },
];
