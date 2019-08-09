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
      <v-flex sm12 md4 style="background-color: white;">
        <v-container style="background-color: white;">
            <p class="title">Login!</p>
          <v-card class="elevation-0">
            <v-form data-vv-scope="login">
            <v-container style="background-color: white;">
          <v-text-field class="elevation-0" outline v-model="email" v-validate="'required|email'" name="email" label="E-mail" required></v-text-field>.

          <v-text-field class="elevation-0" outline v-model="password" label="Password" v-validate="'required'" type="password" name="password" required></v-text-field>

           <br>
          <v-btn :disabled="errors.any('login'),loading" @click.prevent="$_emitData()"  class="continue" :loading="loading" color="#5f2a8a"  @click.native="loader = 'loading'">
            Continue
          </v-btn>
           <v-btn to="/signup" outline color="primary">Sign Up</v-btn>
         </v-container>
           <li class="error-list" style="color:red;" v-for="error in errors.all('login')">{{ error }}</li>
          </v-form>
         </v-card>
       <p style="color:red" class="">{{alert.message}}</p>
        </v-container>
      </v-flex>
    </v-layout>

</v-app>
</template>
<script>
/* eslint-disable */
import { mapState, mapActions ,mapGetters} from 'vuex'
export default {
  computed: {
     ...mapState({account:'account', status:['status'],alert:'alert'}),
     ...mapState({alert:'alert'})
 },
 mounted(){
    this.$store.dispatch('alert/clear',{ root: true })
 },
 methods:{
    ...mapActions('account', ['login', 'logout']),
    $_emitData () {

      const { email, password } = this

      this.$validator.validateAll()
        if (this.errors.any()) {
          return
        }
        else {
          if (email && password) {
              console.log(email)
              this.login({ email,password })
          }
        }
  }
},
  data: () => ({
  email: '',
  password: '',
  loader: null,
  loading: false,
  drawer: null
}),
props: {
  source: String
},
watch: {
     loader () {
       const l = this.loader
       this[l] = !this[l]

       setTimeout(() => (this[l] = false), 3000)

       this.loader = null
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
