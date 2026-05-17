const { describe, test, expect } = require("@jest/globals");
const { tools } = require("../index");

describe("Teste Unitário", () => {
  test("TU-001: calculate deve somar 2 + 3", () => {
    expect(tools.calculate("2+3")).toBe("5");
  });

  test("TU-002: calculate deve retornar erro para expressão inválida", () => {
    expect(tools.calculate("2+")).toBe("Erro ao calcular");
  });

  test("TU-003: getTime deve retornar uma string", () => {
    expect(typeof tools.getTime()).toBe("string");
  });
});
