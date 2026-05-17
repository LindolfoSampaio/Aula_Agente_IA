# Aula_Agente_IA

Projeto Node.js com integração à API da Groq e suíte de testes com Jest + Supertest.

## Configuração de ambiente

Edite o arquivo `.env`:

```env
GROQ_API_KEY=...
PORT=3001
```

- Gere sua chave em `https://console.groq.com/keys`.
- **Não** comite chave real no repositório.

## Instalação

```bash
npm install
```

## Executar aplicação

```bash
npm start
```

A API sobe em `http://localhost:3001` (ou porta definida em `PORT`).

Endpoint principal:
- `POST /chat`

## Rodar testes

Executar todos:

```bash
npm test
```

Executar por arquivo (mesmo padrão dos repositórios de referência):

```bash
npx jest tests/unit.test.js
npx jest tests/functional.test.js
npx jest tests/integration.test.js
npx jest tests/acceptance.test.js
npx jest tests/nonfunctional.test.js
npx jest tests/e2e.test.js
npx jest tests/automation.test.js
npx jest tests/tdd.test.js
npx jest tests/metrics.test.js
npx jest tests/agent.test.js
```
