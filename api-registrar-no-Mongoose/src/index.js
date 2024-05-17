const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());

// Conexão ao MongoDB
mongoose.connect('mongodb://localhost:27017/simpleCrud', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Definição do modelo Mongoose
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
});

const Person = mongoose.model('Person', personSchema);

// Rotas CRUD

// Criar uma nova pessoa
app.post('/api/persons', async (req, res) => {
    try {
        const person = new Person(req.body);
        await person.save();
        res.status(201).send(person);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao criar pessoa', error });
    }
});

// Obter todas as pessoas
app.get('/api/persons', async (req, res) => {
    try {
        const persons = await Person.find();
        res.status(200).send(persons);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter pessoas', error });
    }
});

// Obter uma pessoa por ID
app.get('/api/persons/:id', async (req, res) => {
    try {
        const person = await Person.findById(req.params.id);
        if (!person) {
            return res.status(404).send({ message: 'Pessoa não encontrada' });
        }
        res.status(200).send(person);
    } catch (error) {
        res.status(500).send({ message: 'Erro ao obter pessoa', error });
    }
});

// Atualizar uma pessoa por ID
app.put('/api/persons/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!person) {
            return res.status(404).send({ message: 'Pessoa não encontrada' });
        }
        res.status(200).send(person);
    } catch (error) {
        res.status(400).send({ message: 'Erro ao atualizar pessoa', error });
    }
});

// Deletar uma pessoa por ID
app.delete('/api/persons/:id', async (req, res) => {
    try {
        const person = await Person.findByIdAndDelete(req.params.id);
        if (!person) {
            return res.status(404).send({ message: 'Pessoa não encontrada' });
        }
        res.status(200).send({ message: 'Pessoa deletada com sucesso' });
    } catch (error) {
        res.status(500).send({ message: 'Erro ao deletar pessoa', error });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log("Servidor rodando na porta ${PORT}");
});