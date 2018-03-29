const express = require('express');
const bodyParser = require('body-parser');

const dishRouter = express.Router();

dishRouter.use(bodyParser.json());

dishRouter.route('/')
.all((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
})
.get((req,res,next) => {
    res.end('Em breve pratos serão lançados...');
})
.post((req,res,next) => {
    res.end('Vou adicionar o prato: ' + req.body.name + 
        ' com os detalhes: ' + req.body.description);
})
.put((req,res,next) => {
    res.statusCode = 403;
    res.end('PUT não suportado ');
})
.delete((req,res,next) => {
    res.end('Em breve pratos serão apagados...');
});

module.exports = dishRouter;



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