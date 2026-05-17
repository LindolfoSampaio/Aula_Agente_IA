const request = require("supertest");
const axios = require("axios");
const { app } = require("../index");

jest.mock("axios");

describe("Teste Funcional", () => {
  test("TF-001: POST /chat deve responder com reply e sessionId", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "Olá! Eu sou seu agente." } }] }
    });

    const resposta = await request(app).post("/chat").send({ message: "Olá" });

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body).toHaveProperty("reply");
    expect(resposta.body).toHaveProperty("sessionId");
  });
});
