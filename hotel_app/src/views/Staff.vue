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
    </template>
  </v-data-table>
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
  data() {
    return {
      snackbar: false,
      timeout: 6000,
      dialog: false,
      createStaffDialoag: false,
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
