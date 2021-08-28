<template>
	<header class="cv-header">
		<cv-avatar/>

		<div class="information">
			<h1 class="editable" v-contenteditable:fullname="$editing" :data-placeholder="$t('yourName')">{{ fullname.trim() }}</h1>
			<h5 class="editable pointer-all" @click="edit(true)" :data-placeholder="$t('yourRole')">{{ role.trim() }}</h5>
			<hr>

			<ul class="editable pointer" @click="edit(true)">
				<li>
					<div><i class="fa fa-home"></i></div>
					<div>{{location.city}} - <span class="region">{{location.region}}</span></div>
				</li>

				<li>
					<div><i class="fa fa-flag"></i></div>
					<div>{{location.country}}</div>
				</li>

				<li v-if="civilState && civilState !== 'doNotInform'">
					<div><i class="fa fa-ring"></i></div>
					<div>{{ $t(`civilStates.${civilState}`) }}</div>
				</li>

				<li v-if="primaryNumber">
					<div><i :class="contactIcon"></i></div>
					<div>{{primaryNumber}}</div>
				</li>
			</ul>

			<cv-header-form title="Informações Básicas" @close="edit(false)" v-if="editModal"/>
		</div>

		<span class="cv-top-right-badge cv-locale-flag-badge" :title="`${$t(this.$logged ? 'cvLangPreferenceLogged' : 'cvLangPreference')} ${$t(cvLang)}`">
			{{cvLang === 'pt-br' ? 'BR' : 'EN'}}
		</span>

		<router-link to="/settings/#privacy" class="cv-top-right-badge privacy-settings-badge" :title="$t('privacyPreferences')" v-if="$logged && $editing">
			<i :class="`fa fa-${locked || lockedOnCredentials ? 'lock' : 'unlock'}`"></i>
		</router-link>
	</header>
</template>

<script>
	import { mapState } from 'vuex'
	import CvAvatar from '../elements/Avatar.vue'
	import i18nMessages from '@/shared/i18n-messages'
	import CvHeaderForm from '@/components/curriculum/forms/CvHeaderForm.vue'

	export default {
		name: "cv-header",
		
		components: {
			CvAvatar,
			CvHeaderForm,
		},

		computed: {
			...mapState('curriculum', {
				cvLang: cv => cv.lang,
				locked: cv => cv.locked,
				role: cv => cv.basics.role,
				location: cv => cv.location,
				civilState: cv => cv.civilState,
				primaryNumber: cv => cv.contact.primaryNumber
			}),

			fullname: {
				get() { return this.$store.state.curriculum.basics.fullname.replace(/\r?\n|\r/g, '').substr(0, 60) },
				
				set(value) { 
					this.$store.state.credentials.fullname = value;
					this.$store.state.curriculum.basics.fullname = value;
				},
			},

			lockedOnCredentials () {
				return this.$store.state.credentials.privacy.cvPasswordProtected.enabled;
			},

			contactIcon () {
				const dict = {
					'phone': 'fa fa-phone',
					'cellphone': 'fa fa-mobile-alt',
					'whatsapp': 'fab fa-whatsapp',
					'telegram': 'fab fa-telegram-plane',
				};

				return dict[this.$store.state.curriculum.contact.primaryNumberKind];
			}
		},

		data () {
			return {
				editModal: false
			}
		},

		methods: {
			edit (state) {
				this.editModal = this.$editing ? state : false;
			},
		},

		i18n: {
			sharedMessages: i18nMessages,
			
			messages: {
				'pt-br': {
					en: 'Inglês',
					'pt-br': 'Português',
					yourName: 'Seu nome',
					yourRole: 'Sua ocupação',
					privacyPreferences: 'Preferencias de Privacidade',
					cvLangPreference: 'O proprietário deste CV preferiu exibi-lo em ',
					cvLangPreferenceLogged: 'Idioma em que este CV será exibido para os visitantes - '
				},

				'en': {
					en: 'English',
					'pt-br': 'Portuguese',
					yourName: 'Your name',
					yourRole: 'Your occupation',
					privacyPreferences: 'Privacy preferences',
					cvLangPreference: 'The owner of this CV preferred to display it in',
					cvLangPreferenceLogged: 'Language in which this CV will be displayed to visitors - ',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.cv-header {
	padding: var(--gutter);
	background-color: var(--cv-color);
	display: grid;
	grid-template-columns: 200px auto;
	grid-gap: calc(var(--gutter) * 2);
	border-top-left-radius: 18px;
	border-top-right-radius: 18px;
	.information {
		> h5 {
			margin-bottom: calc(var(--gutter) / 2);
		}
		> h1 {
			font-size: 3em;
			margin: 0;
		}
		hr {
			margin: var(--gutter) 0;
			border-color: #000000;
		}
	}
	ul {
		margin: 0;
		display: grid;
		list-style: none;
		column-gap: calc(var(--gutter) * 2);
		grid-template-columns: 1fr 1fr;
		li {
			display: grid;
			position: relative;
			grid-template-columns: 20px auto 20px;
			> div, a {
				color: currentColor;
				text-decoration: none;
				margin-left: var(--gutter);
			}
			> div:first-child {
				margin: 0;
				text-align: center;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				i {
					font-size: 18px;
					svg {
						width: 100%;
					}
				}
			}
			ins {
				text-decoration: none;
			}
			.region {
				display: inline;
				text-transform: uppercase;
			}
		}
	}
	.cv-top-right-badge {
		cursor: pointer;
		opacity: .6;
		padding: 4px;
		position: absolute;
		border-radius: 100%;
		top: 14px;
		right: var(--gutter);
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: var(--cv-color);
		background-color: var(--hover-color);
		&:hover {
			opacity: 1;
		}
	}
	.privacy-settings-badge {
		right: 56px;
	}
	.cv-locale-flag-badge {
		cursor: initial;
		font-weight: 600;
		&:hover {
			opacity: .6;
		}
	}
	@media screen and (max-width: 1023px) {
		text-align: center;
		display: block;
		.avatar-root {
			text-align: center;
		}
		ul {
			text-align: left;
		}
	}
	@media screen and (max-width: 768px) {
		ul {
			display: block;
		}
	}
}
</style>