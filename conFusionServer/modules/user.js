var moongose = require('mongoose');
var Schema = moongose.Schema;

var User = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    }
});


var Users = moongose.model('User', User);

module.exports = Users;