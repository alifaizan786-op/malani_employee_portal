const { Task, User} = require('../models')

const resolvers = {
    Query : {
        users : async () => {
            return await User.find({});
        },
        tasks : async () => {
            return await Task.find({}).populate('user');
        },//(parent, args, context)
        user : async (parent, {serachid}) =>{
            return await User.findOne({employeeId: serachid})
        }
    }

}

module.exports = resolvers