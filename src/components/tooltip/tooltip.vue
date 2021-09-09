<template>
  <span :class="`simple-tooltip visible-${show}`" role="button" @click.stop="tooltip(true)">
    <slot name="summary"/>

    <div class="simple-tooltip__backdrop" v-show="show" @click.self.stop="tooltip(false)">
      <div class="simple-tooltip__box">
        <header>
          <h1>{{title}}</h1>
        </header>

        <div class="simple-tooltip__content">
          <slot/>
        </div>

        <footer>
          <button class="button-outline button-tooltip" @click.stop="tooltip(false)">
            <strong>{{ $t('ok') }}</strong>
          </button>
        </footer>
      </div>
    </div>
  </span>
</template>

<script>
  export default {
    name: 'simple-tooltip',

    props: {
      title: {
        type: String,
        default: '',
      }
    },

    data () {
      return {
        show: false
      }
    },

    methods: {
      tooltip (state) {
        this.show = (typeof state === 'boolean' ? state : false);
        document.body.style.overflow = this.show ? 'hidden' : 'initial';

        if (this.show) {
          document.addEventListener('keyup', this.closeOnEsc);
        }
      },

      closeOnEsc (e) {
        if (e.which == 27 || e.keyCode == 27) {
          document.removeEventListener('keyup', this.closeOnEsc);

          this.tooltip(false);
        }
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          ok: 'Entendi'
        },

        'en': {
          ok: 'Ok'
        },        
      }
    }
  }
</script>

<style lang="scss" scoped>
  .simple-tooltip {
    &__backdrop {
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: 1000;
      cursor: initial;
      display: flex;
      align-items: center;
      justify-content: center;
      position: fixed;
      background-color: rgba(0,0,0,.5);
    }
    
    &__box {
      z-index: 100000;
      max-width: 560px;
      max-height: 90%;
      width: 90%;
      color: #444;
      border-radius: 4px;
      background-color: #ffffff;
      box-shadow: var(--box-shadow-a);
      display: flex;
      flex-direction: column;
      margin: 0 auto;

      header {
        h1 {
          margin: 0;
          font-size: 24px;
        }
      }
      

      footer {
        text-align: right;
        button,
        .button-tooltip, 
        button.button-tooltip {
          margin: 0;
          color: #444;
          font-weight: 600;
          padding: 0 var(--gutter);
        }
      }

      header,
      footer {
        padding: var(--gutter);
      }
    }

    &__content {
      flex: 1;
      overflow: auto;
      font-size: 16px;
      font-weight: 300;
      max-height: 260px;
      width: calc(100% - 32px);
      margin: 0 auto;
      color: var(--color-gray-dark);
      p:last-child {
        margin: 0;
      }
    }
  }
</style>