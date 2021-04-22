<template>
  <div class="cookies-consent" v-if="!isHidden">
    <div class="container">
      <h5 class="title">
        <i class="fa fa-cookie-bite"></i>
        <strong>{{ $t('atention') }}</strong>
      </h5>
      <p v-html="$t('cookieConsentText')"></p>

      <button @click="dismiss">{{ $t('understood') }}</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'cookie-consent',

    data () {
      return {
        storageKey: 'cookie-consent-hidden-0',
      }
    },

    computed: {
      isHidden: {
        get () {
          return !!window.localStorage.getItem(this.storageKey) || this.$route.path.includes('/cv');
        },
        set (v) {
          window.localStorage.setItem(this.storageKey, JSON.stringify(v));
        }
      }
    },

    methods: {
      dismiss () {
        this.$el.style.bottom = '-100%';
        setTimeout(() => { this.isHidden = true }, 200);        
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          atention: 'Atenção',
          understood: 'Concordo',
          cookieConsentText: 'Este site utiliza Cookies e outros métodos de persistencia de dados para melhorar a experiência de navegação e criar conteúdo personalizado para você. Para mais informações a respeito de como gerenciamos dados, cookies e informações sensíveis, por favor leia os nossos <a href="/terms">Termos e Condições</a>. Ao continuar navegando neste site você estará de acordo com esta Política.',
        },

        'en': {
          atention: 'Atention',
          understood: 'I agree',
          cookieConsentText: 'This site uses Cookies and other methods of data persistence to improve the navigation experience and create personalized content for you. For more information on how we manage data, cookies and sensitive information, please read our <a href="/terms">Terms and Conditions</a>. By continuing to browse this site you will be in compliance with this Policy.',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .cookies-consent {
    z-index: 100;
    position: fixed;
    padding: var(--gutter);
    bottom: 0;
    right: 0;
    width: 100%;
    color: #ffffff;
    max-width: 500px;
    transition: 200ms;
    background-color: #222;
    h5 i {
      margin-right: 8px;
    }
    button {
      color: #ffffff;
      border-color: #ffffff;
    }
  }
</style>