<template>
  <cv-lightbox :title="'Become a supporter'" v-if="active" @close="$emit('close')">
    
  </cv-lightbox>    
</template>

<script>
import CvLightbox from '@/components/lightbox/Lightbox.vue'

export default {
  name: 'become-supporter',

  props: {
    active: {
      type: Boolean,
      default: false
    }
  },

  components: {
    CvLightbox
  }
}
</script>

<style lang="scss" scoped>

</style>