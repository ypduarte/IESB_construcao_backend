const express = require('express');
const app = express ();
app.use(express.json());

let pessoas = [
    { id: 1, nome: 'Paloma', idade: 19, email: 'paloma@gmail.com', telefone: '61989735676' }
];

app.get('/pessoas', (req, res) => {
    res.json(pessoas);
});

app.get('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoa = pessoas.find(p => p.id === id);
    if (!pessoa) {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    } else {
        res.json(pessoa);
    }
});

app.post('/pessoas', (req, res) => {
    const pessoa = req.body;
    if (!pessoa.nome || !pessoa.idade || !pessoa.email || !pessoa.telefone) {
        res.status(400).json({ error: 'Todos os atributos devem ser preenchidos' });
    } else {
        pessoa.id = pessoas.length + 1;
        pessoas.push(pessoa);
        res.status(201).json(pessoa);
    }
});

app.put('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const pessoaIndex = pessoas.findIndex(p => p.id === id);
    if (pessoaIndex === -1) {
        res.status(404).json({ error: 'Pessoa não encontrada' });
    } else {
        const pessoa = req.body;
        if (!pessoa.nome || !pessoa.idade || !pessoa.email || !pessoa.telefone) {
            res.status(400).json({ error: 'Todos os atributos devem ser preenchidos' });
        } else {
            pessoas[pessoaIndex] = { ...pessoa, id };
            res.json(pessoas[pessoaIndex]);
        }
    }
});

app.delete('/pessoas/:id', (req, res) => {
    const id = parseInt(req.params.id);
    pessoas = pessoas.filter(p => p.id !== id);
    res.status(204).end();
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server rodando na porta ${PORT}`);
});