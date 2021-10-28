<template>
	<section class="cv-experience" v-if="display">
		<section-controls :help="$t('experienceHelpText')" :helpTitle="$t('experience')" :sectionTagName="sectionTag"/>		

		<h3>{{ $t('experience') }}</h3>
		<experience-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import experienceList from '../elements/ExperienceList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-experience',
		
		components: {
			experienceList,
			SectionControls
		},

		data () {
			return {
				sectionTag: this.$options._componentTag
			}
		},		

		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'experience');
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'experience': 'Experiência',
					'experienceHelpText': 'Informe aqui as empresas em que você trabalhou, ou outras atividades que agregaram para sua experiencia profissional como projetos realizados, voluntariado, dentre outros. Se possível, adicione uma breve descrição de suas atividades, destacando pontos importantes e conquistas na função. Não é necessário informar toda a sua experiência profissional, principalmente se ela for muito extensa.'
				},

				'en': {
					'experience': 'Experience',
					'experienceHelpText': 'Inform here the companies in which you worked, or other activities that added to your professional experience such as projects carried out, volunteering, among others. If possible, add a brief description of your activities, highlighting important points and achievements in the role. It is not necessary to inform all your professional experience, especially if it is very extensive.'
				},

				'fr-fr': {
					'experience': 'Expérience',
					'experienceHelpText': 'Informez ici les entreprises dans lesquelles vous avez travaillé, ou d\'autres activités qui ont ajouté à votre expérience professionnelle comme les projets réalisés, le bénévolat, entre autres. Si possible, ajoutez une brève description de vos activités, en soulignant les points importants et les réalisations dans le rôle. Il n\'est pas nécessaire d\'indiquer toute votre expérience professionnelle, surtout si elle est très étendue.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-experience {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>