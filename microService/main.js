const connection = require('./config/connection')
const { Task, User, Review, Quotes } = require('./models')
var cron = require('node-cron');
const fs = require('fs')

connection.on('error', (err) => err);

connection.once('open', async() => {
  console.log('connected');

  //await User.deleteMany({})
  cron.schedule('* * * 23 * *', async() => {

    const today = new Date()
    const todayunix = Date.parse(today)

    const allTasks = await Task.find().populate('user')
    const allUsers = await User.find()
    const allReviews = await Review.find().populate('manager').populate('employee')

    try {
      fs.writeFileSync(`./backup/task${todayunix}.json`, JSON.stringify(allTasks))
      fs.writeFileSync(`./backup/user${todayunix}.json`, JSON.stringify(allUsers))
      fs.writeFileSync(`./backup/review${todayunix}.json`, JSON.stringify(allReviews))
    } catch (err) {
      console.error(err)
    }
  });

  //---------------------Set Tasks To Overdue---------------------
  cron.schedule('* 59 * * * *', async() => {

    const today = new Date()
    const todayunix = Date.parse(today)

    const allTasks = await Task.find()
    const allUsers = await User.find()
    const allReviews = await Review.find()

    const checkStatus = allTasks.filter((task) => task.status === 'pending')

    
    for(let i = 0; i < checkStatus.length; i++){
      if(checkStatus[i].dueDate < todayunix){
        const overdue = await Task.findByIdAndUpdate({_id : checkStatus[i]._id},{status:'overdue'})
      }
    }

    
  });

  //------------------------Renew Tasks------------------------
  cron.schedule('* * 23 * *', async() => {

    const today = new Date()
    const todayunix = Date.parse(today)

    const allTasks = await Task.find()

    const checkRecurring = allTasks.filter((task) => task.recurring === true)

    
    for(let i = 0; i < checkRecurring.length; i++){
      if(checkRecurring[i].dueDate < todayunix){

        const dueInDays = 86400000 * checkRecurring[i].renewIn
        const calcDueDate = dueInDays + todayunix



        const task = {
        description: taskSeeds[i].description,
        user: checkRecurring[i].user,
        dueDate: new Date(calcDueDate),
        recurring: taskSeeds[i].recurring,
        renewIn:taskSeeds[i].renewIn
        };
        
        const createTask = await Task.create(task)

        const setRecurringFalse = await Task.findOneAndUpdate({_id:checkRecurring[i]._id},{recurring:false})
      }
    }

    
  });
});


    

    