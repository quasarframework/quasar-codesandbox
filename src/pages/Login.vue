<template>
  <q-page class="flex flex-center">
    <div col>
      <q-form class="text-primary bg-secondary q-ma-lg q-pa-lg" @submit="onSubmit" @reset="onReset">
        <q-btn
          style="margin-top: 10px; margin-right: 10px;"
          class="absolute-top-right"
          label="Or Sign up"
          color="primary"
          @click="goToSignup"
        />
        <h3 text-h3 class="text-center">Hearth Writer Login</h3>
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
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm"/>
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
import { fs, auth } from 'boot/firebase'
import { slugify } from 'src/functions/slugify'
import { NotifyUser } from 'src/functions/notify'
import { ShowErrorMessage } from 'src/functions/show-error-message'
import { mapActions } from 'vuex'
export default {
  name: 'PageLogin',
  data() {
    return {
      email: null,
      password: null,
      writer_id: null,
      feedback: null
    }
  },
  methods: {
    ...mapActions('auth', ['loginUser']),
    goToSignup() {
      this.$router.push({ name: 'Signup' })
    },
    // COPIED FROM Q-FORM
    onSubmit() {
      console.log('onSubmit called...')
      // Attempt to login user
      this.loginUser({ email: this.email, password: this.password })
      // auth
      //   .signInWithEmailAndPassword(this.email, this.password)
      //   .then(() => {
      //     console.log("then, after login");
      //     console.log("creating new user is db..");
      //     this.$q.notify({
      //       color: "green-4",
      //       textColor: "white",
      //       icon: "cloud_done",
      //       message: "Logged in user! " + this.email
      //     });
      //     console.log("hearth_id =", this.hearth_id);
      //     this.$router.push({ name: "Home" });
      //   })
      //   .catch(function(error) {
      //     // Handle Errors here.
      //     var errorCode = error.code;
      //     var errorMessage = error.message;
      //     console.log("errorMessage = ", errorMessage);
      //     // ...
      //   });
      // console.log("sign in code complete, success???");
    },

    onReset() {
      this.email = null
      this.password = null
    }
  }
}
</script>

<style>
</style>