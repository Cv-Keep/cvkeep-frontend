<template>
	<cv-lightbox :title="title" @close="cancel">
		<form ref="form" @submit.prevent="submit" @keyup.esc="cancel" class="cv-form" data-cv-form novalidate>
			<slot/>

			<input type="submit" hidden>
		</form>

		<div slot="footer">
			<button class="button-seamless" @click="cancel">{{ $t('cancel') }}</button>
			<button class="button-primary" @click="submit">OK</button>
		</div>
	</cv-lightbox>
</template>

<script>
	import { mapState } from 'vuex'
	import utils from '@/shared/script/helpers/utils.js'
	import CvLightbox from '@/components/lightbox/Lightbox.vue'
	import validateForm from '@/shared/script/helpers/validate-form.js'
	
	export default {
		name: 'cv-form',

		components: {
			CvLightbox
		},

		props: {
			title: {
				type: String,
				default: ''
			},

			validate: {
				type: Boolean,
				default: true
			}
		},

		computed: {
			...mapState([ 'curriculum' ])
		},

    data () {
      return {
        beforeEdit: {}
      }
    },

    methods: {
			cancel () {
				this.$store.commit('curriculum/load', this.beforeEdit);

				this.close();
				this.$emit('close');
			},

			submit () {
				const form = this.$refs.form;
				const formValidity = validateForm(form, { report: true });

				if (this.validate && formValidity.valid) {
					this.$emit('submit', form);
	
					this.close();
				}				
			},
			
			close () {
				this.$emit('close');
			}
    },

    mounted () {
			this.beforeEdit = utils.nonReactive(this.curriculum);
		},
		
		i18n: {
			messages: {
				'pt-br': {
					cancel: 'Cancelar'
				},

				'en': {
					cancel: 'Cancel'
				},

				'fr-fr': {
					cancel: 'Annuler'
				}
			}
		}		
	}
</script>

<style lang="scss">
	[data-cv-form] {
		margin: 0;
		padding: 36px var(--gutter);
		> .field {
			display: grid;
			&:last-of-type {
				margin-bottom: 0;
				input, textarea, select {
					margin-bottom: 0;
				}
			}
			hr {
				margin: var(--gutter) 0;
				border: solid 1px var(--hover-color);
			}
		}
		input:not([type=radio]):not([type=checkbox]) {
			width: 100%;
		}
		.input-row {
			display: flex;
		}
	}
</style>