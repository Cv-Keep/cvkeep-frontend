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

      <div class="search-centered-status" v-show="!loading && (!subject || !result.totalItems)">
        <div class="c-status" v-show="!subject && !result.totalItems">
          <div class="c-status__content">
            <i class="fa fa-angle-double-up"></i>
            <div>{{$t('searchMessages.typeSomething')}}</div>
          </div>
        </div>

        <div class="c-status" v-show="subject && !result.totalItems">
          <div class="c-status__content">
            <i class="fa fa-sad-cry"></i>
            <div>{{$t('searchMessages.nothingFound')}}</div>
          </div>
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
  .search-centered-status {
    width: 100%;
    .c-status {
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: ceter;
      &__content {
        color: #aaa;
        text-align: center;
        padding: 32px 0;
        font-size: 14px;
        i {
          font-size: 52px;
          margin-bottom: var(--gutter);
        }
      }
    }
  }
}
</style>