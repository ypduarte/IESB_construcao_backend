const Grupo = require('../models/Grupo')

async function buscarTodos(req, res) {
    res.json(await Grupo.find())
}

async function buscarPorID(req, res) {
    const grupo = await Grupo.findById(req.params.id)
    if (grupo) {
        res.json(grupo)
    } else {
        res.status(404).json({ mensagem: "Grupo não encontrado!" })
    }
}

async function criar(req, res) {
    const grupo = new Grupo(req.body)
    const grupoCriado = await grupo.save()
    res.status(201).json(grupoCriado)
}

async function atualizar(req, res) {
    const grupoAtualizado = await Grupo.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (grupoAtualizado) {
        res.json(
            {
                mensagem: "Grupo atualizado com sucesso!",
                grupoAtualizado
            }
        )
    } else {
        res.status(404).json({ mensagem: "Grupo não encontrado!" })
    }
}

async function excluir(req, res) {
    const grupoExcluido = await Grupo.findByIdAndDelete(req.params.id)
    if (grupoExcluido) {
        res.json(
            {
                mensagem: "Grupo excluido com sucesso!",
                grupoExcluido
            }
        )
    } else {
        res.status(404).json({ mensagem: "Grupo não encontrado!" })
    }
}


module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
}