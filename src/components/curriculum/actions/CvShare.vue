<template>
	<cv-lightbox :title="$t('shareCv')" :hasfooter="false" v-if="active" @close="close">
		
		<div class="share-url">
			<h5>{{ $t('title') }}</h5>

			<div class="field">
				<input ref="urlinput" type="text" name="cvurl" readonly="true" :value="cvUrl" @focus="selectAll" autofocus>
				<span :title="$t('copyHelp')" @click="copy"><i class="fa fa-copy"></i></span>
			</div>
		</div>
		
		<div class="socials">
			<social-sharing :url="$route.query.page" :title="$route.meta.title" inline-template>
				<div class="vue-social-sharing shares">
					<network network="whatsapp">
						<i class="fab fa-whatsapp color-whatsapp"></i>
						Whatsapp
					</network>

					<network network="facebook">
						<i class="fab fa-facebook color-facebook"></i>
						Facebook
					</network>

					<network network="twitter">
						<i class="fab fa-twitter color-twitter"></i>
						Twitter
					</network>

					<network network="reddit">
						<i class="fab fa-reddit color-reddit"></i>
						Reddit
					</network>

					<network network="telegram">
						<i class="fab fa-telegram color-telegram"></i>
						Telegram
					</network>

					<network network="pinterest">
						<i class="fab fa-pinterest color-pinterest"></i>
						Pinterest
					</network>

					<network network="linkedin">
						<i class="fab fa-linkedin color-linkedin"></i>
						LinkedIn
					</network>

					<network network="vk">
						<i class="fab fa-vk color-vk"></i>
						VKontakte
					</network>
				</div>
			</social-sharing>
		</div>
	</cv-lightbox>
</template>

<script>
	import SocialSharing from 'vue-social-sharing'
	import CvLightbox from '@/components/lightbox/Lightbox.vue'

	export default {
		name: 'CvShare',

		components: {
			CvLightbox,
			SocialSharing
		},

		props: {
			active: {
				type: Boolean,
				default: false
			}
		},

		data () {
			return {
				cvUrl: window.location.href
			}
		},

		methods: {
			close () {
				this.$emit('close')
			},
		
			copy () {
				this.$refs.urlinput.select();
				document.execCommand('copy');
				this.$toasted.success('Copiado!')
			},
			
			selectAll (e) {
				e.target.setSelectionRange(0, e.target.value.length)
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					shareCv: 'Compartilhar CV',
					copyHelp: 'Copiar para área de transferência',
					title: 'Envie esta URL para compartilhar este CV',
				},

				'en': {
					shareCv: 'Share CV',
					copyHelp: 'Copy to the clipboard',
					title: 'Send this URL to share this CV',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-url, .socials {
		padding: var(--gutter);
		padding-bottom: 0;
		.field, .field input {
			margin: 0;
			width: 100%;
		}
		.field {
			margin: 0;
			position: relative;
			span {
				position: absolute;
				background-color: var(--hover-color);
				color: #444;
				top: 1px;
				right: 1px;
				display: block;
				width: 40px;
				height: 36px;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				border-top-right-radius: 2px;
				border-bottom-right-radius: 2px;
				&:hover {
					color: var(--primary-color);
				}
			}
			input {
				padding-right: 50px;
			}
		}
	}
	hr {
		margin: 8px 0;
		border: dashed 2px #e9e9e9;
	}
	.shares {
		display: grid;
		padding: var(--gutter);
		font-size: 30px;
		grid-template-columns: 1fr 1fr;
		grid-gap: var(--gutter);
		@media screen and (max-width: 500px) {
			grid-template-columns: 1fr;
		}
	}
</style>

<style lang="scss">
	.vue-social-sharing {
		span {
			border-radius: 26px;
			transition: 100ms;
			padding: 4px var(--gutter);
			&:hover {
				transition: 100ms;
				cursor: pointer;
				background-color: var(--hover-color);
			}
		}
	}
</style>