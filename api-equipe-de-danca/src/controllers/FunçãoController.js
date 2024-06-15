const Função = require('../models/Função')

async function buscarTodos(req, res) {
    res.json(await Função.find())
}

async function buscarPorID(req, res) {
    const função = await Função.findById(req.params.id)
    if (função) {
        res.json(função)
    } else {
        res.status(404).json({ mensagem: "Função não encontrado!" })
    }
}

async function criar(req, res) {
    const função = new Função(req.body)
    const funçãoCriado = await função.save()
    res.status(201).json(funçãoCriado)
}

async function atualizar(req, res) {
    const funçãoAtualizado = await Função.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (funçãoAtualizado) {
        res.json(
            {
                mensagem: "Função atualizado com sucesso!",
                funçãoAtualizado
            }
        )
    } else {
        res.status(404).json({ mensagem: "Função não encontrado!" })
    }
}

async function excluir(req, res) {
    const funçãoExcluido = await Função.findByIdAndDelete(req.params.id)
    if (funçãoExcluido) {
        res.json(
            {
                mensagem: "Função excluido com sucesso!",
                funçãoExcluido
            }
        )
    } else {
        res.status(404).json({ mensagem: "Função não encontrado!" })
    }
}


module.exports = {
    buscarTodos,
    buscarPorID,
    criar,
    atualizar,
    excluir
}