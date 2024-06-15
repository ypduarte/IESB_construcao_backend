const express = require('express')
const router = express.Router()

// controllers
const FunçãoController = require('../controllers/FunçãoController')
const GrupoController = require('../controllers/GrupoController')
const MembroController = require('../controllers/MembroController')
const PerformanceController = require('../controllers/PerformanceController')
const AtividadeController = require('../controllers/AtividadeController')

// validators
const { validarID } = require('../validators/IdValidator')
const { validarFunção } = require('../validators/FunçãoValidator')
const { validarGrupo } = require('../validators/GrupoValidator')
const { validarMembro } = require('../validators/MembroValidator')
const { performanceValidador } = require('../validators/PerformanceValidator')
const { atividadeValidador } = require('../validators/AtividadeValidator')

// Função
router.get('/funcao', FunçãoController.buscarTodos)
router.get('/funcao/:id', validarID, FunçãoController.buscarPorID)
router.post('/funcao', validarFunção, FunçãoController.criar)
router.put('/funcao/:id', validarID, validarFunção, FunçãoController.atualizar)
router.delete('/funcao/:id', validarID, FunçãoController.excluir)


// Grupos
router.get('/grupos', GrupoController.buscarTodos)
router.get('/grupos/:id', validarID, GrupoController.buscarPorID)
router.post('/grupos', validarGrupo, GrupoController.criar)
router.put('/grupos/:id', validarID, validarGrupo, GrupoController.atualizar)
router.delete('/grupos/:id', validarID, GrupoController.excluir)

// Membros
router.get('/membros', MembroController.buscarTodos)
router.get('/membros/:id', validarID, MembroController.buscarPorID)
router.post('/membros', validarMembro, MembroController.criar)
router.put('/membros/:id', validarID, validarMembro, MembroController.atualizar)
router.delete('/membros/:id', validarID, MembroController.excluir)

// Performances
router.post('/performances', performanceValidador, PerformanceController.create)
router.get('/performances', PerformanceController.getAll)
router.get('/performances/:id', validarID, PerformanceController.getById)
router.put('/performances/:id', validarID, performanceValidador, PerformanceController.update)
router.delete('/performances/:id', validarID, PerformanceController.remove)

// Atividades
router.post('/atividades', atividadeValidador, AtividadeController.create)
router.get('/atividades', AtividadeController.getAll)
router.get('/atividades/:id', validarID, AtividadeController.getById)
router.put('/atividades/:id', validarID, atividadeValidador, AtividadeController.update)
router.delete('/atividades/:id', validarID, AtividadeController.remove)



module.exports = router