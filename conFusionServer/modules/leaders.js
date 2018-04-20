const moongose = require('mongoose');
const Schema = moongose.Schema;

const leaderSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    }
})

var Leaders = moongose.model('Leader', leaderSchema);

module.exports = Leaders;