<template>
	<div class="home-content">
		<home-hero/>

		<div class="home-box">
			<home-search v-if="$logged"/>
			<home-features/>
		</div>
		
		<home-support/>
		<home-foot/>
	</div>
</template>

<script>
	import HomeHero from '@/components/home/HomeHero.vue'
	import HomeFeatures from '@/components/home/HomeFeatures.vue'
	import HomeSearch from '@/components/home/HomeSearch.vue'
	import HomeSupport from '@/components/home/HomeSupport.vue'
	import HomeFoot from '@/components/home/HomeFoot.vue'

	export default {
		name: 'home',

		components: {
			HomeHero,
			HomeFeatures,
			HomeSearch,
			HomeSupport,
			HomeFoot
		},
	}
</script>

<style lang="scss" scoped>
	.home-content {
		overflow: hidden;
		.home-box {
			overflow: hidden;
			> div {
				padding: 80px 0;
			}
		}
		@media screen and (max-width: 768px) {
			.home-box {
				> div {
					padding: 60px 0;
				}
			}
		}
	}
</style>