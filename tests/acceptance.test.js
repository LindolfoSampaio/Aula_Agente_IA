const request = require("supertest");
const axios = require("axios");
const { app } = require("../index");

jest.mock("axios");

describe("Teste de Aceitação", () => {
  test("TA-001: deve executar tool calculate quando a IA solicitar", async () => {
    axios.post.mockResolvedValueOnce({
      data: { choices: [{ message: { content: "TOOL: calculate | 2+2" } }] }
    });

    const resposta = await request(app).post("/chat").send({ message: "quanto é 2+2?" });

    expect(resposta.statusCode).toBe(200);
    expect(resposta.body.reply).toBe("🛠️ Resultado: 4");
  });
});
