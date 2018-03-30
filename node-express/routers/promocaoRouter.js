const express = require('express');
const bodyParser = require('body-parser');

const promocaoRouter = express.Router();


promocaoRouter.use(bodyParser.json());

promocaoRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Em breve promocoes serão lançados...');
})
.post((req,res,next) => {
    res.end('Vou adicionar o promocao: ' + req.body.name + 
        ' com os detalhes: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT não suportado ');
})
.delete((req,res,next) => {
    res.end('Em breve promocoes serão apagados...');
});

promocaoRouter.route('/:Id')
.get((req,res,next) => {
    res.end('Em breve promocoes serão lançados para: ' + req.params.Id);
})
.post((req,res,next) => {
    res.statusCode = 403;
    res.end('POST não suportado para um id (' + req.params.Id + ')');
})
.put((req,res,next) => {
    res.write('Vai atualizar id: ' + req.params.Id);
    res.end('Vou alterar o promocoes: ' + req.body.name + 
    ' com os detalhes: ' + req.body.description);
})
.delete((req,res,next) => {
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