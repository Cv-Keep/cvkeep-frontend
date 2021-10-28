<template>
  <cv-form-items :items="'prizes'" :index="index" :title="title" @close="$emit('close')">
    <div class="field">
      <label for="type">{{ $t('achievement') }}</label>
      
      <select name="type">
        <option v-for="item in prizesTypes" :key="item" :value="item">
          {{ $t(`prizesTypes.${item}`) }}
        </option>
      </select>
    </div>

    <div class="field">
      <label for="title" data-required>{{ $t('title') }}</label>

      <input type="text" name="title" autofocus required>
    </div>

    <div class="field">
      <label for="organization">{{ $t('institution') }}</label>

      <input type="text" name="organization">
    </div>    

    <div class="field">
      <label for="date">{{ $t('date') }}</label>

      <input type="text" name="date" v-mask="$t('dateMask')">
    </div>

    <div class="field">
      <label for="webpage">Webpage</label>

      <input type="url" name="webpage">
    </div>    

    <div class="field">
      <label for="about">{{ $t('about') }}</label>

      <textarea name="about"></textarea>
    </div>
  </cv-form-items>
</template>

<script>
  import { mapState } from 'vuex'
  import prizesTypes from '@/shared/script/data/prizesTypes.js'
  import CvFormItems from '@/components/curriculum/forms/base/CvFormItems.vue'

  export default {
    name: 'cv-prizes-form',

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

    data () {
      return {
        prizesTypes
      }
    },
    
    computed: {
      ...mapState([ 'curriculum' ]),
    },

    i18n: {
      messages: {
        'pt-br': {
          achievement: 'Conquista',
          title: 'Título',
          date: 'Data',
          about: 'Sobre',
          institution: 'Instituição'
        },

        'en': {
          achievement: 'Achievement',
          title: 'Title',
          date: 'Date',
          about: 'About',
          institution: 'Institution'
        },

        'fr-fr': {
          'achievement': 'Réussite',
          'title': 'Titre',
          'date': 'Date',
          'about': 'Sur',
          'institution': 'Institution',
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