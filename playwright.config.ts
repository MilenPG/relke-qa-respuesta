import { defineConfig } from '@playwright/test';
import path from 'path';

export default defineConfig({
  use: {
    headless: true,
    viewport: { width: 1280, height: 800 },
    baseURL: 'https://demo.relbase.cl',
    ignoreHTTPSErrors: true,
    storageState: path.resolve(__dirname, './setup/auth.json')
  },
  testDir: './tests',
  timeout: 30000,
});
