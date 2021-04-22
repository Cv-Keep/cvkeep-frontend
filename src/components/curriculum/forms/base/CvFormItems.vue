<template>
  <cv-form @submit="saveItem" :title="title" @close="$emit('close')">
    <slot/>
  </cv-form>
</template>

<script>
  import { mapState } from 'vuex'
  import utils from '@/shared/script/helpers/utils.js'
  import CvForm from '@/components/curriculum/forms/base/CvForm.vue'

  export default {
    name: 'cv-form-items',

    components: {
      CvForm
    },

		props: {
			title: {
				type: String,
				default: '',
      },
      
      items: {
        type: String,
        default: '',
      },

      index: {
        type: Number,
        default: -1
      }
    },
    
    computed: {
      ...mapState([ 'curriculum' ]),
    },

    methods: {
      saveItem (form) {
        const data = utils.serializeForm(form);
        const items = this.curriculum[this.items].items;

        if (this.index >= 0) {
          items[this.index] = data;
        } else {
          items.push(data);
        }

        this.$emit('submit', this.$el);
      },

      loadItem (index) {
        const form = this.$el.querySelector('form');
        const item = this.curriculum[this.items].items[index];

        utils.hydrateForm(form, item);
      }
    },

    mounted () {
      if (this.index >= 0) {
        this.loadItem(this.index);
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