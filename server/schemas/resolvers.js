const { Task, User, Review, Quotes, Bulletin} = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
    Query : {
        users : async () => {
            return await User.find({}).sort({ level: 1 });//find all user
        },
        userId : async (parent, args, context) =>{
            return await User.findOne({_id: context.user._id}); //user by id
        },
        userActive : async()=>{
             return await User.find({active:true})   
        },
        tasks : async () => {

            const today = new Date()
            const todayunix = Date.parse(today)
            const allTasks =  await Task.find({}).populate('user').sort({ status: 1 });
            const recuurringTask = allTasks.filter((task)=> task.recurring === true)
            const checkStatus = allTasks.filter((task) => task.status === 'pending')

            if (today.getDay() !== 1) {
                for (let i = 0; i < checkStatus.length; i++){
                    if(checkStatus[i].dueDate < todayunix){
                        const overdue = await Task.findByIdAndUpdate({_id : checkStatus[i]._id},{status:'overdue'})
                    }
                }

                for(let i = 0; i < recuurringTask.length; i++){

                    const fDueDate= new Date(recuurringTask[i].dueDate)
                    const fDueDateUnix = Date.parse(fDueDate)
            
                    if(fDueDateUnix < todayunix) {
                    
                        const dueInDays = 86400000 * recuurringTask[i].renewIn
                        const calcDueDate = dueInDays + todayunix
                
                        const task = {
                            description: recuurringTask[i].description,
                            user: recuurringTask[i].user,
                            dueDate: new Date(calcDueDate),
                            recurring: recuurringTask[i].recurring,
                            renewIn:recuurringTask[i].renewIn
                        };
                
                        const createTask = await Task.create(task)
                
                        const setRecurringFalse = await Task.findOneAndUpdate({_id:recuurringTask[i]._id},{recurring:false})
                    }
                }
            }

            return allTasks
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
        reviewUId : async(parent,{employeeUId})=>{
            return await Review.find({employee:employeeUId}).populate('manager').populate('employee').sort({_id:-1});
        },
        taskByEmp : async(parent,{emp}) =>{
            return await Task.find({user:emp});
        },
        bulletins : async() => {
            return await Bulletin.find({}).populate('user').populate('acknowledge').sort({date:-1});
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
        updateTask: async (parent, { status, subStatus, description, _id, dueDate, recurring, renewIn }) => {
            const editTask = await Task.findOneAndUpdate({_id},{status, subStatus,description,dueDate,recurring,renewIn})
            return editTask
        },
        deleteTask : async(parent,{_id})=>{
            await Task.findOneAndDelete({_id})
        },
        addUser : async(parent,{firstName,lastName,employeeId,department,level,password})=>{
        const newUser = await User.create({
            firstName ,
            lastName ,
            employeeId ,
            department ,
            level ,
            password ,
        })
        return newUser
        },
        updateUser : async(parent,{_id,firstName,lastName,employeeId,department,level,active})=>{
        const editUser = await User.findOneAndUpdate({_id},{firstName,lastName,employeeId,department,level,active})
        
        return editUser
        },
        deleteUser : async(parent,{_id})=>{
        await User.findOneAndDelete({_id})
        },
        updateQuotes : async(parent,{_id,quotes})=>{
            const editQuotes = await Quotes.findOneAndUpdate({_id},{quotes})
        return editQuotes

        },
        addReview : async(parent,{employee,manager,month,review})=>{
            console.log(month);
            const newReview = await Review.create({
            manager,
            employee,  
            month,
            review
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
        ,
        updatePassword: async(parent,{_id,oldPassword, newPassword})=>{


            const user = await User.findOne({_id})
            const correctPassword = await user.isCorrectPassword(oldPassword)
            
            if(!correctPassword){
                throw new AuthenticationError('Password is Incorrect')
            }else{
            const saltRound = 10
            const encryptPassword =  await bcrypt.hash(newPassword, saltRound)
            const changePass = await User.findOneAndUpdate({_id},{password:encryptPassword})
            }
        },
        upadateStatus: async(parent,{_id,status, subStatus})=>{
            const upadateStatus = await Task.findByIdAndUpdate({_id},{status, subStatus})
            return upadateStatus
        },
        addBulletin : async(parent, {user, title, body}) => {
            const addBulletin = await Bulletin.create({user, title, body})
            return addBulletin
        },
        acknowledgeBulletin : async(parent, {_id, acknowledge}) => {
            ({acknowledge : this._acknowledge} = await Bulletin.findOne({_id : _id}))
            const acknowledgeArr = this._acknowledge 
            const acknowledgeBulletin = Bulletin.findByIdAndUpdate({_id},{acknowledge:[...acknowledgeArr, acknowledge]})
            return acknowledgeBulletin
        },
        updateBulletin : async(parent, {_id, title, body}) => {
            const updateBulletin = await Bulletin.findByIdAndUpdate({_id},{
                title, 
                body,
                acknowledge : []
            })
            return updateBulletin
        },
        deleteBulletin : async(parent, {_id}) => {
            const delBulletin = await Bulletin.findOneAndDelete({_id : _id})
            return delBulletin
        }
    }
};

module.exports = resolvers
