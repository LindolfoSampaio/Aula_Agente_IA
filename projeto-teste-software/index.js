const express = require('express');

// Funções para testes unitários
function somar(a, b) {
  return a + b;
}

function calcularMedia(n1, n2) {
  return (n1 + n2) / 2;
}

function verificarAprovacao(media) {
  return media >= 7 ? 'Aprovado' : 'Reprovado';
}

function validarNome(nome) {
  if (!nome || typeof nome !== 'string') return false;
  return nome.trim().length >= 3;
}

// API em memória para alunos
const app = express();
app.use(express.json());

let alunos = [];
let nextId = 1;

app.get('/', (req, res) => res.json({ status: 'ok' }));

app.get('/alunos', (req, res) => res.json(alunos));

app.get('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const a = alunos.find(x => x.id === id);
  if (!a) return res.status(404).json({ error: 'Aluno não encontrado' });
  res.json(a);
});

app.post('/alunos', (req, res) => {
  const { nome, idade } = req.body;
  if (!validarNome(nome) || typeof idade !== 'number' || idade <= 0) {
    return res.status(400).json({ error: 'Dados inválidos' });
  }
  const aluno = { id: nextId++, nome: nome.trim(), idade };
  alunos.push(aluno);
  res.status(201).json(aluno);
});

app.put('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = alunos.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Aluno não encontrado' });
  const { nome, idade } = req.body;
  if (nome && !validarNome(nome)) return res.status(400).json({ error: 'Nome inválido' });
  if (idade && (typeof idade !== 'number' || idade <= 0)) return res.status(400).json({ error: 'Idade inválida' });
  if (nome) alunos[idx].nome = nome.trim();
  if (idade) alunos[idx].idade = idade;
  res.json(alunos[idx]);
});

app.delete('/alunos/:id', (req, res) => {
  const id = Number(req.params.id);
  const idx = alunos.findIndex(x => x.id === id);
  if (idx === -1) return res.status(404).json({ error: 'Aluno não encontrado' });
  const removed = alunos.splice(idx, 1)[0];
  res.json(removed);
});

app.post('/reset', (req, res) => {
  alunos = [];
  nextId = 1;
  res.json({ status: 'reset' });
});

if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Servidor rodando em http://localhost:${port}`));
}

module.exports = { somar, calcularMedia, verificarAprovacao, validarNome, app, reset: () => { alunos = []; nextId = 1; } };
