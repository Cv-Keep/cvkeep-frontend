<template>
	<draggable
		:list="list"
		:animation="100"
		:disabled="disabled"
		:tag="tag"
		@start="drag=true"
		@end="drag=false"
	>
		<slot/>
	</draggable>
</template>

<script>

	import draggable from 'vuedraggable'

	export default {
		name: 'IsDraggable',

		components: {
			draggable
		},

		computed: {
			disabled () {
				return window.innerWidth <= 999 || !this.$editing;
			}
		},

		props: {
			list: {
				type: Array,
				default: () => []
			},
			
			tag: {
				type: String,
				default: 'div'
			}
		}
	}
</script>