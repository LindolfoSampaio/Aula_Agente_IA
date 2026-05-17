require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(cors());
app.use(express.json());

const sessions = {};

function evaluateExpression(expression) {
  if (typeof expression !== "string" || !/^[\d+\-*/().\s]+$/.test(expression)) {
    throw new Error("Expressão inválida");
  }

  const tokens = expression.replace(/\s+/g, "").match(/\d+(?:\.\d+)?|[()+\-*/]/g);
  if (!tokens || tokens.join("") !== expression.replace(/\s+/g, "")) {
    throw new Error("Expressão inválida");
  }

  const output = [];
  const operators = [];
  const precedence = { "+": 1, "-": 1, "*": 2, "/": 2 };

  for (let i = 0; i < tokens.length; i += 1) {
    const token = tokens[i];
    const prev = tokens[i - 1];

    if (/^\d/.test(token)) {
      output.push(Number(token));
      continue;
    }

    if (token === "(") {
      operators.push(token);
      continue;
    }

    if (token === ")") {
      while (operators.length && operators[operators.length - 1] !== "(") {
        output.push(operators.pop());
      }
      if (operators.pop() !== "(") {
        throw new Error("Expressão inválida");
      }
      continue;
    }

    if (
      token === "-" &&
      (i === 0 || prev === "(" || ["+", "-", "*", "/"].includes(prev))
    ) {
      output.push(0);
    }

    while (
      operators.length &&
      operators[operators.length - 1] !== "(" &&
      precedence[operators[operators.length - 1]] >= precedence[token]
    ) {
      output.push(operators.pop());
    }
    operators.push(token);
  }

  while (operators.length) {
    const op = operators.pop();
    if (op === "(" || op === ")") {
      throw new Error("Expressão inválida");
    }
    output.push(op);
  }

  const stack = [];
  for (const item of output) {
    if (typeof item === "number") {
      stack.push(item);
      continue;
    }

    const b = stack.pop();
    const a = stack.pop();
    if (typeof a !== "number" || typeof b !== "number") {
      throw new Error("Expressão inválida");
    }

    if (item === "+") stack.push(a + b);
    if (item === "-") stack.push(a - b);
    if (item === "*") stack.push(a * b);
    if (item === "/") stack.push(a / b);
  }

  if (stack.length !== 1 || Number.isNaN(stack[0])) {
    throw new Error("Expressão inválida");
  }

  return String(stack[0]);
}

const tools = {
  getTime: () => {
    return new Date().toLocaleString();
  },
  calculate: (expression) => {
    try {
      return evaluateExpression(expression);
    } catch {
      return "Erro ao calcular";
    }
  }
};

const SYSTEM_PROMPT = `
Você é um Agente de IA inteligente.

Você pode:
- Conversar naturalmente
- Usar ferramentas quando necessário

TOOLS DISPONÍVEIS:
1. getTime → retorna horário atual
2. calculate(expression) → faz cálculos

Quando precisar usar uma ferramenta, responda no formato:
TOOL: nome_da_tool | argumento

Exemplo:
TOOL: calculate | 2+2

Caso contrário, responda normalmente.
`;

app.post("/chat", async (req, res) => {
  const { message, sessionId } = req.body;
  const id = sessionId || uuidv4();

  if (!sessions[id]) {
    sessions[id] = [{ role: "system", content: SYSTEM_PROMPT }];
  }

  sessions[id].push({ role: "user", content: message });

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: sessions[id]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    let reply = response.data.choices[0].message.content;

    if (reply.startsWith("TOOL:")) {
      const [, rest] = reply.split("TOOL:");
      const [toolName, arg] = rest.split("|").map((s) => s.trim());

      if (tools[toolName]) {
        const result = tools[toolName](arg);
        sessions[id].push({
          role: "assistant",
          content: `Resultado da tool ${toolName}: ${result}`
        });
        reply = `🛠️ Resultado: ${result}`;
      } else {
        reply = "Tool não encontrada";
      }
    } else {
      sessions[id].push({ role: "assistant", content: reply });
    }

    res.json({ reply, sessionId: id });
  } catch (err) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ error: "Erro no agente" });
  }
});

module.exports = { app, tools };
