const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://opensource-demo.orangehrmlive.com/",
    specPattern: "integration/**/*.cy.{js,jsx,ts,tsx}",
    include: ["./node_modules/cypress", "integration/**/*.js"],
    testIsolation: false,

    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
