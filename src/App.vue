<template>
    <div id='app'>
        <top-header></top-header>
        <left-menu></left-menu>
        <transition>
            <router-view class="content"></router-view>
		</transition>
		<div id="menu_scroller">
			<i class="el-icon-arrow-down"></i> 
		</div>
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
    #menu_scroller{
        position: absolute;
        top:49px;
        left: 0;
        width: 230px;
        height:20px;
        background: #06ccb7;
        color: white;
        text-align: center;
        border-bottom: 3px solid black;
        cursor: pointer;
        z-index: 2;
    }
</style>