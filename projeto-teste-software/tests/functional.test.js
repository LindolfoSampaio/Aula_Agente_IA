const request = require('supertest');
const { app, reset } = require('../index');

describe('Teste Funcional', () => {
  beforeEach(() => reset());

  test('rota root responde status ok', async () => {
    const res = await request(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
  });

  test('bloqueia cadastro inválido', async () => {
    const res = await request(app).post('/alunos').send({ nome: 'Al', idade: -1 });
    expect(res.status).toBe(400);
  });
});
