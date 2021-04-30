<template>
  <div class="field">
    <label for="subject">
      <i class="fa fa-search"></i>
      {{ $t('findACv') }}
    </label>

    <div class="search-input-holder">
      <input type="text" name="subject" :placeholder="$t('nameRoleOrLocation')" :value="value">
      
      <button type="submit">
        <i class="fa fa-arrow-right"></i>
      </button>
    </div>
  </div>  
</template>

<script>
  export default {
    name: 'search-simple-input',

    props: {
      value: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped="true">
  .field {
    margin-bottom: 8px;
    label {
      font-size: 24px;
      padding-left: 14px;
      color: var(--primary-color);
    }
    .search-input-holder {
      position: relative;
      input[name="subject"] {
        height: auto;
        margin: 0;
        font-size: 32px;
        border-radius: 36px;
        padding: var(--gutter) 36px;
        padding-right: 100px;
        background-color: #fff;
        border: solid 2px var(--color-gray-light);
      }
      button {
        right: 0;
        top: 50%;
        height: 100%;
        position: absolute;
        border-radius: 36px;
        transform: translateY(-50%);
        border: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        border: solid 2px var(--color-gray-light);
        font-size: 20px;
      }
    }
  }
</style>