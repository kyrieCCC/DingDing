import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css';


Vue.config.productionTip = false
Vue.use(ElementUI);

import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
  en: {
    message: {
      login: 'Sign in'
    }
  },
  ja: {
    message: {
      login: 'こんにちは'
    }
  },
  zh: {
    message: {
      login: '登录'
    }
  }
}

const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages, // set locale messages
})

new Vue({
  router,
  i18n,
  render: h => h(App),
  beforeCreate(){
		Vue.prototype.$bus = this	//安装全局事件总线
	}
}).$mount('#app')
