<template>
	<div class="card">
		<div class="card__content">
			<slot/>
		</div>
	</div>
</template>

<script>
	export default {
		name: "confirmation-card"
	}
</script>

<style lang="scss" scoped>
	.card {
		height: 100%;
		width: 100%;
		text-align: left;
		padding: var(--gutter);
		display: inline-block;
		max-width: 600px;
		&__content {
			height: 100%;
			border-radius: 4px;
			background-color: #ffffff;
			box-shadow: var(--box-shadow-a);
			padding: calc(var(--gutter) * 2);
			@media screen and (max-width: 768px) {
				padding: var(--gutter);
			}
		}
	}
</style>