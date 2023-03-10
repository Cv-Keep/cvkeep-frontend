<template>
  <div class="container-search">
      <div class="icon-search"><i class="fa fa-search"></i></div>
      <form class="form-srch" action="search">
          <input type="text" :name="name || 'subject'" :placeholder="$t('searchMessages.nameRoleOrLocation')" :value="value" :disabled="disabled">
      </form>
  </div>
</template>

<script>
  export default {
    name: 'search-simple-input',

    props: {
      name: {
        type: String,
        default: ''
      },

      value: {
        type: String,
        default: ''
      },

      disabled: {
        type: Boolean,
        deafult: false
      }
    }
  }
</script>

<style lang="scss" scoped="true">
  .field {
    margin-bottom: 8px;
    label {
      font-size: 24px;
      color: var(--primary-color);
    }
    .search-input-holder {
      position: relative;
      input {
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
        padding: 0;
        width: 90px;
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
  @media screen and (max-width: 768px) {
    .field {
      padding: 0 var(--gutter);
      .search-input-holder {
        input {
          font-size: 18px;
          padding-right: 72px;
        }
        button {
          font-size: 18px;
          width: 56px;
        }
      }
    }
  }
</style>


<style type="text/css">
  .container-search {
    display: flex;
    height: 35px;
    width: 100%;
  }

  .container-search form input {
    background-color: #f0f0f0;
    border-bottom: none;
    border-radius: 0 10px 10px 0;
    font-size: 1.3em;
    color: black;
  }

  .container-search form input::placeholder {
    color: black;
  }

  .icon-search {
    width: 50px;
  }

  .icon-search i {
    background-color: #f0f0f0;
    line-height: 2.5;
    font-size: 1em;
    border-radius: 10px 0px 0px 10px;
    width: 30px;
    color: black;
  }
</style>