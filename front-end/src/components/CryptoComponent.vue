<template>
  <div
    v-if="isModalVisible"
    class="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-[calc(100%)] max-h-screen bg-black bg-opacity-50"
  >
    <div class="bg-white p-6 rounded-lg shadow-md text-center h-auto w-96">
      <div class="flex flex-row justify-center">

        <Iconify
          :icon="Coin"
          class="text-yellow-500 w-16 h-16 animate-bounce"
        />

      </div>

      <h1 class="font-bold text-2xl mb-2">Crypto</h1>
      <div class="font-semibold text-slate-500 mb-2"><p > your balacne</p><span > 0.00</span></div>
      
      <select
        v-model="selectedOption"
        class="border border-gray-300 rounded-md px-4 py-2 w-full"
      >
        <option disabled value="">Please select one</option>
        <option value="Deposit">Deposit</option>
        <option value="Transfer">Transfer</option>
      </select>

      <!-- Conditionally Render Deposit Input -->
      <div v-if="selectedOption === 'Deposit'" class="mt-4">
        <label for="depositAmount" class="block mb-2 text-left"
          >Enter deposit amount:</label
        >
        <input
          type="number"
          v-model="depositAmount"
          id="depositAmount"
          class="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>

      <!-- Conditionally Render Transfer Input -->
      <div v-if="selectedOption === 'Transfer'" class="mt-4">
        <label for="transferAmount" class="block mb-2 text-left"
          >Enter transfer amount:</label
        >
        <input
          type="number"
          v-model="transferAmount"
          id="transferAmount"
          class="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
        <label for="transferAmount" class="block mb-2 text-left"
          >Enter Address to:</label
        >
        <input
          type="number"
          v-model="transferAmount"
          id="transferAmount"
          class="border border-gray-300 rounded-md px-4 py-2 w-full"
        />
      </div>
      <button
        class="bg-red-200 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 border border-red-200 rounded shadow ring-green-50 mt-8 mr-2"
        @click="closeModal"
      >
        cancel
      </button>
      <button
        class="bg-blue-200 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-blue-200 rounded shadow ring-green-50 mt-8"
      >
        submit
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Icon as Iconify } from "@iconify/vue";
const Coin = "jam:coin-f";
const isModalVisible = ref(true);

const selectedOption = ref("");
const depositAmount = ref("");
const transferAmount = ref("");
const closeModal = () => {
  isModalVisible.value = false;
};
</script>
