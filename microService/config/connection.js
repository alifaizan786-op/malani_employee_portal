const mongoose = require('mongoose');

//
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/malani_employee_portal', { //connect database to server
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

module.exports = mongoose.connection;