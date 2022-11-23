<template>
	<section class="cv-presentation" v-if="display">
		<section-controls :help="$t('presentationHelpText')" :helpTitle="$t('presentation')" :sectionTagName="sectionTag"/>

		<div class="cv-presentation__content">
			<h3
				v-contenteditable:customTitle="$editing"
				:class="{ 'editable': $editing, 'nowrap-editable': $editing }"
				:data-placeholder="$t('presentation')"
			>
				{{ $t('presentation') }}
			</h3>
			
			<text-limited :limit="this.maxlen" v-if="$editing" class="editable" v-contenteditable:description="$editing" :data-placeholder="$t('placeholder')">
				{{ description }}
			</text-limited>
			
			<see-more v-else>
				<p class="pre-line">
					{{description.substring(0, this.maxlen)}}
				</p>
			</see-more>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex'
	import SeeMore from '@/components/seeMore/seeMore.vue'
	import TextLimited from '@/components/curriculum/elements/TextLimited.vue'
	import SectionControls from '@/components/curriculum/elements/SectionControls.vue'

	export default {
		name: 'cv-presentation',

		components: {
			SeeMore,
			TextLimited,
			SectionControls
		},

		data () {
			return {
				maxlen: 1500,
				sectionTag: this.$options._componentTag
			}
		},

		computed: {
			...mapState('curriculum', [
				'hiddenSections',
				'presentation'
			]),

			customTitle: {
				get () { return this.$store.state.curriculum.presentation.customTitle },
				set (value) { this.$store.state.curriculum.presentation.customTitle = value }
			},

			description: {
				get () { return this.$store.state.curriculum.presentation.description },
				set (value) { this.$store.state.curriculum.presentation.description = value }
			},

			display () {
				const notHidden = !this.hiddenSections.includes(this.$options._componentTag);
				const isEmptyOnView = !this.$editing && this.description.length === 0;

				return ( notHidden && !isEmptyOnView );
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					presentation: 'Apresentação',
					presentationHelpText: 'Fale sobre você de forma objetiva e concisa. Conte-nos quem é a pessoa que está por trás do seu currículo. Você pode contar sua história, o que você faz ou gostaria de fazer, suas aspirações e metas, por exemplo. Também pode ser um bom espaço para demonstrar de forma breve quem é você fora do trabalho. Escrever uma apresentação é especialmente importante se você tem pouca ou nenhuma experiência.',
					placeholder: 'Escreva uma apresentação. Você pode contar a sua história, suas conquistas e suas metas, por exemplo. Mantenha a objetividade e mostre sua personalidade.'
				},

				'en': {
					presentation: 'Presentation',
					presentationHelpText: 'Talk about yourself objectively and concisely. Tell us who is the person behind your resume. You can tell your story, what you do or would like to do, your aspirations and goals, for example. It can also be a good place to briefly demonstrate who you are outside of work. Writing a presentation is especially important if you have little or no experience.',
					placeholder: 'Write a presentation. You can tell your story, your achievements and your goals. Mantain objectivety and show your personality'
				},

				'fr': {
					presentation: 'Présentation',
					presentationHelpText: 'Parlez de vous de manière objective et concise. Dites-nous qui est la personne qui se cache derrière votre CV. Vous pouvez raconter votre histoire, ce que vous faites ou aimeriez faire, vos aspirations et vos objectifs, par exemple. Cela peut aussi être un bon endroit pour montrer brièvement qui vous êtes en dehors du travail. La rédaction d\'une présentation est particulièrement importante si vous avez peu ou pas d\'expérience.',
					placeholder: 'Rédigez une présentation. Vous pouvez raconter votre histoire, vos réalisations et vos objectifs. Restez objectif et montrez votre personnalité.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cv-presentation {
		position: relative;
	}
</style>