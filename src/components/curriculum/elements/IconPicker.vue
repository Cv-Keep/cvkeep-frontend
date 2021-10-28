<template>
	<div class="icon-picker">

		<div class="head">
			<span class="icon-selected">
				<i :class="selected"></i>
			</span>

			<input type="text" name="filter" :placeholder="$t('searchIcon')" v-model="filter" @input="doFilter" autocomplete="off">
		</div>

		<div class="icons" ref="icons">
			<span class="icon" :title="$t('defaultIcon')" data-fa="fa fa-globe" @click="select">
				<i class="fa fa-globe"></i>
			</span>

			<div
				v-for="(icon, index) in iconList"
				:key="index"
				class="icon"
				:title="icon"
				:data-fa="icon"
				@click="select"
			>
				<i :class="`${icon}`"></i>
			</div>
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
	import IconList from '@/shared/script/data/iconList.js'

	export default {
		name: 'IconPicker',
		
		props: {
			iconset: {
				type: String,
				default: 'all'
			},

			icon: {
				type: String,
				default: 'fa fa-globe'
			}
		},

		data () {
			return {
				filter: '',
				selected: this.icon || 'fa fa-globe',
				iconList: IconList[this.iconset]
			}
		},

		methods: {
			select (e) {
				const icon = (typeof e === 'string' ? e : e.target.dataset.fa);
				this.$refs.icons.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
				
				if (e.target) {
					e.target.classList.add('selected');
				}
				
				this.selected = icon;
				this.$emit('select', icon);
			},

			doFilter () {
				if (this.filter.length >= 3) {
					const filter = this.filter.toLowerCase();
					
					this.$refs.icons.querySelectorAll(`[data-fa]:not([data-fa*="${filter}"])`).forEach(el => {
						el.setAttribute('hidden', true);
					});
				} else {
					this.$refs.icons.querySelectorAll(`[data-fa]`).forEach(el => {
						el.removeAttribute('hidden')
					});
				}
			}
		},

		mounted () {
			Vue.nextTick(() => {
				this.select(this.icon);
			});
		},

		i18n: {
			messages: {
				'pt-br': {
					defaultIcon: 'Ícone padrão',
					searchIcon: 'Procurar um ícone...',
				},

				'en': {
					defaultIcon: 'Default icon',
					searchIcon: 'Search icon...',
				},

				'fr-fr': {
					defaultIcon: 'Icône par défaut',
					searchIcon: 'Icône de recherche...',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.icon-picker {
		border-radius: 4px;
		border: solid 1px #d1d1d1;
		align-items: center;
		text-align: center;
		.head {
			display: grid;
			padding: var(--gutter);
			border-bottom: solid 1px #d1d1d1;
			grid-template-columns: 36px auto;
			grid-gap: var(--gutter);
			position: relative;
			text-align: left;
			input {
				width: 100%;
				margin: 0;
			}
			.icon-selected {
				height: 36px;
				width: 36px;
				z-index: 0;
				border: solid 1px #d1d1d1;
				border-radius: 4px;
				display: flex;
				align-items: center;
				justify-content: center;
				font-size: 24px;
				color: var(--primary-color);
			}
		}
		.icons {
			padding: var(--gutter);
			.icon {
				width: 56px;
				height: 56px;
				color: #444;
				font-size: 30px;
				display: inline-block;
				padding: var(--gutter);
				display: inline-flex;
				align-items: center;
				justify-content: center;
				&:hover {
					background-color: var(--hover-color);
					cursor: pointer;
				}
				&.selected {
					color: var(--primary-color);
					background-color: var(--hover-color);
				}
				* {
					pointer-events: none;
				}
			}
		}
	}
</style>