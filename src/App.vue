<template>
  <div id="app">
    <app-header/>
    
    <main>
      <transition name="fade" mode="out-in">
        <router-view/>
      </transition>

      <auth-modal/>
      <cookie-consent v-if="!$logged"/>
    </main>

    <app-footer/>
    
    <transition name="fade" mode="out-in">
      <loading-backdrop v-if="$appLoading"/>
    </transition>
  </div>
</template>

<script>
  import AppHeader from '@/components/header/Header.vue'
  import AppFooter from '@/components/footer/Footer.vue'
  import LoadingBackdrop from '@/components/loading/LoadingBackdrop.vue'
  import CookieConsent from '@/components/cookieConsent/CookieConsent.vue'

  export default {
    components: {
      AppHeader,
      AppFooter,
      CookieConsent,
      LoadingBackdrop,
    },

    mounted () {
      this.$root.$on('error', this.$toasted.error);

      window.addEventListener('message', message => {
        if (message.data === '__LOADING_ON__') {
          this.$appLoading = true;
        }

        if (message.data === '__LOADING_OFF__') {
          this.$appLoading = false;
        }
      });
    }
  }
</script>

<style lang="scss">
  #app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>