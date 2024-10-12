<template>
    <div>
        <h3 class="text-l font-semibold text-gray-800 mb-8">
            Transfer Money To
        </h3>
        <div class="flex justify-center">
            <div class="grid justify-items-center">
                <img
                    src="../assets/profile.png"
                    alt="profile"
                    class="rounded-full w-16 mb-4"
                />
                <div class="mb-8">
                    <h3 class="text-center">
                        {{ store.receiverAccountName }}
                    </h3>
                    <h3 class="text-xs text-gray-400">
                        {{ store.receiverAccountNumber }}
                    </h3>
                </div>
                <span class="font-semibold text-xl">
                    ฿ {{ store.transferAmount }}</span
                >
            </div>
        </div>
        <div
            class="mx-auto my-12 border-solid border flex w-full justify-between border-slate-200 p-2 rounded-lg"
        >
            <p class="text-sm text-gray-400">Your Account</p>
            <span class="ml-6 text-sm">{{ store.currentAccount }}</span>
        </div>
        <Vueform
            size="md"
            :display-errors="false"
            add-class="vf-create-account"
            :endpoint="false"
        >
            <ButtonElement
                name="reset"
                button-label="Back"
                @click="goto({ path: '/balance' })"
                :secondary="true"
                :resets="true"
                :columns="{
                    container: 9,
                }"
            />
            <ButtonElement
                name="transfer"
                button-label="Next"
                :full="true"
                size="md"
                :columns="{
                    container: 3,
                }"
                @click="submit"
            />
        </Vueform>

        <TransferSuccess v-if="isSuccess" />
        <TransferFail v-if="isFail" />
    </div>
</template>

<script setup>
import { useRouter, useRoute, RouterLink } from "vue-router";
import axios from "axios";
import { onMounted, ref } from "vue";
import { useStore } from "../store/store";
import TransferSuccess from "./TransferSuccess.vue";
import TransferFail from "./TransferFail.vue";

const store = useStore();

const isSuccess = ref(false);
const isFail = ref(false);
const router = useRouter();
const route = useRoute();

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

const submit = async () => {
    const formData = {
        senderAccountNumber: Number(store.currentAccount),
        receiverAccountNumber: Number(store.receiverAccountNumber),
        amount: Number(store.transferAmount),
    };

    try {
        const response = await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/transaction/transfer",
            formData,
            { withCredentials: true }
        );

        const data = await response.data;

        isSuccess.value = true;

        setTimeout(() => {
            isSuccess.value = false;
            router.push("/balance");
        }, 3000);
    } catch (error) {
        console.log(error);
        isFail.value = true;

        setTimeout(() => {
            isFail.value = false;
            router.push("/balance");
        }, 3000);
    }
};

onMounted(() => {
    if (!store.currentAccount) {
        router.push("/balance");
    }
});
</script>
