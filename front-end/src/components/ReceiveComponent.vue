<template>
    <div class="flex flex-row text-BLACKTEXT bg-indigo-50 p-2 rounded-md mb-2">
        <div class="rounded-lg w-12 flex items-center justify-center">
            <Iconify :icon="DollarSign" class="w-8 h-8" />
        </div>
        <div class="flex-grow">
            <div class="flex flex-row justify-between">
                <h2 class="px-2 ml-2 font-semibold" v-if="isDeposit">
                    <span class="text-lime-600">From</span> {{ showAccount }}
                </h2>
                <h2 class="px-2 ml-2 font-semibold" v-else>
                    <span class="text-red-600">To</span> {{ showAccount }}
                </h2>
                <span>+ ฿ {{ transactionData.amount }}</span>
            </div>
            <div class="flex justify-between">
                <p class="px-4 text-gray-400">
                    {{ formatDate(transactionData.createdAt) }}
                </p>
                <p class="text-gray-400" v-if="isDeposit">Transfer In</p>
                <p class="text-gray-400" v-else>Transfer Out</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import { defineProps, onBeforeUpdate, onMounted, ref, watch } from "vue";
import { useStore } from "../store/store";
import axios from "axios";

const store = useStore();
const isDeposit = ref(false);
const DollarSign = "healthicons:dollar";
const showAccount = ref(null);

const props = defineProps({
    transactionData: Object,
});

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString().slice(-2);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    const formattedTime = `${hours}:${minutes} ${ampm}`;
    return `${day}/${month}/${year}, ${formattedTime}`;
};

const fetchTransactionData = async () => {
    try {
        const fetchCurrentAccountId = await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/getAccountByAccountNumber",
            { accountNumber: store.currentAccount },
            { withCredentials: true }
        );

        const currentUser = await fetchCurrentAccountId.data;
        const currentAccountId = currentUser.data.account._id;
        const senderAccountId = props.transactionData.senderId;
        const receiverAccountId = props.transactionData.receiverId;

        const fetchSenderUserAccount = await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/getAccountById",
            { accountId: senderAccountId },
            { withCredentials: true }
        );

        const senderUserAccount = await fetchSenderUserAccount.data;
        const senderAccountNumber =
            senderUserAccount.data.account.accountNumber;

        const fetchReceiverUserAccount = await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/getAccountById",
            { accountId: receiverAccountId },
            { withCredentials: true }
        );

        const receiverUserAccount = await fetchReceiverUserAccount.data;
        const receiverAccountNumber =
            receiverUserAccount.data.account.accountNumber;

        if (currentAccountId === senderAccountId) {
            // TO
            isDeposit.value = false;
            showAccount.value = receiverAccountNumber;
        } else {
            // FROM
            isDeposit.value = true;
            showAccount.value = senderAccountNumber;
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
