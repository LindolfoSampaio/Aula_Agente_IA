const request = require('supertest');
const { app, reset } = require('../index');

describe('Teste E2E', () => {
  beforeEach(() => reset());

  test('fluxo completo: criar, listar, editar, consultar, excluir', async () => {
    // criar
    const create = await request(app).post('/alunos').send({ nome: 'Ana', idade: 19 });
    expect(create.status).toBe(201);
    const id = create.body.id;

    // listar
    const list = await request(app).get('/alunos');
    expect(list.body.find(a => a.id === id)).toBeTruthy();

    // editar
    const edit = await request(app).put(`/alunos/${id}`).send({ nome: 'Ana Silva' });
    expect(edit.status).toBe(200);
    expect(edit.body.nome).toBe('Ana Silva');

    // consultar
    const get = await request(app).get(`/alunos/${id}`);
    expect(get.status).toBe(200);

    // excluir
    const del = await request(app).delete(`/alunos/${id}`);
    expect(del.status).toBe(200);
  });
});
