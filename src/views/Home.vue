<template>
	<div class="home-content">
		<home-hero/>
		
		<home-middle/>

		<home-foot/>
	</div>
</template>

<script>
	import HomeHero from '@/components/home/HomeHero.vue'
	import HomeMiddle from '@/components/home/HomeMiddle.vue'
	import HomeFoot from '@/components/home/HomeFoot.vue'

	export default {
		name: 'home',

		components: {
			HomeHero,
			HomeMiddle,
			HomeFoot
		}
	}
</script>

<style lang="scss" scoped>
	.home-content {
		overflow: hidden;
	}
</style>