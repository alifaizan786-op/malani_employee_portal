const { Task, User, Review, Quotes} = require('../models')

const resolvers = {
    Query : {
        users : async () => {
            return await User.find({});
        },
        tasks : async () => {
            return await Task.find({}).populate('user');
        },//(parent, args, context)
        user : async (parent, {serachid}) =>{
            return await User.findOne({employeeId: serachid}); //serachid
        },
        quotes : async () => {
            return await Quotes.find({});
        },
        reviews : async () => {
            return await Review.find({}).populate('managerIdR').populate('employeeIdR');
        },
        
    }

}

module.exports = resolvers