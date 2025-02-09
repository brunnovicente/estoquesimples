function logado(req, res, next){
    if(req.isAuthenticated()){
        return next()
    }
    req.flash('error_msg', 'Você precisa está logado')
    res.redirect('/usuario/login')
}

export {logado}