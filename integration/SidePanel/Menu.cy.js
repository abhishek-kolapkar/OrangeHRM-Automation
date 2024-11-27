describe("Verify menu navigation of sidepanel", () => {
  before(() => {
    cy.login();
  });

  /* Scenario => Verify each menu-item navigate to correct page */
  it("Verify each menu item navigate to the correct page", () => {
    // Load menu data from the fixture
    cy.fixture("sidePanel.json").then((menuData) => {
      menuData.forEach((menuItem, i) => {
        if (menuItem === "Maintenance") {
          return;
        } else {
          // store menu item as alias & click
          cy.get("ul[class='oxd-main-menu'] li a")
            .eq(i)
            .as("currentMenuItem")
            .click();
        }

        // Validate the clicked menu item has the active class
        cy.get("@currentMenuItem").should("have.class", "active");

        // Validate the URL contains the expected part
        cy.get("@currentMenuItem")
          .invoke("text")
          .then((menuText) => {
            if (menuText === "My Info") {
              cy.url().should("include", "PIM".toLowerCase());
            } else {
              cy.url().should("include", menuText.toLowerCase());
            }
          });
      });
    });
  });

  after(() => {
    cy.logout();
  });
});
