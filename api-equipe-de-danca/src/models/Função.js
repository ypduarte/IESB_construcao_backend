const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        nome: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: false
        },
        salario: {
            type: Number,
            required: true
        }
    },
    { timestamps: true })

const Função = mongoose.model('função', schema)

module.exports = Função
