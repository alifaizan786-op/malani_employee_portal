const {Schema, model} = require('mongoose');


const TimeOffReqSchema = new Schema({
    employee:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    startingDate:{
        type:Date,
        require: true
    },
    endDate:{
        type:Date,
        require: true
    },
    reason:{
        type:String,
        require:true
    },
    approver:{
        type:Schema.Types.ObjectId,
        ref:'User',
    },
    status:{
        type:String
    }
})

const TimeOffReq = model("TimeOffReq", TimeOffReqSchema)

module.exports = TimeOffReq