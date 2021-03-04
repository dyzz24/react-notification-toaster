import postcss from 'rollup-plugin-postcss-modules';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from 'rollup-plugin-node-resolve';

import pkg from './package.json';


const config = [
  {input: './src/components/toaster-styles.css',
    output: {
      file: 'dist/toaster-styles.css',
      name: "toaster-styles",
      sourcemap: false,

    },
    plugins: [postcss({
      extensions: [ '.css' ],
      extract: true,
      writeDefinitions: true,
      minimize: true
    })]
  },
    {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      strict: false
    }
  ],
  plugins: [typescript({tsconfig: "tsconfig.json"}), nodeResolve(), postcss()],
  external: ['react', 'react-dom'],
},

];

export default config;
