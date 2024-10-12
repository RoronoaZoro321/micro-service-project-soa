const { natsWrapper } = require('@splaika/common');

const publishUserSignup = async (userData) => {
	try {
		await natsWrapper.publish('user:signup', userData);
		console.log('Event published to user:signup');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = { publishUserSignup };
