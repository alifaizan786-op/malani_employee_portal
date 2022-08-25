const connection = require("../config/connection");
const { Task, User, Review, Quotes, Schedule } = require("../models");
const userSeeds = require("./userSeeds.json");
const taskSeeds = require("./taskSeeds.json");
// const reviewSeeds = require('./reviewSeeds.json')
const quotesSeeds = require("./quotesSeeds.json");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  try {
    //----------------------Seeding Users----------------------
    // await User.deleteMany({})

    //  console.log('=========Collections Emptied================');

    // await User.create(userSeeds);

    // console.table(userSeeds);

    // console.info('================Users Seeded================');

    //----------------------Seeding Tasks----------------------
    // await Task.deleteMany({})

    // console.log('=========Collections Emptied================');

    // for (let i = 0;i <taskSeeds.length; i++){
    //   ({_id : this._User} =  await User.findOne({employeeId: taskSeeds[i].user}));
    //   const UserId = this._User;

    //   const today = new Date()
    //   const todayunix = Date.parse(today)
    //   const dueInDays = 86400000 * taskSeeds[i].renewIn
    //   const calcDueDate = dueInDays + todayunix

    //   const task = {
    //     description: taskSeeds[i].description,
    //     user: UserId,
    //     dueDate: new Date(calcDueDate),
    //     recurring: taskSeeds[i].recurring,
    //     renewIn:taskSeeds[i].renewIn
    //   };
    //   console.log(task);

    //  let taskCreation = await Task.create(task);
    // }
    // console.info('================Task Seeded================');

    //----------------------Seeding Reviews----------------------
    // await Review.deleteMany({})

    // console.log('=========Collections Emptied================');

    // for(let i = 0;i <reviewSeeds.length; i++){
    //   ({_id : this._Review} = await User.findOne({employeeId:reviewSeeds[i].manager}));
    //   const manager = this._Review;

    //    ({_id : this._ReviewE} = await User.findOne({employeeId:reviewSeeds[i].employee}));
    //   const employee = this._ReviewE;

    //   const review ={
    //     manager : manager,
    //     employee : employee,
    //     month : reviewSeeds[i].month,
    //     review : reviewSeeds[i].review,

    //   };
    //   console.log(review);

    //   let reviewCreation = await Review.create(review);
    // }
    // console.info('================Review Seeded================');

    //----------------------Seeding Quotes----------------------
    // await Quotes.deleteMany({});

    // console.log('=========Collections Emptied================');

    // await Quotes.create(quotesSeeds);

    // console.table(quotesSeeds);

    // console.info('================Quotes Seeded================');

    let allUser = await User.find({});

    await Schedule.deleteMany({});

    let allUserId = [];

    for (let i = 0; i < allUser.length; i++) {
      let curUserId = allUser[i]._id;
      const createSchedule = await Schedule.create({ employee: curUserId });
    }

    let daysOfWeek = [
      "tuesday",
      "wednesday",
      "thursday",
      "friday",
      "saturday",
      "sunday",
    ];

    for (let i = 0; i < allUser.length; i++) {
      let curUserId = allUser[i]._id;
      for (let j = 0; j < daysOfWeek.length; j++) {
        let exampleSchedule = {
          dayOfWeek: daysOfWeek[j],
          isPresent: true,
          timeIn: "10:00 AM",
          timeOff: "07:30 PM",
        };

        const addedSchedule = await Schedule.findOneAndUpdate(
          { employee: curUserId },
          { $push: { schedule: exampleSchedule } }
        );
      }
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
});
