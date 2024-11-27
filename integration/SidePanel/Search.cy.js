describe("Verify search functionality of sidepanel", () => {
  before(() => {
    cy.login();
  });

  /* Scenario => Verify search func. for valid/invalid keywords */

  it("should filter the side panel menu based on a search input", () => {
    cy.fixture("sidePanel.json").then((menuItems) => {
      // get a random index to pick a random menu item from the list
      const index = Math.floor(Math.random() * menuItems.length);
      const keyword = menuItems[index];

      // enter the keyword into the search input
      cy.get(".oxd-main-menu-search > input[placeholder='Search']")
        .clear()
        .type(keyword);

      // verify if the menu items containing the keyword are visible
      // menuItems.forEach((menuItem) => {
      if (menuItems.includes(keyword)) {
        // If the menu item contains the keyword, it should be visible
        cy.get(".oxd-main-menu-item").contains(keyword).should("be.visible");
      } else {
        // If the menu item does not contain the keyword, it should not be visible
        cy.get(".oxd-main-menu-item").contains(keyword).should("not.exist");
      }
      // });
    });
  });

  it("should hide all menu items for invalid search keywords", () => {
    // Generate a random invalid keyword that is not in the menu list
    const invalidKeyword = "InvalidMenuItem";

    // Enter the invalid keyword into the search input
    cy.get(".oxd-main-menu-search > input[placeholder='Search']")
      .clear()
      .type(invalidKeyword);

    // Loop through all menu items and ensure they are all hidden
    cy.fixture("sidePanel.json").then((menuItems) => {
      if (!menuItems.includes(invalidKeyword)) {
        menuItems.forEach((menuItem) => {
          cy.get("ul.oxd-main-menu").contains(menuItem).should("not.exist");
        });
      }
    });
  });

  it("should show all menu items when input is cleared", () => {
    // Clear the search input
    cy.get(".oxd-main-menu-search > input[placeholder='Search']")
      .type("PIM")
      .clear();

    // Loop through all menu items and ensure they are all visible again
    cy.fixture("sidePanel.json").then((menuItems) => {
      menuItems.forEach((menuItem) => {
        cy.get("ul.oxd-main-menu").contains(menuItem).should("be.visible");
      });
    });
  });

  after(() => {
    cy.logout();
  });
});
