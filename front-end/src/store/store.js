import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("account", () => {
    const currentAccount = ref(null);
    const currentAccountName = ref(null);
    const accountNumberList = ref(null);
    const name = ref(null);
    const balance = ref(0);
    const receiverAccountName = ref(null);
    const receiverAccountNumber = ref(null);
    const transferAmount = ref(null);

    return {
        currentAccount,
        currentAccountName,
        accountNumberList,
        name,
        balance,
        receiverAccountName,
        receiverAccountNumber,
        transferAmount,
    };
});
