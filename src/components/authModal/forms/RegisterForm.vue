<template>
  <auth-form @on-submit="register" :loading="loading">        
    <div class="inputs">
      <div class="field">
        <span class="go-back" @click="$emit('go-back')">
          <i class="fa fa-arrow-left block"></i> {{ $t('goBack') }}
        </span>
      </div>

      <div class="field">
        <i class="fa fa-envelope"></i>
        <input type="email" name="email" placeholder="E-mail" required/>
      </div>

      <div class="field">
        <i class="fa fa-envelope-open"></i>
        <input type="email" name="email_confirmation" :placeholder="$t('confirmYourEmail')" required/>
      </div>
    </div>

    <div v-if="!loading" class="submit">
      <input class="button-primary" type="submit" :value="$t('send')">
    </div>   
  </auth-form>
</template>

<script>
  import AuthForm from './AuthForm.vue'
  import serialize from 'form-serialize'
  import validateForm from '@/shared/script/helpers/validate-form.js'

  export default {
    name: 'register-form',

    components: {
      AuthForm
    },
    
    data () {
      return {
        loading: false
      }
    },

    methods: {
      register (form) {
        const formValidity = validateForm(form, { report: true });
        
        if (formValidity.valid) {
          const data = serialize(form, { hash: true });

          if (data.email != data.email_confirmation) {
            this.$emit('error', this.$i18n.t('emailsMatchError'));

            return false          
          } 
          
          this.loading = true;

          this.$API.register(data)
            .then(this.success)
            .catch(error => this.$emit('error', error))
            .finally(() => (this.loading = false));
        }
      },
      
      success (data) {
        this.$toasted.success(data.message, {
          duration: 10000,
          action: {
            text : 'OK',
            onClick : (e, toastObject) => toastObject.goAway(0)
          },
        });

        this.$AuthModal.close();
      }
    },

    mounted () {
      this.$el.querySelector('input[name=email]').focus();
    },

    i18n: {
      messages: {
        'pt-br': {
          send: 'Enviar',
          goBack: 'Voltar',
          confirmYourEmail: 'Confirme seu e-mail',
          emailsMatchError: 'Os e-mails inseridos estão diferentes',
        },

        'en': {
          send: 'Send',
          goBack: 'Back',
          confirmYourEmail: 'Confirm your e-mail',
          emailsMatchError: 'The entered emails are different',
        },
        
         'fr': {
          send: 'Envoyer',
          goBack: 'Retour',
          confirmYourEmail: 'Confirmer votre e-mail',
          emailsMatchError: 'Les emails saisis sont différents',
        }       
      }
    }
  }
</script>