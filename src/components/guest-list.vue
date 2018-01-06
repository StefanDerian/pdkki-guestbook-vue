
<template>
	<div class="container">
		<!-- Single button -->
		<message :msg ="msg" :flag="flag"></message>
		<div class="row">
			<div class="search pull-right">

				<div class = "form-group">
					<label for = "search"> Search By Name:</label>
					<input class="form-control" v-model = "keyword" name="search" id="search" type ="text" placeholder="search for ....">
				</div>
			</div>
			<div class="search pull-right">
				<div class = "checkbox">
					<label><input type="checkbox" name="birthday" v-model="birthdayFilter">Show this month birthday only</label>
				</div>
			</div>
			<div class="search pull-right">
				Sort by:
				<div class="btn-group dropdown">
					<button type="button" class="btn btn-default btn-search dropdown-toggle"
					data-toggle="dropdown">
					<span class="caret"></span>
				</button>
				<ul class="dropdown-menu" >
					<!-- <li ><a href="#" @click = "sort('birthday')">This Month Birthday</a></li> -->
					<li ><a href="#" @click = "sort('name')">Name</a></li>
					<li><a href="#" @click = "sort('nickname')">Nick Name</a></li>
				</ul>
			</div>
		</div>
	</div>


	<div class="row">
		<div class="table-responsive">
			<table class="table">
				<tbody>
					<tr>
						<th>Name</th>
						<th>Nick Name</th>
						<th>Phone Number</th>
						<th>Birthday</th>
						<th>Description</th>
					</tr>
					<!-- ngRepeat: person in tempPeople | orderBy:myOrderBy -->
					<tr align ="left" v-for="guest of computedGuest">
						<td>{{guest.name}}</td>
						<td>{{guest.nickname}}</td>
						<td>{{guest.phone}}</td>
						<td>{{guest.birthday}}</td>
						<td class = "col-description">{{guest.description}}</td>
						<td><button class = "btn btn-md btn-warning" @click="showEditModal(guest)">Edit</button></td>
						<td><button class ="btn btn-md btn-danger" @click="deleteGuestModal(guest)">Delete</button></td>



					</tr>
				</tbody>
			</table>
		</div>
		
	</div>
	<div class = "row">
		<pagination ref = "pagination" align="center" for="computedGuest" :records="pageSize" :per-page="perPage" @paginate="setPage"></pagination>
	</div>
	<bootstrap-modal ref="editModal" :need-header="true" :need-footer="false" :size="'large'">
		<div slot="title">
			Edit the guest data
		</div>
		<div slot="body">
			<guest-form :guest="guestDetail" type1="update" v-on:submit-form="updateGuest"></guest-form>
		</div>
		<div slot="footer">
			Your footer here
		</div>
	</bootstrap-modal>
	<bootstrap-modal ref="deleteModal" :need-header="true" :need-footer="true" :size="'large'">
		<div slot="title">
			Delete Confirmation
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
//import GuestForm from './guest-form.vue'
// import Message  from './message/message.vue'
import {Pagination} from 'vue-pagination-2'
// import Firebase from 'firebase'


const GuestForm = () => import('./guest-form.vue')
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
		'message':Message
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
			this.$firebaseRefs.guests.child(guest['.key']).remove()
			this.closeDeleteGuest()
		},
		deleteGuestModal(guest){
			this.guestDetail = guest
			this.$refs["deleteModal"].open()
		},
		closeDeleteGuest(){
			this.$refs["deleteModal"].close()
		},
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
		showEditModal(guest){
			this.guestDetail = guest
			this.$refs["editModal"].open()
		},
		closeEditModal(){
			this.$refs["editModal"].close()
		},

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
		setPage(page) {
			var pageIndex = (page - 1) * this.perPage
			var perPageIndex = (page * this.perPage) - 1

			this.firstGuestIndex = pageIndex
			this.lastGuestIndex = perPageIndex
		},
		resetPage(){
			this.$refs["pagination"].setPage(1)
			this.firstGuestIndex = 0
			this.lastGuestIndex = 9
		}
		
	},
	// mix the getters into computed with object spread operator
	computed: {

		...mapGetters([
			'allGuests',
			'getGuestsSize'
			

			]),
		computedGuest: function(){

			var computedGuests = this.allGuests.sort(this.compareValues(this.sortKey))
			let firstGuestIndex = this.firstGuestIndex
			let lastGuestIndex = this.lastGuestIndex
			
			
			
			if(this.birthdayFilter){
				computedGuests = computedGuests.filter(function(guest){

					var nowMonth = new Date()

					nowMonth = nowMonth.getMonth()

					var guestMonth = new Date(guest['birthday'])
					guestMonth = guestMonth.getMonth()

					return guestMonth === nowMonth


				})
			}
			let keyword = this.keyword

			if(keyword !== ""){
				computedGuests = computedGuests.filter(function(guest){
					var re = '(?:^|\W)'+keyword+'(?:$|\W)' 
					if ( guest.name.search(re) == -1 && guest.nickname.search(re) == -1 ) { 
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
	watch:{
		sortKey: function() {
			this.resetPage()
			
		},
		birthdayFilter: function(){
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
	created(){
		 this.getAllGuests(this.guests)
	},

	mounted(){
		//this.paginationComp = this.$parent.$refs.pagination
		console.log('list mounted')
	}
}
</script>



<style lang="css" scoped>
table{
	table-layout: fixed;
	white-space: normal;
}
td{
	word-wrap:break-word
}
.col-description:
</style>
