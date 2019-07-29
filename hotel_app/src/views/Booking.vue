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

    <v-flex xs12 md4>
    <v-text-field
    v-model="search"
    append-icon="search"
    label="Search"
    single-line
    solo
    hide-details>
  </v-text-field>
  </v-flex>

    <v-data-table
    :headers="headers"
    :search="search"
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
<v-dialog v-model="createBookingDialoag" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
     <v-card>
       <v-card-title>
         <span class="headline">Create Booking</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md4>
               <HotelDatePicker @check-in-changed="logCheckout($event)" @check-out-changed="logCheckin($event)" format="DD/MM/YYYY">
               </HotelDatePicker>
             </v-flex>

           </v-layout>
           <v-layout wrap row>
             <v-flex xs12 md4>
               <v-text-field
               v-model="searchuser"
               append-icon="search"
               label="Search"
               single-line
               solo
               hide-details>
             </v-text-field>
             </v-flex>
           </v-layout>
          <v-layout wrap row>
            <v-flex xs12 md6>
              <v-data-table :search="searchuser" dense :headers="customerheader" :items="customer.customers.data" item-key="name" class="elevation-1">
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
                  <td class="text-xs-left text-capitalize">{{ props.item.name }}</td>
                  <td class="text-xs-left text-capitalize">{{ props.item.number }}</td>
                  <td class="text-xs-left text-capitalize">{{ props.item.email }}</td>
                  <td><v-checkbox
                    v-model="ex4"
                    label="select"
                    color="success"
                    value="success"
                    hide-details>
                  </v-checkbox>
                </td>

                </template>
              </v-data-table>
            </v-flex>
            <v-flex>
              <v-data-table dense :headers="roomheader" :items="room.rooms.data" item-key="roomNo" class="elevation-1">
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
                  <td class="text-xs-left text-capitalize">{{ props.item.roomType }}</td>
                  <td class="text-xs-left text-capitalize">{{ props.item.rating }}</td>
                  <td class="text-xs-left text-capitalize">{{ props.item.roomNo }}</td>
                  <td class="text-xs-left text-capitalize">{{ getRoomPrice(props.item.roomType) }}</td>
                  <td class="text-xs-left text-capitalize">{{ props.item.isReserved }}</td>
                  <td><v-checkbox
                    v-model="ex4"
                    label="select"
                    color="success"
                    value="success"
                    hide-details>
                  </v-checkbox>
                </td>
                </template>
              </v-data-table>
            </v-flex>
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
    getRoomPrice(roomType){
      const obj = this.room.types.data.find(o => o.roomType === roomType)
      return obj.roomPrice
   },
    logCheckin(date) {
      this.bookingdata.cInDate = date
   },
   logCheckout(date) {
     this.bookingdata.cOutDate = date
//    console.log(date);
  },
     ...mapActions('booking', ['create','get_All_Booking','getById','_delete','update']),
        ...mapActions('room', ['createType','getRoomTypes','create','get_All_Room','getById','_delete','update']),
        ...mapActions('customer', ['create','get_All_Customer','getById','_delete','update']),
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
  //   this.create(this.bookingdata)
  //console.log(this.mydate,'44')
    },

   $_deleteBooking(id){
      this._delete(id)
   },
    //    ...mapActions('offers', ['get_All_Booking','get_All_Booking_Banner'])
  },
  mounted () {
       this.get_All_Customer()
          this.getRoomTypes();
        this.get_All_Room()
       this.get_All_Booking()
    //   this.getRoomTypes();

  },
  computed: {
   ...mapState({ booking: 'booking' }),
      ...mapState({ room: 'room' }),
   ...mapState({ customer: 'customer' }),
  },
  data() {
    return {
      mydate: '',
      snackbar: false,
      timeout: 6000,
      dialog: false,
      search: '',
      searchuser:'',
      createBookingDialoag: false,
      bookingdata:{
        cID:'',
        cInDate:'',
        cOutDate:'',
        romList:[
        ],
      },
      customerheader: [
        {
          text: 'Customer Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Number', value: 'number' },
        { text: 'Email', value: 'email' },

      ],
      roomheader: [
        {
          text: 'Room Type',
          align: 'left',
          sortable: false,
          value: 'roomType'
        },
        { text: 'Rating', value: 'rating' },
        { text: 'Room No', value: 'roomNo' },
        { text: 'Room Price', value: 'roomPrice' },
        { text: 'Reserved', value: 'isReserved' },
      ],
      headers: [
        {
          text: 'Booking ID',
          align: 'left',
          sortable: false,
          value: '_id'
        },
        { text: 'Customer ID', value: 'cID' },
        { text: 'User ID', value: 'userID' },
        { text: 'Rooms', value:'roomList' },
        { text: 'Check In', value: 'cInDate' },
        { text: 'Check Out', value: 'cOutDate' },
      ],
    }
  }
}

</script>
