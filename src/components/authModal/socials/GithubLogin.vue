<template>
  <a :href="`${apiUrl}?client_id=${clientId}&scope=${scope}`">
    <slot/>
  </a>
</template>

<script>
  export default {
    name: 'github-login',
    data () {
      return {
        apiUrl: 'https://github.com/login/oauth/authorize',
        clientId: 'd5a6ed2d3697ced8ef7e',
        scope: 'user:email',
      }
    }
  }
</script>

<style>

</style>