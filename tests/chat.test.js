jest.mock('axios', () => ({
  post: jest.fn()
}));

const request = require('supertest');
const axios = require('axios');
const { app, resetSessions } = require('../server');

describe('Testes da rota /chat', () => {
  beforeEach(() => {
    resetSessions();
    axios.post.mockReset();
  });

  test('POST /chat deve responder com JSON contendo reply e sessionId', async () => {
    axios.post.mockResolvedValue({
      data: {
        choices: [
          { message: { content: 'Olá! Posso ajudar.' } }
        ]
      }
    });

    const response = await request(app)
      .post('/chat')
      .send({ message: 'Oi' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('reply');
    expect(response.body).toHaveProperty('sessionId');
    expect(typeof response.body.reply).toBe('string');
  });

  test('POST /chat deve manter a mesma sessão quando sessionId é enviado', async () => {
    axios.post
      .mockResolvedValueOnce({
        data: {
          choices: [
            { message: { content: 'Primeira resposta' } }
          ]
        }
      })
      .mockResolvedValueOnce({
        data: {
          choices: [
            { message: { content: 'Segunda resposta' } }
          ]
        }
      });

    const first = await request(app)
      .post('/chat')
      .send({ message: 'Oi' });

    const second = await request(app)
      .post('/chat')
      .send({ message: 'Tudo bem?', sessionId: first.body.sessionId });

    expect(second.status).toBe(200);
    expect(second.body.sessionId).toBe(first.body.sessionId);
    expect(second.body.reply).toBe('Segunda resposta');
  });
});
