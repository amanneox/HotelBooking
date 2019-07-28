<template>
  <div>
    <navbar/>
    <v-layout>
      <v-flex class="text-xs-right">
        <v-btn @click="createStaffDialoag = true" depressed color="#492c9c"><span style="color:#FFF">Create Staff</span><v-icon color="white">add</v-icon></v-btn>
      </v-flex>
    </v-layout>
    <div v-if="staff.staffs.Fetching">
    <v-progress-circular
    indeterminate
    color="primary"
  ></v-progress-circular>
  </div>
  <v-container v-else>
    <v-data-table
    :headers="headers"
    :items="staff.staffs.data"
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
      <td class="text-xs-left text-capitalize">{{ props.item.job }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.salary }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.number }}</td>
      <td class="text-xs-left text-capitalize">{{ props.item.isActive }}</td>
      <td @click="dialog = true" @click.prevent="$_editData(props.item._id)" class="text-xs-right"><v-btn depressed color="#5f2a8a">
        <span class="" style="color:#FFF">Edit</span><v-icon color="white" dark>edit</v-icon></v-btn>
      </td>
    </template>
  </v-data-table>
</v-container>
<v-dialog v-model="createStaffDialoag" persistent max-width="600px">
     <v-card>
       <v-card-title>
         <span class="headline">Create Staff</span>
       </v-card-title>
       <v-card-text>

         <v-container grid-list-md>
           <v-layout wrap>
             <v-flex xs12 md6>
               <v-text-field v-model="staffdata.name" outline label="Name" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="staffdata.job" outline label="Job" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="staffdata.salary" outline label="Salary" required></v-text-field>
             </v-flex>
             <v-flex xs12 md6>
               <v-text-field v-model="staffdata.number" outline label="Number" required></v-text-field>
             </v-flex>
           </v-layout>
         </v-container>
       </v-card-text>
       <v-card-actions>
         <v-spacer></v-spacer>
         <v-btn color="error" depressed  @click="createStaffDialoag = false">Close</v-btn>
         <v-btn @click.prevent="$_createStaff" color="success"  depressed @click="createStaffDialoag = false,snackbar = true">Save</v-btn>
       </v-card-actions>
     </v-card>
   </v-dialog>
   <v-dialog v-model="dialog" persistent max-width="600px">
        <v-card>
          <v-card-title>
            <span class="headline">Edit Staff</span>
          </v-card-title>
          <v-card-text>
            <div v-if="staff.current.Fetching">
            <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          </div>
            <v-container v-if="staff.current.data" grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="staff.current.data[0].name" :value="staff.current.data[0].name" outline label="Name*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="staff.current.data[0].job" :value="staff.current.data[0].job" outline label="Job*" required></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="staff.current.data[0].salary" :value="staff.current.data[0].salary" outline label="Salary*" required></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md6>
                  <v-text-field v-model="staff.current.data[0].number" :value="staff.current.data[0].number" outline label="Number*" required></v-text-field>
                </v-flex>
                <v-btn color="error" @click="dialog = false,snackbar = true" @click.prevent="$_deleteStaff(staff.current.data[0]._id)" depressed>Delete</v-btn>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>

            <v-btn color="error" depressed  @click="dialog = false">Close</v-btn>
            <v-btn color="success" depressed @click.prevent="$_editDataStaff(staff.current.data[0]._id)" @click="dialog = false,snackbar = true">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
   <v-snackbar
     v-model="snackbar"
     bottom
     color="#5f2a8a"
     right>
     {{staff.msg}}
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
     ...mapActions('staff', ['create','get_All_Staff','getById','_delete','update']),
    $_editData(id){
      this.getById(id)
    },
    $_editDataStaff(id){
      //console.log(id)
    //  console.log(this.staff.current[0])
      this.update(this.staff.current.data[0])
    },
    $_createStaff(){
    //  console.log(this.staffdata)
  //   this.staffdata.rating = parseInt(this.staffdata.rating)
     this.create(this.staffdata)
    },

   $_deleteStaff(id){
      this._delete(id)
   },
    //    ...mapActions('offers', ['get_All_Staff','get_All_Staff_Banner'])
  },
  mounted () {
       this.get_All_Staff()
    //   this.getRoomTypes();

  },
  computed: {
   ...mapState({ staff: 'staff' }),
  },
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      dialog: false,
      createStaffDialoag: false,
      staffdata:{
        name:'',
        job:'',
        salary:'',
        number:'',
      },
      headers: [
        {
          text: 'Staff Name',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Job', value: 'job' },
        { text: 'Salary', value: 'salary' },
        { text: 'Number', value: 'number' },
        { text: 'isActive', value: 'isActive' },
      ],
    }
  }
}

</script>
