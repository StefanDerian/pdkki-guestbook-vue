
<template>
	

	<!-- Navigation -->


	<div class="container center" style="text-align:center;width:100%">


		<!-- {{errors}} -->
		<div class="row">
			<form v-on:submit.prevent="onSubmit">
				<div class="form-group row" style="text-align:center;">
					<label for="inputEmail3" class="col-md-3 col-sm-12 control-label">Full Name:</label>
					<div class="col-md-6 col-sm-12">
						<input type="text" v-validate="'required'"  name="name"  class="form-control" id="inputEmail3" v-model="client.name"  placeholder="Nama Lengkap ..." >
						<span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-md-3 col-sm-12 control-label">Email:</label>
					<div class="col-md-6 col-sm-12">
						<input type="email" v-validate="'required|email'"  class="form-control " v-model="client.email" id="inputPassword3"  placeholder="Email mu...." >
					</div>
				</div>
				<div class="form-group row">
					<label for="inputPassword3" class="col-md-3 col-sm-12 control-label">Birthday:</label>
					<div class="col-md-6 col-sm-12">
						<!-- <div class="form-group"> -->
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<label for="sel1">Day:</label>
									<select class="form-control" id="sel1" name = "day" v-model="client.birthday.day">
										<option>01</option>
										<option>02</option>
										<option>03</option>
										<option>04</option>
										<option>05</option>
										<option>06</option>
										<option>07</option>
										<option>08</option>
										<option>09</option>
										<option>10</option>
										<option>11</option>
										<option>12</option>
										<option>13</option>
										<option>14</option>
										<option>15</option>
										<option>16</option>
										<option>17</option>
										<option>18</option>
										<option>19</option>
										<option>20</option>
										<option>21</option>
										<option>22</option>
										<option>23</option>
										<option>24</option>
										<option>25</option>
										<option>26</option>
										<option>27</option>
										<option>28</option>
										<option>29</option>
										<option>31</option>
									</select>
								</div>
							</div>
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<label for="sel1">Month:</label>
									<select class="form-control" id="sel1" name="month" v-model="client.birthday.month">
										<option>Jan</option>
										<option>Feb</option>
										<option>Mar</option>
										<option>Apr</option>
										<option>May</option>
										<option>Jun</option>
										<option>Jul</option>
										<option>Aug</option>
										<option>Sep</option>
										<option>Oct</option>
										<option>Nov</option>
										<option>Dec</option>
									</select>
								</div>
							</div>
							<div class="col-md-3 col-sm-12">
								<div class="form-group">
									<label for="sel1">Year:</label>
									<select class="form-control" id="sel1" name="year" v-model="client.birthday.year">
										<option>1990</option>
										<option>1991</option>
										<option>1992</option>
										<option>1993</option>
										<option>1994</option>
										<option>1995</option>
										<option>1996</option>
										<option>1997</option>
										<option>1998</option>
										<option>1999</option>
										<option>2000</option>
										<option>2002</option>
										<option>2003</option>
										<option>2004</option>
										<option>2005</option>
										<option>2006</option>
										<option>2007</option>
									</select>
								</div>
							</div>
							<!-- <DatePicker v-model="client.birthday" lang="en" v-validate="'required|'" name="dob" format="MMMM dd, yyyy">
								
							</DatePicker>
							<span v-show="errors.has('dob')" class="help is-danger">{{ errors.first('dob') }}</span> -->
							<!-- <input type="text" class="form-control" datetime="dd/MM/yyyy" uib-datepicker-popup="dd/MM/yyyy"  close-text="Close" alt-input-formats="altInputFormats" v-model="client.birthday" placeholder="dd/mm/yyy" > --><!-- <div class=""> --><!-- ngIf: isOpen
							</div>
							<!-- <span class="input-group-btn">
								<button type="button" class="btn btn-default" ><i class="glyphicon glyphicon-calendar"></i></button>
							</span> -->
							<!-- </div> -->
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
							<textarea  class="form-control " rows="5" id="comment" name="description" v-model="client.description" placeholder="Hobby, Kuliah atau Kerja bagian apa ..."></textarea>
							<!-- <span v-show="errors.has('description')" class="help is-danger">{{ errors.first('description') }}</span> -->
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
	import Moment from 'moment'
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
				email:'',
				phone:'',
				birthday:{
					day:'01',
					month:'Jan',
					year:'1991'
				},
				description:''
			},
			originalClient: {
				name: '', 
				email:'',
				phone:'',
				birthday:{
					day:'01',
					month:'Jan',
					year:'1991'
				},
				description:''
			}

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
			this.$validator.validateAll().then(res=>{
				if(res) {

					//to check another error cant be detected by validator function such as email duplicate
					var notError = true
					//assigning dynamic error string
					var errorString = ""

					var selfClient = {...this.client}
					this.allGuests.filter(function(guest){
						if(selfClient["email"] == guest["email"]){
							notError = false
							errorString = "Email Already Exists"
						}

					})




					if (notError){
						this.$emit('submit-form',selfClient)


						//if it is come to create it will reset the data
						//it does not reset the data upon updating because we want the data to be updated not back to its original state
						if(this.type1 === "create")
							this.resetData()
					}else{

						alert(errorString)

					}
					
					

				} else {
					alert('Please fill in the data appropriately')
				}
			})
		},




		resetData(){
			//reseting the data to its original state
			//for create the data reset to blank values
			//meanwhile for update to the value before it was updated

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
			this.originalClient = {...newGuest1}
		}

	}

}

</script>

<style lang="css" scoped>
</style>
