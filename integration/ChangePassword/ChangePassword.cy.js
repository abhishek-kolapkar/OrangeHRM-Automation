import { changePassword } from "../../cypress/support/pages/changePassword/changePassword";

const changePassActions = new changePassword();

describe("Verify Change Password Functionality", () => {
  beforeEach(() => {
    cy.login();

    changePassActions.changePassPage();
    changePassActions.verifyChangePassPage();
  });

  /* Scenario => Verify if password changed successful */
  it("check if password changed successfully", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword(
        data.validPass,
        data.newValidPass,
        data.newValidPass
      );

      changePassActions.saveNewPass();

      changePassActions.verifyChangePassSuccess(data.changePassSuccessMsg);
    });
  });

  /* Scenario => Verify if login with new password */
  /* bug => didn't login with new password */
  it.only("check if login with new password", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword(
        data.validPass,
        data.newValidPass,
        data.newValidPass
      );

      changePassActions.saveNewPass();

      cy.wait(5000);

      // logout
      cy.logout();

      // login with new password
      cy.login("", data.newValidPass);
    });
  });

  /* Scenario => Verify error message if new password & confirm password didn't matched */
  it("check error message if new password & confirm password didn't matched", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword(
        data.validPass,
        data.newValidPass,
        data.invalidConfirmPass
      );

      changePassActions.verifyPasswordMatch(data.errMsg.confirmPass);
    });
  });

  /* Scenario => Verify error message displayed for blank field/fields */
  it("check if error message displayed for blank current password field", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword(
        "",
        data.newValidPass,
        data.newValidPass
      );

      changePassActions.saveNewPass();

      // ensure to displayed error message for blank field
      changePassActions.verifyBlankPassField(data.errMsg.required);
    });
  });

  it("check if error message displayed for blank new password field", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword(data.validPass, "", data.newValidPass);

      changePassActions.saveNewPass();

      // ensure to displayed error message for blank field
      changePassActions.verifyBlankPassField(data.errMsg.required);
    });
  });

  it("check if error message displayed for blank confirm password field", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword(data.validPass, data.newValidPass, "");

      changePassActions.saveNewPass();

      // ensure to displayed error message for blank field
      changePassActions.verifyBlankPassField("", data.errMsg.confirmPass);
    });
  });

  it("check if error message displayed for blank fields", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.changePassword("", "", "");

      changePassActions.saveNewPass();

      // ensure to displayed error message for blank field
      changePassActions.verifyBlankPassField(
        data.errMsg.required,
        data.errMsg.confirmPass
      );
    });
  });

  /* Scenario => Verify error message displayed if new password doesn't match certain criteria */
  it("check if error message displayed if new password length is less than 7", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.newPassField().type(data.invalidLenPass);

      // ensure to displayed error message for blank field
      changePassActions.validatePass(data.errMsg.passwordLen);
    });
  });

  it("check if error message displayed if new password doesn't contain number", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.newPassField().type(data.passWithoutNum);

      // ensure to displayed error message for blank field
      changePassActions.validatePass(data.errMsg.passCriteriaforNum);
    });
  });

  it("check if error message displayed if new password doesn't contain char", () => {
    cy.fixture("changePass.json").then((data) => {
      changePassActions.newPassField().type(data.passWithoutChar);

      // ensure to displayed error message for blank field
      changePassActions.validatePass(data.errMsg.passCriteriaforChar);
    });
  });

  afterEach(() => {
    cy.logout();
  });
});
