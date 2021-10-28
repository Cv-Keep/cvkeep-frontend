<template>
  <div :class="`see-more active-${active} expanded-${expanded}`">
    <div class="see-more__content">
      <slot/>
    </div>
    <div class="see-more__footer">
      <button class="button-seamless" @click="toggle">
        <span v-if="!expanded">
          <i class="fa fa-plus"></i>
          {{ $t('seeMore') }}
        </span>
        <span v-else>
          <i class="fa fa-minus"></i>
          {{ $t('seeLess') }}
        </span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'see-more',

  data () {
    return {
      active: true,
      expanded: false
    }
  },

  methods: {
    toggle () {
      this.expanded = !this.expanded
    }
  },

  mounted () {
    if (this.$el.offsetHeight < 130) {
      this.active = false;
    }
  },

  i18n: {
    messages: {
      'pt-br': {
        seeMore: 'Ver mais',
        seeLess: 'Menos',
      },

      'en': {
        seeMore: 'See more',
        seeLess: 'Less',        
      },

      'fr': {
        seeMore: 'Voir plus',
        seeLess: 'Moins',        
      },

    }
  }
}
</script>

<style lang="scss" scoped>
  .see-more {
    &__content {
      overflow: hidden;
      max-height: 130px;
      position: relative;
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        box-shadow: 0 -8px 30px 24px var(--stripe-color);
      }
      > p {
        margin: 0;
      }
    }
    &__footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding-top: 20px;
      button {
        margin: 0;
        height: auto;
        line-height: 0;
        min-height: unset;
        color: var(--cv-color);
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &.active-false,
    &.expanded-true {
      .see-more__content {
        max-height: unset;
        &::after {
          box-shadow: none;
        }
      }
    }
    &.active-false {
      margin-bottom: var(--gutter);
      .see-more__footer {
        display: none;
      }
    }
  }
</style>