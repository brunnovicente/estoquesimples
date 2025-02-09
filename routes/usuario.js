import express from "express";
const router = express.Router();
import UsuarioController from "../controllers/UsuarioController.js";

router.get('/login', UsuarioController.acesso)
router.post('/login', UsuarioController.login)
router.get('/logout', UsuarioController.logout)
router.post('/alterarsenha', UsuarioController.alterarsenha)

export default router;