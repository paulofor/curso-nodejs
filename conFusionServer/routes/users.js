var express = require('express');
const bodyParser = require('body-parser');
var User = require('../modules/user');

var userRouter = express.Router();
userRouter.use(bodyParser.json());

/* GET users listing. */
userRouter.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
userRouter.post('/signup', function (req, res, next) {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (user != null) {
        var err = new Error('User ' + req.body.username + ' username ja existe');
        err.status = 403;
        next(err);
      }
      else {
        return User.create({
          username: req.body.username,
          password: req.body.password
        });
      }
    })
    .then((user) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json({ status: "Registrado com sucesso", user: user });
    }, (err) => next(err))
    .catch((err) => next(err));
});

userRouter.post('/login', (req, res, next) => {
  if (!req.session.user) {
    var authHeader = req.headers.authorization;
    if (!authHeader) {
      var err = new Error("Voce nao foi autenticado");
      res.setHeader('WWW-Authenticate', 'Basic');
      err.status = 401;
      return next(err);
    }
    var auth = new Buffer(authHeader.split(' ')[1], 'base64').toString().split(':');
    var username = auth[0];
    var password = auth[1];

    User.findOne({ username: username })
      .then((user) => {
        if (user.username === username && user.password === password) {
          req.session.user = 'authenticated';
          res.statusCode = 200;
          res.setHeader('Content-Type', 'text/plain');
          res.end('Você está autenticado');
        }
        else if (user.password !== password) {
          var err = new Error("Sua senha não está correta");
          err.status = 403;
          return next(err);
        }
        else if (user === null) {
          var err = new Error("Usuário " + username + " não existe");
          res.setHeader('WWW-Authenticate', 'Basic');
          err.status = 403;
          return next(err);
        }
      })
      .catch((err) => next(err));
  }
  else {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Você já está autenticado');
  }
});

userRouter.get('/logout', (req,res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  } else {
    var err = new Error("Você não está logado");
    err.status = 403;
    next(err);
  }
})

module.exports = userRouter;
