<template>
	<component :is="onlyinput ? 'div' : 'reg-step'" :title="$t('chooseYourUsername')" icon="fa-user">
		
		<div class="field">
			<label>{{ $t('username') }}</label>
			
			<input
				required
				autofocus
				class="block"
				type="text"
				name="username"
				maxlength="32"
				autocomplete="off"
				v-model="username"
				@keydown.tab.prevent
				@input="checkUsername"
				:placeholder="$t('usernameExample')"
				@keydown.enter.prevent="$emit('press-enter')"
				@blur="cannotBeEmpty"
			>

			<loading-spinner v-if="username.length && loading"/>
		</div>

		<div class="validation">
			<p class="allowed" v-if="username && allowed">
				<i class="fa fa-check"></i>{{ $t('usernameAvailable') }}
			</p>
		
			<p class="error" v-if="username && showdeny && !allowed">
				<i class="fa fa-times"></i>{{ $t('usernameNotAvailable') }}
			</p>
		</div>

	</component>
</template>

<script>
	import { mapState } from 'vuex'
	import Utils from '@/shared/script/helpers/utils.js'
	import RegStep from './_RegStep.vue'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

	export default {
		name: 'step-username',
		
		components: {
			RegStep,
			LoadingSpinner
		},

		props: {
			onlyinput: {
				type: Boolean,
				default: false
			},

			reactive: {
				type: Boolean,
				default: true
			},

			startvalue: {
				type: String,
				default: ""
			}
		},

		computed: {
			...mapState([ 'credentials' ]),

			username: {
				get () { 
					return this.reactive ? this.credentials.username : this.model;
				},

				set (value) {
					if (this.reactive) {
						this.credentials.username = value;
					} else {
						this.model = value;
					}
				}
			}
		},

		data() {
			return {
				loading: false,
				allowed: false,
				showdeny: false,
				model: this.startvalue,
			}
		},

		methods: {
			checkUsername (e) {
				this.loading = true;
				this.allowed = false;
				this.showdeny = false;
				this.username = Utils.slugify(this.username);
				clearTimeout(window.donetyping);

				if (!this.username || this.username === this.credentials.username) {
					this.loading = false;
					return false;
				}

				window.donetyping = setTimeout(() => {	
					if (e.target.value) {
						this.$API.checkUsername({ username: this.username })
							.then(data => {
								this.allowed = data.allowed;
								this.showdeny = !data.allowed ? true : false;
							})
							.catch(this.$toasted.error)
							.finally(this.loading = false);
					}
				}, 800);
			},

			cannotBeEmpty (e) {
				if (!e.target.value) {
					this.loading = false;
					this.username = this.credentials.username;
				}
			}
		},

		mounted () {
			this.$emit('release');
		},

		i18n: {
			messages: {
				'pt-br': {
					username: 'Nome de usuário',
					usernameExample: 'Exemplo: johndoe123',
					chooseYourUsername: 'Escolha o seu nome de usuário',
					usernameAvailable: 'Nome de usuário disponível para uso',
					usernameNotAvailable: 'Este nome de usuário não está disponível',
				},

				'en': {
					username: 'User Name',
					usernameExample: 'Example: johndoe123',
					chooseYourUsername: 'Choose your username',
					usernameAvailable: 'Username available for use',
					usernameNotAvailable: 'This username is not available',					
				},

				'fr-fr': {
					username: 'Nom de l\'utilisateur',
					usernameExample: 'Exemple: johndoe123',
					chooseYourUsername: 'Choisissez votre nom d\'utilisateur',
					usernameAvailable: 'Nom d\'utilisateur disponible pour l\'utilisation',
					usernameNotAvailable: 'Ce nom d\'utilisateur n\'est pas disponible',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.field {
		position: relative;
		svg {
			position: absolute;
			bottom: 0;
			width: 20px;
			right: 14px;
		}
		input {
			padding-right: 42px;
		}
	}
	.validation {
		p {
			margin: 0;
			width: 100%;
			display: flex;
			align-items: center;
			color: #ffffff;
			border-radius: 4px;
			font-weight: 700;
			opacity: .8;
			padding: 10px var(--gutter);
			i {
				width: 30px;
				height: 30px;
				font-size: 18px;
				display: inline-flex;
				align-items: center;
				justify-content: center;
				margin-right: 6px;
				padding: 6px;
				border: solid 2px #ffffff;
				border-radius: 100%;
			}
			&.allowed {
				background-color: var(--color-success);
			}
			&.error {
				background-color: var(--color-error);
			}
		}
	}
</style>