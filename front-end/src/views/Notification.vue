<template>
    <NavHonrizontal />
    <div class="p-8">
        <div class="flex justify-between mb-4">
            <div class="flex flex-row">
                <p class="text-base font-semibold pr-2">Transactions</p>
            </div>
        </div>
        <div>
            <div v-if="!haveData" class="p-4">You have no transaction.</div>
            <div v-else class="divide-y">
                <NotificationComponent
                    v-for="(transaction, index) in latestTransactions"
                    :key="index"
                    :transactionData="transaction"
                />
            </div>
        </div>
    </div>

    <TransactionsLoading v-if="isLoading" />
</template>

<script setup>
import { computed, onMounted, ref } from "vue";
import axios from "axios";
import NavHonrizontal from "../app-layouts/NavHonrizontal.vue";
import NotificationComponent from "../components/NotificationComponent.vue";
import { Icon as Iconify } from "@iconify/vue";
import TransactionsLoading from "../components/TransactionsLoading.vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "../store/store";
import { watch } from "vue";

const ArrowDown = "iconamoon:arrow-down-2-duotone";

const router = useRouter();
const store = useStore();
const isLoading = ref(false);
const haveData = ref(false);
const transactionData = ref(null);

const latestTransactions = computed(() => {
    if (transactionData.value) {
        // console.log(transactionData.value);
        return transactionData.value.reverse();
    }
    return [];
});

const fetchTransactionData = async () => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/transaction/MyAccTransactions",
            { accountNumber: store.currentAccount },
            { withCredentials: true }
        );

        const data = await response.data;

        const sortedTransactions = data.data.transactions.sort((a, b) => {
            return new Date(a.createdAt) - new Date(b.createdAt);
        });

        console.log(sortedTransactions);

        transactionData.value = sortedTransactions;

        if (transactionData.value.length > 0) haveData.value = true;
    } catch (error) {
        haveData.value = false;
        console.log(error.response.data);
        transactionData.value = null;
    }
};

onMounted(() => {
    if (!store.currentAccount) {
        router.push("/balance");
    }

    isLoading.value = true;

    fetchTransactionData();

    setTimeout(() => {
        isLoading.value = false;
    }, 6000);
});

watch(
    () => store.currentAccount,
    (newAccount, oldAccount) => {
        if (newAccount !== oldAccount) {
            isLoading.value = true;

            fetchTransactionData();

            setTimeout(() => {
                isLoading.value = false;
            }, 6000);
        }
    }
);
</script>
