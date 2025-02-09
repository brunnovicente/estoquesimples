import Usuario from '../models/Usuario.js';
import Pessoa from '../models/Pessoa.js';
import bcrypt from 'bcryptjs';
import passport from "passport";

class UsuarioController{

    acesso = function (req, res){
        res.render('usuario/login', {layout: 'home'});
    }

    login = function (req, res, next){
        passport.authenticate('local', {
            successRedirect: '/admin',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req, res, next)
    }

    logout = function (req, res, next){
        req.logout(function (erro){
            req.flash('success_msg', 'Usuário deslogado com sucesso!');
            res.redirect('/usuario/login');
        })
    }

    alterarsenha = function (req, res){
        let senha1 = req.body.senha1
        let senha2 = req.body.senha2;
        if(senha1 === senha2){
            let dados = {
                senha: senha1
            }
            bcrypt.genSalt(10, function (erro, salt) {
                bcrypt.hash(dados.senha, salt, function (err, hash) {
                    if(erro){
                        req.flash('error_msg', "Erro ao salvar usuário!")
                        res.redirect('/usuario/cadastrar')
                    }
                    dados.senha = hash
                    Usuario.update(dados, {
                        where:{
                            id: req.user.id
                        }
                    }).then(function () {
                        req.flash('success_msg', 'Senha alterada com sucesso!')
                        res.redirect('/admin')
                    }).catch(function (error) {
                        req.flash('error_msg', error.message)
                    })
                })
            })
        }else{
            req.flash('error_msg', 'Repita a mesma senha!')
            res.redirect('/admin');
        }
    }


}

export default new UsuarioController()
