<template>
	<div class="addbar" v-if="$editing">
		<button class="incrementor">
			<i class="icon fa fa-plus"></i>
			<span>{{ label || $t('add') }}</span>
		</button>
	</div>
</template>

<script>
	export default {
		name: 'AddBar',
		
		props: {
			label: {
				type: String
			},
		},

		i18n: {
			messages: {
				'pt-br': {
					add: 'Adicionar'
				},

				'en': {
					add: 'Add new item'
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.addbar {
		display: block;
		margin: 28px 0;
		max-width: 200px;
		.incrementor {
			display: flex;
			place-items: center;
			border: dashed 2px var(--cv-color);
			border-radius: 25px;
			opacity: .8;
			font-weight: 700;
			color: var(--cv-color);
			.icon {
				margin-right: calc(var(--gutter) / 2);
			}
			&:hover {
				opacity: 1;
			}
			@media screen and (max-width: 425px) {
				max-width: unset;
			}
		}
	}
</style>