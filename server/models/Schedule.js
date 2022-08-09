const {Schema, model} = require('mongoose');
const Review = require('./Review');


const daySchema = new Schema({
    dayOfWeek:{
        type:String,
        require:true,
    },
    isPresent:{
        type:Boolean,
        require:true
    }
})

const scheduleSchema = new Schema({
    employee:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    schedule:[daySchema]
})

const Schedule = model('Schedule', scheduleSchema)

module.exports = Schedule