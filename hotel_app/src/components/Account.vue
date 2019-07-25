<!-- eslint-disable -->
<template lang="html">
  <v-app>
    <navbar/>
    <div v-for="item in user" class="">
      <v-container>
        <v-layout>
          <v-flex md6>
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
             <p class="name title black--text text-capitalize">{{item.name}}</p>
             <span class="number black--text">{{item.number}}</span>
             <p class="email black--text">{{item.email}}</p>
             <v-dialog style="float:right" v-model="dialog" persistent max-width="290">
               <v-layout slot="activator" class="logout" style="margin:-10px;">
                 <v-flex class="text-xs-left">
                   <v-btn color="error" depressed>
                     <font-awesome-icon class="logout-icon mx-2" style="color:#fff;" icon="sign-out-alt" />
                      <span class="logout-text">Logout</span>
                    </v-btn>
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
          <v-flex md6>
            <v-card class="account-list-item elevation-0">
              <v-container>
                <v-layout row wrap>
                    <span class="subheading text-capitalize title-name text-xs-left">Business Name</span>
                </v-layout>
                <v-layout wrap row>
                  <v-flex class="text-xs-left">
                    <v-text-field v-model="item.businessName" :value="item.businessName" outline label="Business Name" required></v-text-field>
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
                     <v-text-field v-model="item.address" outline :value="item.address" label="Street Address" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                     <v-text-field v-model="item.city" outline label="City" :value="item.city" required></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                     <v-text-field v-model='item.pincode' :value="item.pincode" outline label="Pincode" required></v-text-field>
                  </v-flex>

                </v-layout>
                <v-flex class="text-xs-right">
                  <v-btn color="success" depressed @click.prevent="$_editUser()">
                    Save
                  </v-btn>
                </v-flex>
              </v-container>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>


    </div>

  </v-app>
</template>

<script>
/* eslint-disable */
import { mapState, mapActions } from 'vuex'
import navbar from '@/components/Navbar.vue'
export default {
  props:{
    user: Array
  },
  components:{
    navbar
  },
  methods:{
    ...mapActions('account', ['login', 'logout']),
    $_logout(){
        this.logout()
    },
    $_editUser(){
      console.log(this.user)
    }
  },

  data(){
    return {
      dialog: false,
    }
  }
}
</script>

<style lang="css">
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
