<template>
	<section class="cv-prizes" v-if="display">
		<section-controls :help="$t('prizesHelpText')" :helpTitle="$t('prizes')" :sectionTagName="sectionTag"/>

		<h3>{{ $t('prizes') }}</h3>
		<prizes-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import PrizesList from '../elements/PrizesList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-prizes',
		
		components: {
			PrizesList,
			SectionControls
		},

		data () {
			return {
				sectionTag: this.$options._componentTag
			}
		},		

		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'prizes');
			}	
		},

		i18n: {
			messages: {
				'pt-br': {
					prizes: 'Realizações',
					prizesHelpText: 'Adicione aqui os reconhecimentos que você possa ter recebido ao longo de sua tragetória. Procure inserir uma descrição contextualizando o feito em questão.'
				},

				'en': {
					prizes: 'Achievements',
					prizesHelpText: 'Add here the acknowledgments you may have received during your career. Try to insert a description contextualizing the feat in question.'
				},

				'fr': {
					prizes: 'Réalisations',
					prizesHelpText: 'Ajoutez ici les remerciements que vous avez pu recevoir au cours de votre carrière. Essayez d\'insérer une description contextualisant l\'exploit en question.'
				},
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-prizes {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>