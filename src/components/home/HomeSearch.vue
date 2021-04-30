<template>
  <div class="home-search">
    <div class="container">
      <form action="search">
        <search-simple-input/>

        <div class="go-advanced">
          <a href="search#advanced">Advanced Search</a>
        </div>
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
  padding-bottom: 200px;
  
  form {
    .go-advanced {
      width: 100%;
      text-align: right;
      padding-right: var(--gutter);
      a {
        font-weight: 700;
        text-decoration: underline;
        color: var(--secondary-color);
      }
    }
  }
}
</style>