const Subscriber = require('../subscribers/baseSubscriber');
const { createUser } = require('../../controllers/controller');

class UserCreatedSubscriber extends Subscriber {
	constructor() {
		super('user:created', 'users-service', async (data, msg) => {
			try {
				await createUser(data);
				console.log('User created in users service:', data);
				// Optionally, acknowledge the message if using manual acknowledgment
				// msg.ack();
			} catch (error) {
				console.error('Error handling user:created event:', error);
				// Handle retry logic or dead-letter queue if necessary
			}
		});
	}
}

module.exports = UserCreatedSubscriber;
