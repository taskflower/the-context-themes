import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/remote-templates.js',
    format: 'esm',
    sourcemap: true
  },
  external: ['react'],
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    commonjs(),
    // Wszytko co potrzebne bierze z tsconfig.json
    typescript({ tsconfig: './tsconfig.json' })
  ]
};
