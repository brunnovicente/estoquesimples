import express from 'express';
const app = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access";
import session from "express-session";
import flash from "connect-flash"
import passport from "passport"

////////////////////////
//CONFIGURAÇÕES
////////////////////////
app.use(session({
    secret: 'analiseedesenvolvimentodesistemas',
    resave: true,
    saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())

app.use(function (req, res, next){
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    res.locals.error = req.flash("error");
    res.locals.usuario = req.user || null
    next()
})

//CONFIGURAR O TEMPLATE PADRÃO
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    'helpers':{
        json: function (objeto){
            return JSON.stringify(objeto, null, 2)
        }
    }
}));
app.set('view engine', 'handlebars');

//CONFIGURAR O BODY PARSER PARA ENVIAR DADOS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Pasta de Arquivos Estásticos
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));

////////////////////
//ROTAS DO SISTEMA
////////////////////
app.get('/', (req, res) => {
    res.redirect('/home');
})

import home from './routes/home.js';
app.use('/home', home)

import home from './routes/principal.js q';
app.use('/home', home)

app.listen(8000, ()=> console.log('Servidor Rodando em http://localhost:8000'))