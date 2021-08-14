<template>
	<div class="contact" style="background-image:url('/img/backgrounds/000.jpg')">
		<div class="content container">
			<div class="title">
				<h1>{{ $t('contact') }}</h1>
				<hr>
				<p>{{ $t('subtitle') }}</p>
				<h4><strong>{{contactEmail}}</strong></h4>
			</div>

			<div class="image">
				<img src="@/assets/resumec.svg">
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Contact',

		data () {
			return {
				contactEmail: process.env.VUE_APP_CONTACT_EMAIL
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					contact: 'Contato',
					subtitle: 'Você pode entrar em contato conosco através do endereço de E-Mail'
				},

				'en': {
					contact: 'Contact',
					subtitle: 'You can contact us through the E-Mail address'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.contact {
		min-height: 100vh;
		padding: 140px 0;
		.content {
			display: flex;
			padding: 0;
			background-color: #ffffff;
			border-radius: 8px;
			> div {
				width: 50%;
				padding: calc(var(--gutter) * 2);
				img {
					display: block;
					max-width: 90%;
				}
			}
			@media screen and (max-width: 800px) {
				display: block;
				> div {
					width: 100%;
					img {
						max-width: 300px;
						margin: 0 auto;
					}
				}
			}
		}
	}
</style>