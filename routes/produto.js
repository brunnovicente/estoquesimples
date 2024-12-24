import express from 'express'
const router = express.Router()
import ProdutoController from "../controllers/ProdutoController.js"

router.get('/', ProdutoController.index)
router.get('/cadastro', (req, res) => {res.render('produto/cadastro')})
router.post('/cadastro', ProdutoController.cadastro)
router.get('/editar/:id', ProdutoController.editar)
router.post('/salvar', ProdutoController.salvar)
router.get('/excluir/:id', ProdutoController.excluir)

export default router