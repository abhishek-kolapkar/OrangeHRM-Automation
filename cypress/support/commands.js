// -- This is a parent command --
Cypress.Commands.add("login", (username = "Admin", password = "admin123") => {
  cy.visit("/");

  cy.get("input[name='username']").clear().type(username);
  cy.get("input[name='password']").clear().type(password);

  cy.get(".orangehrm-login-button").click();

  cy.url().should("include", "dashboard");
});

Cypress.Commands.add("logout", () => {
  cy.get(".oxd-userdropdown-tab").click();
  cy.contains("[role=menuitem]", "Logout").click();

  cy.url().should("include", "auth/login");
});
