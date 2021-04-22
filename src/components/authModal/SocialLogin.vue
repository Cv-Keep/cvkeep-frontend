<template>
  <div class="social-login" :class="loading ? 'loading' : ''">
    <p v-if="!loading">{{ traducedLabel }}</p>
    <ul v-if="!loading">
      
      <li v-if="canAuthWith('email')" @click="$emit('emailClick')">
        <i class="fa fa-envelope"></i>
        <span>E-Mail</span>
      </li>
      
      <li v-if="canAuthWith('facebook')" @click="loading=true">
        <facebook-login>
          <i class="fab fa-facebook"></i>
          <span>Facebook</span>
        </facebook-login>
      </li>
      
      <li v-if="canAuthWith('likedin')" @click="loading=true">
        <linked-in-login>
          <i class="fab fa-linkedin"></i>
          <span>LinkedIn</span>
        </linked-in-login>
      </li>
      
      <li v-if="canAuthWith('github')" @click="loading=true">
        <github-login>
          <i class="fab fa-github"></i>
          <span>Github</span>
        </github-login>
      </li>

    </ul>
    <loading-spinner color="var(--secondary-color)" v-else/>
  </div>
</template>

<script>

import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
import GithubLogin from '@/components/authModal/socials/GithubLogin.vue'
import FacebookLogin from '@/components/authModal/socials/FacebookLogin.vue'
import LinkedInLogin from '@/components/authModal/socials/LinkedInLogin.vue'

export default {
  name: "social-login",
  
  components: {
    LoadingSpinner,
    GithubLogin,
    FacebookLogin,
    LinkedInLogin,
  },

  props: {
    label: {
      type: String,
      default: 'enterUsing'
    }
  },

  computed: {
    traducedLabel () {
      return this.label === 'enterUsing' ? this.$i18n.t(this.label) : this.label
    }
  },
  
  data () {
    return {
      loading: false,
      authAvailable: process.env.VUE_APP_AUTH_AVAILABLE.split(' ')
    }
  },

  methods: {
    canAuthWith(what) {
      return this.authAvailable.includes(what);
    }
  },

  i18n: {
    messages: {
      'pt-br': {
        enterUsing: 'Entrar utilizando'
      },

      'en': {
        enterUsing: 'Enter using'
      }
    }
  }
}
</script>

<style lang="scss">
  .social-login {
    max-width: 400px;
    margin: 0 auto;
    padding: 36px 0;
    min-height: 56px;
    > p {
      text-align: left;
      color: #444;
      font-weight: 600;
    }
    ul {
      list-style: none;
      display: flex;
      display: flex;
      justify-content: space-between;
      li {
        text-align: center;
        cursor: pointer;
        i {
          width: 56px;
          height: 56px;
          opacity: .8;
          background-color: #444444;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
          font-size: 30px;
          margin-bottom: 10px;
          color: #ffffff;
          &.fa-envelope {
            background-color: var(--secondary-color);
          }
          &.fa-facebook {
            background-color: var(--color-facebook);
          }
          &.fa-github {
            background-color: var(--color-github);
          }
          &.fa-linkedin {
            background-color: var(--color-linkedin);
          }          
        }
        span {
          display: block;
          font-weight: 600;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        &:hover {
          i {
            opacity: 1;
          }
        }
      }
    }
    &.loading {
      padding-top: 100px;
      + * {
        display: none;
      }
    }
  }
</style>