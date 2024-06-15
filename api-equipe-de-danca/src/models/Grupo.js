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
    },
    { timestamps: true })

const Grupo = mongoose.model('grupo', schema)

module.exports = Grupo
