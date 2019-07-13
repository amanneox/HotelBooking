<template lang="html">
<div>
  <navbar/>

</div>
</template>
<script>

import navbar from '@/components/Navbar.vue'
// import { mapState, mapActions, mapGetters } from 'vuex'
export default {
  components: {
    navbar

  },
  methods: {
    //    ...mapActions('offers', ['get_All','get_All_Banner'])
  },
  mounted () {
    //    this.get_All(),
    //    this.get_All_Banner()
  },
  computed: {
    // ...mapState({ offers: 'offers' }),

  },
  data: () => ({
  })
}
</script>
