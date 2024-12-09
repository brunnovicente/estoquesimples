import express from 'express'
const router = express.Router()
import HomeController from "../controllers/HomeController.js"

router.get('/', HomeController.index)
router.post('/', HomeController.buscar)
router.get('/produto/:id', HomeController.produto)

export default router