const mongoose = require('mongoose');
require('dotenv').config();

/* Connecting the database to the server. */
mongoose.connect(
	'mongodb+srv://malani:Malani2002@cluster0.lmrwitb.mongodb.net/MalaniEmployeePortalLive?retryWrites=true&w=majority',
	// process.env.MONGODB_URI || 'mongodb://localhost/malani_employee_portal',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

module.exports = mongoose.connection;
