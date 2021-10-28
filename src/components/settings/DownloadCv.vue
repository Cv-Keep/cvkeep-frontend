<template>
  <div class="download-cv" ref="downloadCvRoot">
    <heading-tooltip
      :title="$t('title')"
      :tooltipMessage="$t('downloadCvHelp')"/>

    <ul>
      <li @click="downloadCvFile('pdf')">
        <i class="fa fa-download"></i>
        <span>PDF</span>
      </li>

      <li @click="downloadCvFile('png')">
        <i class="fa fa-download"></i>
        <span>PNG</span>
      </li>

      <li @click="downloadCvJson()">
        <i class="fa fa-download"></i>
        <span>JSON</span>
      </li>
    </ul>

    <hr/>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import HeadingTooltip from '@/components/settings/HeadingTooltip.vue'
  
  export default {
    name: 'download-cv',

    components: {
      HeadingTooltip
    },

    computed: {
			...mapState([ 'curriculum' ]),      
    },

    methods: {
      downloadCvFile (ext) {
        const previousIframe = this.$refs.downloadCvRoot.querySelector('iframe')
        previousIframe && previousIframe.remove();

        const iframe = Object.assign(document.createElement('iframe'), {
          src: `//${window.location.host}/cv/${this.curriculum.username}#download-${ext}`
        });

        this.$refs.downloadCvRoot.append(iframe);
      },

      downloadCvJson () {
        this.$appLoading = true;

        const cv = JSON.parse(JSON.stringify(this.curriculum));

        [
          'views',
          'locked',
          'created',
          'canEdit',
          'editing',
          'sections',
          'searchable',
          'hiddenSections',
          'allowPublicMessages',
          'passwordProtected',
        ].forEach(key => {
          delete cv[key];
        });

        const fileName = `cv-${cv.username || 'user'}.json`;
        const cvJsonStr = JSON.stringify(cv, null, 2);
        const blob = new Blob([ cvJsonStr ], { type: 'application/json' });

        const a = Object.assign(document.createElement('a'), {
          download: fileName,
          href: URL.createObjectURL(blob),
        });

        a.style.display = "none";
        document.body.appendChild(a);

        a.click();
        document.body.removeChild(a);
        
        this.$appLoading = false;
        setTimeout(() => { URL.revokeObjectURL(a.href); }, 1500);
      }
    },

		i18n: {
			messages: {
				'pt-br': {
          title: 'Baixar meu currículo',
          preparingDownload: 'Preparando arquivo...',
          downloadCvHelp: 'Aqui você pode baixar seu currículo como PDF, PNG ou JSON. Sempre que possível evite enviar o seu currículo dessa forma uma vez que você necessitará enviar novas versões toda vez que atualizá-lo.'
				},

				'en': {
          title: 'Download my curriculum',
          preparingDownload: 'Preparing file...',
          downloadCvHelp: 'Here you can download your resume as PDF, PNG or JSON. Whenever possible, avoid sending your resume this way as you will need to send new versions every time you update it.',
				},

        'fr': {
          title: 'Télécharger mon CV',
          preparingDownload: 'Préparation du fichier...',
          downloadCvHelp: 'Vous pouvez télécharger ici votre CV au format PDF, PNG ou JSON. Dans la mesure du possible, évitez d\'envoyer votre CV de cette manière, car vous devrez envoyer de nouvelles versions à chaque fois que vous le mettrez à jour.',
				}
			}
		}    
  }
</script>

<style lang="scss">
  .download-cv {
    @media screen and (max-width: 1023px) {
      display: none;
    }
    ul {
      display: grid;
      list-style: none;
      display: flex;
      margin: 0;
      li {
        margin-bottom: 0;
        color: #444;
        cursor: pointer;
        font-size: 20px;
        display: flex;
        align-items: center;
        border-radius: 25px;
        padding: 4px var(--gutter);
        i {
          font-size: 16px;
          color: var(--primary-color);
          margin-right: 10px;
        }
        &:hover {
          background-color: var(--hover-color);
        }
        &:not(:last-child) {
          margin-right: 8px;
        }
      }
    }
    iframe {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      z-index: -1;
    }
  }
</style>