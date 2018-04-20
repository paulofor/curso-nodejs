const moongose = require('mongoose');
const Schema = moongose.Schema;

const promotionSchema = new Schema({
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

var Promotions = moongose.model('Promotions', promotionSchema);

module.exports = Promotions;