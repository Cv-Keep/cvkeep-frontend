<template>
  <div class="section-controls" v-if="$editing">
    <div class="section-controls__content">
      <div class="item">
        <help-section-btn :title="helpTitle">
          {{ help }}
        </help-section-btn>
      </div>

      <div class="item">
        <hide-section-btn :section="sectionTagName"/>    
      </div>
    </div>
  </div>
</template>

<script>
	import HideSectionBtn from '@/components/curriculum/elements/HideSectionBtn.vue'
  import HelpSectionBtn from '@/components/curriculum/elements/HelpSectionBtn.vue'
  
  export default {
    name: 'section-controls',

    components: {
      HideSectionBtn,
      HelpSectionBtn
    },

    props: {
      sectionTagName: {
        type: String,
        required: true
      },

      helpTitle: {
        type: String,
        default: ''
      },

      help: {
        type: String,
        default: ''
      },
    }
  }
</script>

<style lang="scss" scoped>
  .section-controls {
    position: absolute;
    top: 0;
    right: 0;
    display: inline-block;
    &__content {
      display: flex;
      align-items: center;
      padding: var(--gutter);
      justify-content: flex-end;
      > div:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
</style>