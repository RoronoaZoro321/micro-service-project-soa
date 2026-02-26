<template>
	<div class="hover:bg-sky-50 p-2 rounded-md">
		<div class="flex flex-row text-BLACKTEXT">
			<div class="rounded-lg w-8">
				<img src="../assets/profile.png" />
			</div>
			<div class="flex flex-col ml-2">
				<div class="flex justify-center items-center">
					<span class="pr-2 font-semibold"
						><span class="text-slate-500">From</span>
						{{ senderName }}</span
					>
					<span class="pr-2 font-semibold"
						><span class="text-slate-500">To</span>
						{{ receiverName }}</span
					>
				</div>
				<p>transfer ฿ {{ transactionData.amount }}</p>
			</div>
		</div>
		<div class="flex justify-between">
			<p class="text-gray-400 px-2">
				{{ formatDate(transactionData.createdAt) }}
			</p>
			<p class="text-lime-600" v-if="isDeposit">Transfer In</p>
			<p class="text-red-700" v-else>Transfer Out</p>
		</div>
	</div>
</template>

<script setup>
import { Icon as Iconify } from '@iconify/vue';
import { defineProps, onBeforeUpdate, onMounted, ref, watch } from 'vue';
import { useStore } from '../store/store';
import axios from 'axios';

const store = useStore();
const isDeposit = ref(false);
const DollarSign = 'healthicons:dollar';
const senderName = ref(null);
const receiverName = ref(null);

const props = defineProps({
	transactionData: Object,
});

const formatDate = (dateString) => {
	const date = new Date(dateString);
	const day = date.getDate().toString().padStart(2, '0');
	const month = (date.getMonth() + 1).toString().padStart(2, '0');
	const year = date.getFullYear().toString().slice(-2);
	let hours = date.getHours();
	const minutes = date.getMinutes().toString().padStart(2, '0');
	const ampm = hours >= 12 ? 'PM' : 'AM';
	hours = hours % 12;
	hours = hours ? hours : 12; // the hour '0' should be '12'
	const formattedTime = `${hours}:${minutes} ${ampm}`;
	return `${day}/${month}/${year}, ${formattedTime}`;
};

const fetchTransactionData = async () => {
	switch (props.transactionData.type) {
		case 'topup':
			await fetchTopupTransactionData();
			break;
		case 'transfer':
			await fetchTransferTransactionData();
			break;
		default:
			break;
	}
};

const fetchTopupTransactionData = async () => {
	try {
		isDeposit.value = true;
		senderName.value = 'Topup';
		receiverName.value = 'Me';
	} catch (error) {
		console.log(error);
	}
};

const fetchTransferTransactionData = async () => {
	try {
		const fetchReceiverAccountId = await axios.get(
			`https://splaika.com/api/v1/accounts/getAccountById/${props.transactionData.receiverAccountId}`,
			{ withCredentials: true }
		);

		const receiverAccountData = await fetchReceiverAccountId.data;
		const receiverAccountNumber =
			receiverAccountData.data.account.accountNumber;

		const fetchSenderAccountId = await axios.get(
			`https://splaika.com/api/v1/accounts/getAccountById/${props.transactionData.senderAccountId}`,
			{ withCredentials: true }
		);

		const senderAccountData = await fetchSenderAccountId.data;
		const senderAccountNumber =
			senderAccountData.data.account.accountNumber;

		if (store.currentAccount === senderAccountNumber) {
			// TO
			isDeposit.value = false;
			senderName.value = senderAccountNumber;
			receiverName.value = receiverAccountNumber;
		} else {
			// FROM
			isDeposit.value = true;
			senderName.value = senderAccountNumber;
			receiverName.value = receiverAccountNumber;
		}
	} catch (error) {
		console.log(error);
	}
};

onMounted(() => {
	fetchTransactionData();
});

watch(
	() => props.transactionData,
	(newData) => {
		fetchTransactionData();
	},
	{ deep: true }
);
</script>
