<template>
	<section class="availability">
		<div class="availability__content">
			<div v-for="(badge, index) in badges" :key="index" @click="toggleItem(badge.key)" v-show="shouldShow(badge)">
				
				<label :class="`badge active-${isActive(badge.key)} editing-${$editing}`" :hidden="!$editing && !isActive(badge.key)">
					<span class="icon">
						<i :class="`fa ${badge.icon}`"></i>
					</span>

					<span class="descr">
						{{ $t(badge.key) }}
					</span>
				</label>

			</div>
		</div>
	</section>
</template>

<script>
	import { mapState } from 'vuex'
	import availabilityBadges from '@/shared/script/data/avaiabilityBadges.js'

	export default {
		name: 'cv-availability',
		
		computed: {
			...mapState('curriculum', [ 'availability' ]),
		},

		methods: {
			toggleItem (key) {
				if (this.$editing) {
					const state = !this.availability[key];
					this.availability[key] = state;
				}
			},

			isActive (key) {
				return this.availability[key]
			},

			shouldShow (badge) {
				return this.$editing || (!this.$editing && this.isActive(badge.key))
			}
		},

		data () {
			return {
				badges: availabilityBadges
			}
		},

		i18n: {
			messages: {
				'pt-br': {
					'lookingForWork': 'Procurando Recolocaçao',
					'freelance': 'Aceita Freelancing',
					'onlyRemote': 'Apenas Remoto',
					'disability': 'PCD',
				},

				'en': {
					'lookingForWork': 'Looking for work',
					'freelance': 'Accepts freelancing',
					'onlyRemote': 'Only remote',
					'disability': 'PWD',					
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.availability {
		padding: 0;
		&__content {
			display: grid;
			display: grid;
			grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
			grid-column-gap: 6px;
			grid-row-gap:6px;
			padding: var(--gutter);
			> div {
				&.display-false {
					display: none;
				}
				label.badge {
					cursor: text;
					font-size: 14px;
					padding: 8px;
					white-space: nowrap;
					border-radius: 2px;
					margin: 0;
					padding-right: var(--gutter);
					padding-left: 4px;
					text-align: center;
					color: #ffffff;
					background-color: var(--color-gray-a);
					border-radius: 25px;
					opacity: .8;
					height: 35px;
					display: flex;
					align-items: center;
					font-size: 14px;
					&:hover {
						opacity: 1;
					}
					&.editing-true {
						cursor: pointer;
					}
					&.active-true {
						opacity: 1;
						background-color: var(--cv-color);
					}
					.icon {
						height: 25px;
						width: 25px;
						display: block;
						margin-right: calc(var(--gutter)/2);
						background-color: #ffffff;
						border-radius: 100%;
						color: var(--cv-color);
						display: flex;
						align-items: center;
						justify-content: center;
					}
				}
			}
		}
	}
</style>