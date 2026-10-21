import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages project sites need a /repository-name/ base path. During local
// development and normal builds the app is served at /.
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1];
export default defineConfig({
  plugins: [react()],
  base: repoName ? `/${repoName}/` : '/',
});
