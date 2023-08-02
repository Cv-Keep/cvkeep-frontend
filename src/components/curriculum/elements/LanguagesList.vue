<template>
	<div class="languages-list-root">
		<is-draggable :list="items" tag="ul" class="languages-list">
			<li
				@click="edit(true, index)"
				v-for="(item, index) in items" :key="index"
				class="li-dynamic incremented editable pointer language-item"
			>

				<h5 class="cv-item-title">
					<i class="fa fa-flag cv-item-icon cv-item-side-icon"></i>
					{{ item.language }}
				</h5>
			
				<div class="language-stats color-gray-medium">
					<div v-for="skill in languageSkills" :key="skill">
						<span><strong>{{ $t(`languageSkills.${skill}`) }}</strong></span>
						<span>{{ $t(`languageLevels.${item[skill]}`) }}</span>
					</div>
				</div>

				<span class="delete-item-round" @click.stop="remove(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>

			</li>
		</is-draggable>

		<cv-languages-form :title="$t('languages')" :index="index" @close="edit(false)" v-if="editModal"/>

		<add-bar @click.native="edit(true)" v-if="items.length < max_items"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import i18nMessages from '@/shared/i18n-messages'
	import languageSkills from '@/shared/script/data/languageSkills.js'
	import CvLanguagesForm from '@/components/curriculum/forms/CvLanguagesForm.vue'
	import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'

	export default {
		name: 'languages-list',
		
		components: {
			AddBar,
			IsDraggable,
			CvLanguagesForm
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.languages.items,
			}),
		},

		props: {
			max_items: {
				type: Number,
				default: 100
			}
		},

		data () {
			return {
				languageSkills,
				index: undefined,
				editModal: false,
			}
		},

		methods: {
			remove (index) {
				this.items.splice(index, 1);
			},

			edit (state, index) {
				this.index = index;
				this.editModal = this.$editing ? state : false;
			},			

			sumarize (item) {
				const { speak, read, write } = item;

				return new Set([ speak, read, write ]).size === 1;
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					languages: 'Idiomas'
				},
				
				'en': {
					languages: 'Languages'
				},

				'fr': {
					languages: 'Langues'
				}
			},

			sharedMessages: i18nMessages
		}
	}
</script>

<style lang="scss" scoped>
	.languages-list-root {
		ul.languages-list {
			margin: 0;
			display: block;
			list-style: none;
			column-gap: calc(var(--gutter) * 2);
			display: grid;
			grid-template-columns: 1fr 1fr;
			@media screen and (max-width: 1023px) {
				display: block;
			}
			li.language-item {
				flex: 1;
				position: relative;
				min-width: 50%;
				margin: 0;
				padding-left: 50px;				
				margin-bottom: 28px;
				h5 {
					margin-bottom: 4px;
				}
				.language-stats {
					margin: 0;
					font-size: 13px;
					padding-top: 8px;
					margin-left: -48px;
					display: flex;
					> div {
						&:not(:first-child) {
							margin-left: var(--gutter);
						}
						span:not(:first-child) {
							display: block;
						}
					}
				}
				&:last-child {
					margin: 0;
					border: none;
					padding-bottom: 0;
				}
				@media screen and (min-width: 1023px) {
					&:nth-last-child(1),
					&:nth-last-child(2) {
						margin: 0;
					}
				}
				@media screen and (max-width: 500px) {
					padding: 0;
					.language-stats {
						margin: 0;
					}
				}
			}
		}
	}
</style>