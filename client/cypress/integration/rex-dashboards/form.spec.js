describe("Form", () => {
  // Test that the site is reachable
  beforeEach(() => {
    cy.visit("/");
  });
  // Test that the input is focusable
  it("it focuses the input", () => {
    cy.focused().should("have.class", "username-input");
  });
  // Test that the email box is focusable
  it("it focuses the input", () => {
    cy.get("#email").should("have.id", "email");
  });
  // Test that the email box accepts input
  it("email accepts input", () => {
    const input = "gmail@gmail.com";
    cy.get("#email").type(input).should("have.value", input);
  });
    // Test that the password box accepts input
  it("password accepts input", () => {
    const input = "password";
    cy.get("#password").type(input).should("have.value", input);
  });
  // Test that an error message is received when wrong creds are given
  it("Error message when creds wrong", () => {
    const password = "wrongpassword";
    const email = "gmail@gmail.com";
    cy.get("#password").type(password);
    cy.get("#email").type(email);
    cy.get("#loginButton").click();
    cy.get(".ant-alert-message").should(
      "have.text",
      "Incorrect email or password try again"
    );
  });
  // Test the page moves through to the dashboards when right creds are inputted
  it("Right creds, move through", () => {
    const password = "password";
    const email = "dawnroth@yahoo.com.au";
    cy.get("#password").type(password);
    cy.get("#email").type(email);
    cy.get("#loginButton").click();
    cy.url().should("include", "listings");
  });
});
