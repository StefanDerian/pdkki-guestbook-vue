
<template>
	

	<!-- Navigation -->


	<div class="container center" style="text-align:center;width:100%">


		<!-- {{errors}} -->
		<div class="row">
			<form v-on:submit.prevent="onSubmit">
				<div class="form-group row" style="text-align:center;">
					<label for="inputEmail3" class="col-md-3 col-sm-12 control-label">Name:</label>
					<div class="col-md-6 col-sm-12">
						<input type="text" v-validate="'required'"  name="name"  class="form-control" id="inputEmail3" v-model="client.name"  placeholder="Nama Lengkap ..." >
						<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-md-3 col-sm-12 control-label">Nick Name:</label>
					<div class="col-md-6 col-sm-12">
						<input type="text" class="form-control " v-model="client.nickname" id="inputPassword3"  placeholder="Nama panggilan ..." >
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-md-3 col-sm-12 control-label">Birthday:</label>
					<div class="col-md-6 col-sm-12">
						<div class="form-group">
							<DatePicker v-model="client.birthday" lang="en" v-validate="'required|'" name="dob">
								
							</DatePicker>
							<span v-show="errors.has('dob')" class="help is-danger">{{ errors.first('dob') }}</span>
							<!-- <input type="text" class="form-control" datetime="dd/MM/yyyy" uib-datepicker-popup="dd/MM/yyyy"  close-text="Close" alt-input-formats="altInputFormats" v-model="client.birthday" placeholder="dd/mm/yyy" > --><!-- <div class=""> --><!-- ngIf: isOpen
							</div>
							<!-- <span class="input-group-btn">
								<button type="button" class="btn btn-default" ><i class="glyphicon glyphicon-calendar"></i></button>
							</span> -->
						</div>
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-md-3 col-sm-12 control-label">Phone Number:</label>
					<div class="col-md-6 col-sm-12">
						<input type="tel" name="phone" class="form-control " v-validate="'required|min:10|max:10|numeric'" v-model="client.phone" id="inputPassword3"  placeholder="Nomer telepon" >
						<span v-show="errors.has('phone')" class="help is-danger">{{ errors.first('phone') }}</span>
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-md-3 col-sm-12 control-label">Description:</label>
					<div class="col-md-6 col-sm-12">
						<textarea v-validate="'min:20'" class="form-control " rows="5" id="comment" name="description" v-model="client.description" placeholder="Hobby, Kuliah atau Kerja bagian apa ..."></textarea>
						<span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span>
					</div>
				</div>

				<div class="form-group row">
					<div class="col-sm-9">
						<button type="submit" class="btn btn-primary pull-right"><div v-if="type1==='create'">Fill In</div><div v-else>Update</div></button>
						<button type="button" class="btn btn-warning pull-right" @click="resetData">Reset</button>
					</div>
				</div>

			</form>
			<success-modal ref="successModal" msg = "Thank You for filling up may God bless you always. Enjoy the PD"></success-modal>
		</div>
	</div>







</template>

<script>
import DatePicker from 'vue2-datepicker';
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'
import { SuccessModal } from './modal/success-modal.vue'
"use strict"

// import db from '../mixin/firebase'

export default {

	components:{
		DatePicker,
		'success-modal': require('vue2-bootstrap-modal')
	},
	data () {
		return {
			msg :'hello',
			flag :-1,
			client:{
				name: '', 
				nickname:'',
				phone:'',
				birthday:'',
				description:''
			},
			originalClient: {...this.client}
			
		}
	},
	props : {
		guest:[Object],
		type1: {
			validator:function(value){
				return value === "create" || value ==="update"
			}
		}
	},

// 	created: function () {
//     // `this` points to the vm instance
//     console.log('form created')
// },
computed: mapState({
    // arrow functions can make the code very succinct!
    count: state => state.count,

    // passing the string value 'count' is same as `state => state.count`
    countAlias: 'count'
}),
// firebase: {
// 	guests: db.ref('Guests')
// },
computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
    	'allGuests'
      // ...
      ])
    

},
methods: {

	
		waitFor(value,time){
			return new Promise(resolve => {
				setTimeout(() => {
					resolve(value);
				}, time);
			})
		},
		onSubmit () {
		// console.log(this.client);
		// this.increment()
		// console.log(this.$store.getters.getCount)
		this.$validator.validateAll().then(res=>{
			if(res) {
				

				if(typeof(this.client.birthday) != "string")
					this.client.birthday = this.client.birthday.toDateString()


				this.$emit('submit-form',this.client)
				// this.$store.dispatch('addGuest',this.client)

				if(this.type1 === "create")
					this.resetData()
				

			} else {
				alert('Please correct all error!')
			}
		})
	},
	
	async resetData(){

		this.client = {...this.originalClient}
		
		setTimeout(() => {
			this.$validator.reset()
		},500)
		
		

	}



},
watch:{
	guest: function(newGuest){

		var newGuest1 = {...newGuest}
		this.client = newGuest1
		this.originalClient = newGuest1
	}

}

}

</script>

<style lang="css" scoped>
</style>
