<template>
	<div class="home-content">
		<home-hero/>
		<home-middle/>
		<home-search/>
		<home-foot/>
	</div>
</template>

<script>
	import HomeHero from '@/components/home/HomeHero.vue'
	import HomeMiddle from '@/components/home/HomeMiddle.vue'
	import HomeSearch from '@/components/home/HomeSearch.vue'
	import HomeFoot from '@/components/home/HomeFoot.vue'

	export default {
		name: 'home',

		components: {
			HomeHero,
			HomeMiddle,
			HomeSearch,
			HomeFoot
		}
	}
</script>

<style lang="scss" scoped>
	.home-content {
		overflow: hidden;
	}
</style>