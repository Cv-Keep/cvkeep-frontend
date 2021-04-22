<template>
	<div id="privacy" class="settings-privacy">
		<div class="privacy__content">

			<div class="privacy-messages">
				<heading-tooltip
					:title="$t('title')"
					:tooltipMessage="$t('messagesHelp')"/>

				<form enctype="multipart/form-data" action="/" @submit.prevent="save">

					<div class="field">

						<label class="toggle">
							{{ $t('allowPeopleSendMessage') }}
							<toggle-button
								color="var(--secondary-color)"
								:labels="true"
								v-model="localCvAllowPublicMessages"
							/>
						</label>
					</div>

					<div class="submit">
						<input type="submit" class="button button-primary" name="Submit" :value="$t('save')">
					</div>				
				</form>
			</div>

			<hr> 
				<cv-passwords/>
			<hr>

		</div>
	</div>
</template>

<script>
	import API from '@/shared/script/api/api.js'
	import HeadingTooltip from '@/components/settings/HeadingTooltip.vue'
	import CvPasswords from '@/components/settings/CvPasswords.vue'
	import { ToggleButton } from 'vue-js-toggle-button';

	export default {
		name: 'account',

		components: {
			CvPasswords,
			ToggleButton,
			HeadingTooltip,
		},
		
		computed: {
			privacy () {
				return this.$store.state.credentials.privacy
			}
		},

		data () {
			return {
				localCvAllowPublicMessages: this.$store.state.curriculum.allowPublicMessages
			}
		},

		methods: {
			save () {
				this.privacy.allowPublicMessages = this.localCvAllowPublicMessages;

				API.post({
					endpoint: '/account/changeprivacy',
					data: { privacy: this.privacy },
					success: data => {
						if (data.updated) {
							this.$toasted.success(this.$i18n.t('changeSuccess'));
						}
					},
					error: error => {
						this.$toasted.error(error)
					}
				})
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					save: 'Salvar',
					title: 'Mensagens',
					changeSuccess: 'Suas configurações foram atualizadas',
					allowPeopleSendMessage: 'Permitir que as pessoas me enviem Mensagens',
					messagesHelp: 'Ao permitir que as pessoas enviem mensagens, você abre um leque de possibilidades para receber de feedback, oportunidades e network com milhares de pessoas. Entretanto, pode ser que você prefira uma camada a mais de privacidade, para tal você pode desabilitar o recebimento de mensagens que o botão (bem como a funcionalidade) de enviar mensagens para você não aparecerão mais no seu currículum online.',
				},

				'en': {
					save: 'Save',
					title: 'Messages',
					changeSuccess: 'Your configurations has been updated',
					allowPeopleSendMessage: 'Allow people to send me messages',
					messagesHelp: 'By allowing people to send messages, you open up a range of possibilities for receiving feedback, opportunities and networking with thousands of people. However, it may be that you prefer an extra layer of privacy, for this you can disable the receipt of messages that the button (as well as the functionality) of sending messages will no longer appear in your online CV.',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.settings-privacy {
		form {
			.field {
				display: grid;
				max-width: 500px;
				position: relative;
				p {
					margin: 0;
				}
			}
			label {
				&.toggle {
					display: flex;
					align-items: center;
					font-weight: 500;
					justify-content: space-between;
					margin: 0;
					margin-bottom: var(--gutter);
				}
			}
			input[type="submit"] {
				min-width: 200px;
			}			
		}
	}
</style>