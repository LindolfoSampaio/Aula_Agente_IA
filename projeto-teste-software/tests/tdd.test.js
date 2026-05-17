const { verificarAprovacao } = require('../index');

describe('TDD — Test Driven Development', () => {
  test('exemplo TDD: média 6.9 deve ser Reprovado', () => {
    expect(verificarAprovacao(6.9)).toBe('Reprovado');
  });
});
