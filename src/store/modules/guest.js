
const state = {
	all:[]
}

// getters
const getters = {
	allGuests: state => state.all,
	getBirthdayMonth: function(state){
		return state.all.filter(function(guest){

			var nowMonth = new Date()

			nowMonth = nowMonth.getMonth()

			var guestMonth = new Date(guest['birthday'])
			guestMonth = guestMonth.getMonth()

			return guestMonth === nowMonth


		})
	},
	getGuestsSize: state => state.all.length
}

const actions = {
	getAllGuests({commit},guests){
		commit('getAllGuests', guests)
	},
	addGuest({commit},guest){
		commit('addGuest', guest)
	}
}


// mutations
const mutations = {
	getAllGuests (state, guests) {
		
		state.all = guests
	},
	addGuest(state, guest = {}){
		state.all.push(guest)
	}
}



export default {
	state,
	getters,
	actions,
	mutations
}