<template>
  <cv-lightbox :title="$t('supportMessages.pixDonation')" v-if="active" @close="$emit('close')">
    <slot/>

    <div slot="footer">
      <button class="button button-primary" @click="$emit('close')">
        OK
      </button>
    </div>    
  </cv-lightbox>    
</template>

<script>
import CvLightbox from '@/components/lightbox/Lightbox.vue'

export default {
  name: 'pix-donation-modal',

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