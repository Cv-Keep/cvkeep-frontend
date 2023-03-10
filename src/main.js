import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import appBootstrap from './bootstrap.js'
// import vuetify from './plugins/vuetify'


appBootstrap(Vue).then(app => {
	new Vue({
		router,
		// vuetify,
		i18n: app.i18n,
		store: app.store,
		render: h => h(App)
	}).$mount('#app');
});