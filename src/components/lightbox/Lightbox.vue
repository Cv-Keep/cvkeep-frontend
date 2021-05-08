<template>
	<transition name="lb-transition">
		<div class="cv-lightbox" @click.self="close" @keyup.esc="close" tabindex="0" v-observe-visibility="visibilityChanged">
			<div class="cv-lightbox__content">
				<header v-if="title">
					<h4 v-html="title"></h4>
					<span @click="close"><i class="fa fa-times"></i></span>
				</header>
				
				<div class="lightbox-main">
					<slot/>
				</div>
				
				<footer v-if="hasfooter">
					<slot name="footer"/>
				</footer>
			</div>
		</div>
	</transition>
</template>

<script>
	import Vue from 'vue'
	
	export default {
		name: 'cv-lightbox',
		
		props: {
			title: {
				type: String,
				default: ''
			},
			
			hasfooter: {
				type: Boolean,
				default: true
			}
		},

		methods: {
			close: function () {
				this.$emit('close');
			},

			visibilityChanged (isVisible) {
				this.hideBodyScroll(isVisible);
			},
			
			hideBodyScroll (flag) {
				document.body.style.overflow = flag ? 'hidden' : 'initial';
			}
		},

		mounted () {
			const autofocus = this.$el.querySelector('[autofocus]');
			
			Vue.nextTick(function () {
				autofocus && autofocus.focus();
			});

			this.$el.onEscapeEvent = document.addEventListener('keyup', e => {
				(e.key || e.code) && (e.key.toLowerCase() === 'escape' || e.code.toLowerCase() === 'escape') && this.close();
			});
		},

		destroyed () {
			this.hideBodyScroll(false);
			document.removeEventListener('keyup', this.$el.onEscapeEvent);
		}
	}
</script>

<style lang="scss">
	.cv-lightbox {
		top: 0;
		left: 0;
		bottom: 0;
		width: 100vw;
		height: 100%;
		z-index: 2000;
		outline: none;
		position: fixed;
		display: flex;
		align-items: center;
		justify-content: center;
		padding: var(--gutter);
		background-color: rgba(0,0,0,.7);
		&__content {
			height: 100%;
			width: 100%;
			width: 95vw;
			max-height: 700px;
			max-width: 600px;
			position: relative;
			overflow: hidden;
			border-radius: 8px;
			margin: 0 auto;
			background-color: #ffffff;
			display: flex;
			flex-direction: column;
			@media screen and (min-height: 900px) {
				transform: translateY(-30px);
			}
			header {
				min-height: 60px;
				height: 60px;
				color: #ffffff;
				background-color: var(--primary-color);
				display: grid;
				padding-left: var(--gutter);
				align-items: center;
				grid-template-columns: auto 60px;
				h4 {
					margin: 0;
					text-align: left;
					@media screen and (max-width: 500px) {
						font-size: 20px;
					}
				}
				span {
					display: flex;
					align-items: center;
					justify-content: center;
					height: 100%;
					width: 100%;
					font-size: 20px;
					opacity: .8;
					cursor: pointer;
					&:hover {
						opacity: 1;
					}
				}
			}
			.lightbox-main {
				flex:1;
				text-align: left;
				overflow: auto;
			}
			footer {
				height: auto;
				text-align: right;
				padding: var(--gutter);
				background-color: #ffffff;
				background-color: var(--hover-color);
				border-top: solid 1px var(--color-gray-c);
				@media screen and (max-width: 500px) {
					padding: 8px var(--gutter);
				}
				button, input {
					margin: 0;
					&:not(:last-child) {
						margin-right: var(--gutter);
					}
				}
			}
		}
	}

	.lb-transition-enter-active, 
	.lb-transition-leave-active {
		transition: 100ms ease-in-out;
		transition-property: opacity;
	}

	.lb-transition-enter,
	.lb-transition-leave-active {
		opacity: 0
	}	
</style>