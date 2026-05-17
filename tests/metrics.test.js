describe("Métricas de Teste", () => {
  test("MET-001: deve calcular percentual de aprovação", () => {
    const testesExecutados = 10;
    const testesAprovados = 9;
    const percentual = (testesAprovados / testesExecutados) * 100;

    expect(percentual).toBe(90);
  });

  test("MET-002: deve calcular total de testes reprovados", () => {
    const testesExecutados = 10;
    const testesAprovados = 8;

    expect(testesExecutados - testesAprovados).toBe(2);
  });
});
