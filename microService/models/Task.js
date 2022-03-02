const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const taskSchema = new Schema({
    status:{
        type:String,
        require:true,
        default:"pending"
    },

    description:{
        type:String,
        require:true,
    },
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    dueDate:{
        type:Date,
        require:true,
    },  
    createDate:{
        type:Date,
        default:Date.now
    },
    recurring:{
        type:Boolean,
        require:true,
        default:true
    }
})
const Task = model('Task', taskSchema);

module.exports = Task;