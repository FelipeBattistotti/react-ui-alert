import resolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'
import dts from 'rollup-plugin-dts'

import pkg from './package.json' assert { type: 'json' }

const config = [
  {
    input: 'src/index.ts',
    output: [
      {
        file: pkg.main,
        format: 'cjs',
        sourcemap: true,
        exports: 'named',
      },
      {
        file: pkg.module,
        format: 'es',
        sourcemap: true,
        exports: 'named',
      },
    ],
    plugins: [
      peerDepsExternal(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      babel({
        exclude: 'node_modules/**',
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        babelHelpers: 'bundled',
      }),
      terser(),
    ],
    external: ['react', 'react-dom', 'react-transition-group'],
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'es' }],
    plugins: [dts()],
  },
]

export default config