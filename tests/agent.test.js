const request = require("supertest");
const axios = require("axios");
const { app, tools } = require("../index");

jest.mock("axios");

describe("Testes unitários das tools do agente", () => {
  test("TU-001: calculate deve somar 2 + 2 e retornar 4", () => {
    expect(tools.calculate("2+2")).toBe("4");
  });

  test("TU-002: calculate deve retornar erro para expressão inválida", () => {
    expect(tools.calculate("10+")).toBe("Erro ao calcular");
  });

  test("TU-003: getTime deve retornar string", () => {
    expect(typeof tools.getTime()).toBe("string");
  });
});

describe("Testes da rota /chat", () => {
  test("TF-001: POST /chat deve responder com JSON contendo reply e sessionId", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "Resposta simulada" } }] }
    });

    const resposta = await request(app).post("/chat").send({ message: "Olá, quem é você?" });

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body).toHaveProperty("reply");
    expect(resposta.body).toHaveProperty("sessionId");
  });
});
