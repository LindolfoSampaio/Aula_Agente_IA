const { tools } = require("../index");

describe("Automação de Testes", () => {
  test("AUT-001: automação deve validar soma", () => {
    expect(tools.calculate("10+5")).toBe("15");
  });

  test("AUT-002: automação deve validar multiplicação", () => {
    expect(tools.calculate("10*8")).toBe("80");
  });
});
