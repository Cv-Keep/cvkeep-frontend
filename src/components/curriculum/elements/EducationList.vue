<template>
	<div class="education-list-root">
		
		<is-draggable tag="ul" class="education-list" :list="items">	
			<li
				v-for="(item, index) in items" :key="index"
				@click="edit(true, index)"
				class="editable pointer education-item"
			>

				<h5 class="cv-item-title">
					<i :title="item.type" :class="`cv-item-icon cv-item-side-icon fa ${getItemIcon(item)}`"></i>
					{{item.institution}}
				</h5>

				<p class="level-and-degree color-gray-medium">
					{{ $t(`educationTypes.${item.type}`) }}: {{item.title}}
				</p>
				
				<p class="item-dates tiny-date">
					<span v-if="item.start_date">{{item.start_date}}</span>
					<span v-if="item.end_date"> {{item.end_date}}</span>
					<span v-if="item.status && item.status !== 'notInform'" :class="`status status-${item.status}`">
						{{ $t(`educationSituations.${item.status}`) }}
					</span>
				</p>
				
				<span class="delete-item-round" @click.stop="remove(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>
			</li>
		</is-draggable>

		<cv-education-form title="Education" :index="index" @close="edit(false)" v-if="editModal"/>		
 
		<add-bar @click.native="edit(true)" v-if="items.length < max_items"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import i18nMessages from '@/shared/i18n-messages'
	import educationTypesIcons from '@/shared/script/data/educationTypesIcons.js'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'
	import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import CvEducationForm from '@/components/curriculum/forms/CvEducationForm.vue'

	export default {
		name: 'education-list',

		components: {
			AddBar,
			IsDraggable,
			CvEducationForm
		},

		props: {
			max_items: {
				type: Number,
				default: 100
			}
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.education.items
			})
		},

		data () {
			return {
				editModal: false,
				index: undefined,
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

			getItemIcon (item) {
				return educationTypesIcons[item.type] || 'fa-suitcase';
			}		
		},

		i18n: {
			sharedMessages: i18nMessages
		}
	}
</script>

<style lang="scss" scoped>
	.education-list-root {
		ul.education-list {
			margin: 0;
			display: block;
			list-style: none;
			column-gap: calc(var(--gutter) * 2);
			li.education-item {
				display: block;
				position: relative;
				padding: 0 var(--gutter);
				padding-right: 20px;
				padding-left: 50px;
				padding-bottom: 7px;
				margin-bottom: 10px;
				&:last-child {
					border: none;
					margin-bottom: 0;
				}
				h5, p {
					margin-bottom: 8px;
				}
				.item-dates span {
					&:not(:last-of-type)::after {
						content: '-';
						margin: 0 4px;
					}
				}
				.level-and-degree {
					text-transform: capitalize;
				}
				@media screen and (max-width: 500px) {
					padding: 0;
				}				
			}
			.status {
				text-transform: uppercase;
				color: var(--color-gray-a);
				&-done {
					color: var(--cv-color);
				}
			}
		}
	}
</style>