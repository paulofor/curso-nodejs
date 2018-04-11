var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./modules/user');


exports.local = passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());