<template>
  <div class="home-middle">
    <div class="container">
      <div class="home-middle__head">
        <h2>
          {{ $t('featuredText') }}
        </h2>
      </div>

      <div class="home-middle__features">
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
    name: 'home-middle',

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
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
	.home-middle {
		padding: 90px var(--gutter);
		&__head {
			text-align: center;
		}
		&__features {
			display: flex;
			padding: 32px 0;
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
    @media screen and (max-width: 1023px) {
      padding: 46px var(--gutter);
      .home-middle__features {
        padding-bottom: 0;
        > div {
          min-width: 50%;
          margin-bottom: 32px;
        }
      }
    }
	}
</style>