<template>
  <div
    v-if="isModalVisible"
    class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%)] max-h-screen bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-md text-center h-auto w-96">
      <div class="flex flex-row justify-center">
        <Iconify :icon="Coin" class="text-yellow-500 w-16 h-16 animate-bounce" />
      </div>

      <h1 class="font-bold text-2xl mb-2">Crypto</h1>

      <div class="font-semibold text-xs text-slate-500 mb-2">
        <p>Wallet address:</p>
        <span>{{ currentAccount }}</span>
      </div>

      <div class="font-semibold text-slate-500 mb-2">
        <p>Your balance:</p>
        <span>{{ balance }}</span>
      </div>

      <select v-model="selectedOption" class="border border-gray-300 rounded-md px-4 py-2 w-full">
        <option disabled value="">Please select one</option>
        <option value="Deposit">Deposit</option>
        <option value="Transfer">Transfer</option>
      </select>

      <div v-if="selectedOption === 'Deposit'" class="mt-4">
        <label for="depositAmount" class="block mb-2 text-left">Enter deposit amount:</label>
        <input
          type="number"
          v-model="newValue"
          id="depositAmount"
          class="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>

      <div v-if="selectedOption === 'Transfer'" class="mt-4">
        <label for="transferAmount" class="block mb-2 text-left">Enter transfer amount:</label>
        <input
          type="number"
          v-model="transfer_amount"
          id="transferAmount"
          class="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <label for="receiverAddress" class="block mb-2 text-left">Enter receiver address:</label>
        <input
          type="text"
          v-model="receiver"
          id="receiverAddress"
          class="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>

      <button
        class="bg-red-200 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 border border-red-200 rounded shadow ring-green-50 mt-8 mr-2"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        class="bg-blue-200 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-blue-200 rounded shadow ring-green-50 mt-8"
        @click="submit"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Web3 from "web3";
import { Icon as Iconify } from "@iconify/vue";
const Coin = "jam:coin-f";

// State variables
const isModalVisible = ref(true);
const selectedOption = ref("");
const depositAmount = ref(0);
const transferAmount = ref(0);
const balance = ref(0);
const newValue = ref(0);
const transfer_amount = ref(0);
const receiver = ref("");
const currentAccount = ref("");

// Web3-related variables
let web3;
let contract;
const contractAddress = "0x8eCBBef8b2fDd4fD38Ba0E1c19Dc89d9B7D3F51c";

// Contract ABI (trimmed for brevity)
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

onMounted(() => {

  
  if (typeof window.ethereum !== "undefined") {
    connectWallet();
    web3 = new Web3(window.ethereum);
    contract = new web3.eth.Contract(contractABI, contractAddress);
    getBalanceFromContract();

    // Listen for account changes
    window.ethereum.on("accountsChanged", function (accounts) {
      currentAccount.value = accounts[0];
      getBalanceFromContract();
    });
  } else {
    alert("MetaMask is not installed. Please install it to use this app.");
  }
});

async function connectWallet() {
  try {
    const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
    currentAccount.value = accounts[0];
    getBalanceFromContract();
  } catch (error) {
    console.error("Error connecting to wallet:", error);
  }
}

async function getBalanceFromContract() {
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    let result = await contract.methods.getBalance().call({ from: account });
    console.log("balance", result);
    balance.value = result;
  } catch (error) {
    console.error("Error getting balance value:", error);
  }
}

async function depositToContract() {
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    await contract.methods.deposit(newValue.value).send({ from: account });
    
    getBalanceFromContract();
  } catch (error) {
    console.error("Error depositing money:", error);
  }
}

async function transferCrypto() {
  try {
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    
    if (!web3.utils.isAddress(receiver.value)) {
      alert("Invalid receiver address. Please enter a valid Ethereum address.");
      return;
    }
    
    await contract.methods.transfer(transfer_amount.value, receiver.value).send({
      from: account,
    });
    getBalanceFromContract();
  } catch (error) {
    console.error("Error during transfer:", error);
  }
}

const closeModal = () => {
  isModalVisible.value = false;
};

const submit = () => {
  if (selectedOption.value === 'Deposit') {
    depositToContract();
  } else if (selectedOption.value === 'Transfer') {
    transferCrypto();
  }
};
</script>
