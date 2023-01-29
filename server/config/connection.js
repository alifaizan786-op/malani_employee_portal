const mongoose = require('mongoose');
require('dotenv').config();

/* Connecting the database to the server. */
mongoose.connect(
	// process.env.MONGODB_URI || 'mongodb://localhost/malani_employee_portal',
	`mongodb+srv://malani:Malani2002@cluster0.lmrwitb.mongodb.net/MalaniEmployeePortalDev?retryWrites=true&w=majority`,
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

module.exports = mongoose.connection;
