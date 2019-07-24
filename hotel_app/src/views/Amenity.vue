<template>
  <div>
    <navbar/>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn @click="createAmenityDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Amenity</span><v-icon color="white">add</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <div v-if="amenity.amenitys.Fetching">
    <v-progress-circular
    indeterminate
    color="primary"
  ></v-progress-circular>
  </div>
  <v-container v-else>
    <v-data-table
    :headers="headers"
    :items="amenity.amenitys.data"
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
      <td class="text-xs-left text-capitalize">{{ props.item.name }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.quantity }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.unit }}</td>
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn depressed color="#5f2a8a">
        <span class="" style="color:#FFF">Edit</span><v-icon color="white" dark>edit</v-icon></v-btn>
      </td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createAmenityDialoag" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Amenity</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md6>
               <v-text-field v-model="amenitydata.name" outline label="Name" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="amenitydata.quantity" outline label="Quantity" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="amenitydata.unit" outline label="Unit" required></v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createAmenityDialoag = false">Close</v-btn>
         <v-btn @click.prevent="$_createAmenity" color="success"  depressed @click="createAmenityDialoag = false,snackbar = true">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Amenity</span>
          </v-card-title>
          <v-card-text>
            <div v-if="amenity.current.Fetching">
            <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          </div>
            <v-container v-if="amenity.current.data" grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="amenity.current.data[0].name" :value="amenity.current.data[0].name" outline label="Name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="amenity.current.data[0].quantity" :value="amenity.current.data[0].quantity" outline label="Quantity*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md>
                  <v-text-field v-model="amenity.current.data[0].unit" :value="amenity.current.data[0].unit" outline label="Unit*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteAmenity(amenity.current.data[0]._id)" depressed>Delete</v-btn>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" depressed  @click="dialog = false">Close</v-btn>
            <v-btn color="success" depressed @click.prevent="$_editDataAmenity(amenity.current.data[0]._id)" @click="dialog = false,snackbar = true">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   <v-snackbar
     v-model="snackbar"
     bottom
     color="#5f2a8a"
     right>
     {{amenity.msg}}
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
     ...mapActions('amenity', ['create','get_All','getById','_delete','update']),
    $_editData(id){
      this.getById(id)
    },
    $_editDataAmenity(id){
      //console.log(id)
    //  console.log(this.amenity.current[0])
      this.update(this.amenity.current.data[0])
    },
    $_createAmenity(){
    //  console.log(this.amenitydata)
  //   this.amenitydata.rating = parseInt(this.amenitydata.rating)
     this.create(this.amenitydata)
    },

   $_deleteAmenity(id){
      this._delete(id)
   },
    //    ...mapActions('offers', ['get_All','get_All_Banner'])
  },
  mounted () {
       this.get_All()
    //   this.getRoomTypes();

  },
  computed: {
   ...mapState({ amenity: 'amenity' }),
  },
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      dialog: false,
      createAmenityDialoag: false,
      amenitydata:{
        name:'',
        job:'',
        salary:'',
        number:'',
      },
      headers: [
        {
          text: 'Amenity Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Unit', value: 'unit' },

      ],
    }
  }
}

</script>
