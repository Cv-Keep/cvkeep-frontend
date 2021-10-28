<template>
	<div class="not-found">
		<div class="not-found__content">
			<div class="image">
				<img src="@/assets/404.svg">
			</div>
			
			<div class="message">
				<p>{{url}}</p>
				<h4>{{ $t('notFoundText') }}</h4>
				<router-link to="/" class="button">{{ $t('goHome') }}</router-link>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'not-found',

		data () {
			return {
				url: window.location.href
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					goHome: 'Página Inicial',
					notFoundText: 'Este conteúdo não existe ou foi movido',
				},

				'en': {
					goHome: 'Homepage',
					notFoundText: 'This content does not exist or has been moved',
				},

				'fr': {
					goHome: 'Page d\'accueil',
					notFoundText: 'Ce contenu n\'existe pas ou a été déplacé',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.not-found {
		display: flex;
		align-items: center;
		padding: var(--gutter);
		justify-content: center;
		min-height: 100vh;
		padding-top: var(--header-height);
		&__content {
			text-align: center;
			.image {
				img {
					width: 90%;
					max-width: 400px;
				}
			}
			.message {
				padding: 28px 10px;
				p {
					font-size: 18px;
					margin-bottom: 4px;
				}
				h4 {
					margin-bottom: 32px;
				}
			}
		}
	}
</style>