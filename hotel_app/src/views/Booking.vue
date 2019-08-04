<template>
  <div>
    <navbar/>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn @click="createBookingDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Booking</span><v-icon color="white">add</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <div v-if="this.booking.bookings.Fetching">
    <v-progress-circular
    indeterminate
    color="primary"
  ></v-progress-circular>
  </div>
  <v-container v-else>

    <v-flex xs12 offset-md8 py-3>
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
    v-if="this.booking.bookings.data"
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

      <td class="text-xs-right"><v-btn :to="`/booking/${ props.item._id }`" icon depressed color="#fff">
        <font-awesome-icon style="color:#5f2a8a" size="lg" icon="eye" /></v-btn>
      </td>
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn icon depressed color="#fff">
        <font-awesome-icon style="color:#5f2a8a" size="lg" icon="trash-alt" /></v-btn>
      </td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createBookingDialoag" persistent fullscreen hide-overlay transition="dialog-bottom-transition">
     <v-card>
       <v-toolbar dark color="#5f2a8a">
        <v-btn icon dark @click="createBookingDialoag = false">
          <v-icon color="white">close</v-icon>
        </v-btn>
        <v-toolbar-title>Create Booking</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn depressed color="#5f2a8a" @click.prevent="$_createBooking"  text @click="createBookingDialoag = false"><font-awesome-icon icon="save" />&nbsp;&nbsp;Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md4>
               <HotelDatePicker @check-in-changed="logCheckin($event)" @check-out-changed="logCheckout($event)" format="DD/MM/YYYY">
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
              <v-data-table v-if="this.customer.customers.data" :search="searchuser" dense :headers="customerheader" :items="customer.customers.data" item-key="name" class="elevation-1">
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
                  <td>
                    <input type="radio" class="customer-radio" :value="`${props.item._id}`" v-model="bookingdata.cID">
                </td>

                </template>
              </v-data-table>
            </v-flex>
            <v-flex>
              <v-data-table v-if="this.room.rooms.data" dense :headers="roomheader" :items="room.rooms.data" item-key="roomNo" class="elevation-1">
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
                  <td v-if="props.item.isReserved == true">
                    <v-checkbox
                    v-model="checkedrooms"
                    label="Booked"
                    color="error"
                    disabled
                    hide-details>
                  </v-checkbox>
                </td>
                  <td v-else>
                    <v-checkbox
                    v-model="checkedrooms"
                    label="Select"
                    color="success"
                    :value="`${props.item._id}`"
                    hide-details>
                  </v-checkbox>
                </td>
                </template>
              </v-data-table>
            </v-flex>
          </v-layout>
         </v-container>
       </v-card-text>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="320">
        <v-card>
          <v-card-title>
            <span class="headline">Delete Booking</span>
                <v-text-field v-if="this.booking.current.Fetching"  color="success" loading disabled></v-text-field>
            </v-card-title>
          <v-card-text class="text-capitalize">
            Are You Sure ? You want to delete this Booking
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="green darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteBooking(booking.current.data[0]._id,booking.current.data[0].roomList)" depressed>Delete</v-btn>
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
      if(typeof this.room.types.data === 'undefined')
      return ''
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
     ...mapActions('booking', ['create','get_All_Booking','getById_Booking','_delete','update']),
     ...mapActions('room', ['getRoomTypes','get_All_Room','updateRoom','update_book_room','update_unbook_room']),
     ...mapActions('customer', ['get_All_Customer','getById_Customer']),
    $_editData(id){
      this.getById_Booking(id)
    },
    getCustomer(id){
      this.getById_Customer(id)
      return this.customer.current.data[0].name
    },
    $_editDataBooking(id){
      //console.log(id)
    //  console.log(this.booking.current[0])
      this.update(this.booking.current.data[0])
    },
    $_createBooking(){

     this.bookingdata.roomList = this.checkedrooms
     this.bookingdata.userID = this.account.user._id
  //   console.log(this.bookingdata)
      if(this.bookingdata.cID !=='' && this.checkedrooms.length >0 && this.bookingdata.cInDate !=='' && this.bookingdata.cOutDate !==''){
        this.create(this.bookingdata)
        this.update_book_room(this.bookingdata.roomList)
        this.checkedrooms = []
        this.bookingdata.cID = ''
        this.bookingdata.cInDate = ''
        this.bookingdata.cOutDate = ''
        this.snackbar = true
      }
      else{
        this.booking.msg = "Failed"
        this.snackbar = true
      }
  //   this.get_All_Room()
    },

   $_deleteBooking(id,roomList){
     const data = {
       id,
       roomList
     }
    // console.log(data)
     this._delete(data)
     this.update_unbook_room(roomList)
    // this.get_All_Room()
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
   ...mapState({account:'account'}),
  },
  data() {
    return {
      checkedrooms:[],
      mydate: '',
      snackbar: false,
      timeout: 6000,
      dialog: false,
      search: '',
      searchuser:'',
      createBookingDialoag: false,
      bookingdata:{
        cID:'',
        userID:'',
        cInDate:'',
        cOutDate:'',
        roomList:[
          {
              roomID:''
          }

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
