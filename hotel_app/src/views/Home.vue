<template lang="html">
<div>
  <navbar/>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="white">
          <v-layout row wrap>
          <v-flex xs4>
            <span>hello {Username}</span>
          </v-flex>
          <v-flex xs4>
            <span>Here we show number of bookings</span>
          </v-flex>
          <v-flex xs4>
            <span>12:30, is time of the day</span>
          </v-flex>
              </v-layout>
        </v-card>

      </v-flex>
    </v-layout>
  </v-container>
</div>
</template>
<script>

import navbar from '@/components/Navbar.vue'
// import axios from 'axios'
// import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    navbar

  },
  methods: {
    //    ...mapActions('offers', ['get_All','get_All_Banner'])
  },
  mounted () {
    //    this.get_All(),
    //    this.get_All_Banner()
  },
  computed: {

    // ...mapState({ offers: 'offers' }),

  },
  data: () => ({
  })
}
</script>
