<template>
  <div class="experience-roles">
    <h4 class="title">{{ $t('roles') }}</h4>

    <is-draggable tag="div" class="roles-content" :list="roles">
      <div class="role" v-for="(role, index) in roles" :key="index">
        <div>
          <div class="field">
            <label for="role" data-required>{{ $t('role') }}</label>
            <input type="text" :name="`roles[${index}][role]`" v-model="role.role" required>
          </div>
        </div>

        <div class="half">

          <div class="field">
            <label for="start_date" data-required>{{ $t('start') }}</label>

            <input type="text" :name="`roles[${index}][start_date]`" v-model="role.start_date" v-mask="$t('dateMask')" required>
          </div>

          <div class="field">
            <label for="end_date" data-required>{{ $t('end') }}</label>

            <input type="text" :name="`roles[${index}][end_date]`" v-model="role.end_date" v-mask="$t('dateMask')" required>
          </div>
        </div>

        <span aria-role="button" class="remove" @click="delRole(index)">
          <i class="fa fa-times"></i>
        </span>
      </div>
    </is-draggable>

    <div class="roles-footer">
      <button @click.prevent="newRole">{{ $t('addRole') }}</button>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue'
  import { mapState } from 'vuex'
  import IsDraggable from '@/components/curriculum/elements/IsDraggable.vue'

  export default {
    name: 'cv-experience-roles',

    components: {
      IsDraggable
    },

    props: {
      index: {
        type: Number
      }
    },

    computed: {
      ...mapState([ 'curriculum' ]),
    },

    data () {
      return {
        roles: []
      }
    },

    methods: {
      newRole () {
        this.roles.push({});

        Vue.nextTick(() => {
          this.$el.querySelector('.role:last-child').querySelector('input').focus();
          this.$parent.$el.querySelector('.lightbox-main').scrollTo(0, this.$el.scrollHeight);
        });
      },

      delRole (index) {
        this.roles.splice(index, 1)
      }
    },

    mounted () {
      const item = this.index >= 0 ? this.curriculum.experience.items[this.index] : undefined;

      if (item && item.roles) {
        this.roles = item.roles;
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          roles: 'Outros cargos',
          role: 'Cargo',
          yes: 'Sim',
          no: 'Não',
          start: 'De',
          end: 'Até',
          addRole: 'Adicionar Cargo'
        },

        'en': {
          roles: 'Another roles',
          role: 'Role',
          yes: 'Yes',
          no: 'No',
          start: 'From',
          end: 'Till',
          addRole: 'Add Role'
        },

        'fr': {
          roles: 'Un autre rôle',
          role: 'Rôle',
          yes: 'Oui',
          no: 'Non',
          start: 'De',
          end: 'Jusqu\'à',
          addRole: 'Ajouter un rôle',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .experience-roles {
    .title {
      border-bottom: 36px;
      border-bottom: 36px;
      display: inline-block;
      background-color: var(--hover-color);
      padding: 2px 14px;
      border-radius: 25px;      
    }
    .roles-content {
      .role {
        position: relative;
        padding: 32px var(--gutter);
        transition: 200ms;
        border: solid 1px var(--color-gray-d);
        border-left: solid var(--color-gray-c) 4px;
        border-top-right-radius: 8px;
        border-bottom-right-radius: 8px;
        &:hover {
          border-left-color: var(--color-gray-a);
        }
        &:focus-within {
          border-left-color: var(--secondary-color);
        }
        &:not(:last-child) {
          margin-bottom: var(--gutter);
        }
        &:last-child {
          margin-bottom: 32px;
        }
        input, select {
          width: 100%;
        }
        .half {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: var(--gutter);
          > div, > div input {
            margin: 0;
          }
        }
        .remove {
          position: absolute;
          right: var(--gutter);
          top: var(--gutter);
          opacity: .7;
          border: solid 2px var(--color-gray-a);
          cursor: pointer;
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-gray-a);
          border-radius: 100%;
          &:hover {
            opacity: 1;
          }
        }
      }
    }
  }
</style>