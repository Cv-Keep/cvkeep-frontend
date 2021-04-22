<template>
	<div class="content" style="background-image:url(/img/backgrounds/070.jpg)">
		<div class="container">
			<div class="confirm">

				<div v-if="!allowed" class="not-allowed">
					<loading-spinner v-if="loading"/>
					<reg-error v-else :error="error"/>
				</div>

				<div v-else class="allowed">
					<loading-spinner v-if="loading"/>
					<reg-steps v-else/>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	import RegError from '@/components/register/RegError.vue'
	import RegSteps from '@/components/register/RegSteps.vue'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

	export default {
		name: 'home',

		components: {
			LoadingSpinner,
			RegError,
			RegSteps
		},

		data () {
			return {
				error: "",
				loading: true,
				allowed: false
			}
		},

		methods: {
			showError (error) {
				this.error = String(error);
				this.loading, this.allowed = false;
			}
		},

		mounted () {
			const data = { hash: window.location.hash.substr(1) || '' };

			this.$API.confirmRegistration(data)
				.then(this.allowed = true)
				.catch(this.showError)
				.finally(this.loading = false);
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		height: 100vh;
		position: relative;
		z-index: 0;
		.confirm {
			width: 100%;
			display: flex;
			max-height: 960px;
			align-items: center;
			justify-content: center;
			height: calc(90vh - var(--header-height));
			.allowed, .not-allowed {
				width: 100%;
				text-align: center;
			}
		}
	}
</style>