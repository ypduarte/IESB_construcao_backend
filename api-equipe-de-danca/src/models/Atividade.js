const mongoose = require('mongoose')

const schema = new mongoose.Schema(
    {
        titulo: {
            type: String,
            required: true
        },
        descricao: {
            type: String,
            required: false
        },
        dataInicio: {
            type: Date,
            required: false
        },
        dataFim: {
            type: Date,
            required: false
        },
        membro: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'membro',
            required: false
        },
        performance: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: 'performance',
            required: false
        }
    },
    {
        timestamps: true
    }
)

const Atividade = mongoose.model('atividade', schema)

module.exports = Atividade