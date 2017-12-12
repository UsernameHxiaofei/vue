<template>
	<div id='app-progress'>
		<div class="progress-number" v-if="number!=100" :style="{width:number+'%'}"></div>
	</div>
</template>

<script>
export default {
	name: 'app-progress',
	data() {
		return {
			number: 100,
			timer: ''
		}
	},
	methods: {
		running() {
			this.number = 10
			if (this.timer != '') {
				return
			}
			this.timer = setInterval(() => {
				this.number = this.number + (100 - this.number) * 0.1
			}, 100)
		},
		end() {
			if (this.time == '') {
				return
			}
			clearInterval(this.timer)
			this.timer = ''
			this.number = 100
		}
	}
}
</script>

<style scoped>
	#app-progress {
		top: 0;
		width: 100%;
		position: absolute;
		z-index: 10000;
	}

	.progress-number {
		height: 3px;
		color: white;
		background: #06ccb7;
		opacity: 0.9;
	}
</style>