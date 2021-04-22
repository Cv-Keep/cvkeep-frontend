<template>
  <img :src="draw" :alt="icon" :style="`max-width: ${size}px; filter: invert(${white ? '1' : '0'})`">
</template>

<script>
  export default {
    name: 'animated-icon',

    props: {
      icon: {
        type: String,
        default: ''
      },

      size: {
        type: Number,
        default: 50
      },

      white: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        draw: this.icon ? `/img/animated-icons/${this.icon}.gif` : ''
      }
    }
  }
</script>