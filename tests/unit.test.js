const { tools } = require('../server');

describe('Testes unitários das tools do agente', () => {
  test('calculate deve somar 2 + 2 e retornar 4', () => {
    expect(tools.calculate('2 + 2')).toBe('4');
  });

  test('calculate deve multiplicar 5 * 3 e retornar 15', () => {
    expect(tools.calculate('5 * 3')).toBe('15');
  });

  test('calculate deve retornar erro para expressão inválida', () => {
    expect(tools.calculate('2 + ')).toBe('Erro ao calcular');
  });

  test('getTime deve retornar uma string com data e hora', () => {
    expect(typeof tools.getTime()).toBe('string');
    expect(tools.getTime().length).toBeGreaterThan(0);
  });
});
