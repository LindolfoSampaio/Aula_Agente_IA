const request = require("supertest");
const axios = require("axios");
const { app } = require("../index");

jest.mock("axios");

describe("Teste de Integração", () => {
  test("TI-001: deve manter sessão ao reenviar sessionId", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "Primeira resposta" } }] }
    });

    const primeira = await request(app).post("/chat").send({ message: "Oi" });

    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "Segunda resposta" } }] }
    });

    const segunda = await request(app).post("/chat").send({
      message: "Você lembra?",
      sessionId: primeira.body.sessionId
    });

    expect(segunda.statusCode).toBe(200);
    expect(segunda.body.sessionId).toBe(primeira.body.sessionId);
  });
});
