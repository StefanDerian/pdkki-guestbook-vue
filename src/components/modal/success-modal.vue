<template>
	<div>
		<bootstrap-modal ref="successModal" :need-header="true" :need-footer="true" :size="'large'">
			<div slot="title">
				<p class = "header-content">Yay</p>
			</div>
			<div slot="body">
				<p>{{msg}}</p>
			</div>
			<div slot="footer">
				<button class = "btn btn-lg btn-primary btn-success" @click ="close">Close</button>
			</div>
		</bootstrap-modal>
	</div>
</template>

<script>
export default {

	name: 'success-modal',
	components:{
	'bootstrap-modal': require('vue2-bootstrap-modal')
	},
	props:{
		msg :[String]
	},
	methods:{
		close(){
			this.$refs["successModal"].close()
		}
	},

	data () {
		return {

		}
	}
}
</script>

<style lang="css" scoped>
.btn-primary{
	width: 100%;
	height: 100%;
}
</style>