<template>
  <h4 class="title" :style="elStyle">
    <simple-tooltip :title="tooltipTitle || title">
      <i slot="summary" class="fa fa-info animation-hover-pulse --primary-color"></i>

      <p>{{tooltipMessage}}</p>
    </simple-tooltip>

    {{title}}
  </h4>  
</template>

<script>
import SimpleTooltip from '@/components/tooltip/tooltip.vue'

export default {
  name: 'heading-tooltip',

  components: {
    SimpleTooltip
  },

  props: {
    title: {
      type: String,
      default: ''
    },

    elStyle: {
      type: String,
      default: ''
    },    

    tooltipTitle: {
      type: String,
      default: ''
    },

    tooltipMessage: {
      type: String,
      default: ''
    },        
  }
}
</script>

<style lang="scss" scoped>
  i {
    display: flex;
    height: 30px;
    width: 30px;
    cursor: pointer;
    font-size: 18px;
    height: 30px;
    width: 30px;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    background-color: var(--hover-color);
  }
</style>