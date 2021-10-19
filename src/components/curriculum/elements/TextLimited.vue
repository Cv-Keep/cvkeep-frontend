<template>
  <p @input="validate" @focusout="validate">
    <slot/>
  </p>
</template>

<script>
	import Caret from '@/shared/script/helpers/caret.js';

  export default {
    name: 'text-limited',

    props: {
      limit: {
        default: 1500,
        type: Number,
      },

      counter: {
        default: true,
        type: Boolean
      }
    },

    methods: {
      validate (e) {        
        this.markTextLimit(e);
        this.countChars(e);
      },

      markTextLimit (e) {
        const $el = e.target || e;
        
        if ($el && !e.isComposing) {
          const text = $el.innerText;

          if (text.length > this.limit) {
            const textOk = text.slice(0, this.limit);            
            const $caret = new Caret($el);
            const caretPos = $caret.getPos();
            const noXss = str => str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

            $el.innerHTML = `<span>${noXss(textOk)}</span><span class="bg-soft-red">${noXss(text.slice(this.limit))}</span>`;
            $caret.setPos(caretPos);
          } else {
            const marked = $el.querySelector('.bg-soft-red');
            marked && marked.classList.remove('bg-soft-red');
          }
        }        
      },

      countChars (e) {
				const $el = e.target || e;
        const text = $el.innerText;

        if (this.counter) {
          const count = this.limit - text.length;
          
          $el.dataset.count = count;
          $el.classList[count < 0 ? 'add' : 'remove']('negative');
        }
      }
		},

		mounted () {
			this.validate(this.$el);
    },
    
		updated () {
			this.validate(this.$el);
		}    
  }
</script>

<style lang="scss" scoped>
  p {
    position: relative;
    white-space: pre-wrap;
    outline: none;
    display: inline-block;
    width: 100%;
    &[data-count] {
      position: relative;
      margin-bottom: 8px;
      &:focus, &:hover, &:empty {
        &::after {
          content: attr(data-count);
          position: absolute;
          bottom: -26px;
          right: 0;
          font-size: 12px;
          color: #444;
          font-weight: 600;
        }
      }
    }
    &.negative {
      &[data-count]::after {
        color: var(--color-error);
      }
    }
  }
</style>