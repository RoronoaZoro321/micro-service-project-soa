const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
	subject: {
		type: String,
		required: true,
	},
	message: {
		type: String,
		required: true,
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
