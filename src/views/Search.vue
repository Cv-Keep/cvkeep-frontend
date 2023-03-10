<template>
  <div class="search-view" >
    <div class="search-view__header">
      <div class="content">
        <div class="search-form">
          <div class="container">
            <form action="#" @submit="formSubmit">
              <search-simple-input :value="subject" :disabled="loading" ref="inputHolder"/>
            </form>
          </div>
        </div>
      </div>
    </div>  

    <div class="search-view__result">
      <search-result :subject="subject" :result="result" :loading="loading"/>
    </div>

    <div class="search-view__askmore" v-if="result && result.items && subject && !loading && !result.isLastPage">
      <div class="container">
        <button class="button" @click="searchMore">{{$t('searchMessages.loadMore')}}</button>
      </div>
    </div>

    <div class="search-view__numbers">
      <div class="container">
        <search-result-numbers :subject="subject" :result="result" :loading="loading" @reset="clearSearch"/>
      </div>
    </div>    
  </div>
</template>

<script>
import SearchSimpleInput from '@/components/search/SearchSimpleInput.vue'
import SearchResult from '@/components/search/SearchResult.vue'
import SearchResultNumbers from '@/components/search/SearchResultNumbers.vue'

export default {
  name: 'search-view',

  components: {
    SearchResult,
    SearchSimpleInput,
    SearchResultNumbers
  },

  computed: {
    subject: {
      get() { return this.$route.query.subject || '' },
      set(v) { return this.$route.query.subject !== v && this.$router.replace({ query: { subject: v }}) },
    },

    $searchInput() {
      return this.$refs.inputHolder.$el.querySelector('input');
    }
  },

  data() {
    return {
      result: {},
      loading: false,
    }
  },

  methods: {
    reset() {
      this.result = {};
      this.subject = '';
      this.loading = false;
    },

    clearSearch() {
      this.reset();
      this.$searchInput.focus();
    },

    getInputVal() {
      return this.$searchInput.value.trim();
    },

    formSubmit(e) {
      e.preventDefault();
      
      if (this.loading) return;
      
      this.reset();
      this.subject = this.getInputVal();

      if (this.subject) {
        this.search(this.subject, 0);
      }
    },

    async search(term, page = 0) {
      this.loading = true;
      
      this.$API.cvSearchSimple(term, page)
        .then(response => {
          const _data = response.data;

          if (this.result.items) {
            _data.items = [ ...this.result.items, ..._data.items ];
          }
           
          this.result = _data;
          this.loading = false    
        })
        .catch(err => { 
          this.reset();
          console.err(err);
          alert('Unexpected Search Error'); 
        });
    },

    searchMore() {
      this.result && this.search(this.subject, ++this.result.page);
    },

    onScroll() {
      const body = document.body;
      const html = document.documentElement;
      const docHeight = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight); 
      
      const scrollTop = window.scrollY;
      const scrollBottom = scrollTop + window.innerHeight;

      const searchFormFixed = scrollTop >= 90 ? 'add' : 'remove';
      document.body.classList[searchFormFixed]('search-form-fixed');

      const hideNumbersBar = scrollTop > 90 && scrollBottom > (docHeight - 500) ? 'add' : 'remove';
      document.body.classList[hideNumbersBar]('hide-numbers-bar');      
    }
  },

  mounted() {
    this.$searchInput.focus();
    this.loading = this.subject.trim().length > 0;
    window.addEventListener('scroll', this.onScroll);

    const simpleInputVal = this.getInputVal();
    simpleInputVal && this.search(simpleInputVal);

  },
  

  beforeDestroy() {
    window.removeEventListener('scroll', this.onScroll);
  }
}
</script>

<style lang="scss">
  .search-view {
    --header-height: 68px;
    padding-bottom: 100px;
    &__header {
      .search-form {
        padding: 56px 0;
        transition: 500ms;
        // background-color: rgba(150,150,150,.2);
        form {
          margin: 0;
        }
      }
    }
    &__askmore {
      padding: 53.5px 0;
      text-align: center;
    }
    &__numbers {
      transition: 500ms;
      position: fixed;
      bottom: 0;
      left: 0;
      z-index: 1;
      width: 100%;
      background-color: #fff;
      border-top: solid 1px rgba(150,150,150,.2);
      padding: var(--gutter) 0;          
    }
  }

  body.search-form-fixed {
    .search-form {
      left: 0;
      margin: 0;
      z-index: 1;
      width: 100%;
      position: fixed;
      transition: 500ms;
      top: 0;
      padding: 10px;
      padding-top: calc(var(--header-height) + var(--gutter));
      form {
        .field {
          margin: 0;
          label {
            display: none;
          }
          input {
            font-size: 18px;
            padding: 12px 32px;
            padding-right: 100px;
            @media screen and (max-width: 768px) {
              padding-right: 70px;
            }
          }
        }
      } 
    }
    .search-view__result {
      padding-top: calc(259px - 2.5rem);  
    }
  }

  body.hide-numbers-bar {
    .search-view__numbers {
      opacity: 0;
      transition: 200ms;
      visibility: hidden;
    }
  }
</style>