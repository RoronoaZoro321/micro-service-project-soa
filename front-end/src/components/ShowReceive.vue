<template>
	<div class="flex justify-between overflow-auto">
		<h1>Transactions</h1>
		<p
			class="cursor-pointer hover:text-red-600"
			@click="goto({ path: '/notification' })"
		>
			See All
		</p>
	</div>
	<div v-if="!haveData" class="p-4">You have no transaction.</div>
	<div v-else class="p-4">
		<ReceiveComponent
			v-for="(transaction, index) in latestTransactions"
			:key="index"
			:transactionData="transaction"
		/>
	</div>
</template>

<script setup>
import { Icon as Iconify } from '@iconify/vue';
import ReceiveComponent from './ReceiveComponent.vue';
import { useRouter, useRoute } from 'vue-router';
import { onMounted, ref, computed, watch } from 'vue';
import { useStore } from '../store/store';
import axios from 'axios';

const transactionData = ref(null);
const haveData = ref(false);
const router = useRouter();
const route = useRoute();
const store = useStore();

function goto(page) {
	if (page.name && page.name !== route.name) {
		router.push({ name: page.name });
		return;
	}
	if (page.path && page.path !== route.path) {
		router.push({ path: page.path });
		return;
	}
}

const latestTransactions = computed(() => {
	if (transactionData.value) {
		// console.log(transactionData.value);
		return transactionData.value.slice(-4).reverse();
	}
	return [];
});

const fetchTransactionData = async () => {
	try {
		haveData.value = false;
		const fetchAccountId = await axios.get(
			`https://splaika.com/api/v1/accounts/getAccountByAccountNumber/${store.currentAccount}`,
			{ withCredentials: true }
		);

		const fetchedData = await fetchAccountId.data;
		const accountId = fetchedData.data.account._id;
		console.log(accountId);

		const response = await axios.get(
			`https://splaika.com/api/v1/statements/getStatementsByAccountId/${accountId}`,
			{ withCredentials: true }
		);

		const data = await response.data;
		console.log('ioawhfiuwahfouiaehnfiuoawhfioawf', data);

		const sortedTransactions = data.data.statements.sort((a, b) => {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});

		transactionData.value = sortedTransactions;

		if (transactionData.value.length > 0) haveData.value = true;
	} catch (error) {
		haveData.value = false;
		console.log(error.response.data);
		transactionData.value = null;
	}
};

onMounted(() => {
	fetchTransactionData();
});

watch(
	() => store.currentAccount,
	(newAccount, oldAccount) => {
		console.log('Account changed from', oldAccount, 'to', newAccount);
		if (newAccount !== oldAccount) {
			fetchTransactionData(newAccount);
		}
	},
	{ deep: true }
);
</script>
