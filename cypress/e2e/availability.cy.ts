describe("service is available", () => {
  before(() => {
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" }).as(
      "checkUserAuth",
    );
    cy.intercept("GET", "api/ingredients", { fixture: "ingredients.json" }).as(
      "getIngredients",
    );

    window.localStorage.setItem(
      "refreshToken",
      JSON.stringify("test-refreshToken"),
    );
    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken"),
    );
  });

  after(() => {
    window.localStorage.removeItem("refreshToken");
    window.localStorage.removeItem("accessToken");
  });

  it("should be available on localhost:3000", () => {
    cy.visit("/");
  });
});
