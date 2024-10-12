const { Subscriber } = require('@splaika/common');
const { createFirstAccount } = require('../../controllers/controller');

class UserCreatedSubscriber extends Subscriber {
	constructor() {
		super('user:created', 'accounts-service-durable', async (data, msg) => {
			try {
				await createFirstAccount(data);
				console.log('Account created in accounts service:', data);
				msg.ack();
			} catch (error) {
				console.error('Error handling user:created event:', error);
			}
		});
	}
}

module.exports = UserCreatedSubscriber;
