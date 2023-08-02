<template>
	<svg class="spinner" width="35px" height="35px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" :style="`color: ${color}`">
		<circle class="path" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
	</svg>
</template>

<script>
	export default {
		name: 'loading-spinner',
		
		props: {
			color: {
				default: 'var(--primary-color)',
				required: false
			}
		}
	}
</script>

<style lang="scss" scoped>
	$offset: 187;
	$duration: 1.4s;

	.spinner {
		animation: rotator $duration linear infinite;
	}

	@keyframes rotator {
		0% { transform: rotate(0deg); }
		100% { transform: rotate(270deg); }
	}

	.path {
		stroke-dasharray: $offset;
		stroke-dashoffset: 0;
		transform-origin: center;
		animation:
		dash $duration ease-in-out infinite,
		colors ($duration*4) ease-in-out infinite;
	}

	@keyframes colors {
		0%   { stroke: currentColor; }
		25%  { stroke: currentColor; }
		50%  { stroke: currentColor; }
		75%  { stroke: currentColor; }
		100% { stroke: currentColor; }
	}

	@keyframes dash {
		0% { 
			stroke-dashoffset: $offset; 
		}
		50% {
			stroke-dashoffset: calc($offset / 4);
			transform:rotate(135deg);
		}
		100% {
			stroke-dashoffset: $offset;
			transform:rotate(450deg);
		}
	}
</style>