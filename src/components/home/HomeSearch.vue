<template>
  <div class="home-search">
    <div class="container">
      <form action="search">
        <search-simple-input/>
      </form>
    </div>
  </div>
</template>

<script>
import SearchSimpleInput from '@/components/search/SearchSimpleInput.vue';

export default {
  name: 'home-search',

  components: {
    SearchSimpleInput
  }
}
</script>

<style lang="scss">
  .home-search {
    form {
      margin: 0;
      .field {
        label {
          font-size: 32px;
        }
      }
    }
  }
</style>