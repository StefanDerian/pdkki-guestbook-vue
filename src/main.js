// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VeeValidate from 'vee-validate'
import Vuex from 'vuex'
import store from './store'
import VueFire from 'vuefire'
import Firebase from 'firebase'
// import BootstrapVue from 'bootstrap-vue'


// Vue.use(BootstrapVue)

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import jQuery from 'jquery'
// global.jQuery = jQuery


// let Bootstrap = require('bootstrap')

// Vue.use(Bootstrap)

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap/dist/js/bootstrap.js'

// require('../node_modules/bootstrap/dist/css/bootstrap.min.css')


// require('../node_modules/bootstrap/dist/js/bootstrap.min.js')
// require('../node_modules/vue2-slot-calendar/lib/calendar.min.css')
// require('../node_modules/vue2-slot-calendar/lib/calendar.min.js')
//require('../node_modules/footable/css/footable.metro.css')
require('../node_modules/footable/js/footable.js')




require("babel-core/register")
require("babel-polyfill")


Vue.use(Vuex)
Vue.use(VueFire)

Vue.use(VeeValidate)

Vue.config.productionTip = false

/* eslint-disable no-new */






Firebase.auth().onAuthStateChanged(function(user) {


	var vm = new Vue({
		el: '#app',
		router,
		store,
		data: {
			loading: true,
			user: null,
			items: [],
			item: ''
		},
		beforeCreate(){
			Firebase.auth().onAuthStateChanged((user) => {
				
				if (user) {
					this.user = user
					this.$router.replace('list')
				}else{
					this.user = null
					this.$router.replace('login')
				}
			})
		},
		created(){
			console.log('main created')



		},
		render: h => h(App)
	})
})

router.beforeEach((to,from,next) => {
	let currentUser = vm.user
	let requiresAuth = to.matched.some(record => record.meta.requiresAuth)

	if(requiresAuth && !currentUser) 
		next('login')
	else if(!requiresAuth && currentUser)
		next('list')
	else
		next()


})