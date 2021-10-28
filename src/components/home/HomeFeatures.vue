<template>
  <div :class="`home-features donation-${!!$showDonation}`">
    <div class="container">
      <div class="home-features__head">
        <h2>
          {{ $t('featuredText') }}
        </h2>
      </div>

      <div class="home-features__items">
        <div>
          <animated-icon icon="rocket"/>
          <span>{{ $t('modern') }}</span>
        </div>

        <div>
          <animated-icon icon="key-password"/>
          <span>{{ $t('secure') }}</span>
        </div>

        <div>
          <animated-icon icon="tea"/>
          <span>{{ $t('simple') }}</span>
        </div>

        <div>
          <animated-icon icon="diamond"/>
          <span>{{ $t('pretty') }}</span>
        </div>
      </div>
    </div>
  </div>  
</template>

<script>
  import AnimatedIcon from '@/components/animated-icon/AnimatedIcon.vue'

  export default {
    name: 'home-features',

    components: {
      AnimatedIcon
    },

    i18n: {
      messages: {
        'pt-br': {
          modern: 'Moderno',
          secure: 'Seguro',
          simple: 'Simples',
          pretty: 'Bonito',
          featuredText: 'Tenha seu CV sempre a mão, completo, atualizado, bonito e acessível de qualquer lugar do mundo.'
        },

        'en': {
          modern: 'Modern',
          secure: 'Secure',
          simple: 'Simple',
          pretty: 'Beautiful',
          featuredText: 'Keep your CV at hand, complete, updated, beautiful and accessible from anywhere in the world.'
        },

        'fr-fr': {
          modern: 'Moderne',
          secure: 'Sécurisé',
          simple: 'Simple',
          pretty: 'Beau',
          featuredText: 'Gardez votre CV à portée de main, complet, mis à jour, beau et accessible de n\'importe où dans le monde.'
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
	.home-features {
    color: #444;
    position: relative;
    background-color: var(--stripe-color);
		&__head {
			text-align: center;
		}
		&__items {
			display: flex;
			padding-top: 32px;
      flex-wrap: wrap;
			justify-content: space-between;
			> div {
				text-align: center;
				img, span {
					margin: 0 auto;
					display: block;
					font-weight: 600;
					margin-bottom: 8px;
				}
			}
		}
    hr {
      margin: 0;
      margin-top: 80px;
      border-color: #333;
      @media screen and (max-width: 768px) {
        margin-top: 56px;
      }
    }
    &.donation-false {
      @media screen and (min-width: 1124px) {
        padding-bottom: 260px !important;
      }
    }
    @media screen and (max-width: 1023px) {
      .home-features__items {
        padding-bottom: 0;
        > div {
          min-width: 50%;
          margin-bottom: 32px;
        }
      }
    }
	}
</style>