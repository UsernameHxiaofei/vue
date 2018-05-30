<template>
    <div id='detailIntroduction'>
        <div class="detailContent" >
            <ckeditor v-model="detailedIntroduction.content"></ckeditor>
        </div>
    </div>
</template>

<script>
    import ckeditor from '../../../components/editor/ckeditor.vue'
export default {
    name: 'detailIntroduction',
    components: {
        ckeditor
    },
	computed: {
		detailedIntroduction: function () {
			return this.$store.state.item.detailedIntroduction || {}
		}
	}

}
</script>

<style>
    .detailContent {
        padding: 10px 10px;
    }

    /* .detailContent img {
        max-width: 100%;
    } */
</style>