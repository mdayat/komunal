describe("Login spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/login");
  });

  it("should display login page correctly", () => {
    cy.get("button")
      .contains(/^Login$/)
      .should("be.visible");
  });

  it("should prevent login when username, password, or both are empty", () => {
    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("should prevent login when username and password are wrong", () => {
    cy.get('input[placeholder="Email"]').type("example@gmail.com");
    cy.get('input[placeholder="Password"]').type("examplepassword");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.url().should("eq", "http://localhost:3000/login");
  });

  it("should display homepage when username and password are correct", () => {
    cy.get('input[placeholder="Email"]').type("ojokarokoe@gmail.com");
    cy.get('input[placeholder="Password"]').type("ojokarokoe");

    cy.get("button")
      .contains(/^Login$/)
      .click();

    cy.url().should("eq", "http://localhost:3000/");
    cy.get("h1")
      .contains(/^All Threads$/)
      .should("be.visible");
  });
});
