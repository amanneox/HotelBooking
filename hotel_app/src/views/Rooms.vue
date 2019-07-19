<template lang="html">
<div>
  <navbar/>
  <v-layout>
    <v-flex class="text-xs-right">
     <v-btn @click="roomTypeDialog = true" depressed color="#492c9c"><span class="" style="color:#FFF">Create RoomType</span><v-icon color="white" dark>add</v-icon></v-btn>

      <v-btn @click="createRoomDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Room</span><v-icon color="white">add</v-icon></v-btn>
    </v-flex>
  </v-layout>
  <v-container>
    <v-data-table
    :headers="headers"
    :items="room.all.items"
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
      <td class="text-xs-left text-capitalize">{{ props.item.roomType }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.rating }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.roomNo }}</td>
      <td class="text-xs-left text-capitalize">{{ getRoomPrice(props.item.roomType) }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.isReserved }}</td>
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn depressed color="#5f2a8a"><span class="" style="color:#FFF">Edit</span><v-icon color="white" dark>edit</v-icon></v-btn></td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createRoomDialoag" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Room</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md6>
               <v-text-field v-model="roomdata.roomNo" outline label="Room No" required></v-text-field>
             </v-flex>
             <v-flex xs8 md8>
                 <v-select v-model="roomdata.roomType" :items="room.types.types" item-text="roomType" label="Room Type" required outline></v-select>
             </v-flex>
             <v-flex xs4 md4>
               <v-btn depressed color="primary" @click.prevent="$_getTypes">Fetch</v-btn>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="roomdata.rating" outline label="Room Rating" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="roomdata.imageList.img_url" outline label="Images" required></v-text-field>
             </v-flex>
             <v-flex xs12>
               <v-textarea v-model="roomdata.description" outline label="Description" required></v-textarea>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createRoomDialoag = false">Close</v-btn>
         <v-btn @click.prevent="$_createRoom" color="success"  depressed @click="createRoomDialoag = false">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
<v-dialog v-model="roomTypeDialog" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Room Type</span>
       </v-card-title>
       <v-card-text>
         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12>
               <v-text-field v-model="roomType.roomType" outline label="Room Type" required></v-text-field>
             </v-flex>
             <v-flex xs12>
               <v-text-field v-model="roomType.roomPrice" outline label="Room Price" required></v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="roomTypeDialog = false">Close</v-btn>
         <v-btn color="success" depressed @click.prevent="$_createRoomType" @click="roomTypeDialog = false">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
<v-dialog v-model="dialog" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Edit Room</span>
       </v-card-title>
       <v-card-text>
         <v-container v-if="room.current[0]" grid-list-md>
           <v-layout wrap>
             <v-flex xs12 sm6 md6>
               <v-text-field :value="room.current[0].roomNo" outline label="Room No*" required></v-text-field>
             </v-flex>
             <v-flex xs12 sm6 md6>
               <v-text-field :value="room.current[0].rating" outline label="Rating*" required></v-text-field>
             </v-flex>

             <v-flex xs12>
               <v-textarea :value="room.current[0].description"  label="Description*" outline required></v-textarea>
             </v-flex>
             <v-btn color="error" @click="dialog = false" @click.prevent="$_deleteRoom(room.current[0]._id)" depressed>Delete</v-btn>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>

         <v-btn color="error" depressed  @click="dialog = false">Close</v-btn>
         <v-btn color="success"  depressed @click="dialog = false">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>

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
     ...mapActions('room', ['createType','getRoomTypes','create','get_All','getById','_delete']),
    $_editData(id){
      this.getById(id)
    },
    $_createRoomType(){
      //console.log(this.roomType)
      this.createType(this.roomType)
    },
    $_createRoom(){
    //  console.log(this.roomdata)
     this.roomdata.rating = parseInt(this.roomdata.rating)
     this.create(this.roomdata)
    },
    $_getTypes(){
      this.getRoomTypes();
    },
    getRoomPrice(roomType){
      const obj = this.room.types.types.find(o => o.roomType === roomType)
      return obj.roomPrice
   },
   $_deleteRoom(id){
       this._delete(id)
   },
    //    ...mapActions('offers', ['get_All','get_All_Banner'])
  },
  mounted () {
       this.get_All()
       this.getRoomTypes();
    //    this.get_All_Banner()
  },
  computed: {
   ...mapState({ room: 'room' }),



  },
  data () {
      return {
        roomType:{
          roomType:'',
          roomPrice:'',
        },
        roomdata:{
          roomNo:'',
          description:'',
          rating:'',
          roomType:'',
          imageList:[
          {
            img_url: ''
          }
          ],
        },
        dialog: false,
        roomTypeDialog: false,
        createRoomDialoag:false,
        headers: [
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
        /*
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            protein: 4.0,
            iron: '1%'
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            protein: 4.3,
            iron: '1%'
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            protein: 6.0,
            iron: '7%'
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            protein: 4.3,
            iron: '8%'
          },
          {
            name: 'Gingerbread',
            calories: 356,
            fat: 16.0,
            carbs: 49,
            protein: 3.9,
            iron: '16%'
          },
          {
            name: 'Jelly bean',
            calories: 375,
            fat: 0.0,
            carbs: 94,
            protein: 0.0,
            iron: '0%'
          },
          {
            name: 'Lollipop',
            calories: 392,
            fat: 0.2,
            carbs: 98,
            protein: 0,
            iron: '2%'
          },
          {
            name: 'Honeycomb',
            calories: 408,
            fat: 3.2,
            carbs: 87,
            protein: 6.5,
            iron: '45%'
          },
          {
            name: 'Donut',
            calories: 452,
            fat: 25.0,
            carbs: 51,
            protein: 4.9,
            iron: '22%'
          },
          {
            name: 'KitKat',
            calories: 518,
            fat: 26.0,
            carbs: 65,
            protein: 7,
            iron: '6%'
          }
        ]
        */
      }
    }
}
</script>
