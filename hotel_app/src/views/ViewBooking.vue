<template>
  <div>
    <navbar/>
    <v-container>
      <div v-if="this.booking.current.Fetching">
      <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
    </div>
      <v-card v-else>
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
        <v-btn @click.prevent="generateBill()" fab icon style="float:left;margin:1px;" color="success"><font-awesome-icon size="2x" class="" icon="file-invoice" /></v-btn>
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
  ...mapActions('room', ['getRoomTypes','get_All_Room','update_book_room','update_unbook_room','getById_Room','getById_RoomType']),
  ...mapActions('customer', ['get_All_Customer','getById_Customer']),
  ...mapActions('users', ['getById']),
  ...mapActions('rent', ['create_Rent']),
    generateBill(){
    let amount = 0;

    if(typeof this.booking.current.data === 'undefined')
    return 'undefined'
    const rooms = this.booking.current.data[0].roomList

    rooms.forEach((room, index) => {
      const roomvar = this.getById_Room(room)

      const days = Math.floor(( Date.parse(this.booking.current.data[0].cOutDate) - Date.parse(this.booking.current.data[0].cInDate) ) / 86400000)
    //  console.log(days)
      if(typeof this.room.current.data[0] != 'undefined'){
      const type = this.room.current.data[0].roomType
      const typevar = this.getById_RoomType(type)
      if(typeof this.room.currentType.data[0] != 'undefined'){
      const price = this.room.currentType.data[0].roomPrice
      amount = amount + parseInt(price)*days
    }
    }
    })
    const rent = {
      'amount': amount,
      'cID': this.customer.current.data[0]._id
    }
    this.create_Rent(rent)
    const id = this.booking.current.data[0]._id
    const roomList = this.booking.current.data[0].roomList
    const data = {
      id,
      roomList
    }

    this._delete(data)
    this.update_unbook_room(roomList)
    this.$router.push('/bookings') 
  },

  getRoomNo(id){
    if(typeof this.room.current.data === 'undefined')
    return 'undefined'
  //  this.getById_Room(id)
    return this.room.current.data[0].roomNo

  },
 getCustomer(){
//   this.getById_Customer(id)
   if(typeof this.customer.current.data === 'undefined')
   return 'undefined'

   return this.customer.current.data[0].name
 },
 checkin(){
   if(typeof this.booking.current.data === 'undefined')
   return 'undefined'
   return this.booking.current.data[0].cInDate
 },
 checkout(){
   if(typeof this.booking.current.data === 'undefined')
   return 'undefined'
   return this.booking.current.data[0].cOutDate
 },
 username(){
   if(typeof this.user.current.data === 'undefined')
   return 'undefined'
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

  },
  created(){
     this.bookingid = this.$router.currentRoute.params.id
     this.getById_Booking(this.bookingid)
     this.getById(this.booking.current.data[0].userID)
 //    this.getById_Room(this.booking.current.data[0].userID)
     this.getById_Customer(this.booking.current.data[0].cID)
  //   console.log(this.$router.currentRoute.params.id)
  },
  data(){
    return{
      bookingid: '',
    }
  }
}
</script>
