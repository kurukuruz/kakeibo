import Vue from 'vue';
import './plugins/composition-api';
import './plugins/firebase';
import 'firebase/analytics';
import 'firebase/auth';
import 'firebase/firestore';
import App from './App.vue';
import router from './router';
import vuetify from './plugins/vuetify';

Vue.config.productionTip = false;

new Vue({
  router,
  vuetify,
  render: h => h(App),
}).$mount('#app');
