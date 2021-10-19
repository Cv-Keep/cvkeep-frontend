<template>
	<div class="portfolio-list-root">

		<text-limited :limit="introMaxLen" v-if="$editing" class="editable" v-contenteditable:introduction="$editing" :data-placeholder="$t('placeholder')">
			{{introduction}}
		</text-limited>

		<div v-else>
			<see-more v-if="introduction">
				<p class="no-margin-bottom pre-line">{{introduction.substring(0, this.introMaxLen)}}</p>
			</see-more>
		</div>

		<hr v-if="introduction">

		<is-draggable :list="items" tag="ul" class="portfolio-list">
			<li
				@click="edit(true, index)"
				v-for="(item, index) in items" :key="index"
				class="editable pointer portfolio-item"
			>

				<component :is="$editing ? 'div' : 'a'" :href="item.url" target="_blank">
					<i :class="`${item.icon} cv-item-icon`"></i>
					<span class="text-ellipsis-small" :title="item.label">{{item.label}}</span>
				</component>

				<span class="delete-item-round" @click.stop="remove(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>
			</li>
		</is-draggable>

		<cv-portfolio-form title="Portfolio" :index="index" @close="edit(false)" v-if="editModal"/>

		<add-bar @click.native="edit(true)" v-if="items.length < max_items"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import SeeMore from '@/components/seeMore/seeMore.vue'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'
	import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import TextLimited from '@/components/curriculum/elements/TextLimited.vue'
	import CvPortfolioForm from '@/components/curriculum/forms/CvPortfolioForm.vue'

	export default {
		name: 'portfolio-list',
		
		components: {
			AddBar,
			SeeMore,
			IsDraggable,
			TextLimited,
			CvPortfolioForm
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.portfolio.items,
			}),

			introduction: {
				get () { return this.$store.state.curriculum.portfolio.introduction },
				set (value) { this.$store.state.curriculum.portfolio.introduction = value; }
			},			
		},

		props: {
			max_items: {
				type: Number,
				default: 100
			}
		},

		data () {
			return {
				index: undefined,
				editModal: false,
				introMaxLen: 1000,
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
					placeholder: 'Este é um texto opcional. Você pode falar sobre o seu portfolio, projetos especiais, momentos marcantes de sua carreira, etc. Utilize o botão "Adicionar" para incluir links para seu portfolio online.'
				},

				'en': {
					placeholder: 'This is an optional text. You can talk about your portfolio, special projects, important moments on your career, etc. Use the "Add new item" button to include links to your online portfolio.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.portfolio-list-root {
		> p {
			margin-bottom: calc(var(--gutter) * 2);
		}
		> p + hr {
			margin-top: 8px;
		}
		ul.portfolio-list {
			margin: 0;
			display: block;
			list-style: none;
			display: grid;
			column-gap: calc(var(--gutter) * 2);
			grid-template-columns: 1fr 1fr 1fr;
			@media screen and (max-width: 768px) {
				grid-template-columns: 1fr 1fr;
			}
			@media screen and (max-width: 700px) {
				grid-template-columns: 100%;
			}
			li.portfolio-item {
				display: block;
				position: relative;
				position: relative;
				padding: 0 var(--gutter);
				padding-right: 20px;
				margin-bottom: var(--gutter);
				grid-template-columns: auto 20px;
				> div, > a {
					display: flex;
					font-weight: 600;
					align-items: center;
					text-decoration: none;
					color: var(--cv-color);
					text-transform: capitalize;
					span {
						text-decoration: underline;
					}
				}
				@media screen and (min-width: 1023px) {
					&:nth-last-child(1),
					&:nth-last-child(2),
					&:nth-last-child(3) {
						margin: 0;
					}
				}
				@media screen and (max-width: 500px) {
					padding: 0;
				}			
			}
			&.editing-true {
				li a {
					pointer-events: none;
				}
			}
		}
	}
</style>