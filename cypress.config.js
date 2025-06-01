const { defineConfig } = require("cypress");
module.exports = defineConfig({
  e2e: {
    // specPattern: 'cypress/npm//*.cy.{js,jsx,ts,tsx}',
    setupNodeEvents(on, config) {
      
      // implement node event listeners here if needed
    },
    baseUrl: 'https://backoffice.a2i.gov.bd',chromeWebSecurity: false,  
    
    viewportWidth: 1920,
    viewportHeight: 1080,
  },
});