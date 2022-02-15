const connection = require('../config/connection')
const { Task, User } = require('../models')
const userSeeds =  require('./userSeeds.json')
const taskSeeds = require('./taskSeeds.json')

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');
    try{
    await User.deleteMany({})

    console.log('=========Collections Emptied================');

    await User.create(userSeeds);

    console.table(userSeeds);

    console.info('================Users Seeded================');

    await Task.deleteMany({})

    console.log('=========Collections Emptied================');
   
    for (let i = 0;i <taskSeeds.length; i++){
      ({_id : this._User} =  await User.findOne({employeeId: taskSeeds[i].user}));
      const UserId = this._User;

      const task = {
        title : taskSeeds[i].title,
        description: taskSeeds[i].description,
        user: UserId,
        dueDate: taskSeeds[i].dueDate

      };
      console.log(task);

      let taskCreaton = await Task.create(task);

    }

    console.info('================Task Seeded================');


    

 }  catch (err) {
    console.error(err);
    process.exit(1);
  }

    process.exit(0);
})