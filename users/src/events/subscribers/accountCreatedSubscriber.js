const { Subscriber } = require('@splaika/common');
const User = require('../../models/userModel'); // Import the User model

class AccountCreatedSubscriber extends Subscriber {
	constructor() {
		super(
			'account:created',
			'account-created-durable',
			async (data, msg) => {
				const { accountId, userId } = data;

				try {
					const user = await User.findById(userId);

					if (!user) {
						throw new Error('User not found');
					}

					user.accounts.push(accountId);
					await user.save();

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
