<template>
  <div class="accordion-item">
    <div class="accordion-item__summary" @click.stop="toggle">
      <i :class="`fa fa-arrow-${opened ? 'up' : 'down'}`"></i>
      {{ opened ? openedLabel : closedLabel }}
    </div>
    <div v-if="opened" class="accordion-item__content">
      <slot/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'accordion-item',

    props: {
      openedLabel: {
        type: String,
        default: 'Fechar',
      },

      closedLabel: {
        type: String,
        default: 'Abrir'
      }
    },

    data () {
      return {
        opened: false
      }
    },

    methods: {
      toggle () {
        this.opened = !this.opened;
      }
    }
  }
</script>

<style lang="scss" scoped>
  .accordion-item {
    &__summary {
      display: block;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      color: var(--color-gray-a);
      margin-right: var(--gutter);
      &:hover {
        text-decoration: underline;
      }
    }
  }
</style>