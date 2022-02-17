const connection = require('../config/connection')
const { Task, User, Review, Quotes } = require('../models')
const userSeeds =  require('./userSeeds.json')
const taskSeeds = require('./taskSeeds.json')
const reviewSeeds = require('./reviewSeeds.json')
const quotesSeeds = require('./quotesSeeds.json')

connection.on('error', (err) => err);

connection.once('open', async() => {
    console.log('connected');
    try{
    await User.deleteMany({})//User

    console.log('=========Collections Emptied================');

    await User.create(userSeeds);

    console.table(userSeeds);

    console.info('================Users Seeded================');

    await Task.deleteMany({})//Task

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

     let taskCreation = await Task.create(task);
    }
    console.info('================Task Seeded================');

    await Review.deleteMany({})//Delete

    console.log('=========Collections Emptied================');

    for(let r = 0;r <reviewSeeds.length; r++){
      ({_id : this._Review} = await User.findOne({employeeId:reviewSeeds[r].managerIdR}));
      const ManagerIdR = this._Review;

       ({_id : this._ReviewE} = await User.findOne({employeeId:reviewSeeds[r].employeeIdR}));
      const EmployeeIdR = this._ReviewE;

      const review ={
        managerIdR : ManagerIdR,
        employeeIdR : EmployeeIdR,
        month : reviewSeeds[r].month,
        review : reviewSeeds[r].review,

      };
      console.log(review);

      let reviewCreation = await Review.create(review);
    }
    console.info('================Review Seeded================');
    
    await Quotes.deleteMany({});//Quotes

    console.log('=========Collections Emptied================');

    await Quotes.create(quotesSeeds);

    console.table(quotesSeeds);

    console.info('================Quotes Seeded================');

 }  catch (err) {
    console.error(err);
    process.exit(1);
  }

    process.exit(0);
})