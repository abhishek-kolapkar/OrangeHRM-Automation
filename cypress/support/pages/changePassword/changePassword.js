export class changePassword {
  profileMenu = () => cy.get(".oxd-userdropdown-tab");
  changePassLink = () => cy.contains("[role=menuitem]", "Change Password");

  currentPassField = () => cy.xpath("(//input[@type='password'])[1]");
  newPassField = () => cy.xpath("(//input[@type='password'])[2]");
  confirmPassField = () => cy.xpath("(//input[@type='password'])[3]");

  confirmPassFieldErr = (errMsg) =>
    this.confirmPassField()
      .parents()
      .eq(1)
      .contains("span", errMsg)
      .should("exist");

  saveBtn = () => cy.get("button[type='submit']");

  // actions
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

  /* assertions */
  verifyChangePassPage() {
    cy.url().should("include", "updatePassword");
  }

  verifyPasswordMatch(errMsg) {
    this.newPassField()
      .invoke("val")
      .then((newPass) => {
        this.confirmPassField()
          .invoke("val")
          .then((confirmPass) => {
            // check if password doesn't matched
            if (newPass !== confirmPass) {
              this.confirmPassFieldErr(errMsg);
            }
          });
      });
  }

  verifyBlankPassField(errMsg, confirmErrMsg) {
    // check if current password field blank
    this.currentPassField()
      .invoke("val")
      .then((value) => {
        if (value === "") {
          this.currentPassField()
            .parents()
            .eq(1)
            .contains("span", errMsg)
            .should("exist");
        }
      });

    // check if new password field blank
    this.newPassField()
      .invoke("val")
      .then((value) => {
        if (value === "") {
          this.newPassField()
            .parents()
            .eq(1)
            .contains("span", errMsg)
            .should("exist");
        }
      });

    // check if confirm password field blank
    this.confirmPassField()
      .invoke("val")
      .then((value) => {
        if (value === "") {
          this.confirmPassField()
            .parents()
            .eq(1)
            .contains("span", confirmErrMsg)
            .should("exist");
        }
      });
  }

  // check if new password matched criteria
  validatePass(errMsg) {
    // check if new password length >= 7
    this.newPassField()
      .invoke("val")
      .then((value) => {
        if (value.length >= 7) {
          this.newPassField()
            .parents()
            .eq(1)
            .contains("span", errMsg)
            .should("exist");
        }

        // check if password not contain at-least 1 number
        else if (!/(?=.*\d)/.test(value)) {
          this.newPassField()
            .parents()
            .eq(1)
            .contains("span", errMsg)
            .should("exist");
        }

        // check if password not contain at-least 1 char
        else if (!/(?=.*[a-zA-Z])/.test(value)) {
          this.newPassField()
            .parents()
            .eq(1)
            .contains("span", errMsg)
            .should("exist");
        }
      });
  }
}
