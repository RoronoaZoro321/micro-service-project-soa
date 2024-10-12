<template>
  <div class="p-2 rounded-md hover:bg-sky-50">
    <div class="flex flex-row text-BLACKTEXT">
      <div class="rounded-lg w-12">
        <img src="../assets/profile.png" />
      </div>
      <div class="flex-grow">
        <div class="">
          <div class="flex -lex-cols">
            <h2 class="px-2 font-semibold">Porf</h2>
            <span class="pr-2 font-semibold">(98764321)</span>
            <p>transfer ฿ 500</p>
          </div>
          <div class="flex flex-row">
            <h2 class="mx-2 font-semibold">Luka the junior</h2>
            <span class="pr-2 font-semibold">(123456789)</span>
          </div>
        </div>
        <div class="flex justify-between">
          <p class="text-gray-400 px-2">12/12/12</p>
          <p class="text-lime-600" v-if="isDeposit">Transfer In</p>
          <p class="text-red-700" v-else>Transfer Out</p>
        </div>
      </div>
      <!-- <div class="flex-grow">
                <div v-if="isDeposit" class="flex flex-row">
                    <h2 class="px-2 ml-2 font-semibold">
                        {{ store.currentAccountName }}
                    </h2>
                    <span class="pr-2 font-semibold"
                        >({{ store.currentAccount }})</span
                    >
                    <p>transfer ฿ {{ transactionData.amount }} receive</p>
                    <h2 class="mx-2 font-semibold">{{ showAccountName }}</h2>
                    <span class="font-semibold">({{ showAccount }})</span>
                </div>
                <div v-else class="flex flex-row">
                    <h2 class="px-2 ml-2 font-semibold">
                        {{ store.currentAccountName }}
                    </h2>
                    <span class="pr-2 font-semibold"
                        >({{ store.currentAccount }})</span
                    >
                    <p>transfer ฿ {{ transactionData.amount }} to</p>
                    <h2 class="mx-2 font-semibold">{{ showAccountName }}</h2>
                    <span class="font-semibold">({{ showAccount }})</span>
                </div>
                <div class="flex justify-between">
                    <p class="px-4 text-gray-400">
                        {{ formatDate(transactionData.createdAt) }}
                    </p>
                    <p class="text-lime-600" v-if="isDeposit">Transfer In</p>
                    <p class="text-red-700" v-else>Transfer Out</p>
                </div>
            </div> -->
    </div>
  </div>
  <div class="border-b"></div>
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import { defineProps, onBeforeUpdate, onMounted, ref, watch } from "vue";
import { useStore } from "../store/store";
import axios from "axios";

const store = useStore();
const isDeposit = ref(false);
const showAccount = ref(null);
const showAccountName = ref(null);

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

const getUserById = async (userId) => {
  const getUser = await axios.post(
    "http://127.0.0.1:3000/api/v1/esb/users/getUserById",
    { userId: userId },
    { withCredentials: true }
  );

  const userData = await getUser.data;

  const userName = userData.data.user.name;

  return userName;
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
    const senderAccountNumber = senderUserAccount.data.account.accountNumber;

    const senderUserId = senderUserAccount.data.account.userId;

    const fetchReceiverUserAccount = await axios.post(
      "http://127.0.0.1:3000/api/v1/esb/users/accounts/getAccountById",
      { accountId: receiverAccountId },
      { withCredentials: true }
    );

    const receiverUserAccount = await fetchReceiverUserAccount.data;
    const receiverAccountNumber =
      receiverUserAccount.data.account.accountNumber;

    const receiverUserId = receiverUserAccount.data.account.userId;

    if (currentAccountId === senderAccountId) {
      // TO
      isDeposit.value = false;
      showAccount.value = receiverAccountNumber;
      const userName = await getUserById(receiverUserId);
      showAccountName.value = userName;
    } else {
      // FROM
      isDeposit.value = true;
      showAccount.value = senderAccountNumber;
      const userName = await getUserById(senderUserId);
      showAccountName.value = userName;
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
