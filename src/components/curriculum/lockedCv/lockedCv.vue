<template>
	<div v-if="!this.cached" class="locked-cv content" :style="`background-image: ${background}`">
		<div class="locked-cv__content">
			
			<div class="user-profile">
				<img :src="photo">
			</div>
			
			<h4>
				<i class="fa fa-lock"></i>
				{{ $t('privateCv') }}
			</h4>

			<p>{{ $t('enterThePassword') }}</p>
			
			<div class="lockedform">
				<form @submit.prevent="unlock" v-if="!loading">
					<div class="field">
						<label>{{ $t('password') }}</label>
						<input type="password" name="password" v-model="password" autofocus>
						<button type="submit">{{ $t('unlock') }}</button>
						<img src onerror='document.querySelector("input[autofocus]").focus(); return false'>
					</div>
				</form>
			
				<div class="loading" v-else>
					<loading-spinner/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

	export default {
		name: 'lockedCv',
		
		components: {
			LoadingSpinner
		},

		computed: {
			...mapState('curriculum', {
				photo: cv => cv.basics.photo,
				username: cv => cv.username,
				background: cv => `url(${ cv.background || '/img/backgrounds/000.jpg' })`,
			}),

			cached () { 
				return sessionStorage.getItem(`locked-cv-${this.username}`) 
			}
		},

		data () {
			return {
				password: '',
				loading: false,
			}
		},

		methods: {
			unlock () {
				const data = { 
					username: this.username,
					password: this.password
				};
				
				if (!data.password) {
					return this.raiseError(this.$i18n.t('enterAPassword'));
				} else {
					this.loading = true;
				}

				this.$API.unlockCv(data)
					.then(this.checkLockState)
					.catch(this.raiseError)
					.finally(() => (this.loading = false));
			},

			checkLockState (cv) {
				const wrongPassMsg = this.$i18n.t('errors.wrongPassword');
				
				cv.locked ? this.raiseError(wrongPassMsg) : this.success(cv);				
			},

			success (cv) {
				this.$emit('unlock', cv);

				if (!this.cached) {
					this.$toasted.success(this.$i18n.t('unlocked'));

					this.cache(cv);
				}
			},

			cache (cv) {
				sessionStorage.setItem(`locked-cv-${cv.username}`, btoa(this.password));
			},

			uncache () {
				sessionStorage.removeItem(`locked-cv-${this.username}`);
			},

			raiseError (error) {
				this.password = '';
				
				if (!this.cached) {
					this.$toasted.error(error);
				} else {
					this.uncache();
				}
			}
		},

		created () {
			if (this.cached) {
				try {
					this.password = atob(this.cached);
					
					this.unlock();
				} catch {
					this.uncache();
				}
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					password: 'Senha',
					unlock: 'Desbloquear',
					unlocked: 'CV Desbloqueado!',
					privateCv: 'Curriculum Privado',
					enterAPassword: 'Digite uma senha',
					enterThePassword: 'Digite a senha para acessar este conteúdo',
				},

				'en': {
					password: 'Password',
					unlock: 'Unlock',
					unlocked: 'Cv Unlocked!',
					privateCv: 'Private CV',
					enterAPassword: 'Enter a password',
					enterThePassword: 'Enter the password to unlock this content',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.locked-cv {
		padding-top: 180px;
		min-height: 100vh;
		&__content {
			text-align: center;
			color: #555;
			padding: 32px;
			max-width: 400px;
			width: 100%;
			border-radius: 8px;
			margin: 0 auto;
			background-color: #ffffff;
			box-shadow: var(--box-shadow-b);
			.user-profile {
				img {
					height: 160px;
					width: 160px;
					object-fit: cover;
					border-radius: 100%;
					margin-bottom: var(--gutter);
				}
			}
			h4 {
				display: flex;
				margin-bottom: 8px;
				align-items: center;
				justify-content: center;
				i {
					margin-right: 10px;
					background-color: var(--hover-color);
					padding: 4px;
					font-size: 20px;
					width: 30px;
					height: 30px;
					border-radius: 100%;
				}
			}
			form {
				input {
					width: 100%;
					margin-bottom: 28px;
				}
				button {
					color: #fff;
					border: solid 1px #222;
					background-color: #222;
				}
			}
		}
	}
</style>