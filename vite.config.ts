import { existsSync } from 'node:fs';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

const hasCustomLogo = existsSync(
  new URL('./public/images/anviksha-logo.png', import.meta.url),
);

export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __HAS_ANVIKSHA_LOGO__: JSON.stringify(hasCustomLogo),
  },
});
