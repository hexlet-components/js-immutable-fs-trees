import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    include: [
      '**/__tests__/**/*.{js,mjs,cjs,ts}',
      '**/*.{test,spec}.{js,mjs,cjs,ts}',
    ],
  },
});
