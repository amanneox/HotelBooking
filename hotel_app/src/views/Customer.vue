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
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn icon depressed color="#fff">
        <font-awesome-icon style="color:#5f2a8a" size="lg" icon="edit" /></v-btn>
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
           <v-form data-vv-scope="createcustomer">
           <v-layout  wrap>
             <v-flex xs12 md6>
               <v-text-field v-validate="'required|alpha_spaces'" name="name" v-model="customerdata.name" outline label="Name" required></v-text-field>

             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-validate="'required|digits:10'" name="number" v-model="customerdata.number" outline label="Number" required></v-text-field>

             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-validate="'required|email'" name="email" v-model="customerdata.email" outline label="Email" required></v-text-field>

             </v-flex>
           </v-layout>
            <li class="error-list" style="color:red;" v-for="error in errors.all('createcustomer')">{{ error }}</li>
         </v-form>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createCustomerDialoag = false">Close</v-btn>
         <v-btn :disabled="errors.any('createcustomer')" @click.prevent="$_createCustomer" color="success"  depressed @click="createCustomerDialoag = false">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Customer</span>
          </v-card-title>
          <v-card-text>
              <v-text-field v-if="customer.current.Fetching"  color="success" loading disabled></v-text-field>

            <v-container v-if="customer.current.data" grid-list-md>
              <v-form data-vv-scope="editcustomer">
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-validate="'required|alpha_spaces'" name="name" v-model="customer.current.data[0].name" :value="customer.current.data[0].name" outline label="Name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-validate="'required|digits:10'" name="number" v-model="customer.current.data[0].number" :value="customer.current.data[0].number" outline label="Number*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-validate="'required|email'" name="email" v-model="customer.current.data[0].email" :value="customer.current.data[0].email" outline label="Email*" required></v-text-field>
                </v-flex>
                <v-flex>
                  <v-btn :disabled="errors.any('editcustomer')" style="float:left" color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteCustomer(customer.current.data[0]._id)" depressed>Delete</v-btn>
                </v-flex>
              </v-layout>
                <li class="error-list" style="color:red;" v-for="eerror in errors.all('editcustomer')">{{ eerror }}</li>
            </v-form>
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
      this.$validator.validateAll('editcustomer').then((result) => {
        if(!result){
      //    console.log("error")
          return
        }
        else{
        //  console.log("no error")
          this.update(this.customer.current.data[0])
          this.snackbar = true
        }
      })
      //console.log(id)
    //  console.log(this.customer.current[0])

    },

    $_createCustomer(){

      this.$validator.validateAll('createcustomer').then((result) => {
        if(!result){
      //    console.log("error")
          return
        }
        else{
        //  console.log("no error")
          this.create(this.customerdata)
          this.snackbar = true
        }
      })





    //  console.log(this.customerdata)
  //   this.customerdata.rating = parseInt(this.customerdata.rating)

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
      search:'',
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
