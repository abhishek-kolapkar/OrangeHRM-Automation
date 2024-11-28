export class changePassword {
  /* ⇓ locators */
  profileMenu = () => cy.get(".oxd-userdropdown-tab");
  changePassLink = () => cy.contains("[role=menuitem]", "Change Password");

  currentPassField = () => cy.xpath("(//input[@type='password'])[1]");
  newPassField = () => cy.xpath("(//input[@type='password'])[2]");
  confirmPassField = () => cy.xpath("(//input[@type='password'])[3]");

  saveBtn = () => cy.get("button[type='submit']");

  currentPassFieldErr = (errMsg) =>
    this.confirmPassField()
      .parents()
      .eq(1)
      .contains("span", errMsg)
      .should("exist");

  newPassFieldErr = (errMsg) =>
    this.confirmPassField()
      .parents()
      .eq(1)
      .contains("span", errMsg)
      .should("exist");

  confirmPassFieldErr = (errMsg) =>
    this.confirmPassField()
      .parents()
      .eq(1)
      .contains("span", errMsg)
      .should("exist");

  /* ⇓ actions */
  changePassPage() {
    this.profileMenu().click();
    this.changePassLink().should("be.visible").click();
  }

  changePassword(currentPass, newPass, confirmPass) {
    currentPass && this.currentPassField().type(currentPass);
    newPass && this.newPassField().type(newPass);
    confirmPass && this.confirmPassField().type(confirmPass);
  }

  saveNewPass() {
    this.saveBtn().contains("Save").click();
  }

  /* ⇓ assertions */
  verifyChangePassPage() {
    cy.url().should("include", "updatePassword");
  }

  verifyChangePassSuccess(successMsg) {
    cy.get(".oxd-toast").contains(successMsg).should("exist");
  }

  verifyPasswordMatch(errMsg) {
    this.newPassField()
      .invoke("val")
      .then((newPass) => {
        this.confirmPassField()
          .invoke("val")
          .then((confirmPass) => {
            // check if password doesn't matched
            if (newPass !== confirmPass) this.confirmPassFieldErr(errMsg);
          });
      });
  }

  verifyBlankPassField(errMsg, confirmErrMsg) {
    // check if current password field blank
    this.currentPassField()
      .invoke("val")
      .then((value) => {
        if (value === "") this.currentPassFieldErr(errMsg);
      });

    // check if new password field blank
    this.newPassField()
      .invoke("val")
      .then((value) => {
        if (value === "") this.newPassFieldErr(errMsg);
      });

    // check if confirm password field blank
    this.confirmPassField()
      .invoke("val")
      .then((value) => {
        if (value === "") this.confirmPassFieldErr(confirmErrMsg);
      });
  }

  // validate new password criteria
  validatePass(errMsg) {
    this.newPassField()
      .invoke("val")
      .then((value) => {
        // check if new password length >= 7
        if (value.length >= 7) this.newPassFieldErr(errMsg);
        // check if password not contain at-least 1 number
        else if (!/(?=.*\d)/.test(value)) this.newPassFieldErr(errMsg);
        // check if password not contain at-least 1 char
        else if (!/(?=.*[a-zA-Z])/.test(value)) this.newPassFieldErr(errMsg);
      });
  }
}
