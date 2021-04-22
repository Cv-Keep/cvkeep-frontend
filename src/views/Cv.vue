<template>
	<div class="main">
		<component :is="renderComponent" v-if="!loading" @unlock="renderCv" @error="showError" :key="renderKey"/>

		<div class="loading" v-if="loading && !error">
			<loading-spinner v-if="!error"/>
		</div>
	</div>
</template>

<script>

	import Vue from 'vue'
	import { mapState } from 'vuex'
	import NotFound from '@/components/NotFound/NotFound.vue'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
	import HtmlDownload from '@/shared/script/helpers/html-download.js'
	
	const TheCurriculum = () => import(/* webpackChunkName: "TheCurriculum" */ '@/components/curriculum/Curriculum.vue')
	const LockedCurriculum = () => import(/* webpackChunkName: "LockedCurriculum" */ '@/components/curriculum/lockedCv/lockedCv.vue')

	Vue.mixin({
		computed: {
			...mapState({
				$canEdit: state => state.curriculum.canEdit || false,
				$editing: state => state.curriculum.editing || false
			})
		}
	});

	export default {
		name: 'cv',
		
		components: {
			LoadingSpinner,
			TheCurriculum,
			LockedCurriculum
		},
		
		data () {
			return {
				error: false,
				renderKey: 0,
				loading: true,
				renderComponent: null
			}
		},
		
		computed: {
			...mapState([
				'curriculum',
				'application'
			]),
			
			cvUrlUsername () {
				return this.$route.params.user;
			}
		},
		
		methods: {
			cvFetchAndRender (username) {
				if (!this.$logged && this.cvUrlUsername) {
					const tag = document.querySelector(`script#cv-data`);
					const data = tag ? JSON.parse(tag.innerText) : false;
					tag && tag.remove();

					if (data) return this.renderCv(data);
				}

				return this.$API.getCurriculum(username)
					.then(this.renderCv)
					.catch(this.showError)
			},			

			renderCv (cv) {
				this.$store.commit('curriculum/load', cv);
				this.renderComponent = cv.locked ? 'locked-curriculum' : 'the-curriculum';
				this.loading = false;

				window.location.hash.includes('download') && this.downloadCv();
			},
			

			showError (error) {
				if (error == 404) {
					this.renderComponent = NotFound;
					this.loading = false;
				} else {
					const errorMessage =  `${ this.$i18n.t('loadCvUnexpectedError') }: ${window.location.href} | ${ this.$i18n.t('error') }: ${error || this.$i18n.t('unknown')}`;
					this.$router.push({path: `/error?m=${errorMessage}` });
				}
			},

			downloadCv () {
				const ext = window.location.hash.split('-')[1];
				const fullnameSlug = this.curriculum.basics.fullname.toLowerCase().replace(/ /g, '-');
				const fileName =  `${fullnameSlug || 'your'}-cv`;

        const cvOriginalEditingState = this.curriculum.editing;
				this.$appLoading = this.$i18n.t('preparingDownload');
        this.application.downloadingCv = true;
        
        const clearState = () => {
          this.$appLoading = false;
          this.application.downloadingCv = false;
          this.curriculum.editing = cvOriginalEditingState;
        }
				
				setTimeout(() => {
					Vue.nextTick(() => {
						this.curriculum.editing = false;

						setTimeout(async () => {
              switch(ext.toLowerCase()) {
                case 'png':
                  await HtmlDownload.downloadPng('.cv-wrapper__content', fileName);
                break;
                
                case 'pdf':
                  await HtmlDownload.downloadPdf('.cv-wrapper__content', fileName);
                break;
							}
							
							clearState();
						}, 1000);
					});
				}, 300);
			}			
		},

		mounted () {
			if (!this.cvUrlUsername && this.$logged) {
				this.$router.push({ name: 'cv', params: { user: this.$username } });
			}

			this.cvUrlUsername && this.cvFetchAndRender(this.cvUrlUsername)
		},

		i18n: {
			messages: {
				'pt-br': {
					'error': 'Erro',
					'atention': 'Atenção',
					'unknown': 'Desconhecido',
					'demoModeMessage': 'Você está em Modo de Demonstração',
					'loadCvUnexpectedError': 'Um erro ocorreu ao carregar o CV'
				},

				'en': {
					'error': 'Error',
					'atention': 'Atention',
					'unknown': 'Unknown',
					'demoModeMessage': 'You are on demonstration mode',
					'loadCvUnexpectedError': 'An error has occurred while loading CV'
				}
			}
		}		
	}
</script>

<style lang="scss" scoped>
	.main {
		min-height: 100vh;
		.loading {
			top: 50%;
			left: 50%;
			position: absolute;
			text-align: center;
			transform: translate(-50%);
		}
	}
</style>