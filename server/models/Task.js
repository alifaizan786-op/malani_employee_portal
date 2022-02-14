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
    
    await Task.create(taskSeeds);

    console.table(taskSeeds);

    console.info('================Users Seeded================');


    

 }  catch (err) {
    console.error(err);
    process.exit(1);
  }

    process.exit(0);
})