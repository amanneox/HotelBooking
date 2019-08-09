<template lang="html">
  <v-app>
    <v-layout>
      <v-flex class="hidden-sm-and-down" xs12 style="background-color:#f6f5fa">
        <v-container style="margin-top:120px">
          <v-layout style="margin:12px;" align-center justify-center row fill-height>
            <span class="font-weight-bold display-2 text-capitalize">Welcome aboard</span>
          </v-layout>
          <v-layout style="margin:12px;" align-center justify-center row fill-height>
            <img width="200px" src="../assets/main.png">
          </v-layout>
          <v-layout style="margin:12px;" align-center justify-center row fill-height>
            <v-flex>
              <span class="px-1">Documentation<font-awesome-icon class="px-1" size="lg" icon="book" /></span>
              <span class="px-1">Download<font-awesome-icon class="px-1" size="lg" icon="download" /></span>
              <span class="px-1">Github<font-awesome-icon  class="px-1" size="lg" :icon="['fab', 'github']" /></span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex sm12 md4 style="background-color: white">
        <v-form data-vv-scope="signup">
        <v-container style="background-color: white;">
        <p class="title">Sign Up Now!</p>
         <v-text-field v-model="user.name" outline v-validate="'required|alpha_spaces'" name="name" label="Name">
         </v-text-field>
         <v-text-field v-model="user.number" outline v-validate="'required|digits:10'" name="number" label="Number" ></v-text-field>

         <v-text-field v-model="user.email" outline v-validate="'required|email'" name="email" label="E-mail"></v-text-field>

         <v-text-field v-model="user.password" outline v-validate="'required|alpha_num'" type="password" name="password" ref="password" label="Password"></v-text-field>

         <v-text-field v-validate="'alpha_num|confirmed:password'" outline type="password" name="confirm-password" label="Repeat Password" data-vv-as="password"></v-text-field>

         <br>
         <v-btn class="continue" :loading="loading" :disabled="errors.any('signup'),loading"  @click.prevent="$_emitData" color="#5f2a8a"  @click.native="loader = 'loading'">
           Continue
         </v-btn>
          <v-btn to="/login" outline color="primary">Login</v-btn>
       </v-container>
        <li class="error-list" style="color:red;" v-for="error in errors.all('signup')">{{ error }}</li>
      </v-form>
      </v-flex>
    </v-layout>

</v-app>
</template>
<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
export default {
  $_veeValidate: {
    validator: 'new'
  },
  data: () => ({
    user: {
    name: '',
    number: '',
    email: '',
    password: ''
  },
  loader: null,
  loading: false,
  drawer: null
}),
props: {
  source: String
},
computed: {
       ...mapState('account', ['status'])
   },
watch: {
     loader () {
       const l = this.loader
       this[l] = !this[l]
       setTimeout(() => (this[l] = false), 3000)
       this.loader = null
     }
   },
   methods:{
      ...mapActions('account', ['register']),
     $_emitData () {

    //   this.register(this.user)
      this.$validator.validateAll('signup').then((result) => {
      if(!result){
      console.log("error",this.user.password)
        return
      }
      else{
      //  console.log("no error")
        this.register(this.user);
      }
    })


   }
 }
}
</script>
<style lang="css">

.alert-success{
  color: #00C853;
}
.alert-danger{
  color: #F44336;
}
.continue{
  color: #FFF !important;
}
.login-bar{
    height: 160px;
}
.extra{
  margin-right: 115px;
}
.login-text{
  margin-left: 0;
  font-size: 16px;
}
.custom-loader {
   animation: loader 1s infinite;
   display: flex;
 }
 @-moz-keyframes loader {
   from {
     transform: rotate(0);
   }
   to {
     transform: rotate(360deg);
   }
 }
 @-webkit-keyframes loader {
   from {
     transform: rotate(0);
   }
   to {
     transform: rotate(360deg);
   }
 }
 @-o-keyframes loader {
   from {
     transform: rotate(0);
   }
   to {
     transform: rotate(360deg);
   }
 }
 @keyframes loader {
   from {
     transform: rotate(0);
   }
   to {
     transform: rotate(360deg);
   }
 }
</style>
