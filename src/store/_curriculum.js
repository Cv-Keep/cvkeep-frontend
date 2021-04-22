export default {
	namespaced: true,
	state: {},
	
	mutations: {
		load (state, cv) {
			state.curriculum = cv;
			this.state.curriculum = cv;
		}
	}
}