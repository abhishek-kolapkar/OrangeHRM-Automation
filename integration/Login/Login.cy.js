import { Login } from "../../cypress/support/pages/login/login";

const loginActions = new Login();

describe("Verify login functionality", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.fixture("loginInfo.json").as("loginData");
  });

  /* Test Scenario => Verify login with valid credentials */

  it.only("should login with valid credentials & redirect to dashboard page", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login(data.valid.username, data.valid.password);

      // ensure redirect to dashboard page after login success
      loginActions.verifyLoginSuccess(data.verifyLoginSuccess.toLowerCase());
    });
  });

  /* Test Scenario => Verify login with invalid credentials */

  it("should displayed error message for invalid username & valid password", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login(data.invalid.username, data.valid.password);

      // ensure error msg displayed for invalid username & valid password
      loginActions.verifyInvalidLogin(data.errMsg.invalidLogin);
    });
  });

  it("should displayed error message for valid username & invalid password", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login(data.valid.username, data.invalid.password);

      // ensure error msg displayed for valid username & invalid password
      loginActions.verifyInvalidLogin(data.errMsg.invalidLogin);
    });
  });

  it("should displayed error message for invalid username & invalid password", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login(data.invalid.username, data.invalid.password);

      // ensure error msg displayed for invalid username & invalid password
      loginActions.verifyInvalidLogin(data.errMsg.invalidLogin);
    });
  });

  /* Test Scenario => Verify login with empty field/fields */

  it("should displayed error message for empty username field", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login("", data.valid.password);

      loginActions.verifyRequiredField(data.errMsg.required);
    });
  });

  it("should displayed error message for empty password field", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login(data.valid.username, "");

      loginActions.verifyRequiredField(data.errMsg.required);
    });
  });

  it("should displayed error message for both empty fields", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login("", "");

      loginActions.verifyRequiredField(data.errMsg.required);
    });
  });

  /* Test Scenario => Verify Username & Password case-sensitive */

  it("username should be case-sensitive", () => {
    cy.get("@loginData").then((data) => {
      if (data.valid.username === data.valid.username.toUpperCase()) {
        loginActions.login(
          data.valid.username.toLowerCase(),
          data.valid.password
        );
      } else {
        loginActions.login(
          data.valid.username.toUpperCase(),
          data.valid.password
        );
      }

      // ensure that error message should displayed, if enter not case-sensitive username
      loginActions.verifyInvalidLogin(data.errMsg.invalidLogin);
    });
  });

  it("password should be case-sensitive", () => {
    cy.get("@loginData").then((data) => {
      if (data.valid.password == data.valid.password.toUpperCase()) {
        loginActions.login(
          data.valid.username,
          data.valid.password.toLowerCase()
        );
      } else {
        loginActions.login(
          data.valid.username,
          data.valid.password.toUpperCase()
        );
      }

      loginActions.verifyInvalidLogin(data.errMsg.invalidLogin);
    });
  });
});
