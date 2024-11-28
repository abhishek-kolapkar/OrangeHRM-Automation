// -- This is a parent command --
Cypress.Commands.add("login", (username = "", password = "") => {
  cy.visit("/");

  cy.get("input[name='username']").type(username || "Admin");
  cy.get("input[name='password']").type(password || "admin123");

  cy.get(".orangehrm-login-button").click();

  cy.url().should("include", "dashboard");
});

Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown-tab").click();
  cy.contains("[role=menuitem]", "Logout").click();

  cy.url().should("include", "auth/login");
});
