<template>
  <div class="search-result-numbers">
    <div class="search-result-numbers__left">
      <div v-if="!subject && !result.totalItems" class="search-no-term" >
        <p>Não há nenhum critério de busca a ser executado</p>
      </div>

      <p v-if="result.items && result.items.length > 0">
        <span class="showing-results-for">
          Mostrando resultados para 
        </span>

        <span class="primary-color">
          <strong>{{ subject }}</strong>
        </span>

        <span class="clear-results" title="Clear this search" @click="$emit('reset')">
          <i class="fa fa-times"></i>
        </span>
      </p>

      <p v-if="subject && result && result.totalItems === 0">
        A busca por
        <span class="primary-color">
          <strong>{{ subject }}</strong>
        </span>
        não retornou nenhum resultado
      </p>
    </div>

    <div class="search-result-numbers__right" v-if="result.totalItems > 0">
      <p>
        Mostrando 
        <span class="primary-color"><strong>{{result.items.length}}</strong></span> de 
        <span class="primary-color"><strong>{{result.totalItems}}</strong></span>
      </p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'search-result-numbers',

    props: {
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
  .search-result-numbers {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    p {
      margin: 0;
    }
    .clear-results {
      color: var(--color-gray-medium);
      border: solid 2px currentColor;
      padding: 2px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;
      width: 26px;
      height: 26px;
      cursor: pointer;
      margin: 0 8px;
      transition: 200ms;
      &:hover {
        transition: 200ms;
        i {
          color: var(--color-error);
        }
      }
    }
    @media screen and (max-width: 768px) {
      display: block;
      padding: 0 var(--gutter);
      .showing-results-for {
        display: none;
      }
    }
  }
</style>