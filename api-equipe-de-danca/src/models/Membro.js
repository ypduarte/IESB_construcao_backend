const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        cpf: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        telefone: {
            type: String,
            required: true
        },
        dataContratacao: {
            type: Date,
            required: true
        },
        dataNascimento: {
            type: Date,
            required: true
        },
        genero: {
            type: String,
            required: true
        },
        endereco: {
            cep: String,
            uf: String,
            localidade: String,
            bairro: String,
            logradouro: String,
            numero: String,
            complemento: String
        },
        função: {
            type: mongoose.Types.ObjectId,
            ref: 'função',
            required: false
        },
        grupo: {
            type: mongoose.Types.ObjectId,
            ref: 'grupo',
            required: false
        },
    },
    { timestamps: true })

const Membro = mongoose.model('membro', schema)

module.exports = Membro
