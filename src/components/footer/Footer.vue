<template>
    <footer>
        <div class="footer__content">
            <div class="container-footer">
                <!-- <div class="logo">
                    <router-link to="/">
                        <img :src="require(`@/${logoPath}`)" alt="Application Logo">
                        <span>{{$brandName}}</span>
                    </router-link>
                </div> -->

                <!-- <ul>
                    <div class="logo">
                        <router-link to="/">
                            <img :src="require(`@/${logoPath}`)" alt="Application Logo">
                            <span>{{$brandName}}</span>
                        </router-link>
                    </div>
                    <p >
                        Abusus enim multitudine hominum, quam tranquillis in rebus diutius rexit, ex agrestibus habitaculis urbes construxit multis opibus firmas et viribus
                    </p>
                </ul> -->

                <!-- <ul>
                    <h5>Office</h5>
                    <li v-if="!$logged">
                        <a href="/" @click.prevent="$AuthModal.show()">
                            {{ $t('login') }}
                        </a>
                    </li>

                    <li v-else>
                        <router-link to="/cv">
                            {{ $t('myCurriculum') }}
                        </router-link>
                    </li>

                    <li>
                        <router-link to="/search">
                            {{ $t('searchMessages.call') }}
                        </router-link>
                    </li>                   

                    <li v-if="!$logged">
                        <a href="/" @click.prevent="$AuthModal.show({index:1})">
                            {{ $t('register') }}
                        </a>
                    </li>

                    <li v-else>
                        <router-link to="/settings">
                            {{ $t('configurations') }}
                        </router-link>
                    </li>

                    <li @click="reportCv = true" class="color-inherit link">
                        {{ $t('reportCv') }}
                    </li>
                </ul> -->

                <lang-menu/>


                <ul>
                    <!-- <h5>Links</h5> -->
                    <li>
                        <router-link to="/contact">
                            {{ $t('contact') }}
                        </router-link>
                    </li>

                    <!-- <li>
                        <a href="https://github.com/Cv-Keep/" target="_blank">It's FOSS &nbsp; <i class="fab fa-github-alt"></i></a>
                    </li>

                    <li class="color-inherit link" @click="becomeSupporter = true">
                        {{ $t('supportMessages.becomeASupporter') }}
                    </li> -->

                    <li>
                        <router-link to="/">
                            {{ $t('termsAndConditions') }}
                        </router-link>
                    </li>
                </ul>

                <ul>
                    <!-- <h5 id="newslatter-title">Newslatter</h5> -->
                    <div class="icons-social">
                        <a href="#">
                            <i class="fab fa-facebook"></i>
                        </a>

                        <a href="#">
                            <i class="fab fa-twitter"></i>
                        </a>

                        <a href="#">
                            <i class="fab fa-linkedin"></i>
                        </a>

                        <a href="#">
                            <i class="fab fa-youtube"></i>
                        </a>
                    </div>
                </ul>
            </div>
        </div>

        
        <div class="foot">
            <p><!--{{$brandName}}--><a id="copy-rigth" href="https://www.mae-solutions.yt" style="color:white">MAE Solutions</a> © All Rights Reserved</p>
        </div>

        <report-cv v-if="reportCv" @close="reportCv = false"/>
        <become-supporter :active="becomeSupporter" @close="becomeSupporter = false"/>
    </footer>
</template>

<script>
    import ReportCv from '@/components/curriculum/reportCv/ReportCv.vue'
    import BecomeSupporter from '@/components/support/BecomeSupporterModal.vue'
    import LangMenu from '../header/LangMenu.vue'

    export default {
        name: 'app-footer',

        components: {
            ReportCv,
            LangMenu,
            BecomeSupporter
        },      

        data () {
            return {
                reportCv: false,
                becomeSupporter: false,
                logoPath: process.env.VUE_APP_LOGO_PATH
                    .replace('@/', '')
                    .replace(/'"/g, '')
            }
        },

        i18n: {
            messages: {
                'pt-br': {
                    login: 'Login',
                    contact: 'Contato',
                    register: 'Registre-se',
                    goHome: 'Ir para a home',
                    reportCv: 'Denunciar CV',
                    myCurriculum: 'Meu Curriculum',
                    configurations: 'Configurações',
                    termsAndConditions: 'Termos e Condições',
                },

                'en': {
                    login: 'Login',
                    contact: 'Contact',
                    register: 'Register',
                    goHome: 'Homepage',
                    reportCv: 'Report CV',
                    myCurriculum: 'My CV',
                    configurations: 'Settings',
                    termsAndConditions: 'Terms and Conditions',
                },

                'fr': {
                    login: 'Se connecter',
                    contact: 'Contact',
                    register: 'S\'enregistrer',
                    goHome: 'Page d\'accueil',
                    reportCv: 'Reporter le CV',
                    myCurriculum: 'Mon CV',
                    configurations: 'Paramètres',
                    termsAndConditions: 'Conditions générales d\'utilisation',
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
    footer {
        border-radius: 80px 0 0 0;
        padding: 46px;
        padding-bottom: 0px;
        background-color: #0d2b64;
        min-height: 200px;
        .footer__content {
            display: flex;
            flex-wrap: wrap;
            min-height: 150px;
            .container {
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                justify-content: space-between;
                .logo {
                    text-align: center;
                    display: block;
                    text-align: center;
                    letter-spacing: 4px;
                    margin-bottom: 16px;
                    a {
                        text-decoration: none;
                        img {
                            display: block;
                            max-width: 90px;
                            margin: 0 auto;
                        }
                        span {
                            color: #ffffff;
                            font-size: 20px;
                            text-transform: uppercase;
                        }
                    }
                }
                ul {
                    // list-style: circle;
                    list-style-type:none;
                    padding: 0 36px;
                    color: #ffffff;     
                    li, a {
                        color: #ffffff;
                        text-decoration: none;
                        &:hover {
                            text-decoration: underline;
                        }
                    }
                }
            }
        }
        .foot {
            color: #ffffff;
            text-align: center;
            padding: 10px;
            border-top: solid 3px #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-top: 32px;
            p {
                margin: 0;
            }
        }   
    }
    @media screen and (max-width: 768px) {
        footer {
            padding: 46px var(--gutter);
            .footer__content {
                .container {
                    .logo {
                        width: 100%;
                        max-width: unset;
                        margin-bottom: 32px;
                        img {
                            margin: 0 auto;
                        }
                    }
                    ul {
                    }
                }

            }
        }
    }           
</style>


<style lang="scss" scoped>
    .container-footer {
        display: flex;
        width: 100%;
        flex-wrap: wrap;
        justify-content: space-between;
        .logo {
            display: block;
            text-align: center;
            letter-spacing: 4px;
            margin-bottom: 16px;
            a {
                text-decoration: none;
                img {
                    display: block;
                    max-width: 50px;
                    margin: 0 auto;
                }
                span {
                    color: #ffffff;
                    font-size: 20px;
                    text-transform: uppercase;
                }
            }
        }
        ul {
            max-width: 400px;
            // list-style: circle;
            list-style-type:none;
            padding: 0 36px;
            color: #ffffff;     
            li, a {
                color: #ffffff;
                text-decoration: none;
                &:hover {
                    text-decoration: underline;
                }
            }
            h5 {
                font-weight: bold;
            }
        }
    }

    .icons-social {
        a {
            margin-right: 20px;
            i {
                font-size: 2em;
            }
        }
    }

    
</style>


<style type="text/css">
    .lang-menu ul.dropdown {
        margin-right: -250px !important;
    }
</style>