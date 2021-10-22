<template>
  <a v-if="info" :href="`cv/${info.username}`" class="result-card" rel="noopener noreferrer">
    <div class="result-card__content">
      <div class="result-card__head">
        <img :src="getAvatarUrl()" :alt="`${info.basics.fullname}'s profile image`" class="profile-photo">

        <div class="fast-info">
          <div class="fast-info__left">
            <div class="cv-color-hr" :style="`background-color: ${info.color}`"></div>
          </div>

          <div class="fast-info__right">
            <span class="badge" v-for="badge in badges" :key="badge.key">
              <i :class="`fa ${badge.icon}`"></i>
            </span>
          </div>
        </div>
      </div>

      <div class="result-card__body">
        <p class="fullname">
          <span>{{info.basics.fullname}}</span>
        </p>

        <p class="role">{{info.basics.role}}</p>
      </div>

      <div class="result-card__footer">
        <p>{{info.location.city}} - {{info.location.region}}</p>
        <p>{{info.location.country}}</p>
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
.result-card {
  width: 100%;
  max-width: 288px;
  margin: var(--gutter);
  text-decoration: none;
  display: inline-block;
  &__content {
    height: 100%;
    overflow: hidden;
    transition: 150ms;
    display: flex;
    flex-direction: column;    
    box-shadow: var(--box-shadow-a);
    border-radius: var(--border-radius);
  }
  &__head {
    height: 180px;
    position: relative;
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
      font-size: 22px;
      font-weight: 700;
    }
    .role {
      margin-bottom: 8px;
      color: #444;
      font-weight: 700;
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