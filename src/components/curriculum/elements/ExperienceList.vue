<template>
	<div class="experience-list-root">
		<text-limited class="editable introduction" :limit="this.introMaxLen" v-if="$editing" v-contenteditable:introduction="$editing" :data-placeholder="$t('placeholder')">
			{{introduction}}
		</text-limited>

		<see-more v-else-if="introduction">
			<p class="pre-line">{{introduction.substring(0, this.introMaxLen)}}</p>
		</see-more>

		<hr/>

		<is-draggable tag="ul" :list="items" class="experience-list">			
			<li
				v-for="(item, index) in items"
				:key="index"
				@click="edit(true, index)"
				class="editable pointer experience-item"
			>
				<div class="experience-item__head">
					<component 
						:is="$editing || !item.webpage ? 'h5' : 'a'" 
						:href="item.webpage" target="_blank"
						:title="$t(`experienceTypes.${item.type}`)"
						class="cv-item-title" 
					>
						<i :title="item.type" :class="`cv-item-icon cv-item-side-icon fa ${getItemIcon(item)}`"></i>
						
						{{item.title}} <i v-if="item.webpage" class="fa fa-external-link-alt"></i>
					</component>

					<p class="activity color-gray-medium">
						<strong>{{item.activity}}</strong>
					</p>

					<p class="dates color-gray-light">
						<strong>
							<span>
								{{item.start}}
							</span>
							-
							<span :class="`current-${item.current ? 'true' : 'false'}`">
								{{item.current ? 'Current' : item.end}}
							</span>
						</strong>
					</p>
				</div>

				<div class="experience-item__extra">
					<div class="xp-about color-gray-medium pre-line" v-if="item.about.trim().length">
						{{item.about}}
					</div>	

					<div class="role-list" v-if="item.type === 'professional' && item.roles">
						<div class="role" v-for="(role, r) in item.roles" :key="r">
							<p><span>{{ $t('role') }}:</span> {{role.role}}</p>
							
							<div class="tiny-date">
								<span>
									{{role.start_date}}
								</span>
								
								<span v-if="role.end_date || role.current == 'true'">-</span>

								<span v-if="role.current == 'true'" class="label-current">
									{{ $t('current') }}
								</span>

								<span v-if="role.current != 'yes' && role.end_date">
									{{role.end_date}}
								</span>
							</div>
						</div>
					</div>
				</div>				

				<span class="delete-item-round" @click.stop="remove(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>
			</li>
		</is-draggable>

		<cv-experience-form :title="$t('experience')" :index="index" @close="edit(false)" v-if="editModal"/>

		<add-bar @click.native="edit(true)" v-if="items.length < this.max_items"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import i18nMessages from '@/shared/i18n-messages'
	import SeeMore from '@/components/seeMore/seeMore.vue'
	import SimpleTooltip from '@/components/tooltip/tooltip.vue'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'
	import TextLimited from '@/components/curriculum/elements/TextLimited.vue'
	import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import AccordionItem from '@/components/curriculum/elements/AccordionItem.vue'
	import experienceIconsByType from '@/shared/script/data/experienceIconsByType.js'
	import CvExperienceForm from '@/components/curriculum/forms/CvExperienceForm.vue'

	export default {
		name: 'experience-list',
		
		components: {
			AddBar,
			SeeMore,
			TextLimited,
			IsDraggable,
			SimpleTooltip,
			AccordionItem,
			CvExperienceForm,
		},

		props: {
			max_items: {
				type: Number,
				default: 100
			}
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.experience.items,
				introduction: cv => cv.experience.introduction,
			}),

			introduction: {
				get () { return this.$store.state.curriculum.experience.introduction },
				set (value) { this.$store.state.curriculum.experience.introduction = value; }
			},
		},

		data () {
			return {
				index: undefined,
				introMaxLen: 1000,
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

			getItemIcon (item) {
				return experienceIconsByType[item.type] || 'fa-star';
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					role: 'Cargo',
					current: 'Atual',
					experience: 'Experiência',
					placeholder: 'Este é um texto opcional. Você pode utiliza-lo para descrever sua experiência, adicionar cases, evidenciar seu valor para as coorporações, etc. Utilize o botão "Adicionar" para criar sua tragetória.'
				},

				'en': {
					role: 'Role',
					current: 'Current',
					experience: 'Experience',
					placeholder: 'This is an optional text. You can use it to describe your experience, add cases, highlight your value to the coorporations, etc. Use the "Add new item" button to create your story.'
				}
			},

			sharedMessages: i18nMessages
		}
	}
</script>

<style lang="scss" scoped>
	.experience-list-root {
		ul.experience-list {
			margin: 0;
			display: block;
			list-style: none;
			column-gap: calc(var(--gutter) * 2);
			.experience-item {
				position: relative;
				position: relative;
				min-height: 60px;
				padding: 0;
				padding-right: 30px;
				padding-left: 50px;
				margin: 0;
				padding-bottom: var(--gutter);
				&:not(:last-child) {
					margin-bottom: var(--gutter);
				}
				&:last-child {
					padding-bottom: 0;
				}
				&__head {
					.cv-item-title {
						i:not(.cv-item-icon) {
							font-size: 12px;
							margin-left: 8px;
						}					
					}
					.activity {
						margin-bottom: 4px;
						text-transform: capitalize;
					}
					.dates {
						margin: 0;
						font-size: 14px;
						.current-true {
							font-weight: 700;
							color: var(--cv-color);
						}
					}
				}
				&__extra {
					.xp-about {
						margin-top: var(--gutter);
					}
				}
				.role-list {
					padding-top: var(--gutter);
					.role {
						padding: 8px 0;
						border-left: solid 2px var(--cv-color);
						padding-left: 8px;
						p {
							font-weight: 500;
							color: var(--cv-color);
							margin-bottom: 8px;
							> span {
								font-weight: 600;
							}
						}
						&:not(:last-child) {
							margin-bottom: 8px;
						}
					}
				}
				&__footextra {
					display: flex;
				}				
				span.label-current {
					font-weight: 700;
					color: var(--cv-color);
				}
				.status {
					font-weight: 700;
					text-transform: uppercase;
					color: var(--color-gray-a);
					&-done {
						color: var(--cv-color);
					}
				}
			}
			@media screen and (max-width: 500px) {
				.experience-item {
					padding: 0;
					&__head {
						.cv-item-title {
							margin-bottom: 8px;
						}
					}
					&__head + .role-list {
						margin: 8px 0;
						margin-top: 8px !important;
					}
				}
			}
		}
		.know-more-absolute {
			margin: 0;
			left: 190px;
			position: absolute;
			@media screen and (max-width: 500px) {
				left: 140px;
			}
		}
	}
</style>