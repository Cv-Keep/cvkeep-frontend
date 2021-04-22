<template>
	<swiper-slide>
		<reg-card>
			<h4 class="title">
				<i :class="`fa ${icon}`"></i>
				{{title}}
			</h4>

			<div class="main">
				<slot/>
			</div>
		</reg-card>
	</swiper-slide>
</template>

<script>

	import RegCard from '@/components/register/RegCard.vue'
	import { swiperSlide } from 'vue-awesome-swiper'

	export default {
		name: 'confirmation-step',
		
		props: {
			title: {
				default: '',
				type: String,
			},

			icon: {
				default: '',
				type: String,
			}
		},

		components: {
			RegCard,
			swiperSlide,
		}
	}
</script>

<style lang="scss" scoped>
	.title {
		margin-bottom: calc(var(--gutter) * 2);
		i {
			font-size: 24px;
			background-color: var(--color-gray-d);
			padding: 8px;
			border-radius: 100%;
			margin-right: calc(var(--gutter) / 2);
			display: inline-flex;
			align-items: center;
			justify-content: center;

		}
	}
	.swiper-slide {
		height: auto;
		h5 {
			margin: 0;
			padding-top: var(--gutter);
		}
	}
</style>