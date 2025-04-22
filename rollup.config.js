import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default {
  input: 'src/index.tsx',
  output: {
    file: 'dist/remote-templates.js',
    format: 'esm',
    sourcemap: true,
    // Dodaj mapowanie ścieżek dla zewnętrznych zależności
    paths: {
      'react': 'https://esm.sh/react@18'
    }
  },
  external: ['react'],
  plugins: [
    resolve({ extensions: ['.js', '.jsx', '.ts', '.tsx'] }),
    commonjs(),
    typescript({ tsconfig: './tsconfig.json' })
  ]
};