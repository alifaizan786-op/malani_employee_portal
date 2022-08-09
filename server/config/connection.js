const mongoose = require('mongoose');
require('dotenv').config()
//
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/malani_employee_portal', { //connect database to server
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = mongoose.connection;