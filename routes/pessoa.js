import express from "express";
const router = express.Router();
import PessoaController from "../controllers/PessoaController.js";

router.get('/', PessoaController.index);
router.get('/cadastro', (req, res) => res.render('pessoa/cadastro'));
router.post('/cadastro', PessoaController.cadastro);

export default router;