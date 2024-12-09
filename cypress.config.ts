import { defineConfig } from 'cypress';
import viteConfig from './vite.config';

export default defineConfig({
  component: {
    port: 5173,
    devServer: {
      framework: 'react',
      bundler: 'vite',
      viteConfig,
    },
    specPattern: 'cypress/component/**/*.cy.{js,jsx,ts,tsx}', // Component test files
  },

  e2e: {
    defaultCommandTimeout: 10000,
    baseUrl: 'http://localhost:3001',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // End-to-end test files
    setupNodeEvents(on, config) {
      // Add custom event listeners or plugins here
      on('task', {
        log(message) {
          console.log(message);
          return null;
        },
      });
    },
  },
});