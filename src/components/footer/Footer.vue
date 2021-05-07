<template>
	<footer>
		<div class="footer__content">
			<div class="container">
				<div class="logo">
					<router-link to="/">
						<img src="@/assets/logo/logo.png">
						<span>{{$brandName}}</span>
					</router-link>
				</div>

				<ul>
					<li v-if="!$logged">
						<a href="/" @click.prevent="$AuthModal.show()">
							{{ $t('login') }}
						</a>
					</li>

					<li v-else>
						<router-link to="/cv">
							{{ $t('myCurriculum') }}
						</router-link>
					</li>

					<li>
						<router-link to="/search">
							{{ $t('search') }}
						</router-link>
					</li>					

					<li v-if="!$logged">
						<a href="/" @click.prevent="$AuthModal.show({index:1})">
							{{ $t('register') }}
						</a>
					</li>

					<li v-else>
						<router-link to="/settings">
							{{ $t('configurations') }}
						</router-link>
					</li>

					<li @click="reportCv = true" class="color-inherit link">
						{{ $t('reportCv') }}
					</li>

					<li>
						<a href="https://github.com/Cv-Keep/" target="_blank">It's FOSS &nbsp; <i class="fab fa-github-alt"></i></a>
					</li>
				</ul>

				<ul>
					<li>
						<router-link to="/contact">
							{{ $t('contact') }}
						</router-link>
					</li>

					<li v-if="$route.path !== '/'">
						<router-link to="/">
							{{ $t('goHome') }}
						</router-link>
					</li>

					<li>
						<router-link to="/terms">
							{{ $t('termsAndConditions') }}
						</router-link>
					</li>

					<li class="color-inherit link">
						Become a supporter
					</li>				
				</ul>
			</div>
		</div>

		<div class="foot">
			<p>{{$brandName}} © All Rights Reserved</p>
		</div>

		<report-cv v-if="reportCv" @close="reportCv = false"/>
	</footer>
</template>

<script>
	import ReportCv from '@/components/curriculum/reportCv/ReportCv.vue'

	export default {
		name: 'app-footer',

		components: {
			ReportCv
		},

		data () {
			return {
				reportCv: false
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					login: 'Login',
					contact: 'Contato',
					register: 'Registre-se',
					goHome: 'Ir para a home',
					reportCv: 'Denunciar CV',
					myCurriculum: 'Meu Curriculum',
					configurations: 'Configurações',
					termsAndConditions: 'Termos e Condições',
				},

				'en': {
					login: 'Login',
					contact: 'Contact',
					register: 'Register',
					goHome: 'Homepage',
					reportCv: 'Report CV',
					myCurriculum: 'My CV',
					configurations: 'Settings',
					termsAndConditions: 'Terms and Conditions',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	footer {
		padding: 46px;
		padding-bottom: 0px;
		background-color: #424751;
		min-height: 200px;
		.footer__content {
			display: flex;
			flex-wrap: wrap;
			.container {
				display: flex;
				width: 100%;
				flex-wrap: wrap;
				justify-content: space-between;
				.logo {
					text-align: center;
					display: block;
					text-align: center;
					letter-spacing: 4px;
					margin-bottom: 16px;
					a {
						text-decoration: none;
						img {
							display: block;
							max-width: 90px;
							margin: 0 auto;
						}
						span {
							color: #ffffff;
							font-size: 20px;
							text-transform: uppercase;
						}
					}
				}
				ul {
					list-style: circle;
					padding: 0 36px;
					color: #ffffff;		
					a {
						color: #ffffff;
						text-decoration: none;
						&:hover {
							text-decoration: underline;
						}
					}
				}
			}
		}
		.foot {
			color: #ffffff;
			text-align: center;
			padding: 10px;
			border-top: solid 1px #cccccc;
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 32px;
			p {
				margin: 0;
			}
		}	
	}
	@media screen and (max-width: 768px) {
		footer {
			padding: 46px var(--gutter);
			.footer__content {
				.container {
					.logo {
						width: 100%;
						max-width: unset;
						margin-bottom: 32px;
						img {
							margin: 0 auto;
						}
					}
					ul {
					}
				}
			}
		}
	}			
</style>