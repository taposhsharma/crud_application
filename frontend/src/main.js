import { createApp } from 'vue'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from './router.js';
import store from './store'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);

app.use(router);
app.use(vuetify)
app.use(store)

app.mount('#app');


