<!-- eslint-disable -->
<template lang="html">
  <v-app>
    <v-layout>
      <v-flex class="hidden-sm-and-down" xs12>
        <v-container style="margin-top:120px">
          <v-layout style="margin:12px;" align-center justify-center row fill-height>
            <span class="font-weight-bold display-2 text-capitalize">Welcome abord</span>
          </v-layout>
          <v-layout style="margin:12px;" align-center justify-center row fill-height>
            <img width="200px" src="../assets/main.png">
          </v-layout>
          <v-layout style="margin:12px;" align-center justify-center row fill-height>
            <v-flex>
              <span>Documentation&nbsp;<font-awesome-icon icon="book" />&nbsp;</span> &nbsp;
              <span>Download&nbsp;<font-awesome-icon icon="download" />&nbsp;</span> &nbsp;
              <span>Github&nbsp;<font-awesome-icon :icon="['fab', 'github']" />&nbsp;</span> &nbsp;
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
      <v-flex sm12 md4 style="background-color: white;">
        <v-container style="background-color: white;">
         <v-text-field v-model="user.name" outline v-validate="'required|alpha'" name="name" label="Name">
         </v-text-field>
         <span>{{ errors.first('name') }}</span>
         <v-text-field v-model="user.number" outline v-validate="'required|digits:10'" name="number" label="Number" ></v-text-field>
            <span>{{ errors.first('number') }}</span>
         <v-text-field v-model="user.email" outline v-validate="'required|email'" name="email" label="E-mail"></v-text-field>
            <span>{{ errors.first('email') }}</span>
         <v-text-field v-model="user.password" outline v-validate="'required|alpha_num'" type="password" name="password" ref="password" label="Password"></v-text-field>
            <span>{{ errors.first('password') }}</span>
         <v-text-field v-validate="'required|alpha_num|confirmed:password'" outline type="password" name="confirm-password" label="Repeat Password" data-vv-as="password"></v-text-field>
         <span>{{ errors.first('confirm-password') }}</span>
         <br>
         <v-btn class="continue" :loading="loading" :disabled="loading"  @click.prevent="$_emitData" color="#5f2a8a"  @click.native="loader = 'loading'">
           Continue
         </v-btn>
          <v-btn to="/login" outline color="primary">Login</v-btn>
       </v-container>
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
       this.register(this.user)
       /*
       this.$validator.validateAll()
         if (this.errors.any()) {
           return
         }
         else {
            this.register(this.user);
         }
         */
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
