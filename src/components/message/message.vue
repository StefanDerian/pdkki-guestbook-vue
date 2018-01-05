<template>
	<div class = "alert alert-success" v-if ="flag===1">
		{{msg}}
	</div>

	<div class = "alert alert-danger" v-else-if ="flag===0">
		{{msg}}
	</div>
</template>

<script>
export default {

	name: 'message',
	props:{
		flag:{
			validator:function(value){
				return value === 0 || value === 1 || value === -1
			}
		},
		msg:[String]
	},
	data () {
		return {
			
		}
	}
}
</script>

<style lang="css" scoped>
</style>