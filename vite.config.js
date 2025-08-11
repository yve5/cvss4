import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'url';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), eslint()],
  base: '/cvss4',
});
