<template>
  <div class="loading-backdrop">
    <div class="loading-backdrop__spinner">
      <loading-spinner/>
      <p v-if="$appLoading.length">
        {{ $appLoading }}
      </p>
    </div>
  </div>
</template>

<script>
  import LoadingSpinner from './LoadingSpinner';

  export default {
    name: 'loading-backdrop',

    components: {
      LoadingSpinner
    }
  }
</script>

<style lang="scss" scoped>
  .loading-backdrop {
    background-color: #ffffff;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999999;
    overflow: hidden;
    &__spinner {
      text-align: center;
      p {
        margin-top: var(--gutter);
      }
    }
  }
</style>