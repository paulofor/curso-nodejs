const express = require('express');
const bodyParser = require('body-parser');

const leaderRouter = express.Router();
const authenticate = require('../authenticate');
const cors = require('./cors');
const Leaders = require('../modules/leaders');

leaderRouter.use(bodyParser.json());

leaderRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.options(cors.corsWithOptions, (req, res) => {
    res.sendStatus(200);
})
.get(cors.corsWithOptions ,(req, res, next) => {
    Leaders.find(req.query)
    .then((promotions) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json');
        res.json(promotions);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.end('Vou adicionar o leader: ' + req.body.name + 
        ' com os detalhes: ' + req.body.description);
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT não suportado ');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.end('Em breve leaders serão apagados...');
});

leaderRouter.route('/:Id')
.get(cors.cors, (req,res,next) => {
    res.end('Em breve leaders serão lançados para: ' + req.params.Id);
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.statusCode = 403;
    res.end('POST não suportado para um id (' + req.params.Id + ')');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.write('Vai atualizar id: ' + req.params.Id);
    res.end('Vou alterar o leaders: ' + req.body.name + 
    ' com os detalhes: ' + req.body.description);
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req,res,next) => {
    res.end('Em breve leaders será apagado id: ' + req.params.Id);
});

module.exports = leaderRouter;



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