<template>

	<div>
		<img src = "../assets/pdkki-gb-photo.jpg" class ="bg-img" >
		<div class = "alert alert-danger" v-if="error!==''">{{error}}</div>
		<div class = "container jumbotron login-container">
			
			<form v-on:submit.prevent="onSubmit" class = "form-horizontal">
				<div class = "form-group">
					<label class = "col-md-3 control-label login-label" for="email">Email</label>
					<div class = "col-md-6">
						<input v-validate="'required|email'" id ="email" type="email" name="email" class="form-control" v-model ="email" >
						<span v-show="errors.has('email')" class="help text-danger">{{ errors.first('email') }}</span>
					</div>
				</div>
				<div class = "form-group">
					<label class = "col-md-3 control-label login-label" for="current-password">password</label>
					<div class = "col-md-6">
						<input  v-validate="'required'" id ="current-password" type="password" name="current-password" class="form-control" v-model ="password" >
						<span v-show="errors.has('current-password')" class="help text-danger">{{ errors.first('current-password') }}</span>
					</div>
				</div>
				<input type="submit" class="btn btn-success btn-lg" value="login">
			</form>
		</div>
		{{user}}
	</div>
</template>

<script>
import Firebase from 'firebase'
export default {

	name: 'login',

	data () {
		return {
			email:"",
			password:"",
			error:"",
			user: Firebase.auth().currentUser
			
		}
	},
	methods:{
		onSubmit(){
			Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
				(user) =>{
					console.log(user)
					//this.user = user
					//this.$router.push({ path: 'list' })
					// this.user = Firebase.auth();
					//this.$router.replace('list')
				},
				(err) => {
					this.error = "Oops "+err
				}
				)

			// this.$router.push({ path: 'list' })

		}
	}
}
</script>

<style lang="css">
.bg-img{
	z-index: -246;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;


}
.login-container{
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	border:solid 1px #ffffff;
	background: transparent;
	
}
.login-label{
	color: #ffffff;
}
.brand-image-container{
	margin-bottom:20px;
}
@media screen and (min-width:415px){
	.login-container{
		margin-top:10%;
		width: 50%;
	}
}
/* adjust the height within dekstop ad mobile*/
@media screen and (max-width:414px){
	.login-container{
		margin-top:30%;
		width: 100%;
	}

}
</style>
