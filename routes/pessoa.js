import express from "express";
const router = express.Router();
import PessoaController from "../controllers/PessoaController.js";
import {logado} from '../config/acl.js'

router.get('/', logado, PessoaController.index);
router.get('/cadastro', (req, res) => res.render('pessoa/cadastro', {layout: 'home'}));
router.post('/cadastro', PessoaController.cadastro);

export default router;