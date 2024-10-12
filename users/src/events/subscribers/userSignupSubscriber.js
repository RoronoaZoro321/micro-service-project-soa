const { Subscriber } = require('@splaika/common');
const { createUser } = require('../../controllers/controller');

class UserSignupSubscriber extends Subscriber {
	constructor() {
		super('user:signup', 'users-service-durable', async (data, msg) => {
			try {
				await createUser(data);
				console.log('User signup in users service:', data);
				msg.ack();
			} catch (error) {
				console.error('Error handling user:signup event:', error);
			}
		});
	}
}

module.exports = UserSignupSubscriber;
