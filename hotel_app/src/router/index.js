import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import SignUp from '../views/SignUp.vue'
import Account from '../views/Account.vue'
import Rooms from '../views/Rooms.vue'
import Staff from '../views/Staff.vue'
import Grocery from '../views/Grocery.vue'
import Amenity from '../views/Amenity.vue'
import Customer from '../views/Customer.vue'
import Booking from '../views/Booking.vue'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignUp
    },
    {
      path: '/account',
      name: 'account',
      component: Account
    },
    {
      path: '/rooms',
      name: 'rooms',
      component: Rooms
    },
    {
      path: '/staff',
      name: 'staff',
      component: Staff
    },
    {
      path: '/grocery',
      name: 'grocery',
      component: Grocery
    },
    {
      path: '/amenity',
      name: 'amenity',
      component: Amenity
    },
    {
      path: '/customers',
      name: 'customer',
      component: Customer
    },
    {
      path: '/bookings',
      name: 'booking',
      component: Booking
    }
  ]
})
