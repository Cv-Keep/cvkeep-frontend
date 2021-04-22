<template>
	<button :class="`regdonebtn button button-primary slide-next loading-${loading}`" @click.prevent="register">
		<loading-spinner v-if="loading" :color="'#ffffff'"/>
		<span v-else class="btnlabel">{{ $t('register') }}</span>
	</button>
</template>

<script>
	import { mapState } from 'vuex'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
	import serialize from 'form-serialize'

	export default {
		name: 'register-done-btn',

		components: {
			LoadingSpinner
		},

		computed: {
			...mapState([ 'credentials' ]),
		},

		data () {
			return {
				loading: false,
			}
		},

		methods: {
			register () {
				const data = this.getData();
				const errors = this.validate(data);					
				
				this.loading = !errors.length;

				if (errors.length) {
					return errors.forEach(this.$toasted.error);
				}

				this.$API.confirmRegistration(data)
					.then(() => { window.location.href = `/cv/${data.credentials.username}` })
					.catch(error =>{
						this.$toasted.error(error);
						this.loading = false;
					});
			},

			getData () {
				const form = document.getElementById('confirmation-form');
				
				const data = {
					hash: window.location.hash.substr(1) || '',
					credentials: {
						...this.credentials, 
						...serialize(form, { hash: true }) 
					},
				};

				return data;
			},

			validate (data) {

				let errors = [];

				if (!data.credentials.username)
					errors.push(this.$i18n.t('errors.noUsername'));

				if (!data.credentials.password)
					errors.push(this.$i18n.t('errors.noPassword'));

				if (!data.credentials.confirmPassword)
					errors.push(this.$i18n.t('errors.confirmPassword'));

				if (data.credentials.password != data.credentials.confirmPassword)
					errors.push(this.$i18n.t('errors.passDoesntMatch'));

				if (data.credentials.password && data.credentials.password.length < 8)
					errors.push(this.$i18n.t('errors.passMinLength'));

				return errors;
			},
		},

		i18n: {
			messages: {
				'pt-br': {
					register: 'Registre-se',
					errors: {
						noUsername: 'Você deve definir um nome de usuário',
						noPassword: 'Você deve digitar uma senha',
						confirmPassword: 'Você deve confirmar a senha digita',
						passDoesntMatch: 'As senhas digitadas estão diferentes',
						passMinLength: 'A senha deve conter no mínimo 8 (oito) caracteres',
					}
				},

				'en': {
					register: 'Register',
					errors: {
						noUsername: 'You must define a username',
						noPassword: 'You must enter a password',
						confirmPassword: 'You must confirm the password',
						passDoesntMatch: 'The passwords entered are different',
						passMinLength: 'The password must contain at least 8 (eight) characters',
					}
				}				
			}
		}
	}
</script>

<style lang="scss" scoped>
	button.regdonebtn {
		display: flex;
		align-items: center;
		justify-content: center;
		svg {
			width: 20px;
			height: 20px;
		}
		&.loading-true {
			pointer-events: none;
		}
	}
</style>