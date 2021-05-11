<template>
  <div class="support">
    <div class="support__content">
      <div class="support__content__head" v-if="title">
        <p class="title">
          <i class="fa fa-heart"></i>
          <span>{{$t('supportMessages.becomeASupporter')}}</span>
        </p>
      </div>

      <div class="support__content__body" :style="`text-align: ${blocked ? 'left' : 'center'}`">
        <p>
          {{$t('supportMessages.feature.thisIsA')}} <strong>{{$t('supportMessages.feature.freeServiceAndPlatform')}}</strong> 
          {{$t('supportMessages.feature.createdWithHardWork')}}<br/>
          
          {{$t('supportMessages.feature.considerDonate')}}
        </p>
      </div>

      <div class="support__content__items">
        <ul :class="`blocked-${blocked}`">
          <li class="paypal" v-if="paypalDonationUrl">
            <a :href="paypalDonationUrl" target="_blank">
              <img :src="require('@/assets/paypal.svg')" alt="Paypal logo">
              <span>{{$t('supportMessages.donate')}}</span>
            </a>
          </li>

          <li class="pix" v-if="pixKeyStr" @click="toggleModal('pixDonationModal')">
            <img :src="require('@/assets/pix.svg')" alt="Pix logo">
            <span>{{$t('supportMessages.donate')}}</span>
          </li>

          <li class="bitcoin" v-if="bitcoinKeyStr" @click="toggleModal('bitcoinDonationModal')">
            <img :src="require('@/assets/bitcoin.svg')" alt="Bitcoin logo">
            <span>{{$t('supportMessages.donate')}}</span>
          </li>
        </ul>
      </div>
    </div>

    <component
      v-if="pixDonationModal" 
      :active="pixDonationModal" 
      :class="blocked ? 'cover-all-blocked' : ''"
      :is="blocked ? 'div' : 'pix-donation-modal'" 
      @close="toggleModal('pixDonationModal')"
    >
      <span  class="go-back" v-if="blocked" @click="toggleModal('pixDonationModal')">
        <i  class="fa fa-arrow-left"></i>
      </span>

      <pix-key/>
    </component>
    
    <component
      v-if="bitcoinDonationModal" 
      :active="bitcoinDonationModal"
      :class="blocked ? 'cover-all-blocked' : ''"
      :is="blocked ? 'div' : 'bitcoin-donation-modal'"
      @close="toggleModal('bitcoinDonationModal')"
    >
      <span class="go-back" v-if="blocked" @click="toggleModal('bitcoinDonationModal')">
        <i class="fa fa-arrow-left"></i>
      </span>

      <bitcoin-key/>
    </component>
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
    position: relative;
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
    div.cover-all-blocked {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: #fff;
      .go-back {
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: solid 2px #aaa;
        border-radius: 100%;
        color: #aaa;
        cursor: pointer;
        opacity: .7;
        &:hover {
          opacity: 1;
        }
      }
    }
  }
</style>