<template lang="html">
  <account :user="[account.user]"/>
</template>

<script>
/* eslint-disable */
import { mapGetters ,mapState } from 'vuex'
import account from '@/components/Account.vue'
export default {
  components:{
    account
  },
  computed: {
   ...mapState({account:'account', status:['status'],user:['user']}),
 },
 mounted(){
 },
  created(){
      const loggedIn = localStorage.getItem('user')
      if (!loggedIn) {
        this.$router.push('/login')
      }
  }
}
</script>

<style lang="css">
</style>
