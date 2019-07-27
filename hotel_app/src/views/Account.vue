<!-- eslint-disable -->
<template lang="html">
  <v-app>
    <navbar/>
    <div class="page-loader" v-if="user.current.Fetching">
    <v-progress-circular
    indeterminate
    color="primary"
  ></v-progress-circular>
  </div>
    <div v-else class="">
      <v-container>
        <v-layout row wrap>
          <v-flex md6 xs12>
            <v-container>
            <v-card class="elevation-0">
            <div class="content-holder">
              <v-container>
                <v-avatar
                class="avatar-holder"
                size="76"
                >
             <img class="avatar-img" src="../assets/man.svg" alt="avatar">
           </v-avatar>
           <v-container>
             <p class="name title black--text text-capitalize">{{user.current.data[0].name}}</p>
             <span class="number black--text">{{user.current.data[0].number}}</span>
             <p class="email black--text">{{user.current.data[0].email}}</p>
             <v-dialog style="float:right" v-model="dialog" persistent max-width="290">
               <v-layout slot="activator" class="logout" style="margin:-10px;">
                 <v-flex class="text-xs-left">
                     <font-awesome-icon class="logout-icon mx-2" style="color:red;" icon="power-off" />
                      <span class="logout-text">Logout</span>
                 </v-flex>
               </v-layout>
              <v-card >
                <v-card-title class="headline">Do you wish to logout?</v-card-title>
                <v-card-text>Your session will terminate.</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click.native="dialog = false">Cancel</v-btn>
                  <v-btn @click="$_logout()" color="red darken-1" flat @click.native="dialog = false">Logout</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
           </v-container>
            </v-container>
            </div>
          </v-card>
        </v-container>
          </v-flex>
          <v-flex md6 xs12>
            <v-card class="account-list-item elevation-0">
              <v-container>
                <v-layout row wrap>
                    <span class="subheading text-capitalize title-name text-xs-left">Business Name</span>
                </v-layout>
                <v-layout wrap row>
                  <v-flex class="text-xs-left">
                    <v-text-field v-model="user.current.data[0].businessName" :value="user.current.data[0].businessName" outline label="Business Name" required></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card>
            <v-card class="account-list-item elevation-0">
              <v-container grid-list-md>
                <v-layout row wrap>
                    <span class="subheading text-capitalize title-name text-xs-left">Address</span>
                </v-layout>
                <v-layout wrap>
                  <v-flex xs12 md6>
                     <v-text-field v-model="user.current.data[0].address" outline :value="user.current.data[0].address" label="Street Address" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                     <v-text-field v-model="user.current.data[0].city" outline label="City" :value="user.current.data[0].city" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                     <v-text-field v-model='user.current.data[0].pincode' :value="user.current.data[0].pincode" outline label="Pincode" required></v-text-field>
                  </v-flex>

                </v-layout>
                <v-flex class="text-xs-right">
                  <v-btn color="success" depressed @click.prevent="$_editUser()" @click="snackbar = true">
                    Save
                  </v-btn>
                </v-flex>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-snackbar
        v-model="snackbar"
        bottom
        color="#5f2a8a"
        right>
        {{user.msg}}
        <v-btn
          color="white"
          flat
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </v-snackbar>
    </div>

  </v-app>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import navbar from '@/components/Navbar.vue'
export default {
  components:{
    navbar
  },
  methods:{
     ...mapActions('users', ['getById','update']),
    ...mapActions('account', ['login', 'logout']),
    $_logout(){
        this.logout()
    },
    $_editUser(){
  //    console.log(this.user.current.data[0])
      const user = {
        _id: this.user.current.data[0]._id,
        name: this.user.current.data[0].name,
        city: this.user.current.data[0].city,
        email: this.user.current.data[0].email,
        number: this.user.current.data[0].number,
        pincode: this.user.current.data[0].pincode,
        address: this.user.current.data[0].address,
        username: this.user.current.data[0].username,
        businessName: this.user.current.data[0].businessName,
      }
      this.update(user)
    }
  },
  mounted () {

       this.getById(this.account.user._id)
  },
  computed: {
   ...mapState({user: 'users'}),
   ...mapState({account:'account'}),
  },
  created(){
      const loggedIn = localStorage.getItem('user')
      if (!loggedIn) {
        this.$router.push('/login')
      }
  },
  data(){
    return {
      snackbar:false,
        timeout: 6000,
      dialog: false,
    }
  }
}
</script>

<style lang="css">
.page-loader{
  margin-top: 12px;
}
.account-list-item{
  margin-top: 12px;
}
.logout{
  margin: 8px;
}
.logout-icon{
  color: red;
}
.title-des{
  float: right;
  margin: 8px;
}
.title-name{
  margin: 8px;
}
.avatar-img{
  padding: 14px;
  background-color: whitesmoke;
}
.avatar-holder{
  border: 2px solid white;
}
.edit{
  float: right;
  color: white;
}
.edit-icon{
  color: white;
}

</style>
