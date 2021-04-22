<template>
	<section class="cv-languages" v-if="display">
		<section-controls :help="$t('languagesHelpText')" :helpTitle="$t('languages')" :sectionTagName="sectionTag"/>

		<h3>{{ $t('languages') }}</h3>
		<languages-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import LanguagesList from '../elements/LanguagesList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-languages',
		
		components: {
			LanguagesList,
			SectionControls
		},

		data () {
			return {
				sectionTag: this.$options._componentTag
			}
		},		
		
		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'languages');
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'languages': 'Idiomas',
					'languagesHelpText': 'Insira aqui idiomas estrangeiros que você tenha domínio. Procure informar sua capacidade de fala, leitura e escrita de forma criteriosa.'
				},

				'en': {
					'languages': 'Languages',
					'languagesHelpText': 'Insert foreign languages ​​that you have mastery here. Try to inform your ability to speak, read and write carefully.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-languages {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>