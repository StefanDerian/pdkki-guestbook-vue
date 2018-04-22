
<template>
	<div class="container guest-list-container">
		<!-- Single button -->
		<message :msg ="msg" :flag="flag"></message>
		<div class="row">
			<div class="search col-md-4">

				<div class = "form-group">
					<label for="search">Search Name:</label>
					<input class="form-control" v-model = "keyword" name="search" id="search" type ="text" placeholder="search name here">
				</div>
			</div>
			<div class="search col-md-4">
				<!-- <div class = "checkbox"> -->
					<p>Show this month birthday only</p>
					<switches name="birthday" v-model="birthdayFilter" theme="bootstrap" color="primary" type-bold="true"></switches>
					<!-- <label><input type="checkbox" name="birthday" v-model="birthdayFilter">Show this month birthday only</label> -->
					<!-- </div> -->
				</div>
				<div class="search col-md-4">
					Sort by:
					<div class="btn-group dropdown">
						<button type="button" class="btn btn-default btn-search dropdown-toggle" data-toggle="dropdown">
							<span class="caret"></span>
						</button>
						<ul class="dropdown-menu" >
							<!-- <li ><a href="#" @click = "sort('birthday')">This Month Birthday</a></li> -->
							<li ><a href="#" @click = "sort('name')">Name</a></li>
							<!-- <li><a href="#" @click = "sort('nickname')">Nick Name</a></li> -->
						</ul>
					</div>
				</div>
			</div>


			<div class="row">
				<!-- <div class="table-responsive"> -->
					<table class="table table-striped footable">
						<thead>
							<tr>
								<th><h4><b>Name</b></h4></th>
								<!-- <th>Nick Name</th> -->
								<th><h4><b>Phone Number</b></h4></th>
								<th><h4><b>Birthday</b></h4></th>
								<th data-breakpoints="xs sm md"></th>
								<th data-breakpoints="xs sm md"></th>
								<th data-breakpoints="xs sm md"></th>
								<!-- <th>Description</th> -->
							</tr>
						</thead>
						<tbody>

							<!-- ngRepeat: person in tempPeople | orderBy:myOrderBy -->
							<tr align ="left" v-for="guest of computedGuest">
								<td class="col-sm-2">{{guest.name}}</td>
								<!-- <td>{{guest.email}}</td> -->
								<td class="col-sm-2">{{guest.phone}}</td>
								<!-- kalau bisa birthdaynya tolong ganti format-->
								<td class="col-sm-2">{{guest.birthday.day}} {{guest.birthday.month}} {{guest.birthday.year}}</td>
								<!-- <td class = "col-description">{{guest.description}}</td> -->
								<td class="col-sm-1 td-button"><button class = "btn btn-md btn-primary" @click="showDetailModal(guest)">View</button></td>
								<td class="col-sm-1 td-button"><button class = "btn btn-md btn-warning" @click="showEditModal(guest)">Edit</button></td>
								<td class="col-sm-1 td-button"><button class ="btn btn-md btn-danger" @click="deleteGuestModal(guest)">Delete</button></td>
								<td class="col-sm-1 td-button-phone">
									<div class="btn-group dropdown">
										<button type="button" class="btn btn-primary btn-search dropdown-toggle" data-toggle="dropdown">
											<span class="caret"></span>
										</button>
										<ul class="dropdown-menu" >
											<li><button class = "btn btn-md btn-primary" @click="showDetailModal(guest)">View</button></li>
											<li><button class = "btn btn-md btn-warning" @click="showEditModal(guest)">Edit</button></li>
											<li><button class ="btn btn-md btn-danger" @click="deleteGuestModal(guest)">Delete</button></li>
										</ul>
									</div>
								</td>



							</tr>
						</tbody>
					</table>
					<!-- </div> -->

				</div>
				<div class = "row paginate">
					<pagination  ref = "pagination" align="center" for="computedGuest" :records="pageSize" :per-page="perPage" @paginate="setPage"></pagination>
				</div>
				<bootstrap-modal ref="detailModal" :need-header="true" :need-footer="false" :size="'large'">
					<div slot="title">
						<h3><b>Guest Detail</b></h3>
					</div>
					<div slot="body">
						<guest-detail :guest="guestDetail"></guest-detail>
					</div>
				<!-- <div slot="footer">
					Your footer here
				</div> -->
			</bootstrap-modal>

			<bootstrap-modal ref="editModal" :need-header="true" :need-footer="false" :size="'large'">
				<div slot="title">
					<h3><b>Edit the guest data</b></h3>
				</div>
				<div slot="body">
					<guest-form :guest="guestDetail" type1="update" v-on:submit-form="updateGuest"></guest-form>
				</div>
				<!-- <div slot="footer">
					Your footer here
				</div> -->
			</bootstrap-modal>

			<bootstrap-modal ref="deleteModal" :need-header="true" :need-footer="true" :size="'large'">
				<div slot="title">
					<h3><b>Delete Confirmation</b></h3>
				</div>
				<div slot="body">
					Are You sure you want to delete this guest? The action can not be undone
				</div>
				<div slot="footer">
					<button class = "btn btn-md btn-danger" @click="deleteGuest(guestDetail)">Yes</button> 
					<button class = "btn btn-md btn-default" data-dismiss="deleteModal" @click="closeDeleteGuest">No</button>
				</div>
			</bootstrap-modal>



		</div>

	</template>

	<script>
	import { db } from '../mixin/firebase'
	import { mapGetters, mapActions } from 'vuex'
	import Switches from 'vue-switches';	
	import GuestDetail from './guest-detail.vue'

	import {Pagination} from 'vue-pagination-2'





//lazy loading
const GuestForm = () => import('./guest-form.vue')
// const GuestDetail = () => import('./guest-detail.vue')
const Message = () => import('./message/message.vue')
const Firebase = () => import('firebase')

export default {
	
	name: 'guest-list',
	firebase:{
		guests: db.ref('Guests')
	},
	components:{
		'guest-form': GuestForm,
		'bootstrap-modal': require('vue2-bootstrap-modal'),
		'pagination': Pagination,
		'message':Message,
		'guest-detail':GuestDetail,
		'switches':Switches
	},
	data () {
		return {
			guestDetail:{},
			flag:-1,
			msg:"",
			sortKey:"created",
			birthdayFilter: false,
			firstGuestIndex: 0,
			lastGuestIndex: 9,
			perPage:10,
			keyword:"",
			pageSize:this.getGuestsSize
		}
	},
	methods:{
		...mapActions([
			'getAllGuests', 
      		// map `this.increment()` to `this.$store.dispatch('increment')`
      		]),
		
		deleteGuest(guest){
			//function for deleting a guest data from firebase
			this.$firebaseRefs.guests.child(guest['.key']).remove()
			this.closeDeleteGuest()
		},
		
		deleteGuestModal(guest){
			//function for showing confirmation modal
			this.guestDetail = guest
			this.$refs["deleteModal"].open()
		},
		
		closeDeleteGuest(){
			//function for closing confirmation modal
			this.$refs["deleteModal"].close()
		},
		//function for updating the guest data on firebase based on the key provided
		updateGuest(guest){
			var guest1 = {...guest}
			delete guest1['.key']
			if(this.$firebaseRefs.guests.child(guest['.key']).set(guest1)){
				this.flag = 1,
				this.msg = "Successfully updated"
			}else{
				this.flag = 0,
				this.msg = "update failed please check internet connection"
			}
			setTimeout(() => {
				this.flag = -1,
				this.msg = ""
			},5000)
			this.closeEditModal()
		},
		// function for showing a modal
		showDetailModal(guest){
			this.guestDetail = guest
			this.$refs["detailModal"].open()
		},
		// function for closing a modal
		closeDetailModal(){
			this.$refs["detailModal"].close()
		},
		// function for showing a modal
		showEditModal(guest){
			this.guestDetail = guest
			this.$refs["editModal"].open()
		},
		// function for closing a modal
		closeEditModal(){
			this.$refs["editModal"].close()
		},
		// function for sorting based on the key
		sort(key,order = "desc"){


			this.sortKey = key

		},
		// function for dynamic sorting
		compareValues(key, order='desc') {
			return function(a, b) {
			 // property doesn't exist on either object
			 if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
			 	return 0; 


			 }
			 var varA = ""
			 var varB = ""

			 if(key === 'birthday'){
			 	varA = new Date(a[key]);
			 	varA = varA.getMonth();

			 	varB = new Date(a[key]);
			 	varB = varB.getMonth();
			 }else{
			 	varA = (typeof a[key] === 'string') ? 
			 	a[key].toUpperCase() : a[key];
			 	varB = (typeof b[key] === 'string') ? 
			 	b[key].toUpperCase() : b[key];
			 }



			 let comparison = 0;





			 if (varA > varB) {
			 	comparison = 1;
			 } else if (varA < varB) {
			 	comparison = -1;
			 }
			 return (
			 	(order == 'desc') ? (comparison * -1) : comparison
			 	);
			};
		},
		//function for adjusting pagination
		setPage(page) {
			var pageIndex = (page - 1) * this.perPage
			var perPageIndex = (page * this.perPage) - 1

			this.firstGuestIndex = pageIndex
			this.lastGuestIndex = perPageIndex
		},
		//function for reseting pagination back to 0 by reseting the page parametre
		resetPage(){
			this.$refs["pagination"].setPage(1)
			this.firstGuestIndex = 0
			this.lastGuestIndex = 9
		}
		
	},
	// mix the getters into computed with object spread operator
	computed: {
		//mapping the things in vuex into this component from VUEX
		...mapGetters([
			'allGuests',
			'getGuestsSize'
			

			]),


		//function for handling the sorting, searching, and keywords and also the list above generated from this function
		computedGuest: function(){
			//sortkey means the key used to compare for example based on created
			var computedGuests = this.allGuests.sort(this.compareValues(this.sortKey))
			let firstGuestIndex = this.firstGuestIndex
			let lastGuestIndex = this.lastGuestIndex
			
			
			
			if(this.birthdayFilter){
				computedGuests = computedGuests.filter(function(guest){

					var nowMonth = new Date()

					

					const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
					"Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
					];

					nowMonth = monthNames[nowMonth.getMonth()]

					var guestMonth = guest['birthday']['month']
					console.log(nowMonth)
					//guestMonth = guestMonth.getMonth()

					return guestMonth === nowMonth


				})
			}
			let keyword = this.keyword

			if(keyword !== ""){
				computedGuests = computedGuests.filter(function(guest){
					var re = '(?:^|\W)'+keyword+'(?:$|\W)' 
					if ( guest.name.search(re) == -1) { 
						return false
					} else { 
						return true 
					}   




				})
			}


			this.pageSize = computedGuests.length
			computedGuests =  computedGuests.filter(function(guest,index, thisArg){
				
				return index >= firstGuestIndex  && index <= lastGuestIndex
			})
			

			return computedGuests
			
			
			
			
		}

	},
	//function for watching the change of the state in this component
	watch:{

		//reseting every time the page get the variable changed
		sortKey: function() {
			this.resetPage()
			
		},
		birthdayFilter: function(){
			this.resetPage()
		},
		keyword:function(){
			this.resetPage()
		}
	},
	// filters:{
	// 	getBirthdayMonth: function(guests){
	// 		return guests.filter(function(guest){

	// 			var nowMonth = new Date()

	// 			nowMonth = nowMonth.getMonth()

	// 			var guestMonth = new Date(guest['birthday'])
	// 			guestMonth = guestMonth.getMonth()

	// 			return guestMonth === nowMonth


	// 		})
	// 	}



	// },
	//this function will run when this component is created/ initialized
	created(){
		this.getAllGuests(this.guests)
	},
	//this function will run when this component is created/ finished with the create
	mounted(){
		//this.paginationComp = this.$parent.$refs.pagination
		console.log('list mounted')
	}
}
</script>



<style lang="css" scoped>
table{
	
	white-space: normal;
}
.table{
	padding-top:10px;
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

input{
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.paginate{
	text-align: center;
	margin-left:10%;

}
.paginate li{
	box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}
.paginate p{
	
	margin-right:39%;
}

td,th{
	text-align: center;
	word-wrap:break-word
}

.modal-header{
	background: black;
	color: #ffffff;
}


@media screen and (min-width:415px){
	.td-button-phone{
		display:none;
	}
}
/* make CRUD button display different from the one in dekstop*/
@media screen and (max-width:414px){
	.td-button{
		display:none;
	}
	.td-button-phone ul {
		left:-260%;
	}
	.td-button-phone ul>li {
		margin-bottom: 5px;
		display:block;
		text-align: center;
	}


}

@media screen and (max-width:1024px){
	.pagination li>a{
		display: none
	}


}
</style>
