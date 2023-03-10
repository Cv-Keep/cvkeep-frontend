<template>
  <a v-if="info && $logged" :href="`cv/${info.username}`" class="result-card" rel="noopener noreferrer">
    <div class="result-card__content">
      <div class="result-card__head">
        <div class="result-card__head_child">
          <img :src="getAvatarUrl()" :alt="`${info.basics.fullname}'s profile image`" class="profile-photo">
        </div>
      </div>

      <div class="result-card__body">
        <div class="result-card__body_child">
          <p class="fullname">
            <span>{{info.basics.fullname}}</span>
          </p>

          <p class="role">{{info.basics.role}}</p>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import availabilityBadges from '@/shared/script/data/avaiabilityBadges.js'

export default {
  name: 'result-card',

  computed: {
    info() {
      const hasCv = typeof this.item === 'object' 
        && this.item.cv 
        && Array.isArray(this.item.cv) 
        && this.item.cv.length;

      console.log("result_card", this.item)

      return hasCv ? this.item.cv[0] : null;
    },

    badges() {
      return availabilityBadges.filter(item => this.info.availability[item.key]);
    }
  },

  methods: {
    getAvatarUrl() {
      const apiUrl = process.env.VUE_APP_API_URL;
      const username = this.info.username;
      
      return `${apiUrl}/avatar/getuseravatar/${username}`;
    }
  },

  props: {
    item: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style lang="scss" scoped>
// .search-result {
//   &__items {
//     flex-direction: column;
//   }
// }

.result-card {
  width: 100%;
  // max-width: 288px;
  // margin: var(--gutter);
  margin: 5px;
  text-decoration: none;
  display: inline-block;
  &__content {
    height: 100%;
    overflow: hidden;
    transition: 150ms;
    display: flex;
    // flex-direction: column;    
    box-shadow: var(--box-shadow-a);
    border-radius: var(--border-radius);
  }
  &__head {
    // border-bottom: solid 1px;
    // background-image: url("https://img.freepik.com/vecteurs-libre/theme-fond-ecran-dynamique_52683-44743.jpg");
    // height: 180px;
    position: relative;
    margin-left: 20px;
    .profile-photo {
      width: 100%;
      height: 100%;
      display: block;
      margin: 0 auto;
      background-color: var(--hover-color);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-gray-light);
      font-size: 22px;
      object-fit: cover;
      object-position: center;
    }
    .fast-info {
      position: absolute;
      bottom: 0;
      width: 100%;
      display: flex;
      align-items: center;
      padding: var(--gutter);
      justify-content: space-between;
      .cv-color-hr {
        display: block;
        height: 28px;
        width: 28px;
        border-radius: 100%;
        border: solid 8px #fff;
      }
      .badge {
        display: inline-block;
        i {
          width: 28px;
          height: 28px;
          font-size: 16px;
          border-radius: 100%;
          background-color: #fff;
          display: inline-flex;
          align-items: center;
          padding: 4px;
          justify-content: center;
        }
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }    
  }
  &__body {
    flex: 1;
    padding: var(--gutter);
    .fullname {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      text-align: center;
    }
    .role {
      margin-bottom: 8px;
      color: #444;
      font-weight: 700;
      text-align: center;
      font-size: 1em;
    }
  }
  &__footer {
    color: var(--color-gray-medium);
    padding: var(--gutter);
    padding-top: 0;
    padding-bottom: 26px;
    p {
      margin: 0;
    }
  }
  &:hover {
    .result-card__content {

      transition: 150ms;      
      box-shadow: var(--box-shadow-b);
    }
  }
}
</style>

<style type="text/css">
  .profile-photo{
    border-radius: 2000px;
    width: 50px !important;
    height: 50px !important;
/*    margin-top: 35px !important;*/
  }

  .result-card__content {
    border-radius: 10px !important;
  }

  .result-card__head {
/*    height: 95px !important;*/
/*    margin-bottom: 50px;*/
  }

  .result-card__body, .result-card__head {
    display: flex;
  }

  .result-card__body_child, .result-card__head_child {
    margin: auto !important;
  }

  .fullname span {
    color: black !important;
  }

  .search-result__items {
    flex-direction: column ;
  }

</style>