import Produto from "../models/Produto.js"
import {Op} from "sequelize"

async function index(req, res) {
    const produtos = await Produto.findAll()
    res.render('home/index', {produtos: produtos, layout: 'home'})
}

async function buscar(req, res) {
    const produtos = await Produto.findAll({
        where:{
            descricao: {
                [Op.like]: '%'+req.body.busca+'%'
            }
        }
    })
    res.render('home/index', {produtos: produtos, layout: 'home'});
}

async function produto(req, res) {
    const produto = await Produto.findOne({
        where:{
            id: req.params.id,
        }
    })
    res.render('home/produto', {produto: produto, layout: 'home'});
}

export default {index, buscar, produto}