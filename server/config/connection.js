const mongoose = require('mongoose');
require('dotenv').config();

/* Connecting the database to the server. */
mongoose.connect(
	"mongodb+srv://malani:Malani2002@cluster0.lmrwitb.mongodb.net/malani_employee_portal?retryWrites=true&w=majority" || 'mongodb://localhost/malani_employee_portal',
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
	}
);

module.exports = mongoose.connection;
