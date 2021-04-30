<template>
  <div class="search-results-holder">
    <div class="container">
      <div class="search-term">
        <p>
          Mostrando resultados para 
          <span class="primary-color">
            <strong>{{'Felippe Regazio'}}</strong>
          </span>
        </p>
      </div>

      <div class="search-items">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search-results'
}
</script>

<style>
.search-results-holder {
  padding: var(--gutter);
}
</style>