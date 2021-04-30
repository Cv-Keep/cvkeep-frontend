<template>
  <div class="home-hero">
    <div class="feature-img">
      <img src="@/assets/guy.jpg" alt="a"/>
    </div>

    <div class="container">
      <h1>{{String($brandName).toUpperCase()}}</h1>
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
			text-shadow: -2px 1px #ffffff;
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
			transition: 200ms;
			border-width: 2px;
			background-color: #ffffff;
			color: var(--primary-color);
			border-color: var(--primary-color);
			&:hover {
				filter: none;
				box-shadow: var(--box-shadow-a);
			}
		}
		.feature-img {
			top: 0;
			left: -200px;
			overflow: hidden;
			position: absolute;
			border-radius: 100%;
			border: solid 20px #ffffff;
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
	}
</style>