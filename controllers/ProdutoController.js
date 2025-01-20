import Produto from '../models/Produto.js';

async function index(req, res) {

    const produtos = await Produto.findAll({
        order: [['descricao', 'ASC']],
        where:{
            status: 1,
        }
    });

    res.render('produto/index', {produtos: produtos});

    // Produto.findAll({
    //     order: [['descricao', 'ASC']],
    //     where:{
    //         status: 1,
    //     }
    // }).then(function (produtos){
    //     res.render('produto/index', {produtos: produtos});
    // })
}

function cadastro(req, res) {
    var produto = {
        descricao: req.body.descricao,
        preco: req.body.preco,
        estoque: req.body.estoque,
        status: 1,
        foto: '/img/produto.png',
    }

    Produto.create(produto).then(function (produto){
        req.flash('success_msg', 'Produto cadastrado com sucesso!')
        res.redirect('/produto')
    })
}

function editar(req, res) {
    Produto.findOne({
        where:{
            id: req.params.id,
        }
    }).then(function (produto){
        res.render('produto/editar', {produto: produto});
    })
}

function salvar(req, res) {
    var produto = {
        preco: req.body.preco,
        estoque: req.body.estoque,
        descricao: req.body.descricao,
    }
    console.log('ID: '+req.body.id)
    Produto.update(produto, {
        where: {
            id: req.body.id
        }
    }).then(function (produto){
        req.flash('success_msg', 'Produto editado com sucesso!')
        res.redirect('/produto')
    })
}

function excluir(req, res) {
    var produto = {
        status: 0
    }
    Produto.update(produto, {
        where:{
            id: req.params.id,
        }
    }).then(function (produto){
        req.flash('success_msg', 'Produto removido com sucesso!')
        res.redirect('/produto')
    })
}

export default {index, cadastro, editar, salvar, excluir}