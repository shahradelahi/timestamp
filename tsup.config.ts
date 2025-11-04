import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  splitting: true,
  entry: {
    index: 'src/index.ts',
    millis: 'src/ms/index.ts',
    seconds: 'src/seconds/index.ts',
  },
  format: ['cjs', 'esm'],
  target: 'esnext',
  outDir: 'dist',
});
