// import './style.scss'
import 'vuetify/styles'
import { createApp, markRaw } from 'vue/dist/vue.esm-bundler.js'
import { createPinia } from 'pinia'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md2 } from 'vuetify/blueprints'
import '@mdi/font/css/materialdesignicons.css'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()
pinia.use(({ store }) => {
  store.$router = markRaw(router)
})

const vuetify = createVuetify({
  blueprint: md2,
  components,
  directives,
})

app.use(pinia)
app.use(vuetify)
app.use(router)
app.mount('#app')
