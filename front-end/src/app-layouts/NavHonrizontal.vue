<template>
    <div class="flex justify-between py-4 px-4 bg-gray-50 shadow-md">
        <div class="flex flex-row p-1">
            <div
                class="bg-slate-200 w-8 h-8 rounded-md flex items-center justify-center"
            >
                <Iconify
                    :icon="ProfileIcon"
                    class="bg-slate-200 w-8 h-4 flex justify-center rounded-xl"
                />
            </div>
            <div v-if="isLoading" class="relative">
                <Spinner />
            </div>
            <div v-else class="relative">
                <div
                    class="flex mx-2 hover:bg-slate-200 p-1 rounded-md flex-row cursor-pointer"
                    @click="toggleDropdown"
                >
                    <span class="mx-4">
                        123456789
                        <!-- {{ store.currentAccount }} -->
                    </span>
                    <Iconify :icon="ArrowDown" class="text-gray-400 h-full" />
                </div>

                <div
                    v-if="isOpen"
                    class="absolute bg-white shadow-md rounded-md mt-1 w-full z-10"
                >
                    <div
                        v-for="account in accounts"
                        :key="account"
                        class="px-4 py-2 hover:bg-slate-200 cursor-pointer"
                        @click="selectAccount(account)"
                    >
                        {{ account.accountNumber }}
                    </div>
                    <div
                        class="block px-4 py-2 hover:bg-slate-200 dark:hover:text-BLACKTEXT rounded-md cursor-pointer"
                        @click="createNewAccount()"
                    >
                        Create Account
                    </div>
                    <div
                        class="block px-4 py-2 text-red-600 hover:bg-slate-200 rounded-md cursor-pointer"
                        @click="toggleDeleteConfirm"
                    >
                        Delete Account
                    </div>
                </div>
            </div>
        </div>
        <div class="flex flex-row" >
                            <!-- @click="toNotification()" -->
            <div
                class="bg-slate-200 w-10 h-10 rounded-md flex items-center justify-center cursor-pointer"
                @click="isDrawerOpen = true"
            >
                <Iconify
                    :icon="BellIcon"
                    class="bg-slate-200 flex justify-center rounded-xl"
                />
            </div>

            <button
                class="bg-blue-500 text-white text-sm rounded-md border-none p-2 cursor-pointer mx-2"
                @click="logout"
            >
                <p v-if="!isLogout">Logout</p>
                <p v-else>Logging out...</p>
            </button>
        </div>
        <CreateAccount v-if="isCreating" :status="creatingStatus" />

        <DeleteConfirm
            v-if="isDeleting"
            @cancel="toggleDeleteConfirm"
            @confirm="handleDeleteConfirm"
        />

        <DeleteAccSuccess v-if="isDeleteSuccess" />
        

  <!-- Drawer component -->
  <div
    id="drawer-notification"
    :class="[
      'fixed top-0 right-0 z-40 w-96 h-screen p-4 overflow-y-auto transition-transform bg-white',
      isDrawerOpen ? 'translate-x-0' : 'translate-x-full',
    ]"
    tabindex="-1"
    aria-labelledby="drawer-notification-label"
  >
    <h5
      id="drawer-notification-label"
      class="text-base font-semibold text-gray-700 uppercase "
    >
      Notification
    </h5>

    <!-- Button to close the drawer -->
    <button
      type="button"
      @click="isDrawerOpen = false"
      class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
    >
      <svg
        aria-hidden="true"
        class="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
      <span class="sr-only">Close menu</span>
    </button>

    <!-- Drawer content -->
    <div class="py-4 overflow-y-auto">
        <NotificationComponent />
    
    </div>
  </div>
  <!-- <NotificationComponent /> -->
    </div>
    
</template>

<script setup>
import { Icon as Iconify } from "@iconify/vue";
import { useRouter, useRoute, RouterLink } from "vue-router";
import { ref, onMounted, onUnmounted } from "vue";
import axios from "axios";
import Spinner from "../components/Spinner.vue";
import { useStore } from "../store/store";
import CreateAccount from "../components/CreateAccount.vue";
import DeleteConfirm from "../components/DeleteConfirm.vue";
import DeleteAccSuccess from "../components/DeleteAccSuccess.vue";
import NotificationComponent from "../components/NotificationComponent.vue";

const ProfileIcon = "iconamoon:profile";
const BellIcon = "mingcute:notification-line";
const ArrowDown = "iconamoon:arrow-down-2-duotone";
const store = useStore();

const isDrawerOpen = ref(false)
const router = useRouter();
const isLoading = ref(false);
const isOpen = ref(false);
const isLogout = ref(false);

// Setup the state
const isDeleteSuccess = ref(false);
const isDeleting = ref(false);
const accounts = ref([]); // Example accounts
const creatingStatus = ref(false);
const isCreating = ref(false);

// Toggle the dropdown visibility
const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
};

// Select an account and close the dropdown
const selectAccount = (account) => {
    store.currentAccount = account.accountNumber;
    store.balance = account.balance;

    isOpen.value = false;
};

const toNotification = (path) => {
    router.push("/notification");
};

const fetchUserData = async () => {
    try {
        const response = await axios.get(
            "http://127.0.0.1:3000/api/v1/esb/users/profile",
            { withCredentials: true }
        );

        const data = await response.data;

        const userId = data.data.user._id;

        const userName = data.data.user.name;

        return userId;
    } catch (error) {
        console.log(error);
    }
};

const createNewAccount = async () => {
    try {
        const userId = await fetchUserData();

        await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/createAccount",
            userId,
            { withCredentials: true }
        );

        isCreating.value = true;

        setTimeout(() => {
            creatingStatus.value = true;
        }, 3000);

        setTimeout(() => {
            isCreating.value = false;
            window.location.reload();
        }, 6000);
    } catch (error) {
        console.log("Error: " + error);
    }
};

const toggleDeleteConfirm = () => {
    isDeleting.value = !isDeleting.value;
};

const handleDeleteConfirm = async () => {
    await deleteMyAccount();
    toggleDeleteConfirm();
};

const deleteMyAccount = async () => {
    try {
        const fetchAccountId = await axios.post(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/getAccountByAccountNumber",
            { accountNumber: store.currentAccount },
            { withCredentials: true }
        );

        const accountData = await fetchAccountId.data;
        const accountId = accountData.data.account._id;

        const deleteAccount = await axios.delete(
            "http://127.0.0.1:3000/api/v1/esb/users/accounts/deleteAccountById",
            { data: { accountId }, withCredentials: true }
        );

        isDeleteSuccess.value = true;

        setTimeout(() => {
            isDeleteSuccess.value = false;
            window.location.reload();
        }, 3000);
    } catch (error) {
        console.log(error);
    }
};

const logout = async () => {
    try {
        await axios.get("http://127.0.0.1:3000/api/v1/esb/auth/logout", {
            withCredentials: true,
        });

        isLogout.value = true;

        setTimeout(() => {
            router.push("/");
        }, 1000);
    } catch (error) {
        console.log("Error: " + error);
    }
};

onMounted(() => {
    if (store.accountNumberList) {
        accounts.value = store.accountNumberList.map((account) => account);
    } else {
        console.log("No accounts data available.");
    }
});
</script>
