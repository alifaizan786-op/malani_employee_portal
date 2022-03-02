const { Task, User, Review, Quotes} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query : {
        users : async () => {
            return await User.find({});//find all user
        },
        userId : async (parent, args, context) =>{
            return await User.findOne({_id: context.user._id}); //user by id
        },
        userActive : async()=>{
             return await User.find({active:true})   
        },
        tasks : async () => {
            return await Task.find({}).populate('user').sort({ status: 1 });//find all task
        },
        taskUId : async (parent, {taskUId}) => {
            return await Task.find( {user: taskUId } ).populate('user');
        },
        quotes : async () => {
            return await Quotes.find({});// all quotes
        },
        reviews : async () => {
            return await Review.find({}).populate('manager').populate('employee'); // all review
        },
        reviewUId : async(parent,{managerUId,employeeUId})=>{
            return await Review.findOne({manager:managerUId,employee:employeeUId}).populate('manager').populate('employee');
        },
        taskByEmp : async(parent,{emp}) =>{
            console.log(emp);
            return await Task.find({user:emp});
        }
    },

    Mutation : {
        addTask : async(parent,{description,user,dueDate,recurring,renewIn})=>{
           
            const newTask = await Task.create({
                description : description,
                user : user,
                dueDate : dueDate,
                recurring : recurring,
                renewIn : renewIn
            })

            return newTask
        },
        updateTask : async(parent,{status,description,_id,dueDate,recurring,renewIn})=>{
            const editTask = await Task.findOneAndUpdate({_id},{status,description,_id,dueDate,recurring,renewIn},{new:true})
            return editTask
        },
        deleteTask : async(parent,{_id})=>{
            await Task.findOneAndDelete({_id})
        },
        addUser : async(parent,{firstName,lastName,employeeId,department,level,password,active})=>{
        const newUser = await User.create({
            firstName : firstName,
            lastName : lastName,
            employeeId : employeeId,
            department : department,
            level : level,
            password : password,
            active : active,
        })
        return newUser
        },
        updateUser : async(parent,{_id,firstName,lastName,employeeId,department,level,password,active})=>{
        const editUser = await updateUser.findOneAndUpdate({_id},{firstName,lastName,employeeId,department,level,password,active},{new:true})
        return editUser
        },
        deleteUser : async(parent,{_id})=>{
        await User.findOneAndDelete({_id})
        },
        updateQuotes : async(parent,{_id,quotes})=>{
            const editQuotes = await Quotes.findOneAndUpdate({_id},{quotes},{new:true})
        return editQuotes

        },
        addReview : async(parent,{employeeId,managerId,month,review})=>{
            const newReview = await Review.create({
            managner: managerId,
            employee: employeeId, 
            month: month,
            review: review
        })
        return newReview
        },
        deleteReview :  async(parent,{_id})=>{
            await Review.findOneAndDelete({_id})
        },
        login: async(parent,{employeeId,password})=>{
            const user = await User.findOne({employeeId})

            if(!user){
                throw new AuthenticationError('Employee Id is incorrect');
            }

            const correctPassword = await user.isCorrectPassword(password)

            if(!correctPassword){
                throw new AuthenticationError('Password is Incorrect')
            }

            const token = signToken(user);

            return{user, token};
        }
    }
};

module.exports = resolvers