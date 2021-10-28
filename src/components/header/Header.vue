<template>
	<header class="app-header" ref="appheader">
		<div class="app-header__container container">
			<div class="left">
				<div class="logo">
					<router-link to="/">
						<img :src="require(`@/${logoPath}`)" alt="Application Logo">
					</router-link>
				</div>
			</div>

			<div class="right">
				<template v-if="!$logged">
					<a href="/" @click.prevent="$AuthModal.show()">
						Login
					</a>
					<span class="separator"></span>
					<a href="/" @click.prevent="$AuthModal.show({ index: 1 })">
						{{$t('register')}}
					</a>
				</template>
				<template v-else>
					<user-menu/>
				</template>

				<lang-menu/>
			</div>
		</div>
	</header>
</template>

<script>

	import UserMenu from './UserMenu.vue'
	import LangMenu from './LangMenu.vue'

	export default {
		name: "header-main",
		
		components: {
			UserMenu,
			LangMenu
		},

		data() {
			return {
				logoPath: process.env.VUE_APP_LOGO_PATH
					.replace('@/', '')
					.replace(/'"/g, '')
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					register: 'Registre-se',
				},

				'en': {
					register: 'Register',
				},

				'fr': {
					register: 'S\'enregistrer',
				}
			}
		}		
	}
</script>

<style lang="scss" scoped>
	.app-header {
		--header-height: 68px;
		
		width: 100%;
		z-index: 1000;
		position: fixed;
		padding: 0 10px;
		transition: 200ms;
		height: var(--header-height);
		box-shadow: var(--box-shadow-a);
		background-color: #ffffff;
		&:hover {
			opacity: 1;
		}
		&__container {
			color: var(--primary-color);
			display: flex;
			margin: 0 auto;
			height: 100%;
			align-items: space-between;
			.logo, .logo a {
				text-decoration: none;
				display: inline-flex;
				align-items: center;
				height: 80%;
				color: #ffffff;
				font-size: 24px;
				line-height: 100%;
				align-self: center;
				img {
					display: block;
					max-height: 100%;
				}
			}
			.left,
			.right {
				width: 100%;
				display: flex;
				align-items: center;
				@media screen and (max-width: 1000px) {
					font-size: 14px;
				}
			}
			.left {
				width: 70px;
			}
			.right {
				width: 100%;
				text-align: right;
				justify-content: flex-end;
			}
			> div > a {
				color: #444444;
				font-weight: 700;
				text-transform: uppercase;
				text-decoration: none;
				&:hover {
					opacity: .8;
				}
			}
			> div > .separator {
				height: 30px;
				width: 0px;
				border-left: solid 2px var(--primary-color);
				margin: 0px var(--gutter);
			}
		}
	}
</style>