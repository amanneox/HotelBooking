<template>
  <div>
    <navbar/>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn @click="createGroceryDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Grocery</span><v-icon color="white">add</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <div v-if="grocery.grocerys.Fetching">
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
    :headers="headers"
    :search="search"
    :items="grocery.grocerys.data"
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
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn icon depressed color="#fff">
        <font-awesome-icon style="color:#5f2a8a" size="lg" icon="edit" /></v-btn>
      </td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createGroceryDialoag" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Grocery</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md6>
               <v-text-field v-model="grocerydata.name" outline label="Name" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="grocerydata.quantity" outline label="Quantity" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="grocerydata.unit" outline label="Unit" required></v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createGroceryDialoag = false">Close</v-btn>
         <v-btn @click.prevent="$_createGrocery" color="success"  depressed @click="createGroceryDialoag = false,snackbar = true">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Grocery</span>
          </v-card-title>
          <v-card-text>
               <v-text-field v-if="grocery.current.Fetching"  color="success" loading disabled></v-text-field>
            <v-container v-if="grocery.current.data" grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="grocery.current.data[0].name" :value="grocery.current.data[0].name" outline label="Name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="grocery.current.data[0].quantity" :value="grocery.current.data[0].quantity" outline label="Quantity*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md>
                  <v-text-field v-model="grocery.current.data[0].unit" :value="grocery.current.data[0].unit" outline label="Unit*" required></v-text-field>
                </v-flex>
                <v-spacer></v-spacer>
                <v-btn color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteGrocery(grocery.current.data[0]._id)" depressed>Delete</v-btn>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" depressed  @click="dialog = false">Close</v-btn>
            <v-btn color="success" depressed @click.prevent="$_editDataGrocery(grocery.current.data[0]._id)" @click="dialog = false,snackbar = true">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   <v-snackbar
     v-model="snackbar"
     bottom
     color="#5f2a8a"
     right>
     {{grocery.msg}}
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
     ...mapActions('grocery', ['create','get_All_Grocery','getById','_delete','update']),
    $_editData(id){
      this.getById(id)
    },
    $_editDataGrocery(id){
      //console.log(id)
    //  console.log(this.grocery.current[0])
      this.update(this.grocery.current.data[0])
    },
    $_createGrocery(){
    //  console.log(this.grocerydata)
  //   this.grocerydata.rating = parseInt(this.grocerydata.rating)
     this.create(this.grocerydata)
    },

   $_deleteGrocery(id){
      this._delete(id)
   },
    //    ...mapActions('offers', ['get_All_Grocery','get_All_Grocery_Banner'])
  },
  mounted () {
       this.get_All_Grocery()
    //   this.getRoomTypes();

  },
  computed: {
   ...mapState({ grocery: 'grocery' }),
  },
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      dialog: false,
      search:'',
      createGroceryDialoag: false,
      grocerydata:{
        name:'',
        job:'',
        salary:'',
        number:'',
      },
      headers: [
        {
          text: 'Grocery Name',
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
