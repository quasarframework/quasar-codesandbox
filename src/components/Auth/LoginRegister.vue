<template>
  <form @submit.prevent="submitForm" class="account-form">
    <div class="row q-mb-md">
      <q-banner class="bg-grey-3 col">
        <template v-slot:avatar>
          <q-icon name="account_circle" color="primary" />
        </template>
        {{ tab | titleCase }} to access your Todos anywhere!
      </q-banner>
    </div>
    <div class="row q-mb-md justify-center" v-if="tab !== 'login'">
      <div class="avata-container">
        <q-icon name="photo_camera" size="80px" color="grey" class="avata-img" />
        <img :src="formData.avata" class="avata-img" alt="avata icon" v-show="formData.avata"/>
        <q-input type="file" class="avata-input" v-model="srcAvata" @change="readImage"/>
      </div>
    </div>
    <div class="row q-mb-md" v-if="tab !== 'login'">
      <q-input
        v-model="formData.name"
        ref="name"
        lazy-rules
        outlined
        class="col"
        label="Name"
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="formData.email"
        :rules="[ val => isValidEmailAddress(val) || 'Please enter a valid email address.']"
        ref="email"
        lazy-rules
        outlined
        class="col"
        label="Email"
        stack-label
      />
    </div>
    <div class="row q-mb-md">
      <q-input
        v-model="formData.password"
        :rules="[ val => val.length >= 6 || 'Please enter at least 6 characters.']"
        ref="password"
        lazy-rules
        type="password"
        outlined
        class="col"
        label="Password"
        stack-label
      />
    </div>
    <div class="row">
      <q-space />
      <q-btn color="primary" :label="tab" type="submit" />
    </div>
  </form>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: ["tab"],
  data() {
    return {
      formData: {
        email: "",
        password: "",
        name: "",
        avata: null
	  },
	  srcAvata: null
    };
  },
  methods: {
    ...mapActions("authModule", ["registerUser", "loginUser"]),
    isValidEmailAddress(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(email).toLowerCase());
    },
    readImage(env) {
		const self = this;
      if (env.target.files && env.target.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
		  self.formData.avata = e.target.result;
        };

        reader.readAsDataURL(env.target.files[0]);
      }
    },
    submitForm() {
      this.$refs.email.validate();
	  this.$refs.password.validate();
	  if(this.tab !== 'login') {
		  this.$refs.name.validate();
	  }
      if (!this.$refs.email.hasError && !this.$refs.password.hasError) {
        if (this.tab == "login") {
          this.loginUser(this.formData);
        } else {
          this.registerUser(this.formData);
        }
      }
    }
  },
  filters: {
    titleCase(value) {
      return value.charAt(0).toUpperCase() + value.slice(1);
    }
  }
};
</script>