/* eslint-env node */
import { DEFAULT_EXTENSIONS } from '@babel/core';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import babel from 'rollup-plugin-babel';
import scss from 'rollup-plugin-scss';

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
  pkg.style && scss({ output: pkg.style }),
  process.env.NODE_ENV === 'production' && terser(),
].filter(Boolean);

export default {
  input,
  output: {
    dir: './dist/',
    format: 'esm',
    globals,
  },
  plugins,
  external,
};
