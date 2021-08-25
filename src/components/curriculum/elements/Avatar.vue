<template>
	<div class="avatar-root" v-if="!loading">
		<div class="avatar pointer" @click="$editing ? $refs.uploader.click() : false">
			
			<img v-if="avatar" :src="avatar">
			<i v-else class="fa fa-camera"></i>
			
			<div v-if="$editing">
				<div class="avatar-uploader-label">
					<span>{{ $t('loadImage') }}</span>
				</div>
				<form ref="avatarForm" @submit.prevent hidden>
					<input ref="uploader" type="file" accept="image/*" name="avatar" @change="upload"/>
				</form>
			</div>

		</div>

		<span v-if="avatar && $editing" @click="removeAvatar" class="remove-photo">
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
	import compress from 'compress-base64';
	import Utils from '@/shared/script/helpers/utils.js'
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
				default: 'curriculum'
			}
		},

		computed: {
			avatar: {
				get () { return this.source === 'curriculum' ? this.cvPhoto : this.userPhoto },
				set (value) { this.cvPhoto = value; this.userPhoto = value; }
			},

			cvPhoto: {
				get () { return this.$store.state.curriculum.basics.photo },
				set (value) { this.$store.state.curriculum.basics.photo = value; }
			},

			userPhoto: {
				get () { return this.$store.state.credentials.photo },
				set (value) { this.$store.state.credentials.photo = value; }
			},
		},

		data () {
			return {
				loading: false,
				sendAs: 'base64',
			}
		},
		
		methods: {
			removeAvatar () {
				this.avatar = '';
			},

			async upload (e) {
				let data = {};
				const file = e.target.files[0];

				if (this.validateFile(file)) {
					this.loading = true;
					
					data = this.sendAs === 'file' ?
						data = new FormData(this.$refs.avatarForm) :
						data = { avatar: await this.fileToBase64(file) };
	
					data && this.$API.setUserAvatar(data)
						.then(this.setAvatar)
						.catch(this.raiseError)
						.finally(this.loading = false);

					if (!data) { this.loading = false }
				}
			},

			validateFile (file) {
				const maxSizeInMB = 5;
				const fileSizeInMB = Utils.bytesToMB(file.size);

				if (fileSizeInMB > maxSizeInMB) {
					this.$toasted.error(`Este arquivo excede o tamanho máximo de ${maxSizeInMB} MB`);
					return false;
				}
				
				return true;
			},

			fileToBase64 (file) {
				return new Promise((resolve, reject) => {
					if (typeof FileReader === 'function') {
						const reader = new FileReader();
						
						reader.onload = event => {
							compress(event.target.result, {
								width: 350,
								quality: 0.9,
								type: 'image/png'
							}).then(resolve);
						};

						reader.readAsDataURL(file);
					} else {
						reject(false);
					}
				});
			},

			setAvatar (data) {
				const avatar = this.sendAs === 'file' ? `${data.avatarUrl}?${Date.now()}` : data.avatarUrl;

				this.avatar = avatar;
			},

			raiseError (error) {
				return this.$toasted.error(error || 'Um erro inesperado ocorreu :(');
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					loadImage: 'Carregar Foto'
				},

				'en': {
					loadImage: 'Load image'
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