
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


let pessoas = [
    {
        id: 1,
        nome: 'Paloma',
        idade: 18,
        email: 'paloma@email.com',
        telefone: '61900010002'
    }
];


app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});


app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) {
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    res.json(pessoa);
});


app.post('/pessoas', (req, res) => {
    const novaPessoa = req.body;
    novaPessoa.id = pessoas.length + 1;
    pessoas.push(novaPessoa);
    res.status(201).json(novaPessoa);
});


app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoaIndex = pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) {
        return res.status(404).json({ message: 'Pessoa não encontrada' });
    }
    const pessoaAtualizada = req.body;
    pessoas[pessoaIndex] = { ...pessoas[pessoaIndex], ...pessoaAtualizada };
    res.json(pessoas[pessoaIndex]);
});


app.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pessoas = pessoas.filter(p => p.id !== id);
    res.json({ message: 'Pessoa removida com sucesso' });
});


app.listen(PORT, () => {
    console.log(`Servidor funcionando na porta ${PORT}`);
});
