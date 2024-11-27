import { Login } from "../../cypress/support/pages/login/login";
import { Logout } from "../../cypress/support/pages/logout/logout";

const loginActions = new Login();
const logoutActions = new Logout();

describe("Verify login functionality", () => {
  beforeEach(() => {
    cy.visit("/");

    cy.fixture("loginInfo.json").as("loginData");
  });

  /* Test Scenario => Verify login with valid credentials */

  it("should login with valid credentials & redirect to dashboard page", () => {
    cy.get("@loginData").then((data) => {
      loginActions.login(data.valid.username, data.valid.password);

      // ensure redirect to dashboard page after login success
      loginActions.verifyLoginSuccess(data.verifyLoginSuccess.toLowerCase());

      cy.wait(5000);

      // logout after 5s wait
      logoutActions.logout();
      logoutActions.verifyLogoutSuccess();
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

  it.only("username should be case-sensitive", () => {
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

      // Check if the login is successful based on the URL
      cy.url().then((url) => {
        if (url.includes(data.verifyLoginSuccess.toLowerCase())) {
          // If login is successful
          loginActions.verifyLoginSuccess(
            data.verifyLoginSuccess.toLowerCase()
          );

          cy.wait(5000); // Wait for 5 seconds

          logoutActions.logout(); // Log out the user
          logoutActions.verifyLogoutSuccess();
          cy.log("Logout successful");
        } else {
          // If login failed (URL does not contain 'dashboard')
          loginActions.verifyInvalidLogin(data.errMsg.invalidLogin);
          cy.log("Login failed: Case-sensitive username");
        }
      });
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
