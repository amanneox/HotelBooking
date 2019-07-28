<template>
  <div>
    <navbar/>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn @click="createCustomerDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Customer</span><v-icon color="white">add</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <div v-if="customer.customers.Fetching">
    <v-progress-circular
    indeterminate
    color="primary"
  ></v-progress-circular>
  </div>
  <v-container v-else>
    <v-data-table
    :headers="headers"
    :items="customer.customers.data"
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
      <td class="text-xs-left text-capitalize">{{ props.item.number }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.email }}</td>
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn depressed color="#5f2a8a">
        <span class="" style="color:#FFF">Edit</span><v-icon color="white" dark>edit</v-icon></v-btn>
      </td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createCustomerDialoag" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Customer</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md6>
               <v-text-field v-model="customerdata.name" outline label="Name" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="customerdata.number" outline label="Number" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="customerdata.email" outline label="Email" required></v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createCustomerDialoag = false">Close</v-btn>
         <v-btn @click.prevent="$_createCustomer" color="success"  depressed @click="createCustomerDialoag = false,snackbar = true">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Customer</span>
          </v-card-title>
          <v-card-text>
            <div v-if="customer.current.Fetching">
            <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          </div>
            <v-container v-if="customer.current.data" grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="customer.current.data[0].name" :value="customer.current.data[0].name" outline label="Name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="customer.current.data[0].number" :value="customer.current.data[0].number" outline label="Number*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="customer.current.data[0].email" :value="customer.current.data[0].email" outline label="Email*" required></v-text-field>
                </v-flex>
                <v-flex>
                  <v-btn style="float:left" color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteCustomer(customer.current.data[0]._id)" depressed>Delete</v-btn>
                </v-flex>

              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" depressed  @click="dialog = false">Close</v-btn>
            <v-btn color="success" depressed @click.prevent="$_editDataCustomer(customer.current.data[0]._id)" @click="dialog = false,snackbar = true">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   <v-snackbar
     v-model="snackbar"
     bottom
     color="#5f2a8a"
     right>
     {{customer.msg}}
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
     ...mapActions('customer', ['create','get_All_Customer','getById','_delete','update']),
    $_editData(id){
      this.getById(id)
    },
    $_editDataCustomer(id){
      //console.log(id)
    //  console.log(this.customer.current[0])
      this.update(this.customer.current.data[0])
    },
    $_createCustomer(){
    //  console.log(this.customerdata)
  //   this.customerdata.rating = parseInt(this.customerdata.rating)
     this.create(this.customerdata)
    },

   $_deleteCustomer(id){
      this._delete(id)
   },
    //    ...mapActions('offers', ['get_All_Customer','get_All_Customer_Banner'])
  },
  mounted () {
       this.get_All_Customer()
    //   this.getRoomTypes();

  },
  computed: {
   ...mapState({ customer: 'customer' }),
  },
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      dialog: false,
      createCustomerDialoag: false,
      customerdata:{
        name:'',
        number:'',
        email:'',
      },
      headers: [
        {
          text: 'Customer Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Number', value: 'number' },
        { text: 'Email', value: 'email' },

      ],
    }
  }
}

</script>
