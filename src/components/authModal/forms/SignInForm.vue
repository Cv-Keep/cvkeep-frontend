<template>
  <auth-form @on-submit="signIn" :loading="loading">
    <div class="inputs">
      <div class="field">
        <span class="go-back" @click="$emit('go-back')">
          <i class="fa fa-arrow-left block"></i> {{ $t('goBack') }}
        </span>
      </div>

      <div class="field">
        <i class="fa fa-envelope"></i>
        <input type="email" name="email" placeholder="E-mail" autocomplete="username" required autofocus/>
      </div>

      <div class="field">
        <i class="fa fa-asterisk"></i>
        <input type="password" name="password" :placeholder="$t('password')" autocomplete="current-password" required/>
      </div>

      <p><strong><a href="/" @click.prevent="$emit('forgot-pass')">{{ $t('forgotPass') }}</a></strong></p>
    </div>
    
    <div class="submit" v-if="!loading">
      <input class="button-primary" type="submit" :value="$t('send')">
    </div>
  </auth-form>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
  import validateForm from '@/shared/script/helpers/validate-form.js'
  import AuthForm from './AuthForm.vue'
  import serialize from 'form-serialize'

  export default {
    name: 'sign-in-form',

    components: {
      AuthForm
    },
    
    data () {
      return {
        loading: false
      }
    },

    methods: {
      signIn (form) {
        const formValidity = validateForm(form, { report: true });

        if (formValidity.valid) {
          const data = serialize(form, { hash: true });
  
          this.loading = true;
  
          this.$API.signInWithEmail(data)
            .then(data => {
              const username = data.user.username;
              Utils.storeJWTTokenSet(data.token);
              window.location.href = `/cv/${username}`;
            })
            .catch(error => {
              this.loading = false;
              this.$emit('error', error);
            });
        }
      },      
    },

    mounted () {
      this.$el.querySelector('input[name=email]').focus();
    },

    i18n: {
      messages: {
        'pt-br': {
          send: 'Enviar',
          goBack: 'Voltar',
          password: 'Senha',
          forgotPass: 'Esqueceu a senha?',
        },

        'en': {
          send: 'Send',
          goBack: 'Back',
          password: 'Password',
          forgotPass: 'Forgot password?',          
        },

         'fr-fr': {
          send: 'Envoyer',
          goBack: 'Retour',
          password: 'Mot de passe',
          forgotPass: 'Mot de passe oublié ?',          
        }
      }
    }
  }
</script>