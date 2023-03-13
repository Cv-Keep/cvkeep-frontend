<template>
	<div ref="langmenu" class="lang-menu" @click.self="showMenu" @mouseenter="showMenu" @mouseleave="hideMenu">
		<div class="flag">
			<img :src="`/img/flags/${credentials.lang}.webp`" alt="application language flag">
		</div>

		<ul class="dropdown" @click="hideMenu">
			<li @click="changeLocale('pt-br')">
				<img src="/img/flags/pt-br.webp" alt="pt-br menu flag">
				<span>{{$t('portuguese')}}</span>
			</li>

			<li @click="changeLocale('en')">
				<img src="/img/flags/en.webp" alt="pt-br menu flag">
				<span>{{$t('english')}}</span>
			</li>

			<li @click="changeLocale('fr')">
				<img src="/img/flags/fr.webp" alt="fr menu flag">
				<span>{{$t('french')}}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import API from '@/shared/script/api/api.js'

	export default {
		name: "lang-menu",

		computed: {
			...mapState([ 'credentials' ]),
		},

		methods: {
			showMenu () {
				this.$refs.langmenu.classList.add('active');
			},

			hideMenu () {
				this.$refs.langmenu.classList.remove('active');
			},

			changeLocale (lang) {
				if (lang != this.credentials.lang) {
					API.changeAppLocale(lang, this.$logged)
						.then(() => {this.$toasted.success(this.$i18n.t('localeChanged'))})
						.catch(this.$toasted.error);
				}
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'portuguese': 'Português',
					'english': 'Inglês',
					'french': 'Francês',
					'localeChanged': 'Idioma atualizado com sucesso'
				},

				'en': {
					'portuguese': 'Portuguese',
					'english': 'English',
					'french': 'French',
					'localeChanged': 'Language successfully changed'
				},

				'fr': {
					'portuguese': 'Portugais',
					'english': 'Anglais',
					'french': 'Français',
					'localeChanged': 'Changement de langue réussi'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.lang-menu {
		--lang-menu-size: 60px;
		@media screen and (max-width: 1000px) {
			--lang-menu-size: 40px;
		}
		z-index: 1001;
		position: relative;
		height: var(--lang-menu-size);
		border-radius: 100%;
		display: flex;
		align-items: center;
		margin-left: var(--gutter);
		justify-content: flex-end;
		cursor: pointer;
		.flag {
			overflow: hidden;
			transition: 0ms;
			display: flex;
			align-items: center;
			justify-content: center;
			height: calc(var(--lang-menu-size) - 8px);
			width: calc(var(--lang-menu-size) - 8px);
			border-radius: 100%;
			background-size: cover;
			background-position: center;
			border: solid 2px var(--color-gray-e);
			img {
				max-width: 54%;
			}
		}		
		ul.dropdown {
			opacity: 0;
			visibility: hidden;
			position: absolute;
			background-color: #ffffff;
			width: 300px;
			right: 0;
			list-style: none;
			border-radius: 8px;
			overflow: hidden;
			top: calc(var(--lang-menu-size) + (var(--gutter) / 2));
			box-shadow: var(--box-shadow-a);
			transition: 200ms;
			color: #444444;
			li {
				margin: 0;
				display: flex;
				font-weight: 600;
				height: 46px;
				align-items: center;
				padding: 0 calc(var(--gutter)/2);
				img {
					width: 20px;
					display: block;
					margin-right: 8px;
				}
				&:hover {
					background-color: var(--hover-color);
				}
			}
		}
		&.active {
			div.user {
				background-color: var(--hover-color);
			}
			ul.dropdown {
				opacity: 1;
				visibility: visible;
				transition: 0ms;
			}
		}
	}
	@media screen and (max-width: 768px) {
		.lang-menu {
			display: none;
		}
	}
</style>