const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: '4ngic2',
  chromeWebSecurity: false,
  e2e: {
    baseUrl: 'https://www.naukri.com/',
    setupNodeEvents(on, config) {
    }
  },
 
});
