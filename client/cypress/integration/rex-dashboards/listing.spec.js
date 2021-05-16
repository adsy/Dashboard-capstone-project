describe("Form", () => {
  beforeEach(() => {
    // Before each test
    cy.visit("/");
    const password = "password";
    const email = "dawnroth@yahoo.com.au";
    cy.get("#password").type(password);
    cy.get("#email").type(email);
    cy.get("#loginButton").click();
  });
  //Test that you can logout
  it("it focuses the input", () => {
    cy.wait(2000);
    cy.contains("Logout")
      .click({ force: true })
      .url()
      .should("include", "/logout");
  });
  //Test that you can move to the commissions dashboard
  it("it focuses the input", () => {
    cy.wait(5000);
    cy.contains("Commission")
      .click({ force: true })
      .url()
      .should("include", "/commissions");
  });
});
