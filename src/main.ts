import { createApp } from 'vue'
import App from './App.vue'
import { store,key } from './store'
import  roteador  from './router'


createApp(App)
.use(roteador)
.use(store,key)
.mount('#app')
