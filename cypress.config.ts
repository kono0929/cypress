import { defineConfig } from "cypress";
const { initPlugin } = require("cypress-plugin-snapshots/plugin");

export default defineConfig({
  projectId: "a75rsd",
  viewportHeight: 1080,
  viewportWidth: 1920,
  chromeWebSecurity: false,
  env: {
    "cypress-plugin-snapshots": {
      imageConfig: {
        threshold: 0.01 // Amount in pixels or percentage before snapshot image is invalid
      }
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      initPlugin(on, config);
      return config;
    },
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
    excludeSpecPattern: [
      "**/1-getting-started/*",
      "**/2-advanced-examples/*",
      "/snapshots/*",
      "/image_snapshots/*"
    ],
    baseUrl: "http://localhost:4200/"
  }
});
