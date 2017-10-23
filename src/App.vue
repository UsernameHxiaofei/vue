<template>
    <div id='app'>
        <top-header></top-header>
        <left-menu></left-menu>
        <keep-alive >
            <router-view class="content"></router-view>
        </keep-alive>
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
        asyncData ({ store,session,router }) {
            return store.dispatch('login_getUser',session);
        },
        mounted () {
            this.$store.dispatch('login_check');
        }
    }

</script>

<style>

</style>