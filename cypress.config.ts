import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
    },
      specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
      excludeSpecPattern: ['**/1-getting-started/*', '**/2-advanced-examples/*']
  },
});
