import express from 'express'
const router = express.Router()
import ProdutoController from "../controllers/ProdutoController.js"
import {logado} from '../config/acl.js'

router.get('/', logado, ProdutoController.index)
router.get('/cadastro', logado, (req, res) => {res.render('produto/cadastro')})
router.post('/cadastro', logado, ProdutoController.cadastro)
router.get('/editar/:id', logado, ProdutoController.editar)
router.post('/salvar', logado, ProdutoController.salvar)
router.get('/excluir/:id', logado, ProdutoController.excluir)

export default router