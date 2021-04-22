import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import credentials from './_credentials.js'
import curriculum from './_curriculum.js'
import application from './_application.js'

export default new Vuex.Store({
	modules: {
		application,
		credentials,
		curriculum,
	}
});
