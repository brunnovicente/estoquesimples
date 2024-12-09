import express from 'express'
const router = express.Router()
import PrincipalController from "../controllers/PrincipalController.js"

router.get('/', PrincipalController.index)

export default router