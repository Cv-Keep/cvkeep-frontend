<template>
	<cv-lightbox :title="$t('message')" v-if="active" @close="close">
		<div class="send-email">
			<h4><i class="fa fa-paper-plane"></i> {{ $t('sendMessageTo') }} <strong>{{name}}</strong></h4>
			
			<form id="contactForm" class="send-email-form" method="POST" enctype="multipart/form-data" action="/" ref="contactForm" @submit.prevent="sendEmail">
					<div class="field">
						<label>{{ $t('yourName') }}</label>
						<input type="text" name="n_001" required="true" autofocus>
					</div>
					
					<div class="field">
						<label>{{ $t('yourEmail') }}</label>
						<input type="email" name="e_001" required="true">
					</div>
					
					<div class="field">
						<label>{{ $t('subject') }}</label>
						<input type="text" name="s_001" required="true">
					</div>					
					
					<div class="field">
						<label>{{ $t('message') }}</label>
						<textarea name="m_001" required="true"></textarea>
					</div>

					<div class="take-away">
						<input type="text" name="name">
						<input type="email" name="email">
						<input type="text" name="subject">
						<input type="text" name="message">
					</div>
			</form>
		</div>

		<div class="submit" slot="footer">
			<input form="contactForm" class="button button-primary" type="submit" :value="$t('send')"/>
		</div>
	</cv-lightbox>
</template>

<script>
	
	import { mapState } from 'vuex'
	import serialize from 'form-serialize'
	import CvLightbox from '@/components/lightbox/Lightbox.vue'
	
	export default {
		name: 'SendEmail',
		
		components: {
			CvLightbox
		},
		
		props: {
			active: {
				type: Boolean,
				default: false
			}
		},
		
		computed: {
			...mapState('curriculum', {
				username: cv => cv.username,
				name: cv => cv.basics.fullname,
			}),
		},
		
		methods: {
			sendEmail () {
				const serializedData = serialize(this.$refs.contactForm, { hash: true });

				const data = {
					to: this.username,
					...serializedData
				};

				this.$API.sendEmailToUser(data)
					.then(this.success)
					.catch(this.raiseError)
			},

			success () {
				this.$toasted.success(this.$i18n.t('sendSuccess'));
				this.close();
			},

			raiseError (error) {
				this.$toasted.error(error);
			},

			close () {
				this.$emit('close')
			},
		},

		i18n: {
			messages: {
				'pt-br': {
					send: 'Enviar',
					yourName: 'Seu nome',
					yourEmail: 'Seu E-Mail',
					subject: 'Assunto',
					message: 'Mensagem',
					sendMessageTo: 'Enviar mensagem para',
					sendSuccess: 'Mensagem enviada com sucesso!',
				},

				'en': {
					send: 'Send',
					yourName: 'Your Name',
					yourEmail: 'Your E-Mail',
					subject: 'Subject',
					message: 'Message',
					sendMessageTo: 'Send message to',
					sendSuccess: 'Message successfully sent!',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.send-email {
		padding: var(--gutter);
		h4 {
			font-size: 20px;
			margin: 1.2rem 0;
			border-bottom: dashed 1px #ddd;
			padding-bottom: 16px;
			margin-bottom: 22px;
			b {
				color: var(--cv-color);
			}
			i {
				margin-right: 8px;
				color: var(--cv-color)
			}
		}
		form {
			margin: 0
		}
		.field, .field input, .field textarea {
			width: 100%;
		}
		textarea {
			min-height: 120px;
		}
		button, textarea {
			margin-bottom: 0;
		}
		.submit {
			display: flex;
			align-items: center;
			justify-content: space-between;
			input, button, h4 {
				margin: 0;
			}
		}
		.take-away {
			width: 0;
			height: 0;
			overflow: hidden;
			pointer-events: none;
		}
	}
</style>