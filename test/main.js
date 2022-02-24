const connection = require('./config/connection')
const { Task, User, Review, Quotes } = require('./models')
var cron = require('node-cron');

connection.on('error', (err) => err);

connection.once('open', async() => {
  console.log('connected');

  //await User.deleteMany({})
  cron.schedule('*/10 * * * * *', async() => {

    const allTasks = await Task.find({recurring : true})

    for(let i = 0; i < allTasks.length; i++){
      console.log(allTasks[i]);

    }
  });

  

    


 
})