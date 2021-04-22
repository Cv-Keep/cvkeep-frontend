<template>
  <cv-form-items :items="'experience'" :index="index" :title="title" @close="$emit('close')">
    <div class="field">
      <label for="type" data-required>{{ $t('type') }}</label>

      <select name="type" v-model="currentType" autofocus required>
        <option v-for="tp in experienceTypes" :key="tp" :value="tp">{{ $t(`experienceTypes.${tp}`) }}</option>
      </select>
    </div>

    <div class="field">
      <label for="title" data-required>{{ $t(`experienceLabel.${currentType}.title`) }}</label>
      <input type="text" name="title" required>
    </div>

    <div class="cv-experience-dates">
      <div class="field">
        <label for="title">{{ $t(`current`) }}</label>
        <input type="checkbox" name="current" v-model="curr">
      </div>

      <div class="field">
        <label for="title" data-required>{{ $t(`start`) }}</label>
        <input type="text" name="start" v-mask="$t('dateMask')" required>
      </div>

      <div class="field">
        <label for="title" data-required>{{ $t(`end`) }}</label>
        <input type="text" name="end" v-mask="$t('dateMask')" :disabled="curr" required>
      </div>
    </div>

    <div ref="activityField" class="field">
      <label for="activity" data-required>{{ $t(`experienceLabel.${currentType}.activity`) }}</label>
      <input type="text" name="activity" required>
    </div>

    <div class="field">
      <label for="webpage">Webpage</label>

      <input type="url" name="webpage">
    </div>

    <div class="field">
      <label for="about">{{ $t('describeYourXp') }}</label>

      <textarea name="about"></textarea>
    </div>

    <div class="roles" v-if="currentType === 'professional'">
      <cv-experience-roles :index="index"/>
    </div>
  </cv-form-items>
</template>

<script>
  import { mapState } from 'vuex'
  import experienceTypes from '@/shared/script/data/experienceTypes.js'
  import CvFormItems from '@/components/curriculum/forms/base/CvFormItems.vue'
  import CvExperienceRoles from '@/components/curriculum/forms/CvExperienceRoles.vue'

  export default {
    name: 'cv-education-form',

    components: {
      CvFormItems,
      CvExperienceRoles
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
      ...mapState([ 'curriculum' ])
    },

    data () {
      return {
        curr: false,
        experienceTypes,
        currentType: experienceTypes[0],
      }
    },

    mounted () {
      const item = this.curriculum.experience.items[this.index];

      if (item) {
        this.currentType = item.type;
        this.curr = item.current.length > 0;
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          type: 'Tipo',
          start: 'Início',
          end: 'Fim',
          current: 'Atual',
          describeYourXp: 'Descreva sua experiência'
        },

        'en': {
          type: 'Type',
          start: 'Start',
          end: 'End',
          current: 'Current',
          describeYourXp: 'Describe your experience'                
        }
      }
    }
  }
</script>

<style lang="scss">
  .cv-experience-dates {
    display: grid;
    grid-template-columns: 1fr 3fr 3fr;
    grid-gap: 20px;
  }
</style>