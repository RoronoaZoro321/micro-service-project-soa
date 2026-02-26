const { natsWrapper } = require('@splaika/common');

const publishUserSignup = async (data) => {
	try {
		await natsWrapper.publish('user:signup', data);
		console.log('Event published to user:signup');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = { publishUserSignup };
