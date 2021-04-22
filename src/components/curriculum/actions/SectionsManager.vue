<template>
	<cv-lightbox :title="$t('manage-sessions')" v-if="active" @close="close">
		<ul class="sections-manager">
			<li :class="`hidden-${hidden.includes(s)} exclude-${exclude.includes(s)}`" v-for="(s,i) in sections" :key="i">
				<span>{{ $t(s) }}</span>
				<hide-section-btn :section="s"/>
			</li>
		</ul>
		<div slot="footer">
			<button class="button button-primary" @click="close">Ok</button>
		</div>
	</cv-lightbox>
</template>

<script>

	import { mapState } from 'vuex'
	import CvLightbox from '@/components/lightbox/Lightbox.vue'
	import HideSectionBtn from '@/components/curriculum/elements/HideSectionBtn.vue'

	export default {
		name: 'SectionsManager',
		
		components: {
			CvLightbox,
			HideSectionBtn
		},

		props: {
			active: {
				type: Boolean,
				default: false
			}
		},
		
		computed: {
			...mapState('curriculum', {
				sections: cv => cv.sections,
				hidden: cv => cv.hiddenSections
			}),
		},		
		
		data () {
			return {
				exclude: [
					'section-availability'
				]
			}
		},

		methods: {
			close () {
				this.$emit('close')
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'manage-sessions': 'Gerenciar Sessões',
					'section-presentation': 'Apresentação',
					'section-education': 'Educação',
					'section-experience': 'Experiencia',
					'section-languages': 'Idiomas',
					'section-skills': 'Competências',
					'section-prizes': 'Conquistas',
					'section-find-me-at': 'Links',
					'section-portfolio': 'Portfolio',
				},

				'en': {
					'manage-sessions': 'Manage Sessions',
					'section-presentation': 'Presentation',
					'section-education': 'Education',
					'section-experience': 'Experience',
					'section-languages': 'Languages',
					'section-skills': 'Skills',
					'section-prizes': 'Prizes',
					'section-find-me-at': 'Links',
					'section-portfolio': 'Portfolio',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	ul.sections-manager {
		list-style: none;
		margin: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
		li {
			flex: 1;
			padding: var(--gutter);
			margin: 0;
			text-transform: capitalize;
			font-size: 20px;
			display: flex;
			justify-content: space-between;
			align-items: center;
			&:hover {
				opacity: 1;
				&:not(.hidden-true) {
					box-shadow: var(--box-shadow-a);
				}
			}
			&.hidden-true {
				opacity: .3;
				background-color: var(--color-gray-c);
				.hide-section-btn {
					background-color: #000000;
					color: #ffffff;
				}
			}
			&.exclude-true {
				display: none;
			}
			&:not(:last-child) {
				border-bottom: solid 1px var(--color-gray-c);
			}
		}
	}
</style>