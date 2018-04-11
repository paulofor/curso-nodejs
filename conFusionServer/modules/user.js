var moongose = require('mongoose');
var Schema = moongose.Schema;
var passportLocalMoogoose = require('passport-local-mongoose');


var User = new Schema({
 
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMoogoose);

var Users = moongose.model('User', User);

module.exports = Users;