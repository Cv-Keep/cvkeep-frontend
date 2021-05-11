<template>
	<div ref="usermenu" class="user-menu" @click.self="showMenu" @mouseenter="showMenu" @mouseleave="hideMenu">

		<span class="username">{{fullname}}</span>
		<cv-avatar class="user" source="credentials"/>

		<ul class="dropdown" @click="hideMenu">
			<li>
				<a :href='`/cv/${$username}`'>
					<i class="fa fa-file"></i>
					<span>{{ $t('myResume') }}</span>
				</a>
			</li>

			<li>
				<router-link :to='`/settings`'>
					<i class="fa fa-sliders-h"></i>
					<span>{{ $t('settings') }}</span>
				</router-link>
			</li>

			<li>
				<router-link :to='`/search`'>
					<i class="fa fa-search"></i>
					<span>{{ $t('searchMessages.call') }}</span>
				</router-link>
			</li>			
			
			<li @click="signout">
				<i class="fa fa-arrow-right"></i>
				<span>{{ $t('signOut') }}</span>
			</li>
		</ul>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import CvAvatar from '@/components/curriculum/elements/Avatar.vue'

	export default {
		name: "user-menu",

		components: {
			CvAvatar
		},

		computed: {
			...mapState('credentials', [ 'fullname' ]),
		},

		methods: {
			signout () {
				this.$API.signOut().catch(this.$toasted.error);
			},

			showMenu () {
				this.$refs.usermenu.classList.add('active');
			},

			hideMenu () {
				this.$refs.usermenu.classList.remove('active');
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'myResume': 'Meu Curriculum',
					'settings': 'Configurações',
					'signOut': 'Sair'
				},

				'en': {
					'myResume': 'My CV',
					'settings': 'Settings',
					'signOut': 'Sign Out'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.user-menu {
		--user-menu-size: 60px;
		@media screen and (max-width: 1000px) {
			--user-menu-size: 40px;
		}
		z-index: 1001;
		position: relative;
		height: var(--user-menu-size);
		width: var(--user-menu-size);
		border-radius: 100%;
		width: auto;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		cursor: pointer;
		.username {
			display: block;
			margin-right: 8px;
			font-weight: 700;
			text-overflow: ellipsis;
			overflow: hidden;
			width: 300px;
			color: #444444;
			@media screen and (max-width: 425px) {
				width: 114px;
			}
		}
		.user {
			overflow: hidden;
			transition: 0ms;
			display: flex;
			align-items: center;
			justify-content: center;
			background-color: #ffffff;
			height: calc(var(--user-menu-size) - 8px);
			width: calc(var(--user-menu-size) - 8px);
			border-radius: 100%;
			background-size: cover;
			background-position: center;
		}
		ul.dropdown {
			opacity: 0;
			visibility: hidden;
			position: absolute;
			background-color: #ffffff;
			width: 220px;
			right: 0;
			list-style: none;
			border-radius: 8px;
			overflow: hidden;
			top: calc(var(--user-menu-size) + (var(--gutter) / 2));
			box-shadow: var(--box-shadow-a);
			transition: 200ms;
			color: #444444;
			li {
				margin: 0;
				display: flex;
				font-weight: 600;
				align-items: center;
				height: 46px;
				padding: 0 calc(var(--gutter)/2);
				span, i {
					margin-right: calc(var(--gutter) / 2);
				}
				&:hover {
					background-color: var(--hover-color);
				}
				a, span {
					color: #666666;
					text-decoration: none;
					display: flex;
					width: 100%;
					height: 100%;
					align-items: center;
				}
				i {
					width: 20px;
					text-align: center;
					color: var(--primary-color);
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
</style>

<style lang="scss">
	.user-menu .user {
		.avatar {
			pointer-events: none;
			height: var(--user-menu-size);
			width: var(--user-menu-size);
			i {
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				font-size: 20px;
			}
		}
		.avatar-uploader-label,
		.remove-photo {
			display: none;
		}
	}
</style>