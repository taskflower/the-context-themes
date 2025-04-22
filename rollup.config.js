import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/remote-templates.js',
    format: 'umd',  // Zmieniono z 'esm' na 'umd'
    name: 'RemoteTemplates',  // Nazwa globalnego obiektu
    globals: {
      'react': 'React'  // Mówi że React to globalna zmienna 'React'
    },
    sourcemap: true
  },
  external: ['react'],
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
};