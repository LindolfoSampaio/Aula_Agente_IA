const { somar, calcularMedia, verificarAprovacao, validarNome } = require('../index');

describe('Teste Unitário', () => {
  test('soma dois números', () => {
    expect(somar(2, 3)).toBe(5);
  });

  test('calcula média', () => {
    expect(calcularMedia(7, 9)).toBe(8);
  });

  test('verificar aprovação', () => {
    expect(verificarAprovacao(7)).toBe('Aprovado');
    expect(verificarAprovacao(6.9)).toBe('Reprovado');
  });

  test('validar nome', () => {
    expect(validarNome('João')).toBe(true);
    expect(validarNome('Al')).toBe(false);
  });
});
