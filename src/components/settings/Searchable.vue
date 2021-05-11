<template>
	<div id="searchable" class="settings-searchable">
		<div class="searchable__content">

			<div class="searchable-messages">
				<heading-tooltip
					:title="$t('title')"
					:tooltipMessage="$t('messagesHelp')"/>

				<form 
					enctype="multipart/form-data" 
					action="/" 
					@submit.prevent="save"
				>
					<div class="field">
						<label class="toggle">
							<span>
								{{$t('allowSearching')}}
								<a href="/search" target="_blank" rel="noreferrer noopener">{{$t('search')}}</a>
							</span>

							<toggle-button
								:labels="true"
								color="var(--secondary-color)"
								v-model="localSearchable"
								:disabled="cvPasswordProtected"
							/>
						</label>
					</div>

					<div class="submit">
						<input type="submit" :disabled="cvPasswordProtected" class="button" name="Submit" :value="$t('save')">
					</div>				
				</form>
			</div>

			<hr>
		</div>
	</div>
</template>

<script>
	import API from '@/shared/script/api/api.js'
	import HeadingTooltip from '@/components/settings/HeadingTooltip.vue'
	import { ToggleButton } from 'vue-js-toggle-button';

	export default {
		name: 'edit-searchable',

		components: {
			ToggleButton,
			HeadingTooltip,
		},

		computed: {
			cvPasswordProtected() {
				return this.$store.state.credentials.privacy.cvPasswordProtected.enabled;
			}
		},

		data() {
			return {
				localSearchable: this.$store.state.curriculum.searchable
			}
		},
		
		methods: {
			save () {
				API.post({
					endpoint: '/search/searchable',
					data: { searchable: this.localSearchable },
					success: data => {
						if (data.updated) {
							this.$toasted.success(this.$i18n.t('changeSuccess'));
							this.$store.state.curriculum.searchable = this.localSearchable;
						}
					},
					error: error => {
						this.$toasted.error(error);
					}
				})
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					save: 'Salvar',
					title: 'Busca',
					search: 'busca',
					changeSuccess: 'Suas configurações foram atualizadas',
					allowSearching: 'Permitir que as pessoas encontrem meu CV via',
					messagesHelp: 'Ao marcar esta opção você permite que seu CV seja exibido em resultados de busca desse site. (Caso seu CV possua senha, esta opção será automáticamente desabilitada).',
				},

				'en': {
					save: 'Save',
					title: 'Search',
					search: 'searching',
					changeSuccess: 'Your configurations has been updated',
					allowSearching: 'Allow people to find my CV by	',
					messagesHelp: 'By checking this option you allow your CV to be displayed in search results on this site. (If your CV has a password, this option will be automatically disabled).',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.settings-searchable {
		form {
			.field {
				display: grid;
				max-width: 500px;
				position: relative;
				p {
					margin: 0;
				}
			}
			label {
				&.toggle {
					display: flex;
					align-items: center;
					font-weight: 500;
					justify-content: space-between;
					margin: 0;
					margin-bottom: var(--gutter);
				}
			}			
		}
	}
</style>