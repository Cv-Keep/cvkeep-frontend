<template>
  <div class="search-view">
    <div class="search-forms">
      <div class="search-forms__simple">
        <div class="content container">
          <form action="#" @submit="false">
            <search-simple-input :value="subject"/>
          </form>
        </div>
      </div>

      <div class="search-forms__advanced">

      </div>
    </div>

    <div class="search-results">
      <search-results/>
    </div>
  </div>
</template>

<script>
import SearchSimpleInput from '@/components/search/SearchSimpleInput.vue'
import SearchResults from '@/components/search/SearchResults.vue'

export default {
  name: 'search-view',

  components: {
    SearchSimpleInput,
    SearchResults
  },

  computed: {
    subject() {
      return this.$route.query.subject;
    }
  },
}
</script>

<style lang="scss" scoped>
  .search-view {
    .search-forms {
      &__simple {
        padding-top: 20px;
        padding-bottom: 60px;
        background-color: var(--hover-color);
      }
    }
  }
</style>