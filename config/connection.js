const mongoose = require('mongoose');
require('dotenv').config();

/* Connecting the database to the server. */
mongoose.connect(
	process.env.MONGODB_URI || 'mongodb://localhost/malani_employee_portal',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

module.exports = mongoose.connection;
