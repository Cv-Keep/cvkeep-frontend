<template>
	<div class="confirmation-error">
		<h4>{{prefix}}</h4>
		<h4>{{error}}</h4>
		<br/><br/>
		<router-link to="/" class="button">{{ $t('homepage') }}</router-link>
	</div>
</template>

<script>

	export default {
		name: "confirmation-error",
		
		props: {
			error: {
				type: String,
				default: ''
			},

			prefix: {
				type: String,
				default: 'Ops...'
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					homepage: 'Página Inicial'
				},

				'en': {
					homepage: 'Homepage'
				},

				'fr-fr': {
					homepage: 'Page d\'accueil'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirmation-error {
		text-align: center;
	}
</style>