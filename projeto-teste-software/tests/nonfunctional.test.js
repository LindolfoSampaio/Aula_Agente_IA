const request = require('supertest');
const { app, reset } = require('../index');

describe('Teste Não Funcional', () => {
  beforeEach(() => reset());

  test('rota /alunos responde em menos de 1 segundo', async () => {
    const start = Date.now();
    const res = await request(app).get('/alunos');
    const delta = Date.now() - start;
    expect(res.status).toBe(200);
    expect(delta).toBeLessThan(1000);
  });
});
