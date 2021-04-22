<template>
	<div class="settings-account" v-if="username && email">	
		<div class="username-form">
			<heading-tooltip
				:title="$t('userName')"
				:tooltipMessage="$t('help.userName')"/>

			<form enctype="multipart/form-data" action="/" @submit.prevent="changeUsername">
				<div class="field">
					<set-username :onlyinput="true" :reactive="false" :startvalue="username"/>
				</div>

				<div class="submit">
					<input type="submit" class="button button-primary" name="Submit" :value="$t('save')">
				</div>
			</form>
		</div>

		<hr>
		
		<div class="email-form">
			<heading-tooltip
				:title="$t('yourEmail')"
				:tooltipMessage="$t('help.yourEmail')"/>
			
			<form enctype="multipart/form-data" action="/" @submit.prevent="changeEmail">
				<div class="field">
					<label for="email">E-mail</label>
					<input type="email" name="email" :value="email" :disabled="!hasPassword">
				</div>

				<div class="submit">
					<input type="submit" class="button button-primary" name="Submit" :value="$t('save')" :disabled="!hasPassword">
				</div>
			</form>
		</div>

		<hr>

		<div class="warning" v-if="!hasPassword">
			<p>
				<i class="fa fa-exclamation-triangle"></i>
				{{ $t('passwordRequiredWarning') }}
			</p>
		</div>		
		
		<div class="create-password-form" v-if="!hasPassword"> 
			<heading-tooltip
				:title="$t('createPassword')"
				:tooltipMessage="$t('help.createPassword')"/>

			<form enctype="multipart/form-data" action="/" @submit.prevent="changePassword" novalidate>
				<div>
					<div class="field keep-label">
						<new-password :onlyinput="true" :label="$t('newPassword')"/>
					</div>

					<div class="submit">
						<input type="submit" class="button button-primary" name="Submit" :value="$t('createPassword')">
					</div>
				</div>
			</form>
		</div>

		<div class="change-password-form" v-if="hasPassword">
			<heading-tooltip
				:title="$t('changePassword')"
				:tooltipMessage="$t('help.changePassword')"/>

			<form enctype="multipart/form-data" action="/" @submit.prevent="changePassword">
				<div>
					<div class="field">
						<label for="current_password">{{ $t('currentPassword') }}</label>
						<input type="password" name="current_password" required>
					</div>

					<div class="field">
						<new-password :onlyinput="true" :label="$t('newPassword')"/>
					</div>

					<div class="submit">
						<input type="submit" class="button button-primary" name="Submit" :value="$t('changePassword')">
					</div>
				</div>
			</form>
		</div>

		<hr>
	</div>
</template>

<script>
	import HeadingTooltip from '@/components/settings/HeadingTooltip.vue'
	import SetUsername from '@/components/register/steps/Username.vue'
	import NewPassword from '@/components/register/steps/Password.vue'
	import validateForm from '@/shared/script/helpers/validate-form.js'
	import { mapState } from 'vuex';

	export default {
		name: 'account',

		components: {
			SetUsername,
			NewPassword,
			HeadingTooltip
		},

		props: {
			hasPassword: {
				type: Boolean,
				default: true
			}
		},

		computed: {
			...mapState('credentials', [
				'username',
				'email'
			])
		},

		methods: {
			formIsLoading(form, state) {
				form.querySelectorAll('[type="submit"]')
					.forEach(el => (el.disabled = state));
			},

			changeUsername (e) {
				const form = e.target;
				const newUsername = new FormData(form).get('username');

				if (newUsername === this.username) {
					return this.$toasted.success(this.$i18n.t('alreadyCurrentUsername'));
				} else {
					this.formIsLoading(form, true);
				}

				this.$API.changeUsername({ username: newUsername })
					.then(() => {
						this.toastWithConfirmation(this.$i18n.t('success.changeUsername'));
					})
					.finally(() => this.formIsLoading(form, false))
					.catch(this.raiseError);
			},

			changeEmail (e) {
				const form = e.target;
				const newEmail = new FormData(form).get('email');
				
				if (newEmail === this.email) {
					return this.$toasted.success(this.$i18n.t('alreadyCurrentEmail'));
				} else {
					this.formIsLoading(form, true);
				}

				this.$API.changeUserEmail({ email: newEmail })
					.then(() => {
						this.toastWithConfirmation(this.$i18n.t('success.changeEmail'));
					})
					.finally(() => this.formIsLoading(form, false))
					.catch(this.raiseError);
			},

			changePassword (e) {
				const form = e.target;
				const formData = new FormData(form);
				const currentPass = formData.get('current_password');
				const newPass = formData.get('password');
				const formValidity = validateForm(form, { report: true, noFollow: true });

        if (formValidity.valid) {
					if (document.querySelector('.password-confirm.validate-error')) {
						return this.$toasted.error(this.$i18n.t('invalidPassword'));
					} else {
						this.formIsLoading(form, true);
					}				
	
					this.$API.changeUserPassword({
						hasPassword: this.hasPassword,
						current_pass: currentPass,
						new_pass: newPass,
					})
					.then(() => {
						this.toastWithConfirmation(this.$i18n.t('success.changeUserPassword'));
					})
					.finally(() => this.formIsLoading(form, false))
					.catch(this.raiseError);
				}
			},

			toastWithConfirmation (message) {
				return this.$toasted.success(message, {
					duration: 0,
					action: {
						text : 'OK',
						onClick : (e, toastObject) => toastObject.goAway(0)
					},
				});
			},

			raiseError (error) {
				console.error(error);
				this.$el.querySelector('form input[type=submit]').disabled = false;
				this.$toasted.error(error || this.$i18n.t('askToRefreshDueError'));
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					save: 'Salvar',
					userName: 'Nome de usuário',
					yourEmail: 'Seu e-mail',
					createPassword: 'Criar senha',
					newPassword: 'Nova senha',
					changePassword: 'Mudar a senha',
					currentPassword: 'Senha atual',
					alreadyCurrentUsername: 'Este é o seu nome de usuário atual',
					alreadyCurrentEmail: 'Este é o seu e-mail atual',
					invalidPassword: 'Desculpe, sua nova senha não é válida',
					passwordRequiredWarning: 'Algumas configurações podem estar indisponíveis por necessitarem confirmação via Senha. Crie uma senha de usuário para desbloquea-las.',
					help: {
						userName: 'Aqui você pode mudar o seu nome de usuário (username). Lembre-se, seu nome de usuário aparece no endereço do seu curriculum online, por isso prefira um nome de usuário curto, amigável e descritivo.',
						yourEmail: 'Aqui você pode mudar o e-Mail vinculado a sua conta. Caso você esteja efetuando Login Social, ao modificar o seu e-Mail suas redes sociais serão desvincula-das deste perfil. Para modificuar seu e-Mail é necessário que você tenha definido uma senha de usuário, caso ainda não o tenha feito, você pode cria-la na sessão \'Criar Senha\' desta página.',
						createPassword: 'Você ainda não possui uma senha, criar uma habilitará funções administrativas avançadas no seu CV e garantirá maior segurança para você.',
						changePassword: 'Aqui você pode modificar a senha que você utiliza para logar no seu CV. Lembre-se de utilizar uma segura e não compartilhá-la com ninguém.',
					},
					success: {
						changeUsername: '<p>Sua solicitação de <strong>troca de nome de usuário</strong> foi enviada com sucesso. <strong>Esta ação necessita confirmação via e-Mail</strong>, por favor verifique sua caixa de entrada para confirmar sua solicitação</p>',
						changeEmail: '<p>Sua solicitação de <strong>troca de e-Mail</strong> foi enviada com sucesso. <strong>Um link de confirmação foi enviado para o seu atual e-Mail</strong>, por favor verifique sua caixa de entrada para confirmar esta solicitação</p>',
						changeUserPassword: `<p>Sua solicitação foi enviada com sucesso. <strong>Esta ação necessita confirmação via e-Mail</strong>, por favor verifique sua caixa de entrada</p>`,
					}
				},

				'en': {
					save: 'Save',
					userName: 'User name',
					yourEmail: 'Your e-mail',
					createPassword: 'Create password',
					newPassword: 'New password',
					changePassword: 'Change password',
					currentPassword: 'Current password',
					alreadyCurrentUsername: 'This is your current user name',
					alreadyCurrentEmail: 'This is your current e-mail',
					invalidPassword: 'Sorry, your new password isn\'t valid',
					passwordRequiredWarning: 'Some settings may be unavailable because they require confirmation via password. Create a user password to unlock them.',
					help: {
						userName: 'Here you can change your username. Remember, your username appears in the address of your online curriculum, so prefer a short, friendly and descriptive one.',
						yourEmail: 'Here you can change the e-Mail linked to your account. If you are doing Social Login, when modifying your e-Mail your social networks will be disconnected from this profile. To modify your e-Mail it is necessary that you have defined a user password, if you have not already done so, you can create it in the \'Create Password\' section of this page.',
						createPassword: 'You do not have a password yet, creating one will enable advanced administrative functions on your CV and ensure greater security for you.',
						changePassword: 'Here you can modify the password you use to log in to your CV. Remember to use a safe one and not share it with anyone.',
					},
					success: {
						changeUsername: '<p> Your <strong> username change </strong> request has been successfully sent. <strong> This action requires confirmation via e-Mail </strong>, please check your inbox to confirm your request </p>',
						changeEmail: '<p> Your <strong> e-Mail exchange </strong> request has been successfully sent. <strong> A confirmation link has been sent to your current e-Mail </strong>, please check your inbox to confirm this request </p>',
						changeUserPassword: '<p> Your request was sent successfully. <strong> This action requires confirmation via e-Mail </strong>, please check your inbox </p>',
					}					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.settings-account {
		.warning {
			border-radius: 4px;
			padding: 16px;
			color: #ffffff;
			font-weight: 600;
			font-size: 16px;
			margin-bottom: 30px;
			background-color: var(--color-warning);
			p {
				margin: 0;
				display: flex;
				padding: 0 1vw;
				align-items: center;
				i {
					font-size: 20px;
					margin-right: 16px;
					@media screen and (max-width: 768px) {
						display: none;
					}
				}
			}
		}
	}
</style>