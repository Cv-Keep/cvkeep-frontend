<template>
	<simple-tooltip :title="title">
		<div class="help-section-btn" slot="summary">
			<i class="fa fa-question"></i>
		</div>

		<slot/>
	</simple-tooltip>
</template>

<script>
	import SimpleTooltip from '@/components/tooltip/tooltip.vue'

	export default {
		name: 'HelpSectionBtn',

		props: {
			title: {
				type: String,
				default: ''
			}
		},

		components: {
			SimpleTooltip
		}
	}
</script>

<style lang="scss" scoped>
	.help-section-btn {
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