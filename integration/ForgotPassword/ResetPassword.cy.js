import { ResetPassword } from "../../cypress/support/pages/forgotPassword/forgotPassword";

const resetPassActions = new ResetPassword();

describe("Verify Reset Password functionality", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.fixture("loginInfo.json").as("userData");
  });

  /* Scenario => Verify password reset link is sent to the registered email for valid/invalid/blank username */

  it("Check that entering a valid username triggers the password reset link", () => {
    cy.get("@userData").then((data) => {
      resetPassActions.clickForgotPassLink();
      resetPassActions.forgotYourPassword(data.valid.username);

      resetPassActions.resetPassSuccess();
    });
  });

  // => bug
  it("Check that entering a invalid username triggers the password reset link", () => {
    cy.get("@userData").then((data) => {
      resetPassActions.clickForgotPassLink();
      resetPassActions.forgotYourPassword(data.invalid.username);

      resetPassActions.resetPassSuccess();
    });
  });

  it("Check that blank username triggers the password reset link", () => {
    cy.get("@userData").then((data) => {
      resetPassActions.clickForgotPassLink();
      resetPassActions.forgotYourPassword(" ");

      resetPassActions.verifyEmptyUsername(data.errMsg.required);
    });
  });

  /* Cancel button behaviour */
  it("Check that clicking the Cancel button navigates back to the Login page", () => {
    resetPassActions.clickForgotPassLink();
    resetPassActions.cancelResetPass();

    resetPassActions.checkCancelResetPass();
  });

  it.only("Check that entering a valid username & clicking the Cancel button does not submit the form", () => {
    cy.get("@userData").then((data) => {
      resetPassActions.clickForgotPassLink();
      resetPassActions.cancelResetPassUsername(data.valid.username);

      resetPassActions.resetPassSuccess();
    });
  });
});
