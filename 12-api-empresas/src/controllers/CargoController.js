const Cargo = require('../models/Cargo')

async function buscartodos(req, res) {
    res.json(Cargo.find())
}

async function buscarPorID(req, res){
    const cargo = Cargo.findById(req.params.id)
    if(cargo) {
        res.json(cargo) 
    } else {
        res.status(404).json({mensagem: "Cargo não encontrado"})
    }
}

async function criar(req, res) {
   const cargo = new Cargo(req.body)
   const cargoCriado = await cargo.save()
   res.status(201).json(cargoCriado)
}















module.exports = {
    criar
}