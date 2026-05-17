const request = require('supertest');
const { app, reset } = require('../index');

describe('Teste de Aceitação', () => {
  beforeEach(() => reset());

  test('cadastrar um aluno válido', async () => {
    const aluno = { nome: 'Carlos', idade: 22 };
    const res = await request(app).post('/alunos').send(aluno);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.nome).toBe('Carlos');
  });
});
