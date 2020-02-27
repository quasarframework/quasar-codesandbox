import { LocalStorage, Loading } from 'quasar'
import { firebaseAuth, firebaseDb } from 'boot/firebase'
import { showErrorMessage } from 'src/functions/function-show-error-message'

const state = {
	loggedIn: false
}

const mutations = {
	setLoggedIn(state, value) {
		state.loggedIn = value
	}
}

const actions = {
	registerUser({}, payload) {
		const { email, password, name, avata} = payload
		Loading.show()
		firebaseAuth.createUserWithEmailAndPassword(email, password)
			.then(response => {
				const ref = firebaseDb.ref('users/' + response.user.uid );
				ref.set({
					name,
					avata,
					lastActivity: new Date().toLocaleString()
				}).then(result => {
				}, error => console.log("Error: ", error))
			})
			.catch(error => {
				showErrorMessage(error.message)
			})
	},
	loginUser({dispatch}, payload) {
		Loading.show()
		firebaseAuth.signInWithEmailAndPassword(payload.email, payload.password)
			.then(response => {
				dispatch('chatModule/fbUpdateLasActivity', null, {root: true})
			})
			.catch(error => {
				showErrorMessage(error.message)
			})
	},
	logoutUser({dispatch}) {
		firebaseAuth.signOut();
		dispatch('chatModule/clearData', null, {root: true})
	},
	handleAuthStateChange({ commit, dispatch }) {
		firebaseAuth.onAuthStateChanged(user => {
			Loading.hide()
		  if (user) {
		    commit('setLoggedIn', true)
		    LocalStorage.set('loggedIn', true)
			this.$router.push('/').catch(error => {})
		    dispatch('chatModule/fbReadData', null, { root: true })
		  }
		  else {
		  	// commit('tasks/clearTasks', null, { root: true })
		  	// commit('tasks/setTasksDownloaded', false, { root: true })
		  	commit('setLoggedIn', false)
		  	LocalStorage.set('loggedIn', false)
			 
			try {
				this.$router.replace('/auth')
			} catch (error) {}  
		  }
		})
	}
}

const getters = {

}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}