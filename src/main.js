import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/utils/vant-ui'
import '@/style/common.less'

// // 1. 引入你需要的组件
// import { Button } from 'vant'
// // 2. 引入组件样式
// import 'vant/lib/index.css'
// Vue.use(Button)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
