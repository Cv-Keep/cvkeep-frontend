<template>
	<section class="cv-portfolio" v-if="display">
		<section-controls :help="$t('portfolioHelpText')" :helpTitle="sectionTitle" :sectionTagName="sectionTag"/>

		<div class="section-title">
			<h3
				v-if="$editing"
				v-contenteditable:customTitle="$editing"
				:class="{ 'editable': $editing, 'nowrap-editable': $editing }"
				:data-placeholder="sectionTitle"
			></h3>
			
			<h3 v-else>
				{{ customTitle || sectionTitle }}
			</h3>
		</div>

		<portfolio-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import PortfolioList from '@/components/curriculum/elements/PortfolioList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-portfolio',
		
		components: {
			PortfolioList,
			SectionControls
		},

		data () {
			return {
				sectionTitle: 'Portfolio',
				sectionTag: this.$options._componentTag
			}
		},		
		
		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'portfolio');
			},

			customTitle: {
				get () { return this.$store.state.curriculum.portfolio.customTitle },
				set (value) { this.$store.state.curriculum.portfolio.customTitle = value }
			}			
		},

		i18n: {
			messages: {
				'pt-br': {
					'portfolioHelpText': 'Pode ser que em sua carreira seja importante ter um portfolio, ou você pode já manter um em algum serviço online. Caso seja sua realidade, você pode adicionar aqui um link para o seu portfólio. Caso você não possua um mas deseja criá-lo, sinta-se livre para utilizar uma de nossas sugestões, para vê-las basta clicar em "Adicionar".'
				},

				'en': {
					'portfolioHelpText': 'It may be that in your career it is important to have a portfolio, or you may already have one in an online service. If it is your reality, you can add a link to your portfolio here. If you don\'t have one but want to create one, feel free to use one of our suggestions, to see them just click "Add new item".'
				},
				
				'fr': {
					'portfolioHelpText': 'Il se peut que dans votre carrière, il soit important d\'avoir un portfolio, ou que vous en ayez déjà un dans un service en ligne. Si c\'est votre réalité, vous pouvez ajouter un lien vers votre portfolio ici. Si vous n\'en avez pas mais que vous souhaitez en créer un, n\'hésitez pas à utiliser l\'une de nos suggestions, pour les voir il suffit de cliquer sur "Ajouter un nouvel élément"..'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-portfolio {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>