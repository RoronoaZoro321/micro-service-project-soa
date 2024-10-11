const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
	pin: {
		type: String,
		required: [true, 'Please provide a pin'],
		minlength: 4,
		select: false,
	},
});

userSchema.pre('save', async function (next) {
	// Only run this function if pin was actually modified
	if (!this.isModified('pin')) return next();

	// Hash the pin with cost of 12
	this.pin = await bcrypt.hash(this.pin, 12);
	next();
});

// Method to compare pin
userSchema.methods.correctPin = async function (candidatePin, userPin) {
	return await bcrypt.compare(candidatePin, userPin);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
