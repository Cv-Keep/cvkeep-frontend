<template>
  <div class="home-foot">
		<div class="container">
			<div class="left">
				<p class="featured"><span>{{ $t('aGoodCv') }}</span> <strong>{{ $t('curriculum') }}</strong></p>
				<p><strong>{{ $t('increasesYourChances') }}</strong></p>
				<button @click="$logged ? $router.push(`/cv/${$username}`) : $AuthModal.show()">
					<span v-html="$logged ? $t('goToCv') : $t('startNow')"></span>
				</button>
			</div>
			
			<div class="right">
				<img src="@/assets/footer.svg" alt="Two women analysing a big cv on the wall">
			</div>
		</div>
  </div>
</template>

<script>
	export default {
		name: 'home-foot',

		i18n: {
			messages: {
				'pt-br': {
					goToCv: 'Ir para o meu CV',
					startNow: 'Comece Agora',
					aGoodCv: 'Um bom',
					curriculum: 'Currículo',
					increasesYourChances: 'aumenta suas chances de conseguir um bom emprego.',
				},

				'en': {
					goToCv: 'Go to my CV',
					startNow: 'Start Now',
					aGoodCv: 'A good',
					curriculum: 'Resumé',
					increasesYourChances: 'increases your chances of getting a good job.',
					imagineAGreatOne: 'Imagine a great one?',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.home-foot {
		padding: 60px 46px;
		padding-bottom: 0;
		background-color: var(--secondary-color);
		.container {
			display: flex;
			color: #ffffff;
			button {
				opacity: 1;
				width: auto;
				height: 56px;
				font-size: 18px;
				font-weight: 700;
				margin-top: 24px;
				color: #ffffff;
				transition: 100ms;
				border-width: 2px;
				border-color: #ffffff;
				background-color: transparent;
				&:hover {
					background-color: #fff;
					color: var(--secondary-color);
				}
			}
			.left {
				max-width: 306%;
				text-align: right;
			}
			.right {
				padding: 0 46px;
				img {
					display: block;
					max-height: 100%;
					margin-top: -170px;
				}
				a {
					text-decoration: none;
				}
			}
			.featured {
				font-size: calc(20px + 2vw);
				line-height: 68px;
				text-transform: uppercase;
				margin-bottom: 22px;
			}
			p {
				font-size: 18px;
				margin-bottom: 8px;
				span {
					white-space: nowrap;
				}
			}
		}
		@media screen and (min-width: 1124px) {
			margin-bottom: -90px;
		}
		@media screen and (max-width: 1124px) {
			padding: 10px;
			.container {
				padding: 36px 10px;
				display: block;
				.left {
					max-width: 100%;
					text-align: left;
				}
				.right {
					padding: 0;
					margin-top: 42px;
					img {
						margin: 20px 0;
						max-width: 90%;
						margin-top: 40px;
						display: none;
					}
					button {
						margin: 0;
					}
				}
			}
		}
	}
</style>