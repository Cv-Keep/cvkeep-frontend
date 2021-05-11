<template>
  <div class="privacy-cv-passwords">
    <heading-tooltip
      v-if="showTitle"
      :title="$t('privateCv')"
      :tooltipMessage="$t('privateCvHelp')"/>

    <form enctype="multipart/form-data" action="/" @submit.prevent="save">
      <div class="field">
        <label class="toggle">
          <span>{{ $t('protectCvWithPassword') }}</span>
          <toggle-button
            color="var(--secondary-color)"
            :labels="true"
            v-model="localCvPasswordProtected"
          />
        </label>
      </div>

      <div v-if="localCvPasswordProtected">
        <div class="passwords" ref='passwords'>
          <div class="password-list" v-for="(item, index) in localCvPasswordList" :key="index">
            <div class="field" :ref="`cv-pass-field-${index}`">
              <span class="show-pass" :title="$t('showPass')" @click="togglePassVisibility(index)"><i class="fa fa-eye"></i></span>
              <span class="delete-pass" :title="$t('removePass')" @click="delPass(index)"><i class="fa fa-minus"></i></span>
              
              <input 
                required
                type="password" class="form-control" 
                maxlength="30" 
                v-model="localCvPasswordList[index]"/>

            </div>
          </div>

        </div>

        <span class="add-pass" @click="addPass">
          <i class="fa fa-plus"></i>{{ $t('addNewPassword') }}
        </span>
      </div>

      <div class="submit">
        <input type="submit" class="button" name="Submit" :value="$t('save')">
      </div>
    </form>
  </div>  
</template>

<script>
  import { mapState } from 'vuex'
  import API from '@/shared/script/api/api.js'
  import HeadingTooltip from '@/components/settings/HeadingTooltip.vue'
  import { ToggleButton } from 'vue-js-toggle-button';

  export default {
    name: 'cv-passwords',
    
    props: {
      showTitle: {
        type: Boolean,
        default: true,
      }
    },

		components: {
			ToggleButton,
			HeadingTooltip,
    },
    
    computed: {
      ...mapState('credentials', [ 'privacy' ])
    },
    
    data () {
      return {
        localCvPasswordList: this.$store.state.credentials.privacy.cvPasswordProtected.passwords,
        localCvPasswordProtected: this.$store.state.credentials.privacy.cvPasswordProtected.enabled,
      }
    },

		methods: {
			save () {
        this.privacy.cvPasswordProtected.passwords = this.localCvPasswordList;
        this.privacy.cvPasswordProtected.enabled = this.localCvPasswordProtected;

				API.post({
					endpoint: '/account/changeprivacy',
					data: { privacy: this.privacy },
					success: data => {
						if (data.updated) {
							this.$toasted.success(this.$i18n.t('configurationsUpdated'));
						}
					},
					error: error => {
						this.$toasted.error(error)
					}
				})
			},

			addPass () {
				this.localCvPasswordList.push('')
				setTimeout(() => {
					let inputs = this.$refs.passwords.querySelectorAll('input');
					inputs[inputs.length - 1].focus();
				}, 200);
			},

			delPass (index) {
				this.localCvPasswordList.splice(index, 1)
			},

			togglePassVisibility (index) {
				const $field = this.$refs[`cv-pass-field-${index}`][0];
				const $input = $field.querySelector('input');
				const $icon = $field.querySelector('.show-pass i');

				['fa-eye', 'fa-eye-slash'].forEach(iconClass => {
          const isHiding = $icon.classList.contains(iconClass);

          $icon.classList[isHiding ? 'remove' : 'add'](iconClass);
          $icon.setAttribute('title', this.$i18n.t(isHiding ? 'showPass' : 'hidePass'))
				});

				$input.type = $input.type === 'text' ? 'password' : 'text';
      },
    },

    i18n: {
      messages: {
        'pt-br': {
          save: 'Salvar',
          privateCv: 'Currículo privado',
          showPass: 'Mostrar senha',
          hidePass: 'Ocultar senha',
          removePass: 'Remover senha',
          addNewPassword: 'Adicionar nova senha',
          protectCvWithPassword: 'Proteger meu currículo com senha',
          configurationsUpdated: 'Suas configurações foram atualizadas',
          privateCvHelp: 'Pode ser que você queira restringir o acesso ao seu currículo, para tanto você pode habilitar esta opção e criar diversas senhas de acesso ao seu CV, fazendo com que ele possa ser visualizado apenas por quem possuir uma dessas senhas. Caso esta opção esteja habilitada sem nenhuma senha definida, seu CV estará visível apenas para você. Seu CV não aparecerá em resultados de busca também. Você pode revogar qualquer senha de acesso ou mesmo esta opção quantas vezes quiser a qualquer momento.',
        },

        'en': {
          save: 'Save',
          privateCv: 'Private CV',
          showPass: 'Show password',
          hidePass: 'Hide password',
          removePass: 'Remove password',
          addNewPassword: 'Add new password',
          protectCvWithPassword: 'Protect my CV with passwords',
          configurationsUpdated: 'Your configurations has been updated',
          privateCvHelp: 'You may want to restrict access to your CV, so you can enable this option and create several passwords for accessing your CV, making it visible to only those who have one of these passwords. If this option is enabled without any password defined, your CV will be visible only to you. Your CV won\'t appear in search results also. You can revoke any password or even this option as many times as you want at any time.',
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  form {
    .field {
      display: grid;
      max-width: 500px;
      position: relative;
      p {
        margin: 0;
      }
    }
    label {
      &.toggle {
        display: flex;
        align-items: center;
        font-weight: 500;
        justify-content: space-between;
        margin: 0;
        margin-bottom: var(--gutter);
      }
    }
    .show-pass,
    .delete-pass {
      position: absolute;
      top: 4px;
      right: 8px;
      padding: 0 10px;
      background-color: var(--hover-color);
      height: 30px;
      width: 30px;
      border-radius: 2px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      color: #ffffff;
      background-color: var(--color-error);
      border-top-left-radius: 0;
      border-bottom-left-radius: 0;
      opacity: .7;
      border-radius: 100%;
      &:hover {
        opacity: 1;
      }
    }
    .show-pass {
      right: 38px;
      margin-right: 8px;
      background-color: var(--color-gray-medium);
    }
  }
  .passwords {
    overflow: auto;
    max-height: 400px;
    .password-list {
      padding-bottom: var(--gutter);
      .field {
        margin: 0;
        input {
          margin: 0;
          padding-right: 84px;
        }
      }
    }
  }
  .add-pass {
    display: inline-block;
    cursor: pointer;
    font-weight: 600;
    color: var(--primary-color);
    opacity: .8;
    margin-bottom: 24px;
    i {
      margin-right: 8px;
    }
    &:hover {
      opacity: 1;
    }
  }
</style>