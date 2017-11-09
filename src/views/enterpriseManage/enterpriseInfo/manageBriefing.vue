<template>
    <div id='manageBriefing'>
        <el-row>
            <el-col :span="24" style="background:#ffffff">
                <el-row>
                    <el-col :span="24" style="margin-top:20px;">
                        <el-button class="sbtn" @click="select(3)" :class="{'selectb':Y}">年报</el-button>
                        <el-button class="sbtn" @click="select(2)" :class="{'selectb':J}">季报</el-button>
                        <el-button class="sbtn" @click="select(1)" :class="{'selectb':M}">月报</el-button>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top:40px;">
                        <el-select style="margin-left:40px;" @change="search" class="selectstyle" v-model="year">
                            <el-option v-for="item in years" :label="item.label" :value="item.value" :key="item.value"> </el-option>
                        </el-select>
                        <el-select class="selectstyle" v-if="J" @change="search" v-model="quarter">
                            <el-option v-for="n in 4" :key="n" :label="'第'+n+'季'" :value="n"> </el-option>
                        </el-select>
                        <el-select class="selectstyle" v-if="M" @change="search" v-model="month">
                            <el-option v-for="n in 12" :key="n" :label="n+'月'" :value="n"> </el-option>
                        </el-select>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24" style="margin-top:50px">
                        <el-row style="background:#eceff1;line-height:60px;">
                            <el-col :span="24" class="manage-title">经营简报</el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24" v-html="statementBrief.biref||''" class="manage-content">
                            </el-col>
                        </el-row>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
	name: 'manageBriefing',
	data() {
		return {
			M: false, J: false, Y: true,
			year: 2017,
			quarter: 1,
			month: 1,
			years: [],
			type: 'year'
		}
	},
	beforeMount() {
		this.getYears()
		this.search()
	},
	computed: {
		statementBrief: function () {
			return this.$store.state.enterprise.statementBrief || {}
		}
	},
	methods: {
		getYears() {
			let now = new Date().getFullYear(), startYear = 2010
			while (now - startYear > 0) {
				this.years.push({ value: now, label: now + '年' })
				now--
			}
			this.years.push({ value: startYear, label: startYear + '年' })
		},
		search() {
			let param = {
				type: this.type,
				year: this.year,
				month: this.month,
				quarter: this.quarter,
				enterpriseId: this.$route.params.id
			}
			this.$store.dispatch('enterprise_getStatementBrief', param)
		},
		select(n) {
			this.M = this.J = this.Y = false
			switch (n) {
			case 1:
				this.M = true
				this.type = 'month'
				break
			case 2:
				this.J = true
				this.type = 'quarter'
				break
			case 3:
				this.Y = true
				this.type = 'year'
				break
			default:
				break
			}
			this.search()
		}
	}

}
</script>

<style>
    #manageBriefing .sbtn {
        margin-left: 40px;
        padding-left: 30px;
        padding-right: 30px;
    }

    #manageBriefing .text-label {
        font-weight: 550;
        font-size: 20px;
    }

    #manageBriefing .selectb {
        background: #06CCB7;
        color: white;
    }

    #manageBriefing .selectstyle {
        width: 100px;
    }

    #manageBriefing .manage-title {
        text-align: left;
        text-indent: 30px;
        font-size: 22px;
        font-weight: bold;
    }

    #manageBriefing .manage-content {
        min-height: 400px;
        border: 3px solid #eceff1;
        white-space: pre-wrap;
        padding: 15px 30px;
        font-size: 16px;
    }
</style>