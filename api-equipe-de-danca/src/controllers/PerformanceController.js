const Performance = require('../models/Performance')

async function create(req, res) {
    const performance = new Performance(req.body)
    const performanceCriado = await performance.save()
    res.status(201).json(performanceCriado)
}

async function getAll(req, res) {
    res.json(await Performance.find())
}

async function getById(req, res) {
    const performance = await Performance.findById(req.params.id)
    if (performance) {
        res.json(performance)
    } else {
        res.status(404).json({ mensagem: "Performance não encontrato!" })
    }
}

async function update(req, res) {
    const performanceAtulizado = await Performance.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (performanceAtulizado) {
        res.json(performanceAtulizado)
    } else {
        res.status(404).json({ mensagem: "Performance não encontrato!" })
    }

}

async function remove(req, res) {
    const performanceExcluido = await Performance.findByIdAndDelete(req.params.id)
    if (performanceExcluido) {
        res.json({
            mensagem: "Performance excluido com sucesso!",
            performanceExcluido
        })
    } else {
        res.status(404).json({ mensagem: "Performance não encontrato!" })
    }
}


module.exports = {
    create,
    getAll,
    getById,
    update,
    remove
}