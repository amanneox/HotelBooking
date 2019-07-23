<!-- eslint-disable -->
<template lang="html">
  <div class="">
  <v-toolbar dark color="#f6f5fa" class="elevation-0">
    <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

    <v-toolbar-title class="black--text">Hotel Manager</v-toolbar-title>

    <v-spacer></v-spacer>
    <v-btn to="/cart" icon>
    <v-badge right color="red">
      <span slot="badge" class="">{{itemsInCart}}</span>
      <font-awesome-icon size="lg" class="navbar-icon-top" icon="address-book" />
    </v-badge>
  </v-btn>
  <v-btn to="/wishlist" icon>
  <v-badge right color="red">
    <span slot="badge" class="">{{itemsInWish}}</span>
    <font-awesome-icon size="lg" class="navbar-icon-top" icon="bell" />
  </v-badge>
</v-btn>
    <v-btn :to="`/${item.link}`" icon v-for="item in icons" :key="item.icon">
       <font-awesome-icon size="lg" class="navbar-icon-top" :icon="`${item.icon}`" />
    </v-btn>
  </v-toolbar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      class="sidebar"
      temporary
    >
      <v-list class="pa-1 logo-head">
        <v-list-tile avatar>
          <v-list-tile-avatar>
            <img src="../assets/man.svg">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title class="white--text font-weight-bold" color="white">Hotel Manager</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-1" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in categories"
          :key="item.title"
          :to="`${item.link}`"
          @click="">

          <v-list-tile-action>
             <font-awesome-icon class="navbar-icons" size="lg" :icon="`${item.icon}`" />
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text font-weight-bold">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
      <v-list class="pt-2" dense>
        <v-divider></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="`${item.link}`"
          @click="">

          <v-list-tile-action>
             <font-awesome-icon size="lg" class="navbar-icons" :icon="`${item.icon}`" />
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="navbar-text font-weight-bold ">{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
      </div>
</template>

<script>
/* eslint-disable */


export default {
  components: {
    //  headbar
  },
  computed: {
    itemsInCart() {
      return 0
      // let cart = this.$store.getters.cartProducts;
      //return cart.reduce((accum, item) => accum + item.quantity, 0)
    },
    itemsInWish() {
      return 0
      //let wish = this.$store.getters.wishProducts;
      //return wish.length
    }
  },
  data() {
    return {
      drawer: null,
      categories: [
        {
          title :'Home',
          icon :'home',
          link : '/'
        },
        {
          title: 'Bookings',
          icon: 'address-book',
          link:'/bookings'
        },
        {
          title: 'Customers',
          icon: 'male',
          link:'/customers'
        },
        {
          title: 'Rooms',
          icon: 'bed',
          link:'/rooms'
        },
        //  { title: 'Amenity', icon: 'tshirt' },
      ],
      items: [{
          title: 'Staff',
          icon: 'users',
          link: '/cart'
        },
        {
          title: 'Grocery',
          icon: 'shopping-basket',
          link: '/account'
        },
        {
          title: 'Amenity',
          icon: 'person-booth',
          link: '/account'
        },
        {
          title: 'My Account',
          icon: 'user-circle',
          link: '/account'
        },
        //    { title: 'Notifications', icon: 'bell',link:'/wishlist' },
        {
          title: 'Help Centre',
          icon: 'question-circle',
          link: '/help'
        },
        {
          title: 'Legal',
          icon: 'file-contract',
          link: '/legal'
        }
      ],
      icons: [{
        link: 'account',
        icon: 'user-circle'
      }, ]
    }
  }
}
</script>

<style lang="css">
.v-navigation-drawer{
  z-index: 100;
}
.navbar-icons{
  color:#fff;
}
.navbar-icon-top{
  color:#492c9c;
}
.sidebar{
  background-color:#492c9c !important;
}
.avatar-img{
  margin:16px;
}
.v-icon{
  color:#471e7f !important;
}
.logo-head{
    background-color:#471e7f !important;
}
.navbar-text{
  color:#fff;
}
#app > div > div.layout.wrap{
    height: auto !important;
}
</style>
