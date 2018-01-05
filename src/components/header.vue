
<template>
	<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
		<div class="container">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
					<span class="sr-only">Toggle navigation</span>
					<span class="icon-bar"></span>
					<span class="icon-bar"></span>
				</button>
				<!-- <a class="navbar-brand" href="#"><img src = "../assets/pdkki-logo.png" height="100%" width="10%"></a> -->
			</div>
			<div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
				<ul class="nav navbar-nav">
					<li v-if = "currentUser!==null">
						<router-link  router-link :to="{ path: 'form' }">Guest Form</router-link>
					</li>
					<li v-if = "currentUser!==null">
						<router-link :to="{ path: 'list' }">Guest List</router-link>
					</li>
					
				</ul>
				<ul class="nav navbar-right">
					<li v-if = "currentUser!==null">
						<a class="btn btn-danger"href = "#" @click="logout">Logout</a>
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
			Firebase.auth().signOut().then(() => {
				this.$router.replace('login')
			})
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
</style>
