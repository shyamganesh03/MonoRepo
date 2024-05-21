import { babel } from '@rollup/plugin-babel'
import fileSize from 'rollup-plugin-filesize'
import typescript from '@rollup/plugin-typescript';

const config = {
  input: 'dist/output/index.tsx',
  output: {
    dir: 'output',
    format: 'cjs',
  },
  external: [/@babel\/runtime/, 'react'],
  plugins: [
    babel({
      babelHelpers: 'runtime',
      plugins: ['@babel/plugin-transform-runtime'],
    }),
    fileSize(),
    typescript()
  ],
}

export default config
