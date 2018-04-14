const express = require('express');
const bodyParser = require('body-parser');

const authenticate = require('../authenticate');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'public/images');
    },
    filename: (req, file, cb) => {
        cb(null,file.originalname);
    }
});
const imageFileFilter = (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return cb(new Error('Voce so pode enviar arquivos de imagens'), false);
    }
    return cb(null, true);
}
const upload = multer({
    storage: storage,
    fileFilter: imageFileFilter
});


const uploadRouter = express.Router();

uploadRouter.use(bodyParser.json());

uploadRouter.route('/') 
.post(authenticate.verifyUser, upload.single('imageFile'),  (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','application/json');
    res.json(req.file);
})
.put(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT não suportado ');
})
.delete(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE não suportado ');
})
.get(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('GET não suportado ');
});

module.exports = uploadRouter;