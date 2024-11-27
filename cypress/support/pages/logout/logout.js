export class Logout {
  // locators
  userDropdown = () => cy.get(".oxd-userdropdown");
  logoutOption = () => cy.get(".oxd-dropdown-menu li:nth-child(4) > a");

  // action methods
  /* => Logout */
  logout() {
    this.userDropdown().click();
    this.logoutOption().should("exist").click();
  }

  // assertion methods
  verifyLogoutSuccess() {
    cy.url().should("contain", "auth/login");
  }
}
