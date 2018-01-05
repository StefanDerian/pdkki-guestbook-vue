<template>
	<div>
		<div class = "alert alert-danger" v-if="error!==''">{{error}}</div>
		<div class = "container jumbotron login">
			<form v-on:submit.prevent="onSubmit">
				<div class = "form-group row">
					<label class = "col-md-3" for="email">Email</label>
					<input v-validate="'required|email'" id ="email" type="email" name="email" class="form-group col-md-3" v-model ="email" >
					<span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
				</div>
				<div class = "form-group row">
					<label class = "col-md-3" for="current-password">password</label>
					<input  v-validate="'required'" id ="current-password" type="password" name="current-password" class="form-group col-md-3" v-model ="password" >
					<span v-show="errors.has('current-password')" class="help is-danger">{{ errors.first('current-password') }}</span>
				</div>
				<input type="submit" class="btn btn-primary btn-lg" value="login">
			</form>
		</div>
		
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
			error:""
		}
	},
	methods:{
		onSubmit(){
			Firebase.auth().signInWithEmailAndPassword(this.email, this.password).then(
				(user) =>{
					this.$router.replace('list')
					// this.user = Firebase.auth();
				},
				(err) => {
					this.error = "Oops "+err
				}
				)

		}
	}
}
</script>

<style lang="css" scoped>
</style>
