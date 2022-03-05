const connection = require('../server/config/connection')
const { Task, User, Review, Quotes } = require('../server/models')
var cron = require('node-cron');
const fs = require('fs')

connection.on('error', (err) => err);

connection.once('open', async() => {
  console.log('connected');

  //await User.deleteMany({})
  cron.schedule('59 59 23 * * *', async() => {

    const today = new Date()
    const todayunix = Date.parse(today)
    console.log("backup done at " + Date.now());

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
  cron.schedule('59 59 * * * *', async() => {

    const today = new Date()
    const todayunix = Date.parse(today)

    const allTasks = await Task.find()
    const allUsers = await User.find()
    const allReviews = await Review.find()

    const checkStatus = allTasks.filter((task) => task.status === 'pending')
    console.log("Over due checker done at " + Date.now());

    
    for(let i = 0; i < checkStatus.length; i++){
      if(checkStatus[i].dueDate < todayunix){
        const overdue = await Task.findByIdAndUpdate({_id : checkStatus[i]._id},{status:'overdue'})
      }
    }

    
  });

  //------------------------Renew Tasks------------------------
  cron.schedule('59 59 23 * * 2-7', async() => {

    const today = new Date()
    const todayunix = Date.parse(today)

    const allTasks = await Task.find({recurring: true})
    console.log("Tasks renewed at " + Date.now());
    
    for(let i = 0; i < allTasks.length; i++){

      const fDueDate= new Date(allTasks[i].dueDate)
      const fDueDateUnix = Date.parse(fDueDate)

      if(fDueDateUnix < todayunix) {
        

          const dueInDays = 86400000 * allTasks[i].renewIn
          const calcDueDate = dueInDays + todayunix



          const task = {
          description: allTasks[i].description,
          user: allTasks[i].user,
          dueDate: new Date(calcDueDate),
          recurring: allTasks[i].recurring,
          renewIn:allTasks[i].renewIn
          };

          console.log(task);


          
          const createTask = await Task.create(task)

          const setRecurringFalse = await Task.findOneAndUpdate({_id:allTasks[i]._id},{recurring:false})
        }



    }    
  });


});


    

          