const request = require('supertest');
const { app, reset } = require('../index');

describe('Teste de Integração', () => {
  beforeEach(() => reset());

  test('POST /alunos e GET /alunos', async () => {
    const aluno = { nome: 'Maria', idade: 20 };
    const post = await request(app).post('/alunos').send(aluno);
    expect(post.status).toBe(201);
    const list = await request(app).get('/alunos');
    expect(Array.isArray(list.body)).toBe(true);
    expect(list.body.length).toBe(1);
    expect(list.body[0].nome).toBe('Maria');
  });
});
