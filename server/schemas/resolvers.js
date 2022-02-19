const { Task, User, Review, Quotes} = require('../models')

const resolvers = {
    Query : {
        users : async () => {
            return await User.find({});//find all user
        },
        userId : async (parent, {userId}) =>{
            return await User.findOne({_id: userId}); //user by id
        },
        tasks : async () => {
            return await Task.find({}).populate('user');//find all task
        },
        //taskUID = Task by User id
        taskUId : async (parent, {taskUId}) => {
            return await Task.findOne( {user: taskUId } ).populate('user');
        },
        quotes : async () => {
            return await Quotes.find({});// all quotes
        },
        reviews : async () => {
            return await Review.find({}).populate('manager').populate('employee'); // all review
        },
        //taskUID = Review by User id
        reviewUId : async(parent,{managerUId,employeeUId})=>{
            return await Review.findOne({manager:managerUId,employee:employeeUId}).populate('manager').populate('employee');
        }
            
        
    }

}

module.exports = resolvers