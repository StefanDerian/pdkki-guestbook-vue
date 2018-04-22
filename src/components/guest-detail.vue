<template>

	<div>
		<div class = "row">
			<!-- make every row exist if the associated variable exist-->
			<h1 v-if="client.name">{{client.name}}</h1>
			<hr  v-if="client.email">
			<h1 v-if="client.email">{{client.email}}</h1>
			<hr v-if="client.phone">
			<h1 v-if="client.phone">{{client.phone}}</h1>
			<hr v-if="client.birthday.day">
			<h1 v-if="client.birthday.day">{{client.birthday.day}} {{client.birthday.month}} {{client.birthday.year}}</h1>
			<hr v-if="client.description">
			<h1 v-if="client.description">{{client.description}}</h1>
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