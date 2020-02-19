import babel from 'rollup-plugin-babel'

import pkg from './package.json'

export default {
  input: 'src/plea.js',
  external: ['querystring', 'https', 'url', 'assert'],
  output: [
    { file: pkg.main, format: 'cjs' },
    { file: pkg.module, format: 'es' },
  ],
  plugins: [babel()],
}
