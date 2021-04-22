<template>
  <a :href="`${apiUrl}?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}`">
    <slot/>
  </a>  
</template>

<script>
  export default {
    name: 'linkedin-login',
    data () {
      return {
        apiUrl: 'https://www.linkedin.com/oauth/v2/authorization',
        clientId: '77ve8etcyvcyoj',
        redirectUri: 'http://localhost:5000/auth/linkedin',
        scope: 'r_emailaddress,r_liteprofile'
      }
    }
  }
</script>