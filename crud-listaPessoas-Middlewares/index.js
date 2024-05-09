// imports
const express = require('express');
const app = express();
const PORT = 3000;

// Middleware para permitir o uso do JSON no corpo das requisições
app.use(express.json());

// Rota inicial
app.get('/', (req, res) => {
  res.send('API de pessoas');
});

// Estrutura inicial de dados (array de pessoas)
let pessoas = [
    {
      id: 1,
      nome: "João",
      idade: 20,
      email: "joao@email.com",
      telefone: "61900010002"
    },

    {
        id: 2,
        nome: "Anne",
        idade: 16,
        email: "anne16@email.com",
        telefone: "6199854714"
      },

      {
        id: 3,
        nome: "Fernanda",
        idade: 26,
        email: "fernanda@email.com",
        telefone: "61900018522"
      },

      {
        id: 4,
        nome: "Adna",
        idade: 30,
        email: "adna30@email.com",
        telefone: "61914518522"
    }
      
    
  ];
  
  // Middleware para validar se todos os atributos estão preenchidos
  function validarAtributos(req, res, next) {
    const { nome, idade, email, telefone } = req.body;
    if (!nome || !idade || !email || !telefone) {
      return res.status(400).json({ mensagem: 'Todos os atributos devem ser preenchidos.' });
    }
    next();
  }
  
  // Rotas CRUD para pessoas
  app.get('/pessoas', (req, res) => {
    res.json(pessoas);
  });
  
  app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }
    res.json(pessoa);
  });
  
  app.post('/pessoas', validarAtributos, (req, res) => {
    const { nome, idade, email, telefone } = req.body;
    const id = pessoas.length + 1;
    const novaPessoa = { id, nome, idade, email, telefone };
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
  });
  
  app.put('/pessoas/:id', validarAtributos, (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }
    const { nome, idade, email, telefone } = req.body;
    pessoas[index] = { id, nome, idade, email, telefone };
    res.json(pessoas[index]);
  });
  
  app.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const index = pessoas.findIndex(p => p.id === id);
    if (index === -1) {
      return res.status(404).json({ mensagem: 'Pessoa não encontrada.' });
    }
    const pessoaRemovida = pessoas.splice(index, 1)[0];
    res.json(pessoaRemovida);
  });
  
// Inicie o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
