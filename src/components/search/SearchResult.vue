<template>
  <div class="search-result-holder">
    <div class="container">
      <div v-if="mustShowResults" class="search-result">
        <div class="search-result__items">
          <result-card v-for="(item, index) in result.items" :key="index" :item="item"></result-card>
        </div>
      </div>

      <div v-if="loading" class="search-loading">
        <loading-spinner/>
      </div>

      <div class="search-image">
        <div class="search-image__no-query" v-show="!loading && (!subject || !result.totalItems)">
          <img :src="require('@/assets/square.svg')" alt="Guy waiting on a square"/>          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResultCard from '@/components/search/ResultCard.vue'
import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

export default {
  name: 'search-result',

  components: {
    ResultCard,
    LoadingSpinner,
  },

  computed: {
    mustShowResults() {
      return this.subject && this.result;
    }
  },

  props: {
    loading: {
      type: Boolean,
      default: true
    },

    subject: {
      type: String,
      default: ''
    },

    result: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
.search-result-holder {
  padding: var(--gutter);
  padding-top: 28px;
  .search-result {
    &__items {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      @media screen and (max-width: 768px) {
        display: block;
        > a {
          display: block;
          margin: 0 auto;
          margin-bottom: 28px;
        }
      }
    }
  }
  .search-loading {
    display: flex;
    justify-content: center;
    padding: 60px 0;
  }
  .search-image {
    &__no-query {
      width: 100%;
      img {
        width: 90%;
        display: block;
        max-width: 300px;
        margin: 0 auto;
        margin-top: 36px;
      }
    }
  }
}
</style>