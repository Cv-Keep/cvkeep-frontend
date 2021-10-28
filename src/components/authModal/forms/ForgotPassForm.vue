<template>
  <auth-form @on-submit="forgotPass" :loading="loading">
    
    <div class="inputs">  
      <div class="field">
        <i class="fa fa-envelope"></i>

        <input type="email" name="email" placeholder="E-mail" required/>
      </div>
      
      <p>
        <strong><a href="/" @click.prevent="$emit('go-to-login')">{{ $t('doLogin') }}</a></strong>
        ou
        <strong><a href="/" @click.prevent="$emit('go-to-register')">{{ $t('register') }}</a></strong>
      </p>
    </div>

    <div v-if="!loading" class="submit">
      <input class="button-primary" type="submit" :value="$t('send')">
    </div>

  </auth-form>
</template>

<script>
  import validateForm from '@/shared/script/helpers/validate-form.js'
  import AuthForm from './AuthForm.vue'
  import serialize from 'form-serialize'

  export default {
    name: 'forgot-pass-form',

    components: {
      AuthForm
    },
    
    data () {
      return {
        loading: false
      }
    },

    methods: {
      forgotPass (form) {
        const formValidity = validateForm(form, { report: true });

        if (formValidity.valid) {
          this.loading = true;
          const data = serialize(form, { hash: true });
          
          this.$API.forgotPass(data)
            .then(this.success)
            .catch(error => this.$emit('error', error))
            .finally(() => (this.loading = false));
        }
      },

      success () {
        this.$toasted.success(this.$i18n.t('forgotPasswordEmailSent'));
      }
    },

    mounted () {
      this.$el.querySelector('input[name=email]').focus();
    },

    i18n: {
      messages: {
        'pt-br': {
          send: 'Enviar',
          doLogin: 'Fazer Login',
          register: 'Registrar-se',
          forgotPasswordEmailSent: 'Um e-mail foi enviado para você. Por favor, verifique sua caixa de entrada',
        },

        'en': {
          send: 'Send',
          doLogin: 'Login',
          register: 'Register',
          forgotPasswordEmailSent: 'An e-mail was sent to you. Please, check your inbox',
        },
        
         'fr-fr': {
          send: 'Envoyer',
          doLogin: 'Se connecter',
          register: 'S\'enregistrer',
          forgotPasswordEmailSent: 'Un e-mail vous a été envoyé. Veuillez vérifier votre boîte de réception',
        },
      }
    }
  }
</script>