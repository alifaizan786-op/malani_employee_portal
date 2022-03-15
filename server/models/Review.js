const {Schema, model} = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const reviewSchema = new Schema({
    manager:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    employee:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    month:{
        type:String,
        require:true,
    },
    review:{
        type:String,
        require:true,
    },
    createDate : {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },  
})
const Review = model('Review', reviewSchema);

module.exports = Review;
