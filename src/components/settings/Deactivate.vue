<template>
	<div class="danger-zone">
		<div class="title">
			<heading-tooltip
				:title="$t('deactivateMyAccount')"
				elStyle="color: var(--color-error)"
				:tooltipMessage="$t('deactivateMyAccountHelp')"/>
		</div>

		<div class="privacy-form">
			<form enctype="multipart/form-data" action="/" @submit.prevent="deactivate" novalidate>
				<button class="button button-primary deactivate" @click.prevent="toggleModal">{{ $t('deactivateMyAccount') }}</button>

				<cv-lightbox :title="$t('deactivateAccount')" v-if="modalOpened" @close="toggleModal">
					<div class="deactivation-holder">
						<div class="holder-msg">
							<animated-icon icon="garbage-bin"/>
							<h4>{{ $t('atention') }}</h4>

							<div v-if="hasPassword">
								<p><strong>{{ $t('areYouSureToDeactivate') }}</strong></p>
								<p>{{ $t('deactivateWarning') }}</p>
							</div>
							<div v-else>
								<p>{{ $t('youNeedPassword') }}</p>
							</div>
						</div>

						<div class="password field" v-if="hasPassword">
							<input type="password" name="current_password" required :disabled="!hasPassword" :placeholder="$t('enterYourPassword')" autofocus>
						</div>
					</div>

					<div slot="footer">
						<button class="button-seamless" @click.prevent="toggleModal">{{ $t('cancel') }}</button>
						<input type="submit" class="button button-primary" name="Submit" :value="$t('deactivate')" :disabled="!hasPassword">
					</div>
				</cv-lightbox>
			</form>
		</div>
	</div>
</template>

<script>
	import CvLightbox from '@/components/lightbox/Lightbox.vue'
	import HeadingTooltip from '@/components/settings/HeadingTooltip.vue';
	import validateForm from '@/shared/script/helpers/validate-form.js'
	import AnimatedIcon from '@/components/animated-icon/AnimatedIcon.vue'

	export default {
		name: 'account',
		
		components: {
			CvLightbox,
			AnimatedIcon,
			HeadingTooltip
		},

		props: {
			hasPassword: {
				type: Boolean,
				default: false
			}			
		},

		data () {
			return {
				modalOpened: false
			}
		},
		
		methods: {
			toggleModal () {
				this.modalOpened = !this.modalOpened
			},

      deactivate (e) {
				const form = e.target;
				const formValidity = validateForm(form, { report: true });

				if (formValidity.valid) {
					const pass = new FormData(form).get('current_password');
					
					this.$API.deactivateAccount({ pass })
						.then(() => {
							this.toastWithConfirmation(`<p>Uma solicitação de <strong>DESATIVAÇÂO</strong> desta conta foi enviada para o seu E-Mail.
							Por favor, cheque sua caixa de entrada e confirme esta ação para desativar a sua conta.</p>`)
						})
						.catch(this.$toasted.error);
				}
			},

			toastWithConfirmation (message) {
				return this.$toasted.info(message, {
					duration: 0,
					action: {
						text : 'OK',
						onClick : (e, toastObject) => toastObject.goAway(0)
					},
				});
			}
		},
		
		i18n: {
			messages: {
				'pt-br': {
					atention: 'Atenção',
					cancel: 'Cancelar',
					deactivate: 'Desativar',
					deactivateAccount: 'Desativar Conta',
					deactivateMyAccount: 'Desativar minha conta',
					enterYourPassword: 'Digite sua senha para continuar',
					areYouSureToDeactivate: 'Tem certeza que deseja desativar esta conta?',
					youNeedPassword: 'Você precisa criar uma senha para desbloquear esta ação',
					deactivateWarning: 'Esta ação poderá ser desfeita caso um login seja efetuado em até 30 dias. Ao desativar a sua conta seu nome de usuário ficará disponível para uso.',
					deactivateMyAccountHelp: 'Aqui você pode desativar a sua conta. Note que ao desativá-la o seu nome de usuário ficará disponível para que outras pessoas o utilizem. Você pode reativar sua conta num prazo de 30 dias, após isso ela será deletada de nossa base de dados. Uma vez iniciado o processo de exclusão, seu currículo será imediatamente removido da internet. Caso você não possua uma senha, será necessário criá-la antes de prosseguir.',
				},

				'en': {
					atention: 'Atention',
					cancel: 'Cancel',
					deactivate: 'Deactivate',
					deactivateAccount: 'Deactivate Account',
					deactivateMyAccount: 'Deactivate my account',
					enterYourPassword: 'Enter your password to proceed',
					areYouSureToDeactivate: 'Are you sure you want to deactivate your account?',
					youNeedPassword: 'You need to create a password to unblock this action',
					deactivateWarning: 'This action can be undone if a login is made within 30 days. When you deactivate your account your username will be available for use.',
					deactivateMyAccountHelp: 'Here you can deactivate your account. Please note that by disabling it, your username will be available for others to use. You can reactivate your account within 30 days, after which it will be deleted from our database. Once the exclusion process has started, your resume will be immediately removed from the internet. If you do not have a password, you will need to create it before proceeding',
				},				
			}
		}
	}
</script>

<style lang="scss">
	.danger-zone {
		.title {
			margin-bottom: var(--gutter);
		}
    form {
			margin-bottom: 0;
			.field {
				display: grid;
				width: 100%;
				margin: 0;
				max-width: unset;
			}
			input[type="submit"], button.deactivate {
				margin-bottom: 0;
				min-width: unset;
				min-width: 230px;
				border-color: var(--color-error);
				background-color: var(--color-error);
				&[disabled] {
					opacity: .3;
					pointer-events: none;
				}
			}
    }
		.deactivation-holder {
			text-align: center;
			padding: var(--gutter);
			.holder-msg {
				border-radius: 8px;
				padding: 42px var(--gutter);
				margin-bottom: 32px;
				background-color: var(--hover-color);
				img {
					margin-bottom: var(--gutter);
				}
				h4 {
					font-weight: 600;
					margin-bottom: 8px;
					color: var(--color-error);
				}
				p {
					margin: 0;
				}
				h4 + p {
					margin-bottom: var(--gutter);
				}
			}
		}
		.password {
			text-align: left;
		}
	}
</style>