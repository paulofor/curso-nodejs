const http = require('http');

const hostname = 'localhost';
const port = 3232;

const servidor = http.createServer((req,res) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/html');
    res.end('<html><body><h1>Ola Mundo</h1></body></html>');  
})

servidor.listen(port,hostname, () => {
    console.log(`Servidor escutando em http://${hostname}:${port}`)
})