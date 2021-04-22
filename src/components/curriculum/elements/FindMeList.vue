<template>
	<div class="links-list-root">

		<is-draggable :list="items" tag="ul" class="links-list">
			<li
				@click="edit(true, index)"
				v-for="(item, index) in items" :key="index"
				class="li-dynamic incremented editable pointer links-item"
			>
				<a :href="item.url" target="_blank" @click="linkCheck">
					<i :class="`${item.icon} cv-item-icon`"></i> 
					<span class="text-ellipsis-small" :title="item.label">{{item.label}}</span>
				</a>
				
				<span class="delete-item-round" @click.stop="remove(index)" v-if="$editing">
					<i class="fa fa-times"></i>
				</span>
			</li>
		</is-draggable>

		<cv-find-me-at-form title="Links" :index="index" @close="edit(false)" v-if="editModal"/>

		<add-bar @click.native="edit(true)" v-if="items.length < this.max_items"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import CvFindMeAtForm from '@/components/curriculum/forms/CvFindMeAtForm.vue'
	import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'
	import AddBar from '@/components/curriculum/elements/AddBar.vue'

	export default {
		name: 'FindMeList',
		
		components: {
			AddBar,
			IsDraggable,
			CvFindMeAtForm
		},

		props: {
			max_items: {
				type: Number,
				default: 100
			}
		},

		computed: {
			...mapState('curriculum', {
				items: cv => cv.links.items
			}),
		},

		data () {
			return {
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
			
			linkCheck (e) {
				if (this.$editing) {
					e.preventDefault();
				}
			}
    }		
	}
</script>

<style lang="scss" scoped>
	.links-list-root {
		ul.links-list {
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
			li.links-item {
				display: block;
				position: relative;
				position: relative;
				padding: 0 var(--gutter);
				padding-right: 20px;
				margin-bottom: var(--gutter);
				grid-template-columns: auto 20px;
				@media screen and (max-width: 500px) {
					padding: 0;
				}
				a {
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
			}
			&.editing-true {
				li a {
					pointer-events: none;
				}
			}
		}
	}
</style>