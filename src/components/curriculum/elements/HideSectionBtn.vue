<template>
	<div class="hide-section-btn" @click="toggleSection" v-if="$editing">
		<i :class="`fa ${icon}`"></i>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: 'HideSectionBtn',

		props: {
			section: {
				type: String,
				default: '',
				required: true
			}
		},

		computed: {
			...mapState('curriculum', [ 'hiddenSections' ]),

			icon () {
				return this.hiddenSections.includes(this.section) ? 'fa-undo' : 'fa-times'				
			}
		},

		methods: {
			toggleSection () {
				if (this.hiddenSections.includes(this.section)) {
					const index = this.hiddenSections.indexOf(this.section);
					this.hiddenSections.splice(index, 1);
				} else {
					this.hiddenSections.push(this.section);
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.hide-section-btn {
		font-size: 16px;
		width: 32px;
		height: 32px;
		color: #888;
		border: solid 2px #888;
		padding: 6px;
		border-radius: 100%;
		opacity: .7;
		background-color: var(--color-gray-e);
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		&:hover {
			opacity: 1;
		}
	}
</style>