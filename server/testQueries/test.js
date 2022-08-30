const connection = require("../config/connection");
const { Task, User, Review, Quotes, Schedule } = require("../models");
// const userSeeds = require("./userSeeds.json");
// const taskSeeds = require("./taskSeeds.json");
// const reviewSeeds = require('./reviewSeeds.json')
// const quotesSeeds = require("./quotesSeeds.json");

connection.on("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  try {
    const allTasks = await Task.find({}).populate("user").sort({ status: 1 });

    const rmInactive = allTasks.filter((task) => task.user.active === true);

    const allPendAndOver = rmInactive.filter(
      (task) => task.status === "pending" || task.status === "overdue"
    );

    let dups = [];

    for (let i = 0; i < allPendAndOver.length; i++) {
      let tempObj = allPendAndOver[i];
      for (let j = 0; j < allPendAndOver.length; j++) {

        if (i !== j) {
          if (
            new Date(tempObj.dueDate).getDate() === new Date(allPendAndOver[j].dueDate).getDate() &&
            tempObj.description === allPendAndOver[j].description &&
            tempObj.user._id === allPendAndOver[j].user._id
          ) {
            dups.push(tempObj);
          }
        }
      }
    }

    for (let i = 0; i < dups.length; i++) {
      let curId = dups[i]._id
      console.log(curId);
      await Task.deleteOne({_id : curId})
    }
    console.log(dups.length);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  process.exit(0);
});
