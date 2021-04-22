<template>
  <form ref="signInForm" action="#" @submit.prevent="$emit('on-submit', $el)" :class="`loading-${loading}`" novalidate>
    <slot v-if="!loading"/>
    <loading-spinner v-else/>
  </form>
</template>

<script>
  import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

  export default {
    name: 'auth-form',

    components: {
      LoadingSpinner
    },
    
    props: {
      loading: {
        type: Boolean,
        default: false
      }
    },
  }
</script>

<style lang="scss" scoped>
  form {
    margin: 0;
    .inputs {
      text-align: center;
      padding: 28px 0;
      .field {
        position: relative;
        display: inline-block;
        max-width: 400px;
        width: 100%;
        margin-bottom: var(--gutter);
        i:not(.block) {
          position: absolute;
          left: 8px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--color-gray-a);
        }
        input {
          width: 100%;
          margin: 0;
          padding-left: 30px;
        }
        &:focus-within {
          i {
            color: var(--primary-color);
          }
        }
      }
      .go-back {
        display: flex;
        width: 100%;
        text-align: left;
        align-items: center;
        justify-content: flex-start;
        color: #444;
        cursor: pointer;
        opacity: .8;
        &:hover {
          opacity: 1;
        }
        i {
          width: 20px;
        }
      }
      p {
        margin-bottom: 14px;
      }
    }
    .submit {
      span.button {
        margin-right: var(--gutter);
      }
    }
    &.loading-true {
      .inputs {
        pointer-events: none;
        opacity: .5;
      }
      svg {
        margin-top: 100px;
      }
    }  
  }
</style>