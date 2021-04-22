<template>
	<div class="success-view">
    <div class="success-content">

      <img src="@/assets/success.svg">
      
      <div class="success-message">
        <h4>{{ $t('allRight') }}</h4>
        <p>{{ $route.query.m }}</p>
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
import broadcast from '@/shared/script/helpers/broadcast.js';

export default {
  name: 'success-view',

  methods: {
    disconnectAllTabs () {
      broadcast.send('disconnect', {
        type: 'info',
        logged: this.$logged
      });
    }
  },

  mounted () {
    const callback = this.$route.query.c;

    if (callback && this[callback]) {
      this[callback]();
    }
  },

  i18n: {
    messages: {
      'pt-br': {
        'allRight': 'Tudo certo',
        'goHome': 'Ir para Home'
      },

      'en': {
        'allRight': 'All right',
        'goHome': 'Homepage'        
      }
    }
  }
}
</script>

<style lang="scss">
  .success-view {
    min-height: 100vh;
    max-width: 600px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
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
      color: var(--color-success);
    }
    .go-home {
      width: 100%;
      padding: 32px 0;
      text-align: center;
    }
  }
</style>