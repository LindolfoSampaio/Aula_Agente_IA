const { somar, calcularMedia, verificarAprovacao } = require('../index');

describe('Automação de Testes', () => {
  test('soma e regras básicas', () => {
    expect(somar(1, 2)).toBe(3);
    expect(calcularMedia(5, 5)).toBe(5);
    expect(verificarAprovacao(8)).toBe('Aprovado');
  });
});
