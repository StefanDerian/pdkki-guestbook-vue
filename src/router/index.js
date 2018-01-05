import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import GuestForm from '@/components/guest-fillin-form.vue'
import GuestList from '@/components/guest-list.vue'
import Login from '@/components/login.vue'
Vue.use(Router)

export default new Router({
	routes: [
	// {
	// 	path: '/',
	// 	name: 'HelloWorld',
	// 	component: HelloWorld
	// },
	{
		path: '/login' ,
		component: Login
	},
	{
		path: '/' ,
		redirect: '/login'
	},
	{
		path: '*' ,
		redirect: '/login'
	},
	{
		path: '/form' ,
		name: 'GuestForm',
		component : GuestForm,
		meta:{
			requiresAuth: true
		}
	},
	{
		path:'/list' ,
		name: 'GuestList',
		component : GuestList,
		meta:{
			requiresAuth: true
		}
	},
	],
	mode: 'history',
	fallback: false,
})
