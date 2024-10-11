const natsWrapper = require('./natsWrapper');

const publishUserCreated = (userData) => {
	try {
		natsWrapper.publish('user:created', userData);
		console.log('Event published to user:created');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = { publishUserCreated };
