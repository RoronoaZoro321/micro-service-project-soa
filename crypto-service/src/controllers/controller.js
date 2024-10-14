const { catchAsync, AppError, User } = require('@splaika/common');

const contractABI = [
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Deposit',
		type: 'event',
	},
	{
		anonymous: false,
		inputs: [
			{
				indexed: true,
				internalType: 'address',
				name: 'account',
				type: 'address',
			},
			{
				indexed: false,
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'Withdraw',
		type: 'event',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
		],
		name: 'deposit',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [
			{
				internalType: 'uint256',
				name: 'amount',
				type: 'uint256',
			},
			{
				internalType: 'address',
				name: 'receiver',
				type: 'address',
			},
		],
		name: 'transfer',
		outputs: [],
		stateMutability: 'nonpayable',
		type: 'function',
	},
	{
		inputs: [],
		stateMutability: 'nonpayable',
		type: 'constructor',
	},
	{
		inputs: [],
		name: 'getBalance',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'owner',
		outputs: [
			{
				internalType: 'address',
				name: '',
				type: 'address',
			},
		],
		stateMutability: 'view',
		type: 'function',
	},
	{
		inputs: [],
		name: 'test',
		outputs: [
			{
				internalType: 'uint256',
				name: '',
				type: 'uint256',
			},
		],
		stateMutability: 'pure',
		type: 'function',
	},
];

const contractAddress = '0x03633aA4b3827a738C678F9661f04E8f5bDaDd7E';

exports.getContractAbiAndAddress = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
			contractABI,
			contractAddress,
		},
	});
});

exports.deposit = catchAsync(async (req, res, next) => {
	const { amount } = req.body;

	console.log('remove money from user account', amount);
	console.log('depositing to crypto to', amount);

	isSuccess = true;

	res.status(200).json({
		status: 'success',
		data: {
			isSuccess,
		},
	});
});

exports.transfer = catchAsync(async (req, res, next) => {
	const { amount, receiver } = req.body;

	console.log('remove money from user account', amount);
	console.log('transfering to', receiver, amount);

	isSuccess = true;

	res.status(200).json({
		status: 'success',
		data: {
			isSuccess,
		},
	});
});
