import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import appBootstrap from './bootstrap.js'

appBootstrap(Vue).then(app => {
	new Vue({
		router,
		i18n: app.i18n,
		store: app.store,
		render: h => h(App)
	}).$mount('#app');
});