<template>
  <cv-form :title="title" @close="$emit('close')">
    <div class="field">
      <label for="role">{{ $t('currentRole') }}</label>
      <input type="text" autocomplete="off" max-length="200" v-model="curriculum.basics.role" autofocus required>
    </div>

    <div class="field">
      <label for="country">{{ $t('country') }}</label>

      <input type="text" name="country" v-model="curriculum.location.country" required>
    </div>

    <div class="field">
      <label for="region">{{ $t('state') }}</label>

      <input type="text" name="region" v-model="curriculum.location.region" required>
    </div>

    <div class="field">
      <label for="city">{{ $t('city') }}</label>

      <input type="text" name="city" v-model="curriculum.location.city" required>
    </div>

    <div class="field">
      <label for="civilState">{{ $t('civilState') }}</label>

      <select name="civilState" v-model="curriculum.civilState" required>
        <option v-for="cs in civilStates" :key="cs" :value="cs">{{ $t(`civilStates.${cs}`) }}</option>
      </select>
    </div>

    <div class="field">
      <label for="primaryNumber">{{ $t('contactNumber') }}</label>
      
      <input type="text" name="primaryNumber" v-mask="'(##) #########'" v-model="curriculum.contact.primaryNumber">
    </div>

    <div class="field">
      <label for="primaryNumberKind">{{ $t('contactPreference') }}</label>

      <div class="input-row">
        <label v-for="kind in contactKinds" :key="kind" data-holder class="thin-font">
          <input type="radio" name="primaryNumberKind" :value="kind" v-model="curriculum.contact.primaryNumberKind" required>

          {{ $t(`contactKinds.${kind}`) }}
        </label>
      </div>
    </div>
  </cv-form>
</template>

<script>
  import { mapState } from 'vuex'
  import civilStates from '@/shared/script/data/civilStates.js'
  import CvForm from '@/components/curriculum/forms/base/CvForm.vue'

  export default {
    name: 'cv-header-form',

    components: {
      CvForm
    },

		props: {
			title: {
				type: String,
				default: ''
			}
    },
    
    computed: {
      ...mapState([ 'curriculum' ])
    },

    data () {
      return {
        civilStates,
        contactKinds: [
          'phone',
          'cellphone',
          'whatsapp',
          'telegram'
        ]
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          country: 'País',
          state: 'Estado',
          city: 'Cidade',
          currentRole: 'Cargo atual',
          civilState: 'Estado civil',
          contactNumber: 'Número para contato',
          contactPreference: 'Preferência de contato'
        },

        'en': {
          country: 'Country',
          state: 'State',
          city: 'City',
          currentRole: 'Current role',
          civilState: 'Civil state',
          contactNumber: 'Contact number',
          contactPreference: 'Contact preference'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .input-row {
    display: flex;
    flex-wrap: wrap;    
  }
</style>