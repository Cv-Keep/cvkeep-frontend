<template>
	<div class="confirmation-steps">
		
		<div class="head">
			<div class="left">
				<p class="primary-color">{{ $t('confirmRegister') }}</p>
			</div>
		
			<div class="right">
				<p>{{ $t('step') }} <span>{{index+1}}</span>/<span>2</span></p>
			</div>
		</div>

		<form id="confirmation-form" action="/" method="post">
			<swiper :options="swiperOptions" ref="sw">
				<step-username @press-enter="slideNext" :reactive="false"/>
				<step-password @press-enter="regdone"/>
			</swiper>

			<div class="controls">
				<button class="button slide-prev">{{ $t('previous') }}</button>
				<button v-show="!isEnd" class="button slide-next">{{ $t('next') }}</button>
				<reg-done-btn v-show="isEnd" ref="regdone"/>
			</div>
		</form>
	</div>
</template>

<script>

	import { swiper } from 'vue-awesome-swiper'
	import RegDoneBtn from './RegDoneBtn.vue'
	import StepUsername from './steps/Username.vue'
	import StepPassword from './steps/Password.vue'

	export default {
		name: "confirmation-steps",
		
		components: {
			swiper,
			StepUsername,
			StepPassword,
			RegDoneBtn
		},

		data () {
			return {
				index: 0,
				isEnd: false,
				swiperOptions: {
					spaceBetween: 14,
					centeredSlides: true,
					keyboard: { enabled: false },
					navigation: {
						nextEl: '.slide-next',
						prevEl: '.slide-prev',
					},
					on: {
						slideChange: this.slideChange,
						slideChangeTransitionEnd: this.slideChanged,
					}
				}
			}
		},

		methods: {
			regdone () {
				this.$refs.regdone.$el.click()
			},

			slideChange () {
				const { slides, activeIndex} = this.$refs.sw.swiper;
				
				this.index = activeIndex;
				this.isEnd = (activeIndex === slides.length - 1);
			},

			slideChanged () {
				const { slides, activeIndex} = this.$refs.sw.swiper;
				const input = slides[activeIndex].querySelector('input');

				if (input) { input.focus() }
			},

			slideNext () {
				const sw = this.$refs.sw;

				if (sw) { sw.swiper.slideNext() }
			},
		},

		i18n: {
			messages: {
				'pt-br': {
					step: 'Passo',
					next: 'Próximo',
					previous: 'Anterior',
					confirmRegister: 'Confirmação de registro',
				},

				'en': {
					step: 'Step',
					next: 'Next',
					previous: 'Previous',
					confirmRegister: 'Confirm Registration',
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.confirmation-steps {
		.head {
			width: 100%;
			display: flex;
			margin: 0 auto;
			max-width: 600px;
			padding: 0 var(--gutter);
			justify-content: space-between;
			p {
				margin: 0;
				font-weight: 700;
			}
		}
		form {
			.controls {
				padding: var(--gutter);
				display: flex;
				align-items: center;
				justify-content: center;
				button {
					margin: 0px calc(var(--gutter)/2);
					&:first-child.swiper-button-disabled {
						opacity: .5;
						pointer-events: none;
					}
					&:not(.button-primary) {
						background-color: rgba(230, 230, 230, .2);
					}
				}
			}
		}
	}
</style>