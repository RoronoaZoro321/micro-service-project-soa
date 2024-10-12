const Subscriber = require('../subscribers/baseSubscriber');
const { createUser } = require('../../controllers/controller');

class UserCreatedSubscriber extends Subscriber {
	constructor() {
		super('user:created', 'users-service-durable', async (data, msg) => {
			try {
				await createUser(data);
				console.log('User created in users service:', data);
				msg.ack();
			} catch (error) {
				console.error('Error handling user:created event:', error);
			}
		});
	}
}

module.exports = UserCreatedSubscriber;
