import Produto from '../models/Produto.js';

function index(req, res) {
    Produto.findAll().then(function (produtos){
        console.dir(produtos)
        res.render('produto/index', {produtos: produtos});
    })
}

function cadastro(req, res) {
    var produto = {
        descricao: req.body.descricao,
        preco: req.body.preco,
        estoque: req.body.estoque,
        status: 1,
        foto: '/img/produtos.png',
    }

    Produto.create(produto).then(function (produto){
        req.flash('success_msg', 'Produto cadastrado com sucesso!')
        res.redirect('/produto')
    })
}

export default {index, cadastro}