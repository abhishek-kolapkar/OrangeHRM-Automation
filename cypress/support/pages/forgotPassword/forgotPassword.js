export class ResetPassword {
  // locators
  forgotPassLink = () => cy.get(".orangehrm-login-forgot-header");
  userNameField = () => cy.get("input[name='username']");
  resetPassBtn = () => cy.get(".orangehrm-forgot-password-button--reset");
  cancelBtn = () => cy.get(".orangehrm-forgot-password-button--cancel");

  titleSuccessResetPass = () => cy.get(".orangehrm-forgot-password-title");

  // action methods
  clickForgotPassLink() {
    this.forgotPassLink().should("be.visible").click();
  }

  forgotYourPassword(username) {
    this.userNameField().clear().type(username);

    this.resetPassBtn().click();
  }

  cancelResetPass() {
    this.cancelBtn().click();
  }

  cancelResetPassUsername(username) {
    this.userNameField().clear().type(username);

    this.cancelBtn().click();
  }

  // assertion methods
  resetPassSuccess() {
    this.titleSuccessResetPass().should(
      "contain",
      "Reset Password link sent successfully"
    );
  }

  verifyEmptyUsername(errorMsg) {
    this.userNameField()
      .invoke("val")
      .then((value) => {
        if (value === "") {
          this.userNameField()
            .parents()
            .eq(1)
            .contains("span", errorMsg)
            .should("exist");
        }
      });
  }

  checkCancelResetPass() {
    cy.url().should("contain", "auth/login");
  }
}
