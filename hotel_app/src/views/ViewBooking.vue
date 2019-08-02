<template>
  <div>
    <navbar/>
    <v-container>
      <v-card>
        <v-card-title class="title">Booking Infromation</v-card-title>
        <v-container>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="text-capitalize text-xs-left">Booking ID</p>
            <p style="color:green;" class="text-xs-left">{{bookingid}}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="text-capitalize text-xs-left">Booked By</p>
            <p style="color:green;" class="text-xs-left">{{username()}}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="text-capitalize text-xs-left">Customer Name</p>
            <p style="color:green;" class="text-xs-left">{{getCustomer()}}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="text-capitalize text-xs-left">Check In</p>
            <p style="color:green;" class="text-xs-left">{{checkin()}}</p>
          </v-flex>
        </v-layout>
        <v-layout row wrap>
          <v-flex xs12 md6>
            <p class="text-capitalize text-xs-left">Check Out</p>
            <p style="color:red;" class="text-xs-left">{{checkout()}}</p>
          </v-flex>
        </v-layout>
        <v-btn fab icon style="float:left;margin:1px;" color="success"><font-awesome-icon size="2x" class="" icon="file-invoice" /></v-btn>
      </v-container>
      </v-card>
    </v-container>
  </div>
</template>
<script>
/* eslint-disable */
import navbar from '@/components/Navbar.vue'
import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    navbar

  },
  methods:{
  ...mapActions('booking', ['get_All_Booking','getById_Booking','_delete']),
  ...mapActions('room', ['getRoomTypes','get_All_Room','update_book_room','update_unbook_room','getById_Room']),
  ...mapActions('customer', ['get_All_Customer','getById_Customer']),
  ...mapActions('users', ['getById']),

  getRoomNo(id){
  //  this.getById_Room(id)
    return this.room.current.data[0].roomNo

  },
 getCustomer(){
//   this.getById_Customer(id)
   return this.customer.current.data[0].name
 },
 checkin(){
   return this.booking.current.data[0].cInDate
 },
 checkout(){
   return this.booking.current.data[0].cOutDate
 },
 username(){
   return this.user.current.data[0].name
 },

},
computed: {
 ...mapState({ booking: 'booking' }),
 ...mapState({ room: 'room' }),
 ...mapState({ customer: 'customer' }),
 ...mapState({account:'account'}),
 ...mapState({user: 'users'}),
},
  mounted(){
    this.getById_Booking(this.bookingid)
    this.getById(this.booking.current.data[0].userID)
//    this.getById_Room(this.booking.current.data[0].userID)
    this.getById_Customer(this.booking.current.data[0].cID)
  },
  created(){
     this.bookingid = this.$router.currentRoute.params.id

  //   console.log(this.$router.currentRoute.params.id)
  },
  data(){
    return{
      bookingid: '',
    }
  }
}
</script>
