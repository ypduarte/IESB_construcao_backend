const Atividade = require('../models/Atividade')

async function create(req, res) {
    const atividade = new Atividade(req.body)
    const atividadeCriado = await atividade.save()
    res.status(201).json(atividadeCriado)
}

async function getAll(req, res) {
    res.json(await Atividade.find().populate(['membro', 'performance']))
}

async function getById(req, res) {
    const atividade = await Atividade.findById(req.params.id).populate(['membro', 'performance'])
    if (atividade) {
        res.json(atividade)
    } else {
        res.status(404).json({ mensagem: "Atividade não encontrato!" })
    }
}

async function update(req, res) {
    const atividadeAtulizado = await Atividade.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (atividadeAtulizado) {
        res.json(atividadeAtulizado)
    } else {
        res.status(404).json({ mensagem: "Atividade não encontrato!" })
    }

}

async function remove(req, res) {
    const atividadeExcluido = await Atividade.findByIdAndDelete(req.params.id)
    if (atividadeExcluido) {
        res.json({
            mensagem: "Atividade excluido com sucesso!",
            atividadeExcluido
        })
    } else {
        res.status(404).json({ mensagem: "Atividade não encontrato!" })
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}