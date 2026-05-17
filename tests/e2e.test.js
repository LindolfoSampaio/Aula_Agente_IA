const request = require("supertest");
const axios = require("axios");
const { app } = require("../index");

jest.mock("axios");

describe("Teste E2E — End-to-End", () => {
  test("E2E-001: iniciar conversa e continuar na mesma sessão", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "Olá, como posso ajudar?" } }] }
    });

    const primeira = await request(app).post("/chat").send({ message: "Oi" });
    expect(primeira.statusCode).toBe(200);

    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "Claro, lembro da sessão." } }] }
    });

    const segunda = await request(app).post("/chat").send({
      message: "Lembra de mim?",
      sessionId: primeira.body.sessionId
    });

    expect(segunda.statusCode).toBe(200);
    expect(segunda.body.sessionId).toBe(primeira.body.sessionId);
  });
});
