<template>
  <cv-form-items :items="'links'" :index="index" :title="title" @close="$emit('close')">
    <div class="field">
      <label for="label" data-required>{{ $t('title') }}</label>
      
      <input type="text" name="label" required autofocus>
    </div>

    <div class="field">
      <label for="url" data-required>Link</label>
      
      <input type="url" name="url" required>
    </div>

    <div class="field">
      <label data-required>{{ $t('icon') }}</label>

      <icon-picker iconset="all" :icon="icon" @select="setIcon"/>
      <input type="text" name="icon" :value="icon" hidden>
    </div>
  </cv-form-items>
</template>

<script>
  import { mapState } from 'vuex'
  import IconPicker from '@/components/curriculum/elements/IconPicker.vue'
  import CvFormItems from '@/components/curriculum/forms/base/CvFormItems.vue'

  export default {
    name: 'cv-find-me-at-form',

    components: {
      IconPicker,
      CvFormItems,
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
        icon: 'fa fa-globe'
      }
    },

    methods: {
      setIcon (icon) {
        this.icon = icon
      }
    },

    mounted () {
      const item = this.curriculum.links.items[this.index];

      if (item) {
        this.setIcon(item.icon);
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          title: 'Título',
          icon: 'Ícone',
        },

        'en': {
          title: 'Title',
          icon: 'Icon',
        },

        'fr': {
          title: 'Titre',
          icons: 'Icône'
        }
      }
    }
  }
</script>