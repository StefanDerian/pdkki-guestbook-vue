import Vue from 'vue'
import Vuex from 'vuex'
import guest from './modules/guest'


Vue.use(Vuex)


export default new Vuex.Store({
	state: {
		count: 0
	},
	modules:{
		guest
	},
	mutations: {
		increment (state) {
			state.count++
		}
	},
	getters: {
		getCount: state => {
			return state.count;
		}
	},
	actions: {
		increment (context) {
			context.commit('increment')
		}
	}
})