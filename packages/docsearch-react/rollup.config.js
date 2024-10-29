import replace from '@rollup/plugin-replace';

import { nodeResolve } from '@rollup/plugin-node-resolve';


import { plugins, typesConfig } from '../../rollup.base.config';
import { getBundleBanner } from '../../scripts/getBundleBanner';

import pkg from './package.json';

export default [
  {
    input: 'src/index.ts',
    external: ['react', 'react-dom'],
    output: [
      {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        file: 'dist/umd/index.js',
        format: 'umd',
        sourcemap: true,
        name: pkg.name,
        banner: getBundleBanner(pkg),
      },
      { dir: 'dist/esm', format: 'es' },
    ],
    plugins: [
      ...plugins,
      replace({
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      nodeResolve({browser:true})
    ],
  },
  typesConfig,
];
