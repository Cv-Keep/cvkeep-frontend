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
        clientId: process.env.VUE_APP_GITHUB_CLIENT_ID,
        scope: 'user:email',
      }
    }
  }
</script>

<style>

</style>
