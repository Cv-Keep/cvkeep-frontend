<template>
	<section class="cv-education" v-if="display">
		<section-controls :help="$t('educationHelpText')" :helpTitle="$t('education')" :sectionTagName="sectionTag"/>

		<h3>{{ $t('education') }}</h3>

		<education-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import EducationList from '../elements/EducationList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-education',
		
		components: {
			EducationList,
			SectionControls
		},

		data () {
			return {
				sectionTag: this.$options._componentTag,
			}
		},

		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'education');
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'education': 'Educação',
					'educationHelpText': 'Informe aqui sua tragetória educacional formal. Faculdade, cursos, pós graduação, etc. Procure manter uma ordem cronológica para simplificar a leitura e entendimento do seu currículo.'
				},

				'en': {
					'education': 'Education',
					'educationHelpText': 'Enter your formal educational trajectory here. College, courses, postgraduate, etc. Try to maintain a chronological order to simplify the reading and understanding of your resume.'
				},

				'fr-fr': {
					'education': 'Éducation',
					'educationHelpText': 'Indiquez ici votre parcours éducatif formel. Collège, cours, études supérieures, etc. Essayez de maintenir un ordre chronologique pour simplifier la lecture et la compréhension de votre CV.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-education {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>