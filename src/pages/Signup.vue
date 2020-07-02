<template>
  <q-page class="flex flex-center">
    <div col>
      <q-form class="text-primary bg-secondary q-ma-lg q-pa-lg" @submit="onSubmit" @reset="onReset">
        <q-btn
          style="margin-top: 10px; margin-right: 10px;"
          class="absolute-top-right"
          label="Or Login"
          color="primary"
          @click="goToLogin"
        />
        <h3 text-h3 class="text-center">Hearth Writer Signup</h3>
        <q-input
          type="email"
          v-model="email"
          label="Email: *"
          hint
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type email']"
        />

        <q-input
          type="password"
          v-model="password"
          label="Password: *"
          lazy-rules
          :rules="[
          val => val !== null && val !== '' || 'Please type your password'
        ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms"/>

        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { auth, fs } from 'boot/firebase'
import { slugify } from 'src/functions/slugify'
import { NotifyUser } from 'src/functions/notify'
import { ShowErrorMessage } from 'src/functions/show-error-message'

import { mapActions } from 'vuex'

export default {
  name: 'PageSignup',
  data() {
    return {
      email: null,
      password: null,
      hearth_id: null,
      feedback: null,
      // COPIED FROM Q-FORM
      accept: false
    }
  },
  methods: {
    ...mapActions('auth', ['registerUser']),
    goToLogin() {
      this.$router.push({ name: 'Login' })
    },
    onSubmit() {
      if (this.accept !== true) {
        console.log('need to accept license and terms')
        this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: 'You need to accept the license and terms first'
        })
      } else {
        // prepare to store user info like their email slugified into a userID
        this.hearth_id = slugify(this.email)
        // check if this writer_id already exists
        // Note: will create 'users' collection if does not exist already
        // Remember: we are using this slug as the writer id
        // following call will get the doc with this slug if exists
        let ref = fs.collection('users').doc(this.hearth_id)
        // try to get this ref
        console.log('ref=', ref)
        // remember, this is an asynchronous function
        ref.get().then(doc => {
          if (doc.exists) {
            NotifyUser('This writer already exists with this email.')
          } else {
            this.registerUser({ email: this.email, password: this.password,  hearth_id: this.hearth_id })
            // alias does not exist yet
            // NotifyUser((this.feedback = 'This alias is free to use'))
            // return
            //     auth
            //       // note: successful creation also logs in the user
            //       .createUserWithEmailAndPassword(this.email, this.password)
            //       .then(cred => {
            //         // Firebase 5.0.0 return a credential object
            //         // cred.user is the user object
            //         // this is true for creatUser... and signIn...
            //         let user = cred.user
            //         console.log('register success user: ', user)
            //         // we already have a ref to the user record we want
            //         // keep in mind in has not existed yet cause this is a new user
            //         // set() updates a docuement, while add() adds a document
            //         ref
            //           .set({
            //             hearth_id: this.hearth_id,
            //             email: this.email,
            //             // associate this record with user in auth db
            //             u_id: user.uid
            //           })
            //           .then(() => {
            //             console.log('creating new user is db..')
            //             this.$q.notify({
            //               color: 'green-4',
            //               textColor: 'white',
            //               icon: 'cloud_done',
            //               message: 'New user! ' + this.email
            //             })
            //             console.log('hearth_id =', this.hearth_id)
            //             this.$router.push({ name: 'Home' })
            //           })
            //           .catch(error => {
            //             console.log(
            //               'error setting data for new user, msg: ',
            //               error.message
            //             )
            //             // ShowErrorMessage(error.message);
            //           })
            //       })
            //       .catch(error => {
            //         console.log('error adding user, msg: ', error.message)
            //         // ShowErrorMessage(error.message);
            //       })
          }
        })
        // console.log('finished get')
        // console.log('New User = ', this.newUser)
      }
    },

    onReset() {
      this.email = null
      this.password = null
      this.accept = false
    }
  }
}
</script>

<style>
</style>