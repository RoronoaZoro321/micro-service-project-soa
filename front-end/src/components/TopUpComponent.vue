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
  <label for="AccountID" class="block mb-2 text-left">ID number:</label>
  <input
    type="number"
    v-model="AccountID"
    id="AccountID"
    placeholder="enter account ID"
    class="border border-gray-300 rounded-md px-4 py-2 w-full"
  />
  <div >
    <button
      class="bg-red-200 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 border border-red-200 rounded shadow ring-green-50 mt-8 mr-2"
      @click="cancel"
    >
      cancel
    </button>
    <button
      class="bg-blue-200 hover:bg-blue-100 text-blue-600 font-semibold py-2 px-4 border border-blue-200 rounded shadow ring-green-50 mt-8"
    >
      submit
    </button>
  </div>

  <TopupSuccess v-if="isSuccess" />
  <TopupFail v-if="isFail" />
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import TopupSuccess from "./TopupSuccess.vue";
import TopupFail from "./TopupFail.vue";
import { onMounted, ref, defineEmits } from "vue";
const ArrowDown = "charm:arrow-down";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { useStore } from "../store/store";
import axios from "axios";

const form$ = ref(null);
const isSubmit = ref(false);
const isSuccess = ref(false);
const isFail = ref(false);
const router = useRouter();
const route = useRoute();
const store = useStore();
const emits = defineEmits(["close-drawer"]);
const cancel = () => {
  emits("close-drawer"); // Emit event to close the drawer
};
// const getFormData = () => {
//   return {
//     accountNumber: store.currentAccount,
//     code: form$.value.el$("ID number").value,
//   };
// };

// function goto(page) {
//   if (page.name && page.name !== route.name) {
//     router.push({ name: page.name });
//     return;
//   }
//   if (page.path && page.path !== route.path) {
//     router.push({ path: page.path });
//     return;
//   }
// }

// const submit = async () => {
//   isSubmit.value = true;

//   const formData = getFormData();

//   try {
//     const response = await axios.patch(
//       "http://127.0.0.1:3000/api/v1/esb/topup",
//       formData,
//       { withCredentials: true }
//     );

//     const data = await response.data;

//     isSuccess.value = true;

//     setTimeout(() => {
//       isSuccess.value = false;
//       router.push("/balance");
//     }, 3000);
//   } catch (error) {
//     isFail.value = true;

//     setTimeout(() => {
//       isFail.value = false;
//       router.push("/balance");
//     }, 3000);
//   } finally {
//     isSubmit.value = false;
//   }
// };

// onMounted(() => {
//   if (!store.currentAccount) {
//     router.push("/balance");
//   }
// });
</script>
