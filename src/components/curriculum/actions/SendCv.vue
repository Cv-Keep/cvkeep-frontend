<template>
	<cv-lightbox :title="$t('sendCV')" :hasfooter="false" v-if="active" class="download-cv-lightbox" @close="close">
		<div class="share-cv-url">
			<h5>{{ $t('title') }}</h5>

			<div class="field">
				<input ref="urlinput" type="text" name="cvurl" readonly="true" :value="cvUrl" @focus="selectAll" autofocus>
				<span :title="$t('copyHelp')" @click="copy"><i class="fa fa-copy"></i></span>
			</div>
		</div>

		<div class="download">
			<h5>{{ $t('downloadCV') }}</h5>

			<download-cv/>
		</div>
	</cv-lightbox>
</template>

<script>
	import CvLightbox from '@/components/lightbox/Lightbox.vue'
	import DownloadCv from '@/components/settings/DownloadCv.vue'

	export default {
		name: 'SendCv',

		components: {
			CvLightbox,
			DownloadCv
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
					sendCV: 'Enviar este CV',
          downloadCV: 'Baixar',
					copyHelp: 'Copiar para área de transferência',
					title: 'Envie esta URL para compartilhar este CV',
				},

				'en': {
					sendCV: 'Send this CV',
          downloadCV: 'Download',
					copyHelp: 'Copy to the clipboard',
					title: 'Send this URL to share this CV',					
				},

				'fr': {
					sendCV: 'Envoyer ce CV',
          downloadCV: 'Télécharger',
					copyHelp: 'Copier dans le presse-papiers',
					title: 'Envoyer cette URL pour partager ce CV',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.share-cv-url {
		padding: var(--gutter);
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
	.download {
		padding: var(--gutter);
	}
</style>

<style lang="scss">
	.download-cv-lightbox .cv-lightbox__content {
		max-width: 500px;
		max-height: 400px;
	}
</style>