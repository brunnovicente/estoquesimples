import Produto from '../models/Produto';

export default {

    index: function(req, res) {
        Produto.findAll().then(function (produtos){
            console.dir(produtos)
            res.render('produtos/index', {produtos: produtos, layout: 'home'});
        })
    }

}