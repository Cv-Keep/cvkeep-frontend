<template>
	<div :class="`cv-wrapper container cv-lang-${$cvLang}`">
		<article class="cv-wrapper__content">
			<slot/>
		</article>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
		name: "cv-wrapper",

		computed: {
			...mapState([ 'curriculum' ])
		},

		updated () {
			const sections = this.$children
				.filter(c => c.$options._componentTag.startsWith('section-'))
				.map(c => c.$options._componentTag);

			this.curriculum.sections = Array.from(new Set(sections));
		}		
	}
</script>

<style lang="scss" scoped>
	.cv-wrapper {
		overflow: visible;
		padding: calc(var(--header-height) + 46px) 0;
		padding-bottom: var(--gutter);
		&::before {
			content: '';
			position: fixed;
			top: 0;
			left: 0;
			background-color: rgba(0,0,0,.5);
			width: 100vw;
			height: 100vh;
		}
		&__content {
			position: relative;
			margin: 0 auto;
			box-shadow: 5px 5px 5px;
			min-height: 1200px;
			background-color: #ffffff;
			box-shadow: var(--box-shadow-a);
			border-radius: 20px;
			padding-bottom: 4px;
		}
		&.container {
			// padding-bottom: 100px;
		}
		@media screen and (max-width: 1160px) {
			&.container {
				width: 95%;
			}
		}
		@media screen and (max-width: 1300px), (max-height: 677px) {
			&.container {
				padding: 80px 0;
				// padding-top: calc(var(--header-height) + 80px);
			}
		}
	}
</style>

<style lang="scss">
	.cv-wrapper {
		&__content {
			font-size: 16px;
			border: solid 4px var(--stripe-color);
			> section {
				position: relative;
				padding: 24px var(--gutter);
				&:nth-child(even) {
					background-color: var(--stripe-color);
					.cv-card {
						background-color: var(--stripe-color);
					}
				}
				&:nth-child(odd) {
					--stripe-color: #ffffff;
				}
				.addbar {
					margin-bottom: 0;
				}
				h3 {
					color: #333;
				}
			}
			
			&.downloading-as-image {
				margin: 0;
				border: none;
				border-radius: 0;
				width: 1000px;
				max-width: unset;
				box-shadow: none;	
				padding-bottom: 48px;
				> header, > section {
					border-radius: 0;
				}
				.cv-actions-root-div {
					display: none;
				}
				.see-more__content {
					overflow: initial;
					max-height: unset;
					&::after {
						display: none;
					}					
				}
				.cv-links,
				.know-more,
				.cv-portfolio,
				.see-more__footer {
					display: none;
				}
				.links-item a,
				.portfolio-item a {
					flex-wrap: wrap;
					&::after {
						content: attr(href);
						display: block;
						width: 100%;
						font-size: 10px;
						color: #444444;
						margin-top: 4px;
						font-weight: normal;
					}
				}
			}
		}
	}
</style>

<style type="text/css">
	.cv-lightbox__content header{
		border-radius: 0px !important;
	}
</style>