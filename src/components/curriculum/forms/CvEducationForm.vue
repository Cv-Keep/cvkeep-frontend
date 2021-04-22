<template>
  <cv-form-items :items="'education'" :index="index" :title="title" @close="$emit('close')">
    <div class="field">
      <label for="type" data-required>{{ $t('degree') }}</label>

      <select name="type" autofocus required>
        <option v-for="grad in graduations" :key="grad" :value="grad">
          {{ $t(`educationTypes.${grad}`) }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="institution" data-required>{{ $t('institution') }}</label>
      <input type="text" name="institution" required>
    </div>

    <div class="field">
      <label for="institution" data-required>{{ $t('titleCourse') }}</label>
      <input type="text" name="title" required>
    </div>  

    <div class="field">
      <label for="status" data-required>{{ $t('situation') }}</label>

      <select name="status" required>
        <option v-for="sit in situations" :key="sit" :value="sit">
          {{ $t(`educationSituations.${sit}`) }}
        </option>
      </select>  
    </div>

    <div class="field-half">
      <div class="field">
        <label for="start_date">{{ $t('start') }}</label>
        
        <input type="text" name="start_date" v-mask="$t('dateMask')">
      </div>

      <div class="field">
        <label for="end_date">{{ $t('conclusion') }}</label>
        
        <input type="text" name="end_date" v-mask="$t('dateMask')">
      </div>      
    </div>
  </cv-form-items>
</template>

<script>
  import { mapState } from 'vuex'
  import educationTypes from '@/shared/script/data/educationTypes.js'
  import educationSituations from '@/shared/script/data/educationSituations.js'
  import CvFormItems from '@/components/curriculum/forms/base/CvFormItems.vue'

  export default {
    name: 'cv-education-form',

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
        graduations: educationTypes,
        situations: educationSituations,
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          degree: 'Grau',
          start: 'Início',
          situation: 'Situação',
          conclusion: 'Conclusão',
          institution: 'Instituição',
          titleCourse: 'Título / Curso',
        },

        'en': {
          degree: 'Degree',
          start: 'Start',
          situation: 'Situation',
          conclusion: 'End',
          institution: 'Institution',
          titleCourse: 'Title / Course',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .field-half {
    display: grid;
    grid-gap: var(--gutter);
    grid-template-columns: 1fr 1fr;
    .field {
      margin: 0;
      input {
        margin: 0;
      }
    }
  }
</style>