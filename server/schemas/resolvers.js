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
    },

    Mutation : {
        addTask : async(parent,{title,description,employeeObjId,dueDate,recurring,renewIn})=>{
            // ({_id: this._Userid} = await User.findOne({employeeId:employeeid}));
            // const userId = this._Userid;
            console.log(title,description);
            const newTask = await Task.create({
                title : title,
                description : description,
                user : employeeObjId,
                dueDate : dueDate,
                recurring : recurring,
                renewIn : renewIn
            })

            return newTask
        },
        updateTask : async(parent,{status,title,description,_id,dueDate,recurring,renewIn})=>{
            const editTask = await Task.findOneAndUpdate({_id},{status,title,description,_id,dueDate,recurring,renewIn},{new:true})
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
                throw new AuthenticationError('fuck');
            }

            const correctPassword = await user.isCorrectPassword(password)

            if(!correctPassword){
                throw new AuthenticationError('No password found ')
            }

            const token = signToken(user);

            return{user, token};
        }
    }
};

module.exports = resolvers