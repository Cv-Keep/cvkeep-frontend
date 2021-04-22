<template>
	<div class="terms" style="background-image:url('/img/backgrounds/000.jpg')">
		<div class="content container">
			<div class="terms__body">
				<component :is="`terms-${$appLang}`"/>
			</div>
		</div>
	</div>
</template>

<script>
	const TermsEn = () => import( /* webpackChunkName: "Terms-En" */ '@/components/terms/terms-en.vue' )
	const TermsPtBr = () => import( /* webpackChunkName: "Terms-Pt-Br" */ '@/components/terms/terms-pt-br.vue' )

	export default {
		name: 'Terms',

		components: {
			TermsEn,
			TermsPtBr
		}
	}
</script>

<style lang="scss" scoped>
	.terms {
		padding: 100px 0;
		.content {
			min-height: 80vh;
			padding: var(--gutter);
			background-color: #ffffff;
			border-radius: 8px;
			margin-top: 40px;
		}
	}
</style>