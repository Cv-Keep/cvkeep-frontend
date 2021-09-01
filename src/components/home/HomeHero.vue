<template>
  <div class="home-hero">
    <div class="feature-img">
      <img src="@/assets/guy.jpg" alt="a"/>
    </div>

    <div class="container">
      <h1 class="shadow text1">{{String($brandName).toUpperCase()}}</h1>
      <h2><span>{{ $t('cvAsAnOnlineProfile') }}</span></h2>

			<button @click="$logged ? $router.push(`/cv/${$username}`) : $AuthModal.show()">
				<span v-html="$logged ? $t('goToCv') : $t('startNow')"></span>
			</button>
    </div>
  </div>  
</template>

<script>
export default {
	name: 'home-hero',
	
	i18n: {
		messages: {
			'pt-br': {
				goToCv: 'Ir para o meu CV',
				startNow: 'Comece Agora',	
				cvAsAnOnlineProfile: 'Seu currículo como um perfil online',
			},

			'en': {
				goToCv: 'Go to my CV',
				startNow: 'Start now',	
				cvAsAnOnlineProfile: 'Your resumé as an online profile',
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	.home-hero {
		$bg-color: #ffffff;
		$dot-color: #cccccc;
		$dot-size: 2px;
		$dot-space: 14px;
		background-color: #ffffff;
		background:
			linear-gradient(90deg, $bg-color ($dot-space - $dot-size), transparent 1%) center,
			linear-gradient($bg-color ($dot-space - $dot-size), transparent 1%) center, $dot-color;
		background-size: $dot-space $dot-space;

		padding-top: 100px;
		color: var(--primary-color);
		text-align: right;
		padding-top: 130px;
		padding-bottom: 90px;
		position: relative;
		overflow: hidden;

		h1 {
			letter-spacing: 23px;
			margin-bottom: 8px;
			font-size: calc(30px + 5vw);
			font-weight: 700;
			margin-right: -.5ch;
			font-weight: bold;
			text-shadow:
				-3px -3px 0 #fff,
				3px -3px 0 #fff,
				-3px 3px 0 #fff,
				3px 3px 0 #fff,
				4px 4px 0 var(--primary-color),
				5px 5px 0 var(--primary-color),
				6px 6px 0 var(--primary-color),
				7px 7px 0 var(--primary-color) !important;
			strong {
				font-size: 700;
			}
		}
		h2 {
			padding: 2px;
			font-size: 3.2rem;
			border-radius: 4px;
			span {
				padding: 2px;
				background-color: #fff;
				border-radius: 4px;
			}
		}
		button {
			height: 56px;
			width: auto;
			opacity: 1;
			filter: none;
			margin-top: 24px;
			display: inline-block;
			font-size: 18px;
			transition: 100ms;
			border-width: 2px;
			background-color: #ffffff;
			color: var(--secondary-color);
			border-color: var(--secondary-color);
			&:hover {
				filter: none;
				color: #fff;
				background-color: var(--secondary-color);
			}
		}
		.feature-img {
			top: 0;
			left: -200px;
			bottom: 0;
			overflow: hidden;
			position: absolute;
			border: none;
			border-bottom-right-radius: 35%;
			img {
				height: 100%;
				display: block;
			}
		}
		@media screen and (max-width: 1286px) {
			.container {
				width: 100%;
				max-width: unset;
				padding: 0 32px;
			}
		}
		@media screen and (max-width: 936px) {
			.feature-img {
				display: none;
			}
			.container {
				text-align: center;
				padding: var(--gutter);
			}
		}
		@media screen and (max-width: 425px) {
			h1 {
				font-size: 52px;
				letter-spacing: 12px;
			}
		}
	}
</style>