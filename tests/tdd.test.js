const { tools } = require("../index");

describe("TDD — Test Driven Development", () => {
  test("TDD-001: expressão inválida deve retornar erro", () => {
    expect(tools.calculate("1+")).toBe("Erro ao calcular");
  });

  test("TDD-002: expressão válida deve retornar resultado", () => {
    expect(tools.calculate("10/2")).toBe("5");
  });
});
