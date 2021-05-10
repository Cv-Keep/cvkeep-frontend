<template>
  <div class="pix-key">
    <div class="pix-key__body">
      <div class="pix-key__body__content">
        <p><i class="fa fa-heart"></i></p>

        <p class="key-title">
          {{$t('support.heresThePixKey')}}<br/>
          {{$t('support.thanksForYourDonation')}}
        </p>

        <p class="key-text">{{pixKey}}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'pix-key',

  data() {
    return {
      pixKey: process.env.VUE_APP_DONATION_PIX_KEY
    }
  }
}
</script>

<style lang="scss" scoped>
  .pix-key {
    height: 100%;
    width: 100%;
    display: flex;
    padding: 20px;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    &__head {
      width: 100%;
      text-align: center;
      .title {
        font-size: 32px;
        margin-bottom: 0;
      }
    }
    &__body {
      flex: 1;
      height: 100%;
      width: 100%;
      display: flex;
      text-align: center;
      align-items: center;
      justify-content: center;
      &__content {
        .fa-heart {
          font-size: 32px;
          color: var(--secondary-color);
        }
        .key-title {
          font-size: 18px;
        }
        .key-text {
          width: 100%;
          display: block;
          font-size: 18px;
          font-weight: 600;
          padding: var(--gutter) 56px;
          margin-bottom: 100px;
          border: dashed 2px var(--color-gray-medium);
        }
      }
    }
  }
</style>