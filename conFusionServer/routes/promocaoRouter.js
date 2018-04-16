const express = require('express');
const bodyParser = require('body-parser');

const promocaoRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');

promocaoRouter.use(bodyParser.json());

promocaoRouter.route('/')
    .all((req, res, next) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');
        next();
    })
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors,(req, res, next) => {
        res.end('Em breve promocoes serão lançados...');
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.end('Vou adicionar o promocao: ' + req.body.name +
            ' com os detalhes: ' + req.body.description);
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('PUT não suportado ');
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.end('Em breve promocoes serão apagados...');
    });

promocaoRouter.route('/:Id')
    .options(cors.corsWithOptions, (req, res) => {
        res.sendStatus(200);
    })
    .get(cors.cors,(req, res, next) => {
        res.end('Em breve promocoes serão lançados para: ' + req.params.Id);
    })
    .post(authenticate.verifyUser, (req, res, next) => {
        res.statusCode = 403;
        res.end('POST não suportado para um id (' + req.params.Id + ')');
    })
    .put(authenticate.verifyUser, (req, res, next) => {
        res.write('Vai atualizar id: ' + req.params.Id);
        res.end('Vou alterar o promocoes: ' + req.body.name +
            ' com os detalhes: ' + req.body.description);
    })
    .delete(authenticate.verifyUser, (req, res, next) => {
        res.end('Em breve promocoes será apagado id: ' + req.params.Id);
    });

module.exports = promocaoRouter;



/*

app.get('/dishes/:dishId', (req,res,next) => {
    res.end('Em breve pratos serão lançados para: ' + req.params.dishId);
});
app.post('/dishes/:dishId', (req,res,next) => {
    res.statusCode = 403;
    res.end('POST não suportado para um id (' + req.params.dishId + ')');
});
app.put('/dishes/:dishId', (req,res,next) => {
    res.write('Vai atualizar id: ' + req.params.dishId);
    res.end('Vou alterar o prato: ' + req.body.name + 
    ' com os detalhes: ' + req.body.description);
});
app.delete('/dishes/:dishId', (req,res,next) => {
    res.end('Em breve prato será apagado id: ' + req.params.dishId);
});

*/