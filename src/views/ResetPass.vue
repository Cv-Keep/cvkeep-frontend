<template>
	<div class="content" style="background-image:url(/assets/backgrounds/seamlessdots.jpg)">
		<div class="container">
			
			<div class="confirm">
				<div v-if="!allowed" class="not-allowed">
					<loading-spinner v-if="loading"/>
					<reg-error v-else :error="error" :prefix="errorPrefix"/>
				</div>

				<div v-else class="allowed">
					<form ref="resetpassform" @submit.prevent="resetPass">
						<step-password ref="passwords" @press-enter="resetPass" :title="$t('defineYourNewPass')"/>
						<br/>
						<loading-spinner v-if="loading"/>
						<input v-else type="submit" name="submit" class="button-primary" :value="$t('definePass')">
					</form>
				</div>
			</div>

		</div>
	</div>
</template>

<script>
	import validateForm from '@/shared/script/helpers/validate-form.js'
	import serialize from 'form-serialize'
	import RegError from '@/components/register/RegError.vue'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
	import StepPassword from '@/components/register/steps/Password.vue'

	export default {
		name: 'home',

		components: {
			LoadingSpinner,
			RegError,
			StepPassword
		},

		data () {
			return {
				error: "",
				loading: true,
				allowed: false,
				errorPrefix: 'Ops... ',
				hash: window.location.hash.substr(1) || '',
			}
		},

		methods: {
			showError (error) {
				this.error = String(error);
				this.loading, this.allowed = false;
			},

			resetPass () {
				const form = this.$refs.resetpassform;
				const formValidity = validateForm(form, { report: true });

				if (formValidity.valid) {
					const formData = serialize(form, { hash:true });
		
					if (!this.validate()) {
						return this.$toasted.error(this.$i18n.t('invalidPassword'));
					} else {
						this.loading = true;
					}
	
					this.$API.resetPassword({ hash: this.hash, ...formData })
						.then(this.success)
						.catch(this.showError)
						.finally(this.loading = false);
				}
			},

			success () {
				this.allowed = false;
				this.errorPrefix = this.$i18n.t('resetPassSuccessPrefix');
				this.$toasted.success(this.$i18n.t('resetPassSuccessMessage'));

				this.$root.$el.style.opacity = '.5';
				this.$root.$el.style.pointerEvents = 'none';

				setTimeout(() => { window.loaction.href = '/' }, 5000);
			},

			validate () {
				let el = this.$refs.passwords.$el;
				
				return el ? this.$refs.passwords.$el.querySelector('.validate-success') : false;
			},
		},

		mounted () {
			this.$API.checkResetPasswordHash({ hash: this.hash })
				.then(this.allowed = true)
				.catch(this.showError)
				.finally(this.loading = false);
		},

		i18n: {
			messages: {
				'pt-br': {
					'defineYourNewPass': 'Defina sua nova senha',
					'definePass': 'Definir Senha',
					'invalidPassword': 'Senha inválida :(',
					'resetPassSuccessPrefix': 'Tudo feito',
					'resetPassSuccessMessage': 'Senha modificada, esta página será redirecionada em 5 segundos'
				},

				'en': {
					'defineYourNewPass': 'Define your new pass',
					'definePass': 'Define pass',
					'invalidPassword': 'Invalid password :(',					
					'resetPassSuccessPrefix': 'All done ;)',
					'resetPassSuccessMessage': 'Password changed, this page will be redirected in 5 seconds',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		position: relative;
		z-index: 0;
		.confirm {
			width: 100%;
			display: flex;
			max-height: 960px;
			align-items: center;
			justify-content: center;
			height: calc(90vh - var(--header-height));
			.allowed, .not-allowed {
				width: 100%;
				text-align: center;
			}
		}
	}
</style>