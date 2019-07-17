<template lang="html">
<div>
  <navbar/>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-layout row wrap>
          <v-flex md4>
          <v-layout>
            <v-flex md6>
              <v-container>
            <img width="100px" src="../assets/server.svg"/>
              </v-container>
            </v-flex>
            <v-flex md6>
              <v-container>
                <p class="text-xs-left title text-capitalize">Hello, {{account.user.name}}</p>
              </v-container>
            </v-flex>
         </v-layout>

          </v-flex>
          <v-flex md4>
            <v-layout>

              <v-flex md6>
                  <v-container>
                <img width="100px" src="../assets/joke.svg"/>
                  </v-container>
              </v-flex>
              <v-flex md6>
                  <v-container>
                <p class="grey--text text-xs-left">Random Joke</p>
                  <p class="text-xs-left">{{setup}}</p>
                  <p class="text-xs-left">{{punchline}}</p>
                    </v-container>
              </v-flex>

            </v-layout>

          </v-flex>
          <v-flex>
            <v-container>
                <vue-clock />
            </v-container>
          </v-flex>
              </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
     <v-layout row wrap py-4>
      <p class="display-1 text-xs-left font-weight-medium text-capitalize">Hotel Overview</p>
    </v-layout>
    <v-layout row wrap py-4>
      <v-flex md4 xs6>
        <v-container>
        <v-card color="#f6f5fa" style="elevation-0">
          <v-container>
            <p class="text-xs-left font-weight-medium text-capitalize">x</p>
            <p class="text-xs-left font-weight-bold text-capitalize">Bookings <span style="float:right"><font-awesome-icon size="2x" class="" icon="address-book" /></span> </p>
          </v-container>
        </v-card>
        </v-container>
      </v-flex>
      <v-flex md4 xs6>
        <v-container>
        <v-card color="#f6f5fa" style="elevation-0">
          <v-container>
            <p class="text-xs-left font-weight-medium text-capitalize">x</p>
            <p class="text-xs-left font-weight-bold text-capitalize">Rooms <span style="float:right"><font-awesome-icon size="2x" class="" icon="bed" /></span></p>
          </v-container>
        </v-card>
        </v-container>
      </v-flex>
      <v-flex md4 xs6>
        <v-container>
        <v-card color="#f6f5fa" style="elevation-0">
          <v-container>
            <p class="text-xs-left font-weight-medium text-capitalize">x</p>
            <p class="text-xs-left font-weight-bold text-capitalize">Customers <span style="float:right"><font-awesome-icon size="2x" class="" icon="male" /></span></p>
          </v-container>
        </v-card>
        </v-container>
      </v-flex>
      <v-flex md4 xs6>
        <v-container>
        <v-card color="#f6f5fa" style="elevation-0">
          <v-container>
            <p class="text-xs-left font-weight-medium text-capitalize">x</p>
            <p class="text-xs-left font-weight-bold text-capitalize">Staff <span style="float:right"><font-awesome-icon size="2x" class="" icon="users" /></span></p>
          </v-container>
        </v-card>
        </v-container>
      </v-flex>
      <v-flex md4 xs6>
        <v-container>
        <v-card color="#f6f5fa" style="elevation-0">
          <v-container>
            <p class="text-xs-left font-weight-medium text-capitalize">x</p>
            <p class="text-xs-left font-weight-bold text-capitalize">Amenity <span style="float:right"><font-awesome-icon size="2x" class="" icon="person-booth" /></span></p>
          </v-container>
        </v-card>
        </v-container>
      </v-flex>
      <v-flex md4 xs6>
        <v-container>
        <v-card color="#f6f5fa" style="elevation-0">
          <v-container>
            <p class="text-xs-left font-weight-medium text-capitalize">x</p>
            <p class="text-xs-left font-weight-bold text-capitalize">Grocery <span style="float:right"><font-awesome-icon size="2x" class="" icon="shopping-basket" /></span></p>
          </v-container>
        </v-card>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>
/* eslint-disable */
import navbar from '@/components/Navbar.vue'
import axios from 'axios'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  data: () => ({
    setup:'',
    punchline:''
  }),
  components: {
    navbar

  },
  methods: {
    async randomJoke() {
     const res = await axios.get('https://official-joke-api.appspot.com/random_joke')
       console.log(res.data)

       this.setup = res.data.setup,
       this.punchline =  res.data.punchline

     return res.data
   }
    //    ...mapActions('offers', ['get_All','get_All_Banner'])
  },
  computed: {
    ...mapState({account:'account', status:['status'],user:['user']}),
    // ...mapState({ offers: 'offers' }),

  },
  mounted () {
    this.randomJoke()
    //    this.get_All(),
    //    this.get_All_Banner()
  },
  created(){
      const loggedIn = localStorage.getItem('user')
      if (!loggedIn) {
        this.$router.push('/login')
      }
  },

}
</script>
