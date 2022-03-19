const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const bulletinSchema = new Schema({
    user:{
        type : Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    title:{
        type : String,
        require : true
    },
    body:{
        type : String,
        require : true
    },
    date:{
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    },
    acknowledge:[
        {
            type : Schema.Types.ObjectId,
            ref:'User',
        }
    ]
})

const Bulletin = model('bulletin', bulletinSchema);

module.exports = Bulletin;