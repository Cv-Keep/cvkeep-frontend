import Vuex from 'vuex'
import store from './store/index.js'
import contentEditable from 'vue-contenteditable-directive'
import Toasted from 'vue-toasted'
import AuthModal from '@/plugins/AuthModal.js'
import API from '@/shared/script/api/api.js'
import broadcast from '@/shared/script/helpers/broadcast.js'
import ClickOutside from 'vue-click-outside'
import VueObserveVisibility from 'vue-observe-visibility'
import VueTheMask from 'vue-the-mask'
import i18n from './i18n.js'

import '@fortawesome/fontawesome-free/css/all.css'
import '@/shared/style/index.scss'
import 'swiper/swiper-bundle.css'
import './registerServiceWorker'

export default async Vue => {
  broadcast.listen();
  
  Vue.use(Vuex)
  Vue.use(AuthModal)
  Vue.use(VueTheMask)
  Vue.use(contentEditable)
  Vue.use(VueObserveVisibility)
  
  Vue.use(Toasted, {
    duration: 6000,
    position: 'top-center',
    theme: 'custom-theme', // _toasted.scss
  });
  
  Vue.config.performance = true;
  Vue.config.productionTip = false;
  Vue.prototype.$brandName = 'Cv Keep';
  
  Vue.mixin({
    computed: {
      $API: () => API,
      $editing: () => false,
      $appLang: () => store.state.credentials.lang,
      $logged: () => store.state.credentials.logged,
      $username: () => store.state.credentials.username,
      $cvLang: () => store.state.curriculum.lang || API.getDefaultLocale(), 
      $loadedCredentials: () => Object.keys(store.state.credentials).length > 0,
            
      $isOwnCv: function () {
        return this.$logged && this.$route.params.user === this.$username;
      },
      
			$appLoading: {
				get () { return store.state.application.isLoading },
				set (value) { store.state.application.isLoading = value; }
			},

      $showDonation: {
        get () {
          return process.env.VUE_APP_DONATION_PAYPAL_URL ||
            process.env.VUE_APP_DONATION_PIX_KEY ||
            process.env.VUE_APP_DONATION_BITCOIN;
        }
      }
    },
    
    directives: {
      ClickOutside
    }
  });

  // --------------------------------------------------------------------

  API.getCredentials()
    .then(credentials => {
      store.state.credentials = credentials || {};

      i18n.locale = credentials.lang;
    })
    .catch(error => {
      console.error(error);

      Vue.toasted.error(i18n.t('errors.fatalErrorWhenInitializing'), {
        duration: 30000,
        action: {
          text : 'OK',
          onClick : (e, toastObject) => toastObject.goAway(0)
        },
      });
    });

  // --------------------------------------------------------------------
  
  return { store, i18n };
}