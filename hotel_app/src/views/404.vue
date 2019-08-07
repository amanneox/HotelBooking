<template>
  <div>
    <navbar/>
    <p style="color:#78909C" class="display-3">404</p>
    <p class="title"> Oops! This Page Could Not Be Found </p>
    <p class="title">Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable
      Go To <router-link to="/">Homepage</router-link>
    </p>
  </div>
</template>
<script>
/* eslint-disable */
import navbar from '@/components/Navbar.vue'
export default {
  components:{
    navbar
  },
}
</script>
