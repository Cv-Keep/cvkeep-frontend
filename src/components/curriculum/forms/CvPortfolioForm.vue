<template>
  <cv-form-items :items="'portfolio'" :index="index" :title="title" @close="$emit('close')">
    <div class="field" v-if="index < 0">
      <label>{{ $t('suggestions') }}</label>
      
      <div class="portfolio-suggestions">
        <a v-for="(item, index) in suggestions" :key="index" :href="item.link" class="suggestion-card" target="_blank">
          <i :class="item.iconClasses"></i>
          <span>{{item.title}}</span>
        </a>
      </div>
    </div>

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
      <icon-picker iconset="fab" :icon="icon" @select="setIcon"/>
      <input type="text" name="icon" :value="icon" hidden>
    </div>
  </cv-form-items>
</template>

<script>
  import { mapState } from 'vuex'
  import IconPicker from '@/components/curriculum/elements/IconPicker.vue'
  import CvFormItems from '@/components/curriculum/forms/base/CvFormItems.vue'

  export default {
    name: 'cv-portfolio-form',

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
        icon: 'fa fa-globe',
        suggestions: [
          {
            title: 'Behance',
            link: 'https://www.behance.net/',
            iconClasses: 'fab fa-behance-square color-behance'
          },
          {
            title: 'Dribbbble',
            link: 'https://dribbble.com/',
            iconClasses: 'fab fa-dribbble color-dribbble'
          },
          {
            title: 'DeviantArt',
            link: 'https://www.deviantart.com/',
            iconClasses: 'fab fa-deviantart color-deviantart'
          },
          {
            title: 'Adobe Portfolio',
            link: 'https://portfolio.adobe.com/',
            iconClasses: 'fab fa-adobe color-adobe-portfolio'
          },
        ]
      }
    },

    methods: {
      setIcon (icon) {
        this.icon = icon
      }
    },

    mounted () {
      const item = this.curriculum.portfolio.items[this.index];

      if (item) {
        this.setIcon(item.icon);
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          icon: 'Ícone',
          title: 'Título',
          suggestions: 'Sugestões'
        },

        'en': {
          icon: 'Icon',
          title: 'Title',
          suggestions: 'Suggestions',
        },

        'fr': {
          'icon': 'Icône',
          'title': 'Titre',
          'suggestions': 'Suggestions',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .portfolio-suggestions {
    display: grid;
    grid-gap: var(--gutter);
    padding: var(--gutter) 0;
    grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
    .suggestion-card {
      width: 100%;
      cursor: pointer;
      opacity: 0.75;
      border-radius: 0;
      background-color: var(--hover-color);
      display: flex;
      flex-direction: column;
      text-align: center;
      padding: var(--gutter);
      text-decoration: none;
      &:hover {
        opacity: 1;
      }
      i {
        flex: 1;
        font-size: 32px;
        margin-bottom: var(--gutter);
      }
      span {
        color: #444;
        font-size: 12px;
        font-weight: 600;
      }
    }
  }
</style>