const {Schema, model} = require('mongoose');

const reviewSchema = new Schema({
    managerIdR:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    employeeIdR:{
        type:Schema.Types.ObjectId,
        ref:'User',
        require: true
    },
    month:{
        type:Date,
        require:true,
    },
    review:{
        type:String,
        require:true,
    },    
})
const Review = model('Review', reviewSchema);

module.exports = Review;
