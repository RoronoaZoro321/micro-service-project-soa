const { Subscriber } = require('@splaika/common');
const { updateAccount } = require('../../controllers/controller');

class AccountUpdatedSubscriber extends Subscriber {
	constructor() {
		super(
			'account:updated',
			'account-updated-durable',
			async (data, msg) => {
				try {
					await updateAccount(data);
					msg.ack();
				} catch (error) {
					console.error(
						'Error handling account:updated event:',
						error
					);
				}
			}
		);
	}
}

module.exports = AccountUpdatedSubscriber;
