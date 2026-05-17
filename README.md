# Aula Agente IA

Projeto educacional de um agente de IA com interface web e backend Node.js.

## 📋 Descrição

Sistema completo de agente de IA com:
- **Frontend**: Aplicação React/TypeScript com Vite
- **Backend**: Servidor Node.js
- **Testes**: Suite completa de testes automatizados

## 🚀 Estrutura do Projeto

```
Aula_Agente_IA/
├── server.js                    # Servidor backend
├── groq_test.ps1               # Script de teste Groq
├── jest.config.cjs             # Configuração Jest
├── package.json                # Dependências raiz
├── front/agente/               # Aplicação frontend
│   ├── src/                    # Código fonte React
│   ├── public/                 # Arquivos estáticos
│   ├── vite.config.ts         # Configuração Vite
│   └── package.json           # Dependências frontend
├── projeto-teste-software/     # Projeto de testes
│   └── tests/                 # Testes diversos
└── tests/                      # Testes da raiz
    ├── unit.test.js
    ├── chat.test.js
    └── tu-tf-reporter.cjs
```

## ⚙️ Instalação

### Pré-requisitos
- Node.js 16+
- npm ou yarn

### Setup

1. **Instalar dependências raiz**
```bash
npm install
```

2. **Instalar dependências do frontend**
```bash
cd front/agente
npm install
```

3. **Voltar para raiz**
```bash
cd ../..
```

## 🏃 Como Executar

### Backend
```bash
node server.js
```

### Frontend (desenvolvimento)
```bash
cd front/agente
npm run dev
```

### Build frontend (produção)
```bash
cd front/agente
npm run build
```

## 🧪 Testes

Executar todos os testes:
```bash
npm test
```

Testes disponíveis:
- **Unit Tests**: `tests/unit.test.js`
- **Chat Tests**: `tests/chat.test.js`
- **Testes de Software**:
  - Unit: `projeto-teste-software/tests/unit.test.js`
  - Integration: `projeto-teste-software/tests/integration.test.js`
  - E2E: `projeto-teste-software/tests/e2e.test.js`
  - Functional: `projeto-teste-software/tests/functional.test.js`
  - Acceptance: `projeto-teste-software/tests/acceptance.test.js`
  - TDD: `projeto-teste-software/tests/tdd.test.js`
  - E muito mais...

## 📦 Dependências Principais

- **React 18**: UI Framework
- **TypeScript**: Type safety
- **Vite**: Build tool rápido
- **Jest**: Testing framework
- **Node.js**: Runtime

## 🔧 Scripts Disponíveis

Na raiz:
```bash
npm test              # Executar testes
npm run dev          # Iniciar desenvolvimento
```

No frontend:
```bash
npm run dev          # Vite dev server
npm run build        # Build para produção
npm run preview      # Preview do build
npm run lint         # Linting com ESLint
```

## 📝 Notas

- O projeto usa TypeScript para melhor type safety
- ESLint configurado para manter código limpo
- Jest para testes automatizados
- Suporta testes de múltiplas camadas

## 👤 Autor

LindolfoSampaio

## 📄 Licença

MIT
