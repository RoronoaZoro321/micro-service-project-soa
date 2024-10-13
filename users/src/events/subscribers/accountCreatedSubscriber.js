const { Subscriber } = require('@splaika/common');
const { updateUserAccounts } = require('../../controllers/controller'); // Import the controller

class AccountCreatedSubscriber extends Subscriber {
	constructor() {
		super(
			'account:created',
			'account-created-durable',
			async (data, msg) => {
				const { accountId, userId } = data;

				try {
					// Delegate user account update to the controller function
					await updateUserAccounts(userId, accountId);

					// Acknowledge the message after successful processing
					msg.ack();
				} catch (error) {
					console.error(
						'Error handling account:created event:',
						error
					);
				}
			}
		);
	}
}

module.exports = AccountCreatedSubscriber;
