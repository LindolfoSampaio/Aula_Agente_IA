describe('Métricas de Teste (simuladas)', () => {
  test('calcula porcentagem de aprovação', () => {
    const total = 10;
    const aprovados = 8;
    const percentual = Math.round((aprovados / total) * 100);
    expect(percentual).toBe(80);
  });
});
