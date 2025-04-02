import { defineConfig } from "cypress";
import { chromeAllowXSiteCookies, cucumberPreprocessor } from '@dhis2/cypress-plugins'

async function setupNodeEvents(on, config) {
  await cucumberPreprocessor(on, config)
  chromeAllowXSiteCookies(on)
  return config
}

export default defineConfig({
  video: false,
  e2e: {
    setupNodeEvents,
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.feature',
  },
});
