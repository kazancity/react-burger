const modalSelector = '[data-testid="modal"]';

beforeEach(() => {
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

  cy.visit("/");
});

afterEach(() => {
  window.localStorage.removeItem("refreshToken");
  window.localStorage.removeItem("accessToken");
});

describe("ingredient details in a modal window", () => {
  beforeEach(() => {
    cy.get('[data-testid="ingredient-group"]').as("group");
  });

  it("the modal should be opened and closed correctly", () => {
    cy.get("@group").contains("Краторная булка N-200i").should("exist").click();
    cy.get(modalSelector).should("exist");
    cy.get('[data-testid="modal-close"]').should("exist").click();
    cy.get(modalSelector).should("not.exist");
  });

  it("the URL and content of the modal should be correct", () => {
    cy.get("@group").contains("Краторная булка N-200i").should("exist").click();
    cy.url().should("contain", "ingredients/643d69a5c3f7b9001cfa093c");
    cy.get(modalSelector)
      .should("contain.text", "Детали ингредиента")
      .and(
        "contain.text",
        "Краторная булка N-200iКалории, ккал420Белки, г80Жиры, г24Углеводы, г53",
      );
  });
});

describe("adding an ingredient to the constructor", () => {
  it("adding bun works correctly", () => {
    cy.addIngredient("Краторная булка N-200i");
    cy.get('[data-testid="constructor-item-bun"]:first')
      .contains("Краторная булка N-200i (верх)")
      .should("exist");
    cy.get('[data-testid="constructor-item-bun"]:last')
      .contains("Краторная булка N-200i (низ)")
      .should("exist");
  });

  it("adding ingredient works correctly", () => {
    cy.addIngredient("Соус Spicy-X");
    cy.get('[data-testid="constructor-drop-target"]')
      .contains("Соус Spicy-X")
      .should("exist");
  });
});

describe("creating an order", () => {
  before(() => {
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as(
      "sendOrder",
    );
  });

  it("order creation works correctly", () => {
    cy.addIngredient("Краторная булка N-200i");
    cy.addIngredient("Соус традиционный галактический");
    cy.addIngredient("Мясо бессмертных моллюсков Protostomia");
    cy.addIngredient("Плоды Фалленианского дерева");
    cy.addIngredient("Хрустящие минеральные кольца");
    cy.addIngredient("Хрустящие минеральные кольца");
    cy.addIngredient("Хрустящие минеральные кольца");

    cy.get("button").contains("Оформить заказ").click();
    cy.get("[data-testid=order-number]").contains("12345").should("exist");
  });
});
