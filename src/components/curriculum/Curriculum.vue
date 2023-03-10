<template>
    
    <div :class="`cv-view ${$editing ? 'cv-editing' : 'cv-viewing'}`" :style="dynamicStyle">

        <cv-wrapper>
            <cv-actions/>
            <cv-header/>

            <section-availability/>
            <section-presentation/>
            <section-find-me-at/>
            <section-education/>
            <section-experience/>
            <section-languages/>
            <section-skills/>
            <section-prizes/>
            <section-portfolio/>
            <section-find-me-at/>
            <section-downloaded-cv v-if="application.downloadingCv"/>
        </cv-wrapper>
    </div>
</template>

<script>

    import Vue from 'vue'
    import { mapState } from 'vuex'
    import API from '@/shared/script/api/api.js'
    import CvWrapper from '@/components/curriculum/wrapper/CvWrapper.vue'

    const CvHeader = () => import(/* webpackChunkName: "CvHeader" */ '@/components/curriculum/sections/CvHeader.vue')
    const CvActions = () => import(/* webpackChunkName: "CvActions" */ '@/components/curriculum/actions/CvActions.vue')
    const SectionAvailability = () => import(/* webpackChunkName: "SectionAvailability" */ '@/components/curriculum/sections/Availability.vue')
    const SectionPresentation = () => import(/* webpackChunkName: "SectionPresentation" */ '@/components/curriculum/sections/Presentation.vue')
    const SectionEducation = () => import(/* webpackChunkName: "SectionEducation" */ '@/components/curriculum/sections/Education.vue')
    const SectionLanguages = () => import(/* webpackChunkName: "SectionLanguages" */ '@/components/curriculum/sections/Languages.vue')
    const SectionExperience = () => import(/* webpackChunkName: "SectionExperience" */ '@/components/curriculum/sections/Experience.vue')
    const SectionSkills = () => import(/* webpackChunkName: "SectionSkills" */ '@/components/curriculum/sections/Skills.vue')
    const SectionPrizes = () => import(/* webpackChunkName: "SectionPrizes" */ '@/components/curriculum/sections/Prizes.vue')
    const SectionPortfolio = () => import(/* webpackChunkName: "SectionPortfolio" */ '@/components/curriculum/sections/Portfolio.vue')
    const SectionFindMeAt = () => import(/* webpackChunkName: "SectionFindMeAt" */ '@/components/curriculum/sections/FindMeAt.vue')
    const SectionDownloadedCv = () => import(/* webpackChunkName: "SectionDownloadedCv" */ '@/components/curriculum/sections/DownloadedCv.vue')

    export default {
        name: "cv-main",
        
        components: {
            CvWrapper,
            CvHeader,
            CvActions,
            SectionAvailability,
            SectionPresentation,
            SectionEducation,
            SectionLanguages,
            SectionExperience,
            SectionSkills,
            SectionPrizes,
            SectionPortfolio,
            SectionFindMeAt,
            SectionDownloadedCv,
        },
        data() {
            return {
                home: true
            }
        },
        mounted (){
            console.log("path:", this.$route.query.subject, this, this.$root._router.history._startLocation);
        },
        
        computed: {
            ...mapState([ 'curriculum', 'application' ]),
            dynamicStyle () {
                return {
                    '--cv-color': this.curriculum.color,
                    'background-image': `url(${this.curriculum.background || '/img/backgrounds/000.jpg'})`
                }
            },
            mustShowResults() {
              return this.subject && this.result;
            }
        },

        props: {
            loading: {
              type: Boolean,
              default: true
            },

            subject: {
              type: String,
              default: ''
            },

            result: {
              type: Object,
              default: () => {}
            }
        },

        methods: {
            applyScopedCvLocale ($children) {
                if (this.$isOwnCv) return false;

                const ignore = [ 'CvActions' ];

                $children.forEach(child => {
                    if(ignore.includes(child.$options.name)) {
                        return;
                    }
                    
                    if (!child.$i18n.isGlobalScope) {
                        child.$i18n.locale = this.$store.state.curriculum.lang || API.getDefaultLocale();
                    }

                    if (child.$children) {
                        this.applyScopedCvLocale(child.$children);
                    }
                });
            }
        },

        updated () {
            Vue.nextTick(() => {
                this.applyScopedCvLocale(this.$children);
            });
        },

        watch: {
            '$root._i18n.locale': {
                handler () {
                    Vue.nextTick(() => {
                        this.$forceUpdate();
                    });
                }
            }
        }       
    }
</script>

<style lang="scss">
    .cv-view {
        background-repeat: repeat;
        background-color: var(--cv-color);
    }
    .cv-view.cv-editing {
        .editable {
            &:focus,
            &:hover, 
            &:empty:not([data-placeholder]) {
                outline: dashed 2px rgba(0,0,0,.2);
            }
        }
        .pointer {
            cursor: pointer;
            &-all {
                cursor: pointer;
                &:after, &:before {
                    cursor: pointer;
                }
            }
        }
    }
    .cv-view.viewing {
        .hide-on-view {
            display: none !important;
        }
    }
</style>

<style type="text/css">
    .cv-wrapper__content {
        -webkit-box-shadow: none !important;
        box-shadow: none !important;
        border: none;
        background-color: transparent !important;
    }

    .cv-wrapper__content header {
        border-radius: 18px;
    }

    .cv-wrapper__content section {
        margin-top: 30px;
        margin-bottom: 30px;
        border-radius: 15px;
        background-color: #fff !important;
    }

    .cv-wrapper::before {
        background-color: #f2f2f2 !important;
        background-image: none;
    }
</style>