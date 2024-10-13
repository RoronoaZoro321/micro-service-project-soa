const { Subscriber } = require('@splaika/common');
const { createUser } = require('../../controllers/controller');

class UserSignupSubscriber extends Subscriber {
	constructor() {
		super('user:signup', 'user-signup-durable', async (data, msg) => {
			try {
				await createUser(data);
				msg.ack();
			} catch (error) {
				console.error('Error handling user:signup event:', error);
			}
		});
	}
}

module.exports = UserSignupSubscriber;
