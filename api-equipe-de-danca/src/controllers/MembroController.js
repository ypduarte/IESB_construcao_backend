const Membro = require('../models/Membro')


async function buscarTodos(req, res) {
    res.json(await Membro.find().populate(['função', 'grupo']))
}

async function buscarPorID(req, res) {
    const membro = await Membro.findById(req.params.id).populate(['função', 'grupo'])
    if (membro) {
        res.json(membro)
    } else {
        res.status(404).json({ mensagem: "Membro não encontrado!" })
    }
}

async function criar(req, res) {
    const membro = new Membro(req.body)
    const membroCriado = await membro.save()
    res.status(201).json(membroCriado)
}

async function atualizar(req, res) {
    const membroAtualizado = await Membro.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (membroAtualizado) {
        res.json(
            {
                mensagem: "Membro atualizado com sucesso!",
                membroAtualizado
            }
        )
    } else {
        res.status(404).json({ mensagem: "Membro não encontrado!" })
    }
}


async function excluir(req, res) {
    const membroExcluido = await Membro.findByIdAndDelete(req.params.id)
    if (membroExcluido) {
        res.json(
            {
                mensagem: "Membro excluido com sucesso!",
                membroExcluido
            }
        )
    } else {
        res.status(404).json({ mensagem: "Membro não encontrado!" })
    }
}


module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
}