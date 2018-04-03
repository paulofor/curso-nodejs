const moongose = require('mongoose');
const Schema = moongose.Schema;

const dishSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true

    }
},{
    timestamps: true
});

var Dishes = moongose.model('Dish', dishSchema);

module.exports = Dishes;