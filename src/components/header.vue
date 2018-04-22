<!-- this file for header and router-->
<template>
<!-- 	<nav class="navbar navbar-expand-lg navbar-light bg-dark">
		<a class="navbar-brand" href="#">PDKKI</a>
		<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
			<span class="navbar-toggler-icon"></span>
		</button>
		<div class="collapse navbar-collapse" id="navbarText">
			<ul class="nav justify-content-center">
				<li class="nav-item" v-if = "this.$root.user">
					<router-link :to="{ path: 'form' }" class = "nav-link">Guest Form</router-link>
				</li>
				<li class="nav-item" v-if = "this.$root.user">
					<router-link :to="{ path: 'list' }" class ="nav-link">Guest List</router-link>
				</li>
				<li class="nav-item" v-if = "this.$root.user">
					<a class="btn btn-danger" href = "#" @click="logout">Logout</a>
				</li>
			</ul>
		</div>
	</nav> -->
	<nav v-if = "this.$root.user" class="navbar navbar-default" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="#" height="60px" width="90px"><img src = "../assets/pdkki-logo.png" height="60px" width="90px"></a>
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li v-if = "this.$root.user">
						<router-link :to="{ path: 'form' }">Guest Form</router-link>
					</li>
					<li v-if = "this.$root.user">
						<router-link :to="{ path: 'list' }">Guest List</router-link>
					</li>
					
				</ul>
				<ul class="nav navbar-right">
					<li v-if = "this.$root.user">
						<a class="btn btn-danger" href = "#" @click="logout">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</nav> 
</template>

<script>
import Firebase from 'firebase'
export default {

	
	name: 'header1',
	props: {
		name1: {
			

			type: String
		}
	},
	methods:{
		logout(){
			Firebase.auth().signOut()
		}
	},
	
	data () {
		return {
			currentUser : Firebase.auth().currentUser,
		}
	}
}
</script>

<style lang="css" scoped>
.navbar-brand{
	margin-top: -30px;
}
</style>
