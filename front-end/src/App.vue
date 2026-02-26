<template>
	<main>
		<router-view></router-view>
	</main>
</template>

<script setup>
import { useRoute } from 'vue-router';
// import DefaultLayout from '../app-layouts/DefaultLayout.vue';
// import HonrizontalNav from '../app-layouts/NavHonrizontal.vue';

// const route = useRoute();

// const layout = computed(() => {
// 	switch (route.meta.forceLayout) {
// 		case 'horizontal':
// 			return HonrizontalNav;
// 		default:
// 			return DefaultLayout;
// 	}
// });
</script>
