// this comes from firebase.js file in boot folder
import { LocalStorage, Loading } from 'quasar'
import { auth, fs } from 'boot/firebase'
import { ShowErrorMessage } from 'src/functions/show-error-message'
// import { slugify } from 'src/functions/slugify'
import { NotifyUser } from 'src/functions/notify'

// To find methods for interacting with firebase
// Google firebase API reference

const state = {
  // Don't use arrays here, because firebase uses objects
  // userInfo: {
  loggedIn: false,
  userEmail: null,
  userID: null
  // }
}

const mutations = {
  setLoggedIn(state, value) {
    state.loggedIn = value
  },
  setUserEmail(state, value) {
    state.userEmail = value
  },
  setUserID(state, value) {
    state.userID = value
  }
  // setuserInfo(state, userInfo) {
  //   Object.assign(state.userInfo, userInfo)
  // }
}

const actions = {
  setLoggedIn({ commit }, value) {
    commit('setLoggedIn', value)
  },
  setUserEmail({ commit }, value) {
    commit('setUserEmail', value)
  },
  setUserID({ commit }, value) {
    commit('setUserID', value)
  },
  saveUserUnfo({ state }) {
    LocalStorage.set('userInfo', state.userInfo)
  },
  // getUserInfo({ commit }) {
  //   let userInfo = LocalStorage.getItem('userInfo')
  //   if (userInfo) commit('setUserInfo', userInfo)
  // },
  registerUser({ commit }, payload) {
    console.log('ATTEMPT TO REGISTER USER, payload: ', payload)
    // show loading since acdcesing the 'net
    // Loading.show()
    // calling firebase method
    auth
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('ABLE TO REGISTER NEW USER')
        console.log('register success response: ', response)
        NotifyUser('New user! ' + payload.email)
        // console.log('hearth_id =', this.hearth_id)
        // Firebase 5.0.0 return a credential object
        // cred.user is the user object
        // this is true for creatUser... and signIn...
        let user = response.user
        console.log('register success user: ', user)
        // we already have a ref to the user record we want
        // keep in mind in has not existed yet cause this is a new user
        // set() updates a docuement, while add() adds a document
        let ref = fs.collection('users').doc(user.uid)
        ref
          .set({
            email: payload.email,
            app: 'HearthWriter',
            // associate this record with user in auth db
            u_id: user.uid,
            book_order: []
          })
          .then(() => {
            console.log('creating new user in db..')
            NotifyUser('New user! ' + payload.email)
            console.log('u_id =', user.uid)
            commit('setLoggedIn', true)
            commit('setUserEmail', payload.email)
            commit('setUserID', user.uid)
            this.$router.push({
              name: 'Home'
            })
          })
          .catch(error => {
            console.log('error setting data for new user, msg: ', error.message)
            // ShowErrorMessage(error.message);
          })
      })
      .catch(error => {
        ShowErrorMessage(error.message)
      })
  },
  loginUser({}, payload) {
    // Loading.show()
    // calling firebase method
    console.log('log in user called..')
    auth
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(response => {
        console.log('login success response: ', response)
        NotifyUser('Logged in user! ' + payload.email)
        console.log(' push home /')
        this.$router.push({
          name: 'Home'
        })
      })
      .catch(error => {
        console.log('login error is ', error)
        ShowErrorMessage(error.message)
      })
  },
  logout() {
    NotifyUser('Logged out user')
    // calling firebase method
    auth
      .signOut()
      .then(() => {
        console.log('logging out...')
        // this.haveUser = null
        this.$router.push({
          name: 'Login'
        })
      })
      .catch(error => {
        console.log('auth logout error=', error)
        console.log('error logging out, msg: ', error.message)
        // ShowErrorMessage(error.message)
      })
  },

  // must include dispatch so can call an action (in this case in store-tasks)
  handleAuthStateChange({ commit, dispatch }) {
    // calling firebase method
    auth.onAuthStateChanged(user => {
      // Loading.hide()
      if (user) {
        console.log(
          'onAuthStateChange triggered: AUTH SAYS WE NOW HAVE A USER, setting logged in and pushing home page'
        )

        commit('setLoggedIn', true)
        commit('setUserEmail', user.email)
        commit('setUserID', user.uid)
        LocalStorage.set('loggedIn', true)
        LocalStorage.set('asdf', user.uid)
        this.$router
          .push({
            name: 'Home'
          })
          .catch(error => {
            console.log(' error = ', error)
            console.log(' error message = ', error.message)
          })
        // trigger reading data from firebase in store-tasks action method
        //dispatch can take 3 paramters
        // first param is action (with name/ prefix if in a different file)
        //second is payload (we don't need in this case)
        // 3rd is options object, {root: true} allows trigger action in different module
        // dispatch('tasks/fbReadData', null, { root: true })
      } else {
        // User now LOGGED OUT
        // This line clears out users tasks in store-tasks
        // { root: true } makes the tasks/ part work and call other store
        // commit('tasks/clearTasks', null, { root: true })
        // This line lets PageTodo know not to display tasks anymore
        // commit('tasks/setTasksDownloaded', false, { root: true })
        commit('setLoggedIn', false)
        commit('setUserEmail', null)
        commit('setUserID', null)
        LocalStorage.set('loggedIn', false)
        LocalStorage.set('asdf', null)
        this.$router
          .replace({
            name: 'Login'
          })
          .catch(error => {
            console.log(' error = ', error)
            console.log(' error message = ', error.message)
          })
      }
    })
  }
}
// methods here can manipulate data as desired before returning it
const getters = {
  //   getUserInfo: state => {
  //     return state.userInfo
  //   }
}
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
