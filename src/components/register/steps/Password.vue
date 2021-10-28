<template>
	<component :is="onlyinput ? 'div' : 'reg-step'" :title="$t('title')" icon="fa-asterisk">
		<div :class="`password-confirm validate-${validate}`">
			<div class="field">
				<label>{{ traducedLabel }}</label>
			
				<input
					ref="pass"
					required
					class="block"
					type="password"
					name="password"
					v-model="password"
					@keydown.enter.prevent="$emit('press-enter')"
				>
			</div>

			<div class="field">
				<label>{{ $t('confirmPassword') }}</label>
			
				<input
					required
					class="block"
					type="password"
					name="confirmPassword"
					v-model="confirmPassword"
					@keydown.tab.prevent="$refs.pass.focus()"
					@keydown.enter.prevent="$emit('press-enter')"
				>
			</div>
			
			<p class="color-error">
				<span class="error" v-if="password && confirmPassword && password.length < 8">
					{{ $t('minimumCharsWarn') }}
				</span>
			
				<span class="error" v-if="password && confirmPassword && password.length >= 8 && password != confirmPassword">
					{{ $t('passwordsMatchWarn') }}
				</span>
			</p>
		</div>
	</component>
</template>

<script>

	import RegStep from './_RegStep.vue'

	export default {
		name: 'step-password',

		components: {
			RegStep
		},

		props: {
			title: {
				type: String,
				default: 'nowDefineYourPassword',
			},

			onlyinput: {
				type: Boolean,
				default: false
			},

			label: {
				type: String,
				default: 'password'
			}
		},

		data () {
			return {
				password: '',
				confirmPassword: ''
			}
		},

		computed: {
			validate () {
				if (!this.password || !this.confirmPassword)
					return 'waiting';

				if (this.password != this.confirmPassword)
					return 'error';

				if (this.password === this.confirmPassword)
					return 'success';

				return null;
			},

			traducedLabel () {
				return this.label === 'password' ? this.$i18n.t(this.label) : this.label;
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					title: 'Defina sua senha',
					password: 'Senha',
					confirmPassword: 'Confirme a senha',
					passwordsMatchWarn: 'As senhas digitadas estão diferentes',
					minimumCharsWarn: 'A senha deve ter no mínimo 8 (oito) caracteres',
					nowDefineYourPassword: 'Agora defina a sua senha'
				},

				'en': {
					title: 'Define your password',
					password: 'Password',
					confirmPassword: 'Confirm password',
					passwordsMatchWarn: 'The passwords doesn\'t match',
					minimumCharsWarn: 'The password must contain at least 8 (eight) characters',
					nowDefineYourPassword: 'Now define your password'
				},

				'fr-fr': {
					title: 'Définissez votre mot de passe',
					password: 'Mot de passe',
					confirmPassword: 'Confirmer le mot de passe',
					passwordsMatchWarn: 'Les mots de passe ne correspondent pas.',
					minimumCharsWarn: 'Le mot de passe doit contenir au moins 8 (huit) caractères.',
					nowDefineYourPassword: 'Définissez maintenant votre mot de passe'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.password-confirm {
		&.validate {
			&-success {
				input {
					border: solid 1px var(--color-success);
				}
			}
			&-error {
				input {
					border: solid 1px var(--color-error);
				}
			}
		}
		p {
			margin: 0;
		}
	}
</style>