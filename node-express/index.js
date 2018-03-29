const express = require('express');
const http = require('http');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const dishRouter = require('./routers/dishRouter');
const hostname = 'localhost';
const port = 3232;

const app = express();  
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/dishes', dishRouter);

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
