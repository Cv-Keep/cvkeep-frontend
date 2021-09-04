<template>
	<div class="content settings" style="background-image:url('/img/backgrounds/000.jpg')">
		<div v-if="loading" class="settings__loading">
			<div class="spinner">
				<loading-spinner/>
			</div>
		</div>

		<div v-else class="settings__content">
			<div class="container stats">
				<i class="fa fa-eye"></i>
				{{$t('viewsPrefixPhrase')}}
				<strong>{{cvViews}}</strong>
			</div>

			<div class="container">
				<edit-account :hasPassword="hasPassword"/>
				<edit-privacy/>
				<edit-searchable/>
				<download-cv/>
				<danger-zone :hasPassword="hasPassword"/>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'

	const EditAccount = () => import(/* webpackChunkName: "EditAccount" */ '@/components/settings/Account.vue')
	const EditPrivacy = () => import(/* webpackChunkName: "EditPrivacy" */ '@/components/settings/Privacy.vue')
	const DangerZone = () => import(/* webpackChunkName: "DangerZone" */ '@/components/settings/Deactivate.vue')
	const DownloadCv = () => import(/* webpackChunkName: "DownloadCv" */ '@/components/settings/DownloadCv.vue')
	const EditSearchable = () => import(/* webpackChunkName: "EditSearchable" */ '@/components/settings/Searchable.vue')

	export default {
		name: 'settings',
		
		components:{
			LoadingSpinner,
			EditAccount,
			EditPrivacy,
			EditSearchable,
			DangerZone,
			DownloadCv
		},

		computed: {
			...mapState('credentials', [ 'hasPassword', 'username' ]),

			cvViews() {
				const views = this.$store.state.curriculum.views;
				
				return views < 50 ? `${this.$i18n.t('lessThan')} 50` : views;
			}
		},

		data () {
			return {
				loading: true,
			}
		},

		methods: {
			scrollToAnchor () {
				this.$nextTick(() => {
					if(this.$route.hash) {
						const $el = document.querySelector(this.$route.hash)
						$el && window.scrollTo(0, $el.offsetTop);
					}
				});	
			}
		},

		async created () {
			if (!this.$logged) {
				this.$router.push('/');

				return false;
			}

			if (!this.$store.state.curriculum.username) {
				await this.$API.getCurriculum(this.username)
					.then(cv => this.$store.commit('curriculum/load', cv))
					.catch(this.$toasted.error);
			}

			this.loading = false;
		},

		mounted () {
			this.scrollToAnchor();
		},

		updated () {
      this.scrollToAnchor();
		},

		i18n: {
			messages: {
				'pt-br': {
					lessThan: 'Menos de',
					viewsPrefixPhrase: 'Número de vezes que seu CV foi visualizado: ',
				},

				'en': {
					lessThan: 'Less than',
					viewsPrefixPhrase: 'Number of times your CV has been visualized: ',
				}				
			}
		}
	}
</script>

<style lang="scss">
.settings {
	--header-height: 70px;
	display: flex;
	min-height: 100vh;
	&__content {
		margin: 80px 0;
		padding: var(--gutter);
		width: 100%;
		.container {
			border-radius: 8px;
			overflow: auto;
			background-color: #ffffff;
			overflow: auto;
			padding: calc(var(--gutter) * 2);
			border: solid 1px var(--hover-color);
			&:not(:last-child) {
				margin-bottom: 28px;
			}
			&.stats {
				i {
					width: 40px;
					width: 40px;
					height: 40px;
					height: 40px;
					color: #fff;
					font-size: 18px;
					cursor: pointer;
					border-radius: 100%;
					align-items: center;
					display: inline-flex;
					justify-content: center;
					margin-right: var(--gutter);
					background-color: var(--primary-color);					
				}
			}
		}
	}
	hr {
		border: dashed 2px #f1f1f1;
		margin: 44px 0;
	}
	.title {
		font-size: 28px;
		font-weight: 400;
		display: flex;
		align-items: center;
		margin-bottom: 16px;
		span {
			margin-right: 10px;
		}
	}
	label {
		font-weight: 600;
	}
	@media screen and (max-width: 760px) {
		--gutter: 8px;
		.settings__content {
			margin: 40px 0;
		}
	}
	form {
		.field {
			display: grid;
			max-width: 500px;
		}
		input[type="submit"] {
			min-width: 130px;
		}
		.submit, button.deactivate {
			@media screen and (max-width: 600px) {
				display: block;
				margin: 0 auto;
				text-align: center;
			}
		}
	}	
	&__loading {
		height: 100vh;
		width: 100vw;
		display: flex;
		align-items: center;
		justify-content: center;
		.spinner {
			display: flex;
			align-items: center;
			justify-content: center;
			overflow: hidden;
			background-color: #ffffff;
			width: 60px;
			height: 60px;
			border-radius: 100%;
			svg {
				width: 46px;
			}
		}
	}
}
</style>