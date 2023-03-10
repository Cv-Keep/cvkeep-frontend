<template>
    <header class="app-header" ref="appheader">
        <div class="app-header__container container">
            <div class="left">
                <div class="logo">
                    <router-link to="/">
                        <img :src="require(`@/${logoPath}`)" alt="Application Logo">
                    </router-link>
                </div>
            </div>

            <div class="right" v-if="!$loadedCredentials">
                <LoadingSpinner/>
            </div>

            <div class="right" v-else>
                <!-- Search input HEAD -->
                <template v-if="$logged && !home">
                        <search-simple-input-head/>
                </template>
                
                <template v-if="!$logged">
                    <a href="/" @click.prevent="$AuthModal.show()">
                        Login
                    </a>
                    <span class="separator"></span>
                    <a href="/" @click.prevent="$AuthModal.show({ index: 1 })">
                        {{$t('register')}}
                    </a>
                </template>
                <template v-else>
                    <user-menu/>
                </template>

                <lang-menu/>
            </div>
        </div>
    </header>
</template>

<script>
    import UserMenu from './UserMenu.vue'
    import LangMenu from './LangMenu.vue'
    import LoadingSpinner from '@/components/loading/LoadingSpinner.vue'
    import SearchSimpleInputHead from '@/components/search/SearchSimpleInputHead.vue'

    export default {
        name: "header-main",
        
        components: {
            UserMenu,
            LangMenu,
            SearchSimpleInputHead,
            LoadingSpinner
        },

        data() {
            return {
                logoPath: process.env.VUE_APP_LOGO_PATH
                    .replace('@/', '')
                    .replace(/'"/g, ''),
                home:true,
            }
        },
        mounted(){
            if (this.$root._router.history._startLocation != "/") {
                this.home=false;
            }
        },
        watch:{
            $route (to){
                if( to.path == "/" ){
                    this.home=true;
                }
                else{
                    this.home=false;
                }
            }
        },
        i18n: {
            messages: {
                'pt-br': {
                    register: 'Registre-se',
                },

                'en': {
                    register: 'Register',
                },

                'fr': {
                    register: 'S\'enregistrer',
                }
            }
        }       
    }
</script>

<style lang="scss" scoped>
    .app-header {
        --header-height: 68px;
        
        width: 100%;
        z-index: 1000;
        position: fixed;
        padding: 0 10px;
        transition: 200ms;
        height: var(--header-height);
        box-shadow: var(--box-shadow-a);
        background-color: #ffffff;
        &:hover {
            opacity: 1;
        }
        &__container {
            color: var(--primary-color);
            display: flex;
            margin: 0 auto;
            height: 100%;
            align-items: space-between;
            .logo, .logo a {
                text-decoration: none;
                display: inline-flex;
                align-items: center;
                height: 80%;
                color: #ffffff;
                font-size: 24px;
                line-height: 100%;
                align-self: center;
                img {
                    display: block;
                    max-height: 100%;
                }
            }
            .left,
            .right {
                width: 100%;
                display: flex;
                align-items: center;
                @media screen and (max-width: 1000px) {
                    font-size: 14px;
                }
            }
            .left {
                width: 70px;
            }
            .right {
                width: 100%;
                text-align: right;
                justify-content: flex-end;
            }
            > div > a {
                color: #444444;
                font-weight: 700;
                text-transform: uppercase;
                text-decoration: none;
                &:hover {
                    opacity: .8;
                }
            }
            > div > .separator {
                height: 30px;
                width: 0px;
                border-left: solid 2px var(--primary-color);
                margin: 0px var(--gutter);
            }
        }
    }
</style>


<style type="text/css">
    .form-srch {
        margin: 0;
    }

    .form-srch div label {
        display: none;
    }

    .form-srch div div.search-input-holder input {
        height: 50px !important;
    }
</style>