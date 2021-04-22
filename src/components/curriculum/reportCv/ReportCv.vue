<template>
  <cv-lightbox @close="$emit('close')" :title="$t('reportCv')">
    <div v-if="loading" class="loading">
      <loading-spinner/>
    </div>

    <div v-else class="report-cv">
      <form ref="form" @submit.prevent="submit" class="report-cv__form" novalidate autofocus>
        <div class="field">
          <label for="reason" data-required>{{ $t('reason') }}</label>
          
          <select name="reason" required>
            <option v-for="(reason, index) in reportCvReasons" :key="index" :value="$t(`reportCvReasons.${reason}`)">
              {{ $t(`reportCvReasons.${reason}`) }}
            </option>
          </select>
        </div>
                
        <div class="field">
          <label for="reporter" data-required>{{ $t('yourName') }}</label>

          <input type="text" name="reporter" :value="loggedUserName" required>
        </div>

        <div class="field">
          <label for="email" data-required>{{ $t('yourEmail') }}</label>

          <input type="email" name="emailxvalsdjf392u3nHskd1" :value="loggedUserEmail" required>
        </div>

        <div class="field">
          <label for="cvurl" data-required>{{ $t('cvUrl') }}</label>

          <input type="text" name="cvurl" :value="currentCvUrl" required>
        </div>

        <div class="field">
          <label for="description" data-required>{{ $t('description') }}</label>

          <textarea name="description" id="" maxlength="300" :placeholder="$t('describeTheProblem')" required></textarea>
        </div>

        <input type="submit" hidden>
        <input type="email" name="email" hidden>
      </form>
    </div>
    
    <div slot="footer">
      <button class="button-seamless" @click="$emit('close')">{{ $t('cancel') }}</button>
      <button class="button-primary" @click="submit">{{ $t('report') }}</button>
    </div>
  </cv-lightbox>
</template>

<script>
  import utils from '@/shared/script/helpers/utils.js'
  import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
  import CvLightbox from '@/components/lightbox/Lightbox.vue'
  import validateForm from '@/shared/script/helpers/validate-form.js'
  import reportCvReasons from '@/shared/script/data/reportCvReasons.js'

  export default {
    name: 'report-cv',

    components: {
      LoadingSpinner,
      CvLightbox
    },

    computed: {
      loggedUserEmail() {
        return this.$logged ? this.$store.state.credentials.email : '';
      },

      loggedUserName() {
        return this.$logged ? this.$store.state.credentials.fullname : '';
      },      

      currentCvUrl() {
        return utils.isCvUserUrl(window.location.href) ? window.location.href : '';
      }
    },

    data () {
      return {
        loading: false,
        reportCvReasons
      }
    },

    methods: {
      submit () {
        const form = this.$refs.form;
        const givenUrl = this.$el.querySelector('input[name=cvurl]').value

        if (!utils.isCvUserUrl(givenUrl)) {
          this.$toasted.error(this.$i18n.t('invalidUrl'));

          return false;
        }

        if (validateForm(form, { report: true }).valid) {
          this.loading = true;

          this.$API.reportCv(new FormData(form))
            .then(() => {
              form.reset();
              this.$emit('close');

              this.$toasted.success(this.$i18n.t('reportSuccess'));
            })
            .catch(this.$toasted.error)
            .finally(this.loading = false);
        }
      }
    },

    i18n: {
      messages: {
        'pt-br': {
          reason: 'Motivo',
          cvUrl: 'URL do CV',
          cancel: 'Cancelar',
          report: 'Denunciar',
          yourName: 'Seu Nome',
          yourEmail: 'Seu E-Mail',
          description: 'Descrição',
          reportCv: 'Denunciar perfil',
          invalidUrl: 'Por favor, insira uma URL válida',
          reportSuccess: 'Solicitação enviada com sucesso',
          describeTheProblem: 'Por favor, descreva o problema',
          reportCvReasons: {
            ofensiveInformation: 'Este CV contém informações ofensivas',
            pretendeingToBeMe: 'Esta pessoa está se passando por mim',
            pretendingToBeSomeone: 'Esta pessoa está se passando por outra pessoa',
            personDoesntExists: 'Esta pessoa não existe no mundo real',
            itsABotOrSeemsToBe: 'É um Bot, parece ser um, ou está enviando spam',
            absuseOrHateContent: 'Contém conteúdo abusivo ou propagação de ódio',
            badBehaviorImplicit: 'Insinua ou incentiva comportamento criminoso',
            Another: 'Outro (Por favor, adicione na descrição)',
          }
        },

        'en': {
          reason: 'Reason',
          cvUrl: 'CV URL',
          cancel: 'Cancel',
          report: 'Report',
          yourName: 'Your Name',
          yourEmail: 'Your E-Mail',
          description: 'Description',
          reportCv: 'Report CV',
          invalidUrl: 'Please, enter a valid URL',
          reportSuccess: 'Report successfully sent',
          describeTheProblem: 'Please, describe the problem',
          reportCvReasons: {
            ofensiveInformation: 'This CV contains offensive information',
            pretendeingToBeMe: 'This person is impersonating me',
            pretendingToBeSomeone: 'This person is impersonating someone else',
            personDoesntExists: 'This person does not exist in the real world',
            itsABotOrSeemsToBe: 'Is it a Bot, appears to be one, or is sending spam',
            absuseOrHateContent: 'Contains abusive or hateful content',
            badBehaviorImplicit: 'Insinuates or encourages criminal behavior',
            Another: 'Other (Please add in description)',
          }                    
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .loading {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .report-cv {
    padding: var(--gutter);
  }
</style>