const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
	citizenId: {
		type: String,
		required: [true, 'Please insert your citizen card id'],
		unique: true,
	},
	name: {
		type: String,
		required: [true, 'Please tell us your name'],
	},
	email: {
		type: String,
		required: [true, 'Please provide your email'],
		unique: true,
		lowercase: true,
		validate: [validator.isEmail, 'Please provide a valid email'],
	},
	accounts: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Account',
		},
	],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
