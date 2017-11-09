<template>
    <div id='detailIntroduction'>
        <div class="detailContent ql-editor" v-html="detailedIntroduction.content">

        </div>
    </div>
</template>

<script>
export default {
	name: 'detailIntroduction',
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

    .detailContent img {
        max-width: 100%;
    }
</style>