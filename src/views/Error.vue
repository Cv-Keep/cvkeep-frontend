<template>
	<div class="error-view">
    <div class="error-content">

      <img src="@/assets/error.svg">
      
      <div class="error-message">
        <h4>{{ $t('error') }} :(</h4>
        <p>{{ this.$route.query.m || $t('unknownError') }}</p>
      </div>
      
      <div class="go-home">
        <router-link to="/">
          <button>{{ $t('goHome') }}</button>
        </router-link>
      </div>
    </div>
	</div>
</template>

<script>
export default {
  name: 'error-view',

  i18n: {
    messages: {
      'pt-br': {
        'error': 'Erro',
        'unknownError': 'Erro desconhecido',
        'goHome': 'Ir para a Home'
      },

      'en': {
        'error': 'Error',
        'unknownError': 'Unknown error',
        'goHome': 'Homepage'
      },

      'fr-fr': {
        'error': 'Erreur',
        'unknownError': 'Erreur inconnue',
        'goHome': 'Page d\'accueil',
      }
    }
  }
}
</script>

<style lang="scss">
  .error-view {    
    .error-content {
      min-height: 100vh;
      max-width: 600px;
      margin: 0 auto;
      padding: 28px;
      padding-top: calc(var(--header-height) + 28px);
      img {
        max-width: 400px;
        width: 100%;
        display: block;
        margin: 0 auto;
        margin-bottom: 28px;
      }
      h4 {
        display: block;
        font-weight: 600;
        color: var(--color-error);
      }
      .go-home {
        width: 100%;
        padding: 32px 0;
        text-align: center;
      }    
    }
  }
</style>