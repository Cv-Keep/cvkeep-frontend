import ComponentAuthModal from '@/components/authModal/AuthModal.vue'

const AuthModal = {

  install(Vue) {

    this.EventBus = new Vue()
    Vue.component('auth-modal', ComponentAuthModal)

    Vue.prototype.$AuthModal = {
      show (params) {
        AuthModal.EventBus.$emit('show', params)
      },

      close (params) {
        AuthModal.EventBus.$emit('close', params)
      }      
    }
  }
}

export default AuthModal