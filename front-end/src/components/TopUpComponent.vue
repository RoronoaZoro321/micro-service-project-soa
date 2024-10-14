<template>
	<!-- <Vueform
    size="md"
    :display-errors="false"
    add-class="vf-create-account"
    ref="form$"
    :endpoint="false"
    @submit="submit"
  >
    <StaticElement
      name="register_title"
      tag="h3"
      content="Top up"
      align="center"
    />
    <TextElement
      name="ID number"
      label="ID number"
      placeholder="Enter ID number"
    /> -->

	<!-- <ButtonElement
      name="reset"
      button-label="Back"
      @click="goto({ path: '/balance' })"
      :secondary="true"
      :resets="true"
      :columns="{
        container: 3,
      }"
    />

    <ButtonElement
      name="transfer"
      button-label="Next"
      :submits="true"
      :full="true"
      size="md"
         @click="mockSubmit"
      :columns="{
        container: 3,
      }"
    />
  </Vueform> -->
	<h2 class="font-semibold text-2xl">Top Up</h2>
	<label for="codeId" class="block mb-2 text-left">ID number:</label>
	<input
		type="text"
		v-model="codeId"
		id="codeId"
		placeholder="enter code ID"
		class="border border-gray-300 rounded-md px-4 py-2 w-full"
	/>
	<div>
		<button
			class="bg-red-200 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 border border-red-200 rounded shadow ring-green-50 mt-8 mr-2"
			@click="cancel"
		>
			cancel
		</button>
		<button
			class="bg-blue-200 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-blue-200 rounded shadow ring-green-50 mt-8"
			@click="submit"
		>
			submit
		</button>
	</div>

	<TopupSuccess v-if="isSuccess" />
	<TopupFail v-if="isFail" />
</template>

<script setup>
import { ref, defineEmits } from 'vue';
import { Icon as Iconify } from '@iconify/vue';
import TopupSuccess from './TopupSuccess.vue';
import TopupFail from './TopupFail.vue';
import { useStore } from '../store/store';
import axios from 'axios';

const isSubmit = ref(false);
const isSuccess = ref(false);
const isFail = ref(false);
const codeId = ref('');
const store = useStore();
const emits = defineEmits(['close-drawer']);

const cancel = () => {
	emits('close-drawer');
};

const submit = async () => {
	isSubmit.value = true;
	try {
		const fetchAccountId = await axios.get(
			`https://splaika.com/api/v1/accounts/getAccountByAccountNumber/${store.currentAccount}`,
			{ withCredentials: true }
		);
		const accountData = fetchAccountId.data;

		const response = await axios.put(
			'https://splaika.com/api/v1/topup',
			{ accountId: accountData.data.account._id, code: codeId.value },
			{ withCredentials: true }
		);

		isSuccess.value = true;

		setTimeout(() => {
			isSuccess.value = false;
			window.location.reload();
			cancel();
		}, 3000);
	} catch (error) {
		console.error('Error in topup:', error.response?.data || error.message);
		isFail.value = true;
		setTimeout(() => {
			isFail.value = false;
			window.location.reload();
			cancel();
		}, 3000);
	} finally {
		isSubmit.value = false;
	}
};
</script>
