const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const hostname = 'localhost';
const port = 3232;

const app = express();  
app.use(morgan('dev'));
app.use(bodyParser.json());



app.all('/dishes',(req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    next();
});
app.get('/dishes', (req,res,next) => {
    res.end('Em breve pratos serão lançados...');
});
app.post('/dishes', (req,res,next) => {
    res.end('Vou adicionar o prato: ' + req.body.name + 
        ' com os detalhes: ' + req.body.description);
});
app.put('/dishes', (req,res,next) => {
    res.statusCode = 403;
    res.end('PUT não suportado ');
});
app.delete('/dishes', (req,res,next) => {
    res.end('Em breve pratos serão apagados...');
});


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


app.use(express.static(__dirname + '/public'));

app.use((req,res,next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/html');
    res.end('<html><body><h1>Este é um servidor Express</h1></body></html>');
});

const server = http.createServer(app);

server.listen(port,hostname,() => {
    console.log(`Servidor escutando em http://${hostname}:${port}`)
})
