<template>
  <cv-lightbox :title="`<i class='fa fa-heart'></i> &nbsp; Become a supporter`" v-if="active" @close="$emit('close')">
    <div class="modal-content">
      <support-box :blocked="true" :title="false"/>
    </div>

    <div slot="footer">
      <button class="button button-primary" @click="$emit('close')">
        OK
      </button>
    </div>    
  </cv-lightbox>
</template>

<script>
import SupportBox from '@/components/support/Support.vue'
import CvLightbox from '@/components/lightbox/Lightbox.vue'

export default {
  name: 'become-supporter',

  components: {
    SupportBox,
    CvLightbox 
  },

  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .modal-content {
    padding: 36px var(--gutter);
  }
</style>