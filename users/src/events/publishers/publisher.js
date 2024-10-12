const { natsWrapper } = require('@splaika/common');

const publishUserCreated = async (userData) => {
	try {
		await natsWrapper.publish('user:created', userData);
		console.log('Event published to user:created');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = { publishUserCreated };
