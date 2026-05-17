const request = require("supertest");
const axios = require("axios");
const { app } = require("../index");

jest.mock("axios");

describe("Teste Não Funcional", () => {
  test("TNF-001: /chat deve responder em menos de 1 segundo", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "ok" } }] }
    });

    const inicio = Date.now();
    const resposta = await request(app).post("/chat").send({ message: "teste" });
    const tempoResposta = Date.now() - inicio;

    expect(resposta.statusCode).toBe(200);
    expect(tempoResposta).toBeLessThan(1000);
  });

  test("TNF-002: resposta deve ser JSON", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "json" } }] }
    });

    const resposta = await request(app).post("/chat").send({ message: "json?" });

    expect(resposta.headers["content-type"]).toMatch(/json/);
  });
});
