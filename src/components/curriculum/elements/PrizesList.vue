<template>
	<div class="prizes-list-root">
		<is-draggable :list="items" tag="ul" class="prizes-list">
			
			<li
				v-for="(item, index) in items"
				:key="index"
				@click="edit(true, index)"
				class="li-dynamic incremented editable pointer prizes-item"
			>

				<div class="holder">			
					<div class="holder__content">
						<div class="holder__content__header">
							<component 
								:is="$editing || !item.webpage ? 'h5' : 'a'" 
								:href="item.webpage" target="_blank"
								:title="item.title"
								class="cv-item-title" 
							>							
								<i :title="item.type" :class="`fa ${getItemIcon(item)} cv-item-icon cv-item-side-icon`"></i>
								
								{{item.title}} <i v-if="item.webpage" class="fa fa-external-link-alt"></i>
							</component>

							<p v-if="item.organization" class="color-gray-medium">
								<strong>{{ $t('institution') }}: {{ item.organization }}</strong>
							</p>

							<div class="know-more-about color-gray-medium" v-if="item.about" :title="item.title">
								{{item.about}}
							</div>							
						</div>

						<div class="holder__content__footer">
							<div class="info tiny-date">
								<div class="cv-color"><strong>{{item.type}}</strong> <span v-if="item.date">- {{item.date}}</span></div>
							</div>
						</div>
					</div>
			
				</div>
			
				<span class="delete-item-round" @click.stop="remove(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>
			</li>
		</is-draggable>

		<cv-prizes-form :title="$t('achievements')" :index="index" @close="edit(false)" v-if="editModal"/>

		<add-bar @click.native="edit(true)" v-if="items.length < max_items"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import prizesIconsByType from '@/shared/script/data/prizesIconsByType.js'
	import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'
	import CvPrizesForm from '@/components/curriculum/forms/CvPrizesForm.vue'

	export default {
		name: 'prizes-list',

		components: {
			AddBar,
			IsDraggable,
			CvPrizesForm,
		},

		props: {
			max_items: {
				type: Number,
				default: 100
			}
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.prizes.items,
			}),
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
				return prizesIconsByType[item.type] || 'fa-suitcase';
			}			
		},

		i18n: {
			messages: {
				'pt-br': {
					knowMore: 'Saiba mais',
					institution: 'Instituição',
					achievements: 'Conquistas',
				},

				'en': {
					knowMore: 'Know more',
					institution: 'Institution',
					achievements: 'Achievements',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.prizes-list-root {
		ul.prizes-list {
			margin: 0;
			display: grid;
			grid-gap: var(--gutter);
			grid-template-columns: 1fr 1fr;
			counter-reset: li-counter;
			list-style: none;
			@media screen and (max-width: 768px) {
				display: block;
			}
			li.prizes-item {
				position: relative;
				padding-right: 20px;
				padding-left: 50px;
				margin-bottom: var(--gutter);
				counter-increment: li-counter;
				grid-template-columns: auto 20px;
				.holder {
					height: 100%;
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;
					&__content {
						flex: 1;
						display: flex;
						flex-direction: column;
						&__header {
							flex: 1;
							.cv-item-title {
								i:not(.cv-item-icon) {
									font-size: 12px;
									margin-left: 8px;
								}					
							}
							p {
								font-size: 14px;
								margin-bottom: 8px;
							}
							.know-more-about {
								font-size: 14px;
								margin-bottom: 8px;
							}
						}
					}
				}
				@media screen and (max-width: 700px) {
					padding: 0;
					.holder {
						&__content {
							padding: 0;
						}
					}
				}
			}
		}
	}
</style>