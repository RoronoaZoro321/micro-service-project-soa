const { natsWrapper } = require('@splaika/common');

const publishAccountUpdated = async (data) => {
	try {
		await natsWrapper.publish('account:updated', data);
		console.log('Event published to account:updated');
	} catch (error) {
		console.error('Error publishing event:', error);
	}
};

module.exports = { publishAccountUpdated };
