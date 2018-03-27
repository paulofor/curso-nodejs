const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = 'localhost';
const port = 3232;

const servidor = http.createServer((req,res) => {
    console.log("Request for " + req.url + " Metodo: " + req.method);
    var arqUrl;
    if (req.method == 'GET') {
        if (req.url == '/') arqUrl = 'index.html';
        else arqUrl = req.url;

        var arqPath = path.resolve('./public/' + arqUrl);
        var arqExtensao = path.extname(arqPath);
        if (arqExtensao == '.html') {
            fs.exists(arqPath, (existe) => {
                if (!existe) {
                    res.statusCode = 404;
                    res.setHeader('Content-Type','text/html');  
                    res.end('<html><body><h1>Erro 404: ' +  arqUrl + ' not found </h1></body></html>')
                    return;
                }
                res.statusCode = 200;
                res.setHeader('Content-Type','text/html');
                fs.createReadStream(arqPath).pipe(res);
            })
        } else {
            res.statusCode = 404;
            res.setHeader('Content-Type','text/html');  
            res.end('<html><body><h1>Erro 404: ' +  arqUrl + ' not an HTML file</h1></body></html>')
            return;
        }
    } else {
        res.statusCode = 404;
        res.setHeader('Content-Type','text/html');  
        res.end('<html><body><h1>Erro 404: ' +  res.method + ' not supported </h1></body></html>')
        return;
    }
})

servidor.listen(port,hostname, () => {
    console.log(`Servidor escutando em http://${hostname}:${port}`)
})