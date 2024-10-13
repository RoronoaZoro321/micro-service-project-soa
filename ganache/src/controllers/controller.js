const { catchAsync, AppError, User } = require('@splaika/common');
const { Web3 } = require('web3');

console.log("connecting to ganache...");
// Connect to Ganache
const web3 = new Web3('http://ganache:8545');
// const web3 = new Web3('http://0.0.0.0:8545');
console.log("connected to ganache...");

const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "deposit",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "transfer",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Deposit",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "account",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "Withdraw",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getBalance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "test",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	}
]
const contractAddress = "0x1fD0778e0421951C02F37C0fcBB62a2F242f39C5"

exports.getAccounts = catchAsync(async (req, res, next) => {
    const accounts = await web3.eth.getAccounts();
	res.status(200).json({
		status: 'success',
		results: accounts.length,
		data: {
			accounts,
		},
	});
});

exports.getContractAbiAndAddress = catchAsync(async (req, res, next) => {
	res.status(200).json({
		status: 'success',
		data: {
			contractABI,
			contractAddress
		}
	})
});

exports.getBalance = catchAsync(async (req, res, next) => {
	
	if (typeof window.ethereum !== "undefined") {
		contract = new web3.eth.Contract(contractABI, contractAddress);

		const balance = await contract.methods.getBalance().call();

		res.status(200).json({
			status: 'success',
			data: {
				balance,
			}
		});
	} else {
		next(new AppError('Ethereum object not found', 400));
	}
});
