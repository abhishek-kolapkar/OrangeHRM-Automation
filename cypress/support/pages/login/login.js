export class Login {
  // locators
  usernameField = () => cy.get("input[name='username']");
  passwordField = () => cy.get("input[name='password']");
  loginBtnField = () => cy.get("button.orangehrm-login-button");

  invalidLoginErrMsg = () => cy.get(".oxd-alert--error");

  // action methods
  login(username, password) {
    username && this.usernameField().type(username);
    password && this.passwordField().type(password);

    this.loginBtnField().click();
  }

  // assertion methods
  verifyLoginSuccess(label) {
    cy.url().should("include", label);
  }

  verifyInvalidLogin(errMsg) {
    this.invalidLoginErrMsg().contains(errMsg).should("be.visible");
  }

  verifyRequiredField(errMsg) {
    // verify if empty username
    this.usernameField()
      .invoke("val")
      .then((value) => {
        if (value === "") {
          this.passwordField()
            .parents()
            .find("span.oxd-input-field-error-message")
            .contains(errMsg)
            .should("be.visible");
        }
      });

    // verify if empty password
    this.passwordField()
      .invoke("val")
      .then((value) => {
        if (value === "") {
          this.passwordField()
            .parents()
            .find("span.oxd-input-field-error-message")
            .contains(errMsg)
            .should("be.visible");
        }
      });
  }
}
