import Pessoa from "../models/Pessoa.js";
import {Op} from "sequelize";
import bcrypt from "bcryptjs";
import Usuario from "../models/Usuario.js";

class PessoaController {
     index = function (req, res) {
        Pessoa.findAll({
            where:{
                status: 1
            },
            order:[['nome','asc']],
        }).then((pessoas) => {
            res.render('pessoa/index', {pessoas: pessoas});
        })
    }

    cadastro = async function (req, res) {
        let pessoa = await Pessoa.findOne({
            where:{
                [Op.or]:[
                    {cpf: req.body.cpf},
                    {email: req.body.email}
                ]
            }
        })

        if(pessoa){
            req.flash('error_msg', 'CPF e/ou E-mail já cadastrados!')
            res.redirect('/pessoa/cadastro')
        }else{
            let novo = {
                nome: req.body.nome,
                telefone: req.body.telefone,
                email: req.body.email,
                cpf: req.body.cpf,
                status: 1
            }
            Pessoa.create(novo).then(function(pessoa) {
                let novoUsuario = {
                    login: pessoa.email,
                    senha: req.body.senha,
                    categoria: 0,
                    status: 1,
                    pessoa_id: pessoa.id
                }

                bcrypt.genSalt(10, function (erro, salt) {
                    bcrypt.hash(novoUsuario.senha, salt, function (err, hash) {
                        if(erro){
                            req.flash('error_msg', "Erro ao salvar usuário!")
                            res.redirect('/usuario/cadastrar')
                        }
                        novoUsuario.senha = hash
                        Usuario.create(novoUsuario).then(function () {
                            req.flash('success_msg', 'Cliente cadastrado com sucesso!')
                            res.redirect('/usuario/login')
                        }).catch(function (error) {
                            req.flash('error_msg', error.message)
                        })
                    })
                })

            })
        }
    }//Fim do cadastro
}


export default new PessoaController()