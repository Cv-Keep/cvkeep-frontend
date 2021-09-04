<template>
	<div class="avatar-root" v-if="!loading">
		<div class="avatar pointer" @click="$editing ? $refs.uploader.click() : false">
			<img ref="avatarImg" :data-src="avatarUrl">
			<i v-if="$editing" class="fa fa-camera"></i>
			
			<div v-if="$editing">
				<div class="avatar-uploader-label">
					<span>{{ $t('loadImage') }}</span>
				</div>

				<form ref="avatarForm" @submit.prevent hidden>
					<input ref="uploader" type="file" accept="image/*" name="avatar" @change="upload"/>
				</form>
			</div>
		</div>

		<span v-if="$editing" @click="removeAvatar" class="remove-photo">
			<i class="fa fa-times"></i>
		</span>
	</div>

	<div v-else class="avatar-root avatar-root--is-loading">
		<div class="avatar pointer">
			<loading-spinner color="#ffffff"/>
		</div>
	</div>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import { readAndCompressImage } from 'browser-image-resizer';
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
	
	export default {
		name: 'cv-avatar',

		components: {
			LoadingSpinner
		},
		
		props: {
			width: {
				type: Number,
				default: 200
			},

			height: {
				type: Number,
				default: 200
			},

			rounded: {
				type: Boolean,
				default: true
			},

			source: {
				type: String,
				default: 'curriculum',
			}
		},

		data () {
			return {
				loading: false,
				avatarUrl: this.getAvatarUrl(),
			}
		},
		
		methods: {
			removeAvatar () {
				this.loading = true;

				this.$API.removeUserAvatar()
					.then(() => {
						this.updateAvatar();
						this.$toasted.success(this.$i18n.t('saveSuccess'));
					})
					.catch(this.raiseError)
					.finally(this.loading = false);					
			},

			async upload (e) {
				const file = e.target.files[0];

				if (this.validateFile(file)) {
					this.loading = true;			
					const resized = await this.resizeImage(file);
					const data = new FormData();
					data.append('avatar', resized);
	
					data && await this.$API.setUserAvatar(data)
						.then(() => {
							this.$toasted.success(this.$i18n.t('saveSuccess'));
							this.updateAvatar();
						})
						.catch(this.raiseError)

					this.loading = false;
				}
			},

			validateFile (file) {
				const maxSizeInMB = 10;
				const fileSizeInMB = Utils.bytesToMB(file.size);

				if (fileSizeInMB > maxSizeInMB) {
					this.$toasted.error(`${this.$i18n.t('maxFileSizeExceeded')} ${maxSizeInMB} MB`);
					return false;
				}
				
				return true;
			},

			resizeImage(file, width = 300) {
				return new Promise(resolve => {
					readAndCompressImage(file, {
						width,						
						quality: 0.9,
					})
						.then(resolve)
						.catch(error => {
							console.error(error);

							resolve(file);
						});
				});
			},

			getAvatarUrl(updating) {
				const apiUrl = process.env.VUE_APP_API_URL;
				const username = this.$store.state[this.source].username;
				let url = `${apiUrl}/avatar/getuseravatar/${username}`;

				if (updating) {
					url += `?update=${Date.now()}`;
				}

				return url;
			},

			updateAvatar(notify = true) {
				this.avatarUrl = this.getAvatarUrl(true);
				
				if (notify) {
					const event = new Event('updateAvatar');
					window.dispatchEvent(event);
				}
			},

			raiseError (error) {
				return this.$toasted.error(error || 'Internal unexpected error');
			},

		},

		mounted() {
			window.addEventListener('updateAvatar', () => {
				this.updateAvatar(false);
			});

			this.$refs.avatarImg.src = this.$refs.avatarImg.dataset.src;
		},

		i18n: {
			messages: {
				'pt-br': {
					loadImage: 'Carregar Foto',
					saveSuccess: 'Avatar salvo com sucesso',
					maxFileSizeExceeded: 'Este arquivo excede o tamanho máximo de',
				},

				'en': {
					loadImage: 'Load image',
					saveSuccess: 'Avatar successfully saved',
					maxFileSizeExceeded: 'The file exceed the maximum size of',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.avatar-root {
		width: 200px;
		margin: 0 auto;
		position: relative;
		text-align: center;
		.avatar {
			border-radius: 100%;
			height: 200px;
			width: 200px;
			overflow: hidden;
			position: relative;
			display: inline-block;
			background-color: rgba(0,0,0,.6);
			color: #ffffff;
			img {
				width: 100%;
				height: 100%;
				display: block;
				object-fit: cover;
			}
			i {
				position: absolute;
				top: 40%;
				left: 50%;
				opacity: .7;
				transform: translate(-50%);
				font-size: 30px;
			}
			&-uploader-label {
				cursor: pointer;
				width: 100%;
				display: flex;
				height: 35px;
				font-size: 14px;
				font-weight: 500;
				padding-top: 4px;
				position: absolute;
				align-items: center;
				bottom: 0;
				color: #ffffff;
				justify-content: center;
				align-items: flex-start;
				opacity: .9;
				background-color: rgba(0,0,0,.7);
			}
		}
		.remove-photo {
			position: absolute;
			left: 20px;
			top: 11px;
			width: 30px;
			height: 30px;
			display: flex;
			align-items: center;
			justify-content: center;
			border-radius: 100%;
			cursor: pointer;
			color: #ffffff;
			background-color: #333;
			box-shadow: var(--box-shadow-a);
			&:hover {
				color: var(--cv-color);
			}
		}
		.avatar-uploader-container {
			overflow: hidden;
			max-width: 400px;
			padding-top: 6%;
			position: relative;
			margin: 0 auto;
			@media screen and (max-width: 450px) {
				padding-top: 0;
			}
		}
		
		&--is-loading {
			.avatar {
				display: flex;
				align-items: center;
				justify-content: center;
				svg {
					max-width: 30px;
				}
			}
		}
	}
</style>