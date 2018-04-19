<template>

	<div>
		<div class = "row">
			<h1>{{client.name}}</h1>
			<hr>
			<h1>{{client.email}}</h1>
			<hr>
			<h1>{{client.phone}}</h1>
			<hr>
			<h1>{{client.birthday.day}} {{client.birthday.month}} {{client.birthday.year}}</h1>
			<hr>
			<h1>{{client.description}}</h1>
			<hr>
		</div>





	</div>
</template>

<script>
export default {
//NB: Bingung designnya kepiye
	name: 'guest-detail',

	data () {
		return {
			client:{
				name: '', 
				email:'',
				phone:'',
				birthday:'',
				description:''
			}
		}
	},
	props : {
		guest:[Object],
	},
	watch:{
		guest: function(newGuest){
			var newGuest1 = {...newGuest}
			this.client = newGuest1
		}

	}
}
</script>

<style lang="css" scoped>
</style>