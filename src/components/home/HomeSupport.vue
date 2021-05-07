<template>
  <div class="home-support" v-if="$showDonation">
    <div class="container">
      <support-donation/>
    </div>
  </div>
</template>

<script>
import SupportDonation from '@/components/support/Support.vue'

export default {
  name: 'home-support',

  components: {
    SupportDonation
  }
}
</script>

<style lang="scss" scoped>
  .home-support {
    padding-bottom: 186px;
    background-color: var(--stripe-color);
    @media screen and (max-width: 1124px) {
      padding-bottom: 56px;
    }
  }
</style>