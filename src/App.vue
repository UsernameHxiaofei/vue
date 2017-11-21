<template>
    <div id='app'>
        <top-header></top-header>
        <left-menu></left-menu>
        <transition>
            <router-view class="content"></router-view>
        </transition>
    </div>
</template>

<script>
import leftMenu from './components/include/leftMenu.vue'
import header from './components/include/header.vue'

export default {
	name: 'app',
	components: {
		'left-menu': leftMenu,
		'top-header': header
	},
	asyncData ({ store,session}) {
		return store.dispatch('login_getUser',session)
	},
	beforeMount () {
		this.$store.dispatch('login_check')
	}
}

</script>

<style>

</style>