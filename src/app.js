import Vue from 'vue'
import App from './App.vue'
import { createStore } from './store'
import { createRouter } from './router'
import { sync } from 'vuex-router-sync'
import * as filters from './filters'
import directive from './directive/index'
import ElementUI from 'element-ui'
import './assets/index.css'
import './assets/css/common.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.core.css'

// console.log=()=>{}
// register global utility directive.
Object.keys(directive).forEach(key=>{
	Vue.directive(key,directive[key])
})

// register global utility filters.
Object.keys(filters).forEach(key => {
	Vue.filter(key, filters[key])
})

Vue.use(ElementUI)

// Expose a factory function that creates a fresh set of store, router,
// app instances on each call (which is called for each SSR request)
export function createApp () {
	const store = createStore()
	const router = createRouter()

	// sync the router with the vuex store.
	// this registers `store.state.route`
	sync(store, router)
  
	// create the app instance.
	// here we inject the router, store and ssr context to all child components,
	// making them available everywhere as `this.$router` and `this.$store`.
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})

	// expose the app, the router and the store.
	// note we are not mounting the app here, since bootstrapping will be
	// different depending on whether we are in a browser or on the server.
	return { app, router, store}
}
