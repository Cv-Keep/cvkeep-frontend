<template>
	<div class="cv-actions-root-div">
		<div :class="`cv-actions editing-${$editing}`" ref="cvactions">
			<div class="cv-actions__holder">

				<ul class="public" :data-editing="$editing">
					<li v-if="allowPublicMessages" @click="sendEmailLb=true" :title="$t('message')">
						<span class="icon">
							<i class="fa fa-envelope"></i>
						</span>
						<label>{{ $t('message') }}</label>
					</li>
					
					<li @click="share=true" :title="$t('share')">
						<span class="icon">
							<i class="fa fa-share-alt"></i>
						</span>
						<label>{{ $t('share') }}</label>
					</li>
				</ul>

				<ul class="admin" v-if="isAdmin" :data-editing="$editing">
					<li @click="toggleView" :title="$editing ? $t('preview') : $t('edit')">
						<span class="icon" v-if="$editing">
							<i class="fa fa-eye"></i>
						</span>
						<label v-if="$editing">{{ $t('preview') }}</label>

						<span class="icon" v-if="!$editing">
							<i class="fa fa-edit"></i>
						</span>
						<label v-if="!$editing">{{ $t('edit') }}</label>
					</li>

					<li @click="!saving && save()" v-if="$editing" :title="$t('save')">
						<span class="icon">
							<loading-spinner v-if="saving"/>
							<i v-else class="fa fa-save"></i>
						</span>
						<label>{{ $t('save') }}</label>
					</li>				

					<!-- <li @click="bgsetter=true" v-if="$editing" :title="$t('bg')">
						<span class="icon">
							<i class="fa fa-image"></i>
						</span>
						<label>{{ $t('bg') }}</label>
					</li> -->

					<color-swatches
						v-if="$editing"
						v-model="curriculum.color"
						:colors="colors"
						class="cv-actions-color-picker">

						<li slot="trigger" :title="$t('cvColor')">
							<span class="icon">
								<i class="fa fa-palette"></i>
							</span>
							<label>{{ $t('cvColor') }}</label>
						</li>
					</color-swatches>

					<li @click="sectionsLb=true" v-if="$editing" :title="$t('structure')">
						<span class="icon">
							<i class="fa fa-th-list"></i>
						</span>
						<label>{{ $t('structure') }}</label>
					</li>
				</ul>
			</div>
		</div>

		<cv-share :active="share" @close="share=false"/>
		<bg-setter :active="bgsetter" @close="bgsetter=false"/>
		<sections-manager :active="sectionsLb" @close="sectionsLb=false"/>
		<send-email :active="sendEmailLb" @close="sendEmailLb=false"/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import cvColors from '@/shared/script/data/cvColors.js'
	import CvShare from '@/components/curriculum/actions/CvShare.vue'
	import SendEmail from '@/components/curriculum/actions/SendEmail.vue'
	import BgSetter from '@/components/curriculum/actions/BackgroundSetter.vue'
	import SectionsManager from '@/components/curriculum/actions/SectionsManager.vue'
	import ColorSwatches from 'vue-swatches'
	import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
	import "vue-swatches/dist/vue-swatches.min.css"

	export default {
		name: "CvActions",
		
		components: {
			CvShare,
			BgSetter,
			SendEmail,
			LoadingSpinner,
			ColorSwatches,
			SectionsManager
		},
		
		computed: {
			...mapState({
				curriculum: state => state.curriculum,
				application: state => state.application,
				allowPublicMessages: state => state.curriculum.allowPublicMessages
			}),

			isAdmin () {
				return (this.$logged && this.$canEdit) || (this.$route.path.replace(/\//g, '') === 'cv');
			}
		},

		data () {
			return {
				saving: false,
				share: false,
				bgsetter: false,
				sectionsLb: false,
				sendEmailLb: false,
				colors: cvColors,
			}
		},

		methods: {
			async save () {
				if (this.$logged) {
					this.saving = true;

					await this.$API.saveCv({ curriculum: this.curriculum })
						.then(this.saveSuccess)
						.catch(this.raiseError);
					
					this.saving = false;
				} else {
					this.requireLogin();
				}
			},

			saveSuccess() {
				return this.$toasted.success(this.$i18n.t('saveSuccess'));
			},

			raiseError(error) {
				return this.$toasted.error(error);
			},

			requireLogin () {
				return this.$AuthModal.show({
					index: 1,
					signUpText: this.$i18n.t('unsignedShare')
				});
			},

			toggleView () {
				this.curriculum.editing = !this.curriculum.editing;
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					message: 'Mensagem',
					share: 'Compartilhar',
					preview: 'Visualizar',
					edit: 'Editar',
					save: 'Salvar',
					bg: 'Fundo',
					cvColor: 'Colorir',
					structure: 'Estrutura',
					saveSuccess: 'CV salvo com sucesso',
					unsignedShare: 'Você precisa estar logado para salvar e compartilhar seu CV',
				},

				'en': {
					message: 'Message',
					share: 'Share',
					preview: 'Preview',
					edit: 'Edit',
					save: 'Save',
					bg: 'Background',
					cvColor: 'Colors',
					structure: 'Structure',
					saveSuccess: 'CV successfully saved',
					unsignedShare: 'You must be logged in to save and share your CV',
				},

				'fr': {
					message: 'Message',
					share: 'Partager',
					preview: 'Prévisualisation',
					edit: 'Editer',
					save: 'Sauvegarder',
					bg: 'Arrière plan',
					cvColor: 'Couleurs',
					structure: 'Structure',
					saveSuccess: 'CV sauvegardé avec succès',
					unsignedShare: 'Vous devez être connecté pour enregistrer et partager votre CV.',
				}
			}
		}
	}
</script>

<style lang="scss">
	.cv-actions {
		top: 20px;
		--menu-item-height: 50px;
		z-index: 100;
		transition: 200ms;
		position: absolute;
		transform: translateX(calc(-100% + -26px));
		
		@supports (position: sticky) {
			height: 100%;
			.cv-actions__holder {
				position: sticky;
				top: calc(var(--header-height) + 80px);
			}
		}

		@media screen and (max-width: 500px) {
			transition: none;
		}

		.cv-actions__holder {
			ul {
				max-width: 100%;
				list-style: none;
				display: block;
				text-align: left;
				justify-content: space-around;
				width: 100%;
				padding: 0;
				li {
					display: flex;
					align-items: center;
					margin-bottom: var(--gutter);
					background-color: rgba(255,255,255,.85);
					padding-right: 26px;
					border-radius: 36px;
					transition: 100ms;
					cursor: pointer;
					@media screen and (max-width: 500px) {
						transition: none;
					}					
					.icon {
						font-size: 20px;
						font-weight: 100;
						margin-right: calc(var(--gutter) / 2);
						display: inline-block;
						border-radius: 100%;
						background-color: #ffffff;
						width: var(--menu-item-height);
						height: var(--menu-item-height);
						display: flex;
						align-items: center;
						justify-content: center;
						color: #555;
						.fa-envelope {
							color: #2d6da4;
						}
						.fa-share-alt {
							color: #1877f2;
						}
						.fa-eye, .fa-save {
							color: #2d6da4;
						}
						svg {
							width: 24px;
						}
					}
					label {
						cursor: pointer;
						margin: 0;
						color: #444;
					}
					&:hover {
						background-color: rgba(255,255,255,.8);
					}
				}
			}

			ul.admin {
				padding-top: 20px;
				border-top: solid 1px var(--hover-color);
				li:hover {
					.icon {
						i {
							color: var(--primary-color);
						}
					}
				}
			}

			ul:not([data-editing]), 
			ul[data-editing="false"] {
				li {
					padding: 0;
					.icon {
						margin: 0;
					}
					label {
						display: none;
					}
				}
			}

			@media screen and (max-width: 1568px), (max-height: 630px) {
				ul {
					li, li:hover, li:active, li:focus {
						padding: 0;
						background-color: transparent;
						.icon {
							margin: 0;
						}
						label {
							display: none;
						}
					}
				}			
			}
		}

		@media screen and (max-width: 1300px), (max-height: 630px) {
			top: -68px;
			width: 100%;
			border: none;
			height: auto;
			max-width: 100%;
			transform: none;
			overflow-x: auto;
			overflow-y: hidden;
			.cv-actions__holder {
				display: flex;
				justify-content: space-between;
				ul {
					display: flex;
					width: auto;
					padding: 0 !important;
					border: none !important;
					justify-content: flex-start;
					li:not(:first-child) {
						margin-left: 8px;
					}
					&.admin {
						position: fixed;
						bottom: 0;
						margin: 0;
						width: 100%;
						left: 0;
						background-color: #fff;
						display: flex;
						justify-content: center;
						height: var(--menu-item-height);
						border-top: solid 1px var(--color-gray-b) !important;
						li {
							margin-bottom: 0;
						}
					}
				}
			}
		}
		
		&.editing-true {
			@media screen and (max-width: 1300px), (max-height: 530px) {
				position: fixed;
				transform: translateY(0);
				top: unset;
				left: 0;
				bottom: 0;
				height: auto;
				display: flex;
				max-width: 100%;
				overflow-x: auto;
				overflow-y: hidden;
				width: 100%;
				background-color: #ffffff;
				justify-content: center;
				border-top: solid 1px var(--color-gray-b);
				.cv-actions__holder {
					ul {
						margin: 0;
						width: auto;
						display: inline-flex;
						&:first-child {
							padding-left: 0;
						}
						&.admin {
							border: none;
							padding: 0 var(--gutter);
							position: initial;
							border-top: none !important;
							border-left: solid 1px var(--hover-color);
						}
						li {
							margin: 0;
							margin-right: var(--gutter);
							min-width: unset;
						}
						&.admin > *:last-child {
							margin-right: 0;
						}
						& + ul {
							padding-left: var(--gutter);
						}
					}
				}
			}

			@media screen and (max-width: 520px) {
				justify-content: space-between;
			}
		}

		&.editing-false {
			@media screen and (max-width: 1300px), (max-height: 530px) {
				position: fixed;
				transform: translateY(0);
				top: unset;
				left: 0;
				bottom: 0;
				height: auto;
				display: flex;
				max-width: 100%;
				overflow-x: auto;
				overflow-y: hidden;
				width: 100%;
				background-color: #ffffff;
				justify-content: center;
				border-top: solid 1px var(--color-gray-b);
				.cv-actions__holder {
					width: 100%;
					ul {
						width: 100%;
						margin: 0;
						width: auto;
						display: inline-flex;
						&:first-child {
							padding-left: 0;
						}
						&.admin {
							border: none;
							padding: 0 var(--gutter);
							position: initial;
							border-top: none !important;
							border-left: solid 1px var(--hover-color);
						}
						li {
							width: 100%;
							margin: 0;
							margin-right: var(--gutter);
							min-width: unset;
							span {
								width: 100%;
							}
						}
						&.admin > *:last-child {
							margin-right: 0;
						}
						&.public{
							width: 100%;
						}
						& + ul {
							padding-left: var(--gutter);
							width: 50%;
						}
					}
				}
			}

			@media screen and (max-width: 520px) {
				justify-content: space-between;
			}
		}
	}
	.cv-actions-color-picker {
		.vue-swatches__container {
			.vue-swatches__wrapper {
				padding: 0px !important;
				text-align: center;
				.vue-swatches__swatch {
					margin: 4px !important;
				}
			}
		}
		@media screen and (max-width: 1260px), (max-height: 630px) {
			position: initial;
			.vue-swatches__container {
				position: fixed;
				left: 0;
				top: 0;
				display: inline-flex;
				height: 100%;
				align-items: center;
				border-radius: 0;
				box-shadow: var(--box-shadow-a);
				overflow: hidden;
				margin: 0 !important;
				padding: 0 !important;
				width: auto !important;
				.vue-swatches__wrapper {
					min-width: 100vw;
					overflow: hidden;
					display: flex;
					align-items: center;
					width: auto !important;
					padding: 0 !important;
					margin: 0 !important;
					height: 100% !important;
					.vue-swatches__swatch {
						display: inline-block;
						min-width: 60px;
						min-height: 100%;
						padding: 0 !important;
						margin: 0 !important;
						border-radius: 0 !important;
						flex: 1;
					}
				}
			}
		}
	}
</style>