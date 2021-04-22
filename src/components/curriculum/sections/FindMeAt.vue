<template>
	<section class="cv-links" v-if="display">
		<section-controls :help="$t('addLinksHelpText')" :helpTitle="$t('aditionalLinks')" :sectionTagName="sectionTag"/>

		<h3>{{ $t('aditionalLinks' )}}</h3>
		<find-me-list/>
	</section>
</template>

<script>
	import Utils from '@/shared/script/helpers/utils.js'
	import FindMeList from '../elements/FindMeList.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-links',
		
		components: {
			FindMeList,
			SectionControls
		},

		data () {
			return {
				sectionTag: this.$options._componentTag
			}
		},

		computed: {
			display () {
				return Utils.canDisplayCvSection(this, 'links');
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'aditionalLinks': 'Links adicionais',
					'addLinksHelpText': 'Adicione aqui links para suas redes sociais, sites pessoais, blogs ou qualquer outro tipo de serviço ou informação relacionado a você e que seja relevante para o seu currículo.'
				},

				'en': {
					'aditionalLinks': 'Links',
					'addLinksHelpText': 'Add links here to your social networks, personal websites, blogs or any other type of service or information related to you that is relevant to your resume.'
				}				
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-links {
		position: relative;
		ul {
			display: grid;
			grid-template-columns: 1fr 1fr;
		}
	}
</style>