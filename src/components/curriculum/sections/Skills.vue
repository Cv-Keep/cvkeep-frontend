<template>
	<section class="cv-skills" v-if="display">
		<section-controls :help="$t('skillsHelpText')" :helpTitle="$t('skills')" :sectionTagName="sectionTag"/>

		<h3>{{ $t('skills') }}</h3>
		<skills-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import SkillsList from '../elements/SkillsList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-skills',
		
		components: {
			SkillsList,
			SectionControls
		},

		data () {
			return {
				sectionTag: this.$options._componentTag
			}
		},		

		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'skills');
			}	
		},

		i18n: {
			messages: {
				'pt-br': {
					skills: 'Competências',
					skillsHelpText: 'Adicione aqui suas competências de maior destaque. Não há uma formula ou regra de quais tipos de competencia utilizar, isso dependerá de como e para que você está organizando seu currículo. Você pode adicionar competências tecnicas, sociais (soft skills), características notáveis de sua personalidade (como resiliencia em momentos críticos), etc. Procure não fazer uma lista extensa, atenha-se ao que for mais notável.'
				},

				'en': {
					skills: 'Skills',
					skillsHelpText: 'Add here your most outstanding skills. There is no formula or rule of what types of competence to use, it will depend on how and what you are organizing your resume for. You can add technical, social skills (soft skills), remarkable characteristics of your personality (like resilience in critical moments), etc. Try not to make an extensive list, stick to what is most notable.'
				},
				
				'fr': {
					skills: 'Compétences',
					skillsHelpText: 'Ajoutez ici vos compétences les plus remarquables. Il n\'y a pas de formule ou de règle concernant les types de compétences à utiliser, cela dépendra de la manière dont vous organisez votre CV et de l\'objectif visé. Vous pouvez ajouter des compétences techniques, sociales (soft skills), des caractéristiques remarquables de votre personnalité (comme la résilience dans les moments critiques), etc. Essayez de ne pas dresser une liste trop longue, contentez-vous de ce qui est le plus remarquable.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-skills {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>