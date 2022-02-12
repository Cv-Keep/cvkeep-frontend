<template>
  <section class="downloaded-cv">
    <p>
      <span v-html="$t('info')"></span>
    </p>
  </section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'

  export default {
    name: "downloaded-cv",

    i18n: {
      messages: {
        'pt-br': {
          info: `Este currículo está disponível online no endereço <strong>${Utils.downloadedCvUrl()}</strong>`
        },

        'en': {  
          info: `This curriculum is available online at <strong>${Utils.downloadedCvUrl()}</strong>`
        },

        'fr': {  
          info: `Ce programme est disponible en ligne à l'adresse suivante <strong>${Utils.downloadedCvUrl()}</strong>`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .downloaded-cv {
    position: absolute;
    bottom: 0;
    padding: 14px;
    width: 100%;    
    p {
      margin: 0;
      font-size: 12px;
      color: #777777;
      text-align: center;
    }
  }
</style>