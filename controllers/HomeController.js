import Produto from "../models/Produto.js"
import {Op} from "sequelize"

function index(req, res) {
    Produto.findAll().then(function (produtos){
        res.render('home/index', {produtos: produtos, layout: 'home'});
    })
}

function buscar(req, res) {
    Produto.findAll({
        where:{
            descricao: {
                [Op.like]: '%'+req.body.busca+'%'
            }
        }
    }).then(function (produtos){
        res.render('home/index', {produtos: produtos, layout: 'home'});
    })
}

function produto(req, res) {
    Produto.findOne({
        where:{
            id: req.params.id,
        }
    }).then(function (produto){
        res.render('home/produto', {produto: produto, layout: 'home'});
    })
}

export default {index, buscar, produto}