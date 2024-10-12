<template>
    <div class="absolute bottom-0 left-0">
        <img src="../assets/leftpic.png" class="w-1/2 h-auto" />
    </div>
    <!-- <div class="absolute top-0 right-0 z-20">
    <img src="../assets/rightpic.png" class="w-[50%] h-auto" />
  </div> -->
    <div class="h-screen flex items-center justify-center relative">
        <div
            class="inset-x-0 -z-10 transform-gpu blur-3xl sm:-top-80 relative overflow-hidden"
            aria-hidden="true"
        >
            <div
                class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#9ea0ff] to-[#b7ffff] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style="
                    clip-path: polygon(
                        74.1% 44.1%,
                        100% 61.6%,
                        97.5% 26.9%,
                        85.5% 0.1%,
                        80.7% 2%,
                        72.5% 32.5%,
                        60.2% 62.4%,
                        52.4% 68.1%,
                        47.5% 58.3%,
                        45.2% 34.5%,
                        27.5% 76.7%,
                        0.1% 64.9%,
                        17.9% 100%,
                        27.6% 76.8%,
                        76.1% 97.7%,
                        74.1% 44.1%
                    );
                "
            ></div>
        </div>

        <div class="absolute">
            <h1 class="sm:text-4xl font-bold text-center">
                Experience seamless banking at
            </h1>
            <h1 class="sm:text-4xl font-bold">
                your fingertips, anytime, anywhere.
            </h1>
            <div class="flex justify-center mt-8 flex-col">
                <button
                    type="button"
                    class="text-white bg-BLUE hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 justify-items-stretch font-medium rounded-lg text-sm px-24 py-1.5 me-2 mb-2"
                    @click="goto({ path: '/register' })"
                >
                    Register
                </button>
                <button
                    type="button"
                    class="text-DARKYELLOW bg-YELLOW hover:bg-yellow-500 focus:ring-2 focus:ring-blue-300 justify-items-stretch font-medium rounded-lg text-sm px-24 py-1.5 me-2 mb-2"
                >
                    Login
                </button>
            </div>
        </div>
        <div class="h-screen flex items-center justify-center relative">
            <div
                class="inset-x-0 -z-10 transform-gpu blur-3xl sm:-top-80 relative overflow-hidden"
                aria-hidden="true"
            >
                <div
                    class="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-r from-[#9ea0ff] to-[#b7ffff] sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    style="
                        clip-path: polygon(
                            74.1% 44.1%,
                            100% 61.6%,
                            97.5% 26.9%,
                            85.5% 0.1%,
                            80.7% 2%,
                            72.5% 32.5%,
                            60.2% 62.4%,
                            52.4% 68.1%,
                            47.5% 58.3%,
                            45.2% 34.5%,
                            27.5% 76.7%,
                            0.1% 64.9%,
                            17.9% 100%,
                            27.6% 76.8%,
                            76.1% 97.7%,
                            74.1% 44.1%
                        );
                    "
                ></div>
            </div>
        </div>
        <div class="absolute">
            <h1 class="sm:text-4xl font-bold text-center">
                Experience seamless banking at
            </h1>
            <h1 class="sm:text-4xl font-bold">
                your fingertips, anytime, anywhere.
            </h1>
            <div class="flex justify-center mt-8 flex-col">
                <button
                    type="button"
                    class="text-white bg-BLUE hover:bg-blue-500 focus:ring-2 focus:ring-blue-300 justify-items-stretch font-medium rounded-lg text-sm px-24 py-1.5 me-2 mb-2"
                    @click="goto({ path: '/register' })"
                >
                    Register
                </button>
                <button
                    type="button"
                    class="text-DARKYELLOW bg-YELLOW hover:bg-yellow-500 focus:ring-2 focus:ring-blue-300 justify-items-stretch font-medium rounded-lg text-sm px-24 py-1.5 me-2 mb-2"
                    @click="goto({ path: '/login' })"
                >
                    Login
                </button>
            </div>
        </div>

        <div
            class="absolute inset-x-0 bottom-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-35rem)]"
            aria-hidden="true"
        >
            <div
                class="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#f8ffb9] to-[#ffe8be] sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
                style="
                    clip-path: polygon(
                        74.1% 44.1%,
                        100% 61.6%,
                        97.5% 26.9%,
                        85.5% 0.1%,
                        80.7% 2%,
                        72.5% 32.5%,
                        60.2% 62.4%,
                        52.4% 68.1%,
                        47.5% 58.3%,
                        45.2% 34.5%,
                        27.5% 76.7%,
                        0.1% 64.9%,
                        17.9% 100%,
                        27.6% 76.8%,
                        76.1% 97.7%,
                        74.1% 44.1%
                    );
                "
            ></div>
        </div>
    </div>
</template>
<script setup>
import { useRouter, useRoute, RouterLink } from "vue-router";

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
</script>
