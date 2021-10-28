<template>
	<cv-lightbox :title="$t('background')" v-if="active" @close="close">
		<div v-if="backgrounds.length" class="background-setter">
			<div v-for="(bg, index) in backgrounds" :key="index" class="background" @click="applyBg(bg)">
				<img :src="bg">
			</div>
		</div>
	</cv-lightbox>
</template>

<script>

	import { mapState } from 'vuex'
	import backgrounds from '@/shared/script/data/backgrounds.js'
	import CvLightbox from '@/components/lightbox/Lightbox.vue'

	export default {
		name: 'BackgroundSet',
		
		components: {
			CvLightbox
		},

		props: {
			active: {
				type: Boolean,
				default: false
			}
		},

		computed: {
			...mapState([ 'curriculum' ])
		},

		data () {
			return {
				backgrounds
			}
		},

		methods: {
			applyBg (bg) {
				this.curriculum.background = bg;
				
				this.close();
			},

			close () {
				this.$emit('close')
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					background: 'Plano de Fundo'
				},

				'en': {
					background: 'Background'
				},

				'fr': {
					background: 'Arrière plan'
				},
			}
		}
	}
</script>

<style lang="scss" scoped>
	.background-setter {
		display: grid;
		grid-gap: var(--gutter);
		padding: var(--gutter);
		grid-template-columns: repeat(3, 1fr);
		@media screen and (max-width: 500px) {
			grid-template-columns: repeat(3, 1fr);
		}
		@media screen and (max-width: 425px) {
			grid-template-columns: repeat(2, 1fr);
		}
		.background {
			position: relative;
			img {
				display: block;
				width: 100%;
				height: 150px;
				object-fit: cover;
				border-radius: var(--border-radius);
				cursor: pointer;
				&:hover {
					transition: 100ms;
					box-shadow: var(--box-shadow-a);
				}
			}
			&.picked::before {
				content: '✔';
				width: 20px;
				height: 20px;
				position: absolute;
				top: calc(var(--gutter)/2);
				right: calc(var(--gutter)/2);
				background-color: #ffffff;
				display: flex;
				align-items: center;
				justify-content: center;
				border-radius: 100%;
			}
		}
	}
	.credits {
		padding: var(--gutter);
		&__links {
			text-align: left;
			p {
				margin: 0;
			}
		}
	}
</style>