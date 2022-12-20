import { defineConfig } from "cypress";

export default defineConfig({
  viewportWidth: 1080,
  viewportHeight: 1920,
  e2e: {
    setupNodeEvents(on, config) {},
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: ["**/1-getting-started/*", "**/2-advanced-examples/*"],
    baseUrl: 'http://localhost:4200/',
  },
});
