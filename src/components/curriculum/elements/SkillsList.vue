<template>
	<div class="skills-list-root">

		<text-limited :limit="introMaxLen" v-if="$editing" class="editable" v-contenteditable:introduction="$editing" :data-placeholder="$t('placeholder')">
			{{introduction}}
		</text-limited>

		<see-more v-else>
			<p class="no-margin-bottom pre-line">
				{{introduction.substring(0, this.introMaxLen).trim()}}
			</p>
		</see-more>

		<hr v-if="introduction">

		<is-draggable
			tag="ul"
			:list="items"
			class="skills-list"
		>
			
			<slot/>

			<li
				v-for="(item, index) in items"
				:key="index"
				:title="item"
			>
				<p
					class="editable"
					@focus="selectAll"
					:contenteditable="$editing"
					:data-index="index"
					@input="update"
					@keypress.enter.prevent="onEnter"
				>
					{{item}}
				</p>

				<span class="delete-item-round" @click="removeItem(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>
			</li>

		</is-draggable>

		<add-bar @click.native="addItem" v-if="items.length < this.max_items"/>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { mapState } from 'vuex'
	import Utils from '@/shared/script/helpers/utils.js'
	import SeeMore from '@/components/seeMore/seeMore.vue'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'
  import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import TextLimited from '@/components/curriculum/elements/TextLimited.vue'

	export default {
		name: 'skills-list',
		
		components: {
			AddBar,
			SeeMore,
			IsDraggable,
			TextLimited,
		},

		props: {
			model: {
				type: Object,
				default: () => {}
			},
			max_items: {
				type: Number,
				default: 100
			}
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.skills.items
			}),

			introduction: {
				get () { return this.$store.state.curriculum.skills.introduction },
				set (value) { this.$store.state.curriculum.skills.introduction = value; }
			},			
		},

		data () {
			return {
				introMaxLen: 1000
			}
		},

		methods: {
			addItem () {
				this.items.push('Item');

				Vue.nextTick(() => {
					const el = this.$el.querySelector('li:last-child p');

					el.focus();
					Utils.selectText(el);
				});				
			},

			removeItem (index) {
				this.items.splice(index, 1);
			},

			update (event) {
				const li = event.target;
				const index = li.dataset.index;
				this.items[index] = li.innerText;
			},

			onEnter (event) {
				const getNext = () => event.target.parentElement.nextElementSibling;
				
				if (getNext()) {
					getNext().querySelector('p').focus();
				} else {
					this.addItem();
				}
			},

			selectAll (e) {
				Vue.nextTick(() => {
					Utils.selectText(e.target);
				});
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					placeholder: 'Este é um texto opcional. Você pode descrever de forma mais ampla e geral suas competências, façar sobre sua área de atuação, etc. Clique no botão "Adicionar" para criar uma lista de competências'
				},

				'en': {
					placeholder: 'This is an optional text. Your can describe your skills more broadly and generally, discuss your area and expertise, etc. Click on the "Add new item" button to create a list of skills.'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.skills-list-root {
		ul.skills-list {
			margin: 0;
			display: grid;
			column-gap: calc(var(--gutter) * 2);
			grid-template-columns: 1fr 1fr;
			counter-reset: li-counter;
			@media screen and (max-width: 700px) {
				grid-template-columns: 100%;
			}
			li {
				color: var(--cv-color);
				position: relative;
				display: list-item;
				padding-right: 20px;
				color: var(--cv-color);
				counter-increment: li-counter;
				grid-template-columns: auto 20px;
				white-space: nowrap;
				@media screen and (max-width: 700px) {
					max-width: unset;	
				}
				p {
					cursor: text;
					display: inline;
					text-align: left;
					font-weight: 600;
					color: currentColor;
					text-decoration: none;
				}
				p {
					margin: 0;
					padding: 0;
					width: 88%;					
					overflow: inherit;
					display: inline-block;
					white-space: inherit;					
				}
				@media screen and (max-width: 500px) {
					padding: 0;
				}
			}
		}
		p.editable + ul {
			margin-top: 28px;
		}
	}
</style>