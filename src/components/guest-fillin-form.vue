
<template>
	<div class = "container jumbotron guest-form-container">
		
		<message :msg ="msg" :flag="flag"></message>
		<guest-form ref= "createForm" v-on:submit-form="onSubmit" :guest="client" type1="create"></guest-form>
	</div>
</template>

<script>
import GuestForm from './guest-form.vue'
import { db } from '../mixin/firebase'
import Message  from './message/message.vue'
export default {
	
	name: 'guest-fillin-form',
	components:{
		'guest-form': GuestForm,
		'message': Message
	},
	firebase: {
		guests: db.ref('Guests')
	},


	data () {
		return {
			flag:-1,
			msg:"",
			client:{
				name: '', 
				nickname:'',
				phone:'',
				birthday:'',
				description:''
			},
		}
	},
	methods: {

		onSubmit (guest) {
		
			guest.created = Date.now()
			
			if(this.$firebaseRefs.guests.push(guest)){
				this.flag = 1,
				this.msg = "Successfully entered, thank you. Please Enjoy the PD"
			}else{
				this.flag = 0,
				this.msg = "Failed to enter please check internet connection"
			}
			// this.$store.dispatch('addGuest',this.client)

			setTimeout(() => {
				this.flag = -1,
				this.msg = ""
			},5000)
		
		}

	}
}
</script>

<style lang="css" scoped>
.guest-form-container{
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
</style>
</script>