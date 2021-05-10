<template>
  <div class="support">
    <div class="support__content">
      <div class="support__content__head" v-if="title">
        <p class="title">
          <i class="fa fa-heart"></i>
          <span>{{$t('support.becomeASupporter')}}</span>
        </p>
      </div>

      <div class="support__content__body" :style="`text-align: ${blocked ? 'left' : 'center'}`">
        <p>
          {{$t('support.feature.thisIsA')}} <strong>{{$t('support.feature.freeServiceAndPlatform')}}</strong> 
          {{$t('support.feature.createdWithHardWork')}}<br/>
          
          {{$t('support.feature.considerDonate')}}
        </p>
      </div>

      <div class="support__content__items">
        <ul :class="`blocked-${blocked}`">
          <li class="paypal" v-if="paypalDonationUrl">
            <a :href="paypalDonationUrl" target="_blank">
              <img :src="require('@/assets/paypal.svg')" alt="Paypal logo">
              <span>{{$t('support.donate')}}</span>
            </a>
          </li>

          <li class="pix" v-if="pixKeyStr" @click="toggleModal('pixDonationModal')">
            <img :src="require('@/assets/pix.svg')" alt="Pix logo">
            <span>{{$t('support.donate')}}</span>
          </li>

          <li class="bitcoin" v-if="bitcoinKeyStr" @click="toggleModal('bitcoinDonationModal')">
            <img :src="require('@/assets/bitcoin.svg')" alt="Bitcoin logo">
            <span>{{$t('support.donate')}}</span>
          </li>
        </ul>
      </div>
    </div>

    <pix-donation-modal :active="pixDonationModal" @close="toggleModal('pixDonationModal')">
      <pix-key/>
    </pix-donation-modal>
    
    <bitcoin-donation-modal :active="bitcoinDonationModal" @close="toggleModal('bitcoinDonationModal')">
      <bitcoin-key/>
    </bitcoin-donation-modal>
  </div>
</template>

<script>
import PixKey from '@/components/support/PixKey.vue'
import BitcoinKey from '@/components/support/BitcoinKey.vue'
import PixDonationModal from '@/components/support/PixDonationModal.vue'
import BitcoinDonationModal from '@/components/support/BitcoinDonationModal.vue'

export default {
  name: 'support',

  components: {
    PixKey,
    BitcoinKey,
    PixDonationModal,
    BitcoinDonationModal
  },

  props: {
    blocked: {
      type: Boolean,
      default: false
    },

    title: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      pixDonationModal: false,
      bitcoinDonationModal: false,
      paypalDonationUrl: process.env.VUE_APP_DONATION_PAYPAL_URL,
      pixKeyStr: process.env.VUE_APP_DONATION_PIX_KEY,
      bitcoinKeyStr: process.env.VUE_APP_DONATION_BITCOIN,
    }
  },

  methods: {
    toggleModal(which) {
      this[which] = !this[which];
    }
  }
}
</script>

<style lang="scss" scoped>
  .support {
    @mixin block-content {
      display: block;
      li {
        margin-bottom: 32px;
        padding-bottom: var(--gutter);
        &:not(:last-child) {
          border-bottom: solid 1px var(--color-gray-light);
        }
        span {
          text-align: left;
        }
      }      
    }
    &__content {
      padding: 0 var(--gutter);
      &__head {
        text-align: center;
        .title {
          font-size: 32px;
          font-weight: 600;
          color: var(--secondary-color);
          margin-bottom: var(--gutter);
          i {
            margin-right: 8px;
          }  
        }
      }
      &__body {
        text-align: center;
        margin-bottom: 48px;
      }
      &__items {
        ul {
          display: flex;
          list-style: none;
          align-items: center;
          justify-content: space-around;
          li {
            opacity: .85;
            cursor: pointer;
            a {
              text-decoration: none;
            }
            svg {
              max-height: 80px;
              height: 100%;
            }
            img {
              height: 40px;
              display: block;
            }
            span {
              display: block;
              margin-bottom: 2px;
              text-align: right;
              color: var(--color-gray-medium);
            }
            &.bitcoin {
              img {
                height: 32px;
              }
            }
            &:hover {
              opacity: 1;
            }
          }
          @media screen and (max-width: 766px) {
            @include block-content;
          }
          &.blocked-true {
            @include block-content;
          }
        }
      }
    }
  }
</style>