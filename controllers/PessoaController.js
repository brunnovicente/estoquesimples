import Pessoa from "../models/Pessoa.js";
import {Op} from "sequelize";

function index(req, res) {
    Pessoa.findAll({
        where:{
            status: 1
        },
        order:[['nome','asc']],
    }).then((pessoas) => {
        res.render('pessoa/index', {pessoas: pessoas});
    })
}

function cadastro(req, res) {
    Pessoa.findOne({
        where:{
            [Op.or]:[
                {cpf:req.body.cpf},
                {email:req.body.email}
            ]
        },
    }).then((pessoa) => {
        if (pessoa) {
            console.log('PESSOA BUSCADA: ')
            console.dir(pessoa)
            req.flash('error_msg', 'CPF ' + pessoa.cpf + ' ou Email '+pessoa.email+' Já cadastrado!')
            res.redirect('/pessoa/cadastro')
        }else{
            var novo = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                cpf: req.body.cpf,
                status: 1
            }
            Pessoa.create(novo).then(function () {
                req.flash('success_msg', 'Cliente cadastrado com sucesso!');
                res.redirect('/pessoa')
            })
        }
    })





}

export default {index, cadastro}