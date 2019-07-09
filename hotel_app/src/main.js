import Vue from 'vue'
import App from './App.vue'
import router from './router'
import { store } from './store/index.js'
import './registerServiceWorker'
import Vuex from 'vuex'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VeeValidate from 'vee-validate'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas.faUserCircle, fas.faCompass, fas.faBoxOpen, fas.faQuestion, fas.faMobileAlt
  , fas.faMobile, fas.faArrowAltCircleRight, fab.faFacebook, fab.faInstagram, fab.faTwitter, fab.faGooglePlus, fab.faYoutube
  , fas.faHome, fas.faCaretSquareDown, fas.faBars, fas.faKey, fas.faHeart
  , fas.faUser, fas.faFileContract, fas.faQuestionCircle, fas.faTimes, fas.faFilter, fas.faSortAmountDown, fas.faSearch, fas.faArrowRight,
  fas.faShare, fas.faTrash, fas.faPlusSquare, fas.faMinusSquare, fas.faEdit, fas.faSignOutAlt, fas.faStar, fas.faArrowUp, fas.faArrowDown, fas.faClock
)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Vuetify)
Vue.use(VeeValidate)
Vue.use(Vuex, VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
