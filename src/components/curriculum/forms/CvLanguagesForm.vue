<template>
  <cv-form-items :items="'languages'" :index="index" :title="title" @close="$emit('close')">
    <div class="field">
      <label for="language" data-required>{{ $t('language') }}</label>

      <input type="text" name="language" autofocus required>
    </div>

    <div class="field" v-for="skill in languageSkills" :key="skill">
      <label>{{ $t(`languageSkills.${skill}`) }}</label>

      <select :name="skill">
        <option v-for="level in languageLevels" :key="level" :value="level">{{ $t(`languageLevels.${level}`) }}</option>
      </select>
    </div>
  </cv-form-items>
</template>

<script>
  import { mapState } from 'vuex'
  import languageLevels from '@/shared/script/data/languageLevels.js'
  import languageSkills from '@/shared/script/data/languageSkills.js'
  import CvFormItems from '@/components/curriculum/forms/base/CvFormItems.vue'

  export default {
    name: 'cv-languages-form',

    components: {
      CvFormItems
    },

		props: {
			title: {
				type: String,
				default: ''
      },
      
      index: {
        type: Number,
        default: -1
      }
    },
    
    computed: {
      ...mapState([ 'curriculum' ]),
    },

    data () {
      return {
        languageSkills,
        languageLevels
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          language: 'Idioma'
        },

        'en': {
          language: 'Language'         
        }
      }
    }
  }
</script>