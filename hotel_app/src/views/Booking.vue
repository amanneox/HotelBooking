<template>
  <div>
    <navbar/>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn @click="createBookingDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Booking</span><v-icon color="white">add</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <div v-if="booking.bookings.Fetching">
    <v-progress-circular
    indeterminate
    color="primary"
  ></v-progress-circular>
  </div>
  <v-container v-else>
    <v-data-table
    :headers="headers"
    :items="booking.bookings.data"
    class="elevation-1"
  >
    <template slot="headerCell" slot-scope="props">
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <span v-on="on">
            {{ props.header.text }}
          </span>
        </template>
        <span>
          {{ props.header.text }}
        </span>
      </v-tooltip>
    </template>
    <template v-slot:items="props">
      <td class="text-xs-left text-capitalize">{{ props.item._id }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.cID }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.userID }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.roomList }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.cInDate }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.cOutDate }}</td>
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn depressed color="#5f2a8a">
        <span class="" style="color:#FFF">Edit</span><v-icon color="white" dark>edit</v-icon></v-btn>
      </td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createBookingDialoag" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Booking</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createBookingDialoag = false">Close</v-btn>
         <v-btn @click.prevent="$_createBooking" color="success"  depressed @click="createBookingDialoag = false,snackbar = true">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Booking</span>
          </v-card-title>
          <v-card-text>
            <div v-if="booking.current.Fetching">
            <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          </div>
            <v-container v-if="booking.current.data" grid-list-md>
              <v-layout wrap>    
                <v-btn color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteBooking(booking.current.data[0]._id)" depressed>Delete</v-btn>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" depressed  @click="dialog = false">Close</v-btn>
            <v-btn color="success" depressed @click.prevent="$_editDataBooking(booking.current.data[0]._id)" @click="dialog = false,snackbar = true">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   <v-snackbar
     v-model="snackbar"
     bottom
     color="#5f2a8a"
     right>
     {{booking.msg}}
     <v-btn
       color="white"
       flat
       @click="snackbar = false"
     >
       Close
     </v-btn>
   </v-snackbar>
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
  methods: {
     ...mapActions('booking', ['create','get_All_Booking','getById','_delete','update']),
    $_editData(id){
      this.getById(id)
    },
    $_editDataBooking(id){
      //console.log(id)
    //  console.log(this.booking.current[0])
      this.update(this.booking.current.data[0])
    },
    $_createBooking(){
    //  console.log(this.bookingdata)
  //   this.bookingdata.rating = parseInt(this.bookingdata.rating)
     this.create(this.bookingdata)
    },

   $_deleteBooking(id){
      this._delete(id)
   },
    //    ...mapActions('offers', ['get_All_Booking','get_All_Booking_Banner'])
  },
  mounted () {
       this.get_All_Booking()
    //   this.getRoomTypes();

  },
  computed: {
   ...mapState({ booking: 'booking' }),
  },
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      dialog: false,
      createBookingDialoag: false,
      bookingdata:{
        name:'',
        cInData:'',
        cOutDate:'',
        romList:[
        ],
      },
      headers: [
        {
          text: 'Booking ID',
          align: 'left',
          sortable: false,
          value: '_id'
        },
        { text: 'Customer ID', value: 'cID' },
        { text: 'User ID', value: 'userID' },
        { text: 'Rooms', value:'roomList' }
        { text: 'cInDate', value: 'cInDate' },
        { text: 'cOutDate', value: 'cOutDate' },
      ],
    }
  }
}

</script>
