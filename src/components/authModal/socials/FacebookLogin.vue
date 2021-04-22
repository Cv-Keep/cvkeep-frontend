<template>
  <div class="facebook-login" @click="fbLogin">
    <slot/>
  </div>
</template>

<script>
export default {
  /* eslint-disable */
  name: 'facebook-login',
  
  data() {
    return {
      fbReady: false
    }
  },

  methods: {
    fbLogin () {
      if (this.$logged) return false;
     
      FB.login(response => {
        if (response.status === 'connected') {

          const data = { fb: response };

          this.$API.signInWithFacebook(data)
            .then(() => {
              window.location.href = "/cv";
            })
            .catch(error => {
              this.$parent.loading = false;
              this.$toasted.error(this.$i18n.t('facebookLoginError'));
            })
        }
      }, { scope: 'email' });
    },
  },
  mounted() {
    const fbSDKLoaded = () => {
      this.fbReady = true;
    }

    window.fbAsyncInit = function() {
      FB.init({
        appId      : process.env.VUE_APP_FACEBOOK_API_ID,
        cookie     : true,
        xfbml      : true,
        version    : `${process.env.VUE_APP_FACEBOOK_API_VERSION}`
      });
        
      FB.AppEvents.logPageView();
      fbSDKLoaded();
    };

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }
}
</script>