import express from 'express'
const router = express.Router()
import ProdutoController from "../controllers/ProdutoController.js"

router.get('/', ProdutoController.index)
router.get('/cadastro', (req, res) => {res.render('produto/cadastro')})
router.post('/cadastro', ProdutoController.cadastro)

export default router