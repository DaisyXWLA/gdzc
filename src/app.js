// import 'core-js/stable'
// import 'regenerator-runtime/runtime'
import '@babel/polyfill';
import Vue from 'vue';
import App from 'components/App';
import heyuiConfig from 'js/config/heyui-config';
import routerConfig from 'js/config/router-config';
import store from 'js/vuex/store';
import 'js/vue/components';
import 'js/vue/filters';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import imgUrl from 'js/config/img-url';
import imgUrlT from 'js/config/img-thumbnail';
import fileUrl from 'js/config/file';
import printUrl from 'js/config/print';
import excelUrl from 'js/config/excel';
import exportUrl from 'js/config/export';
import limit from 'js/config/limit';
import showModel from 'js/config/showModel';
// 打印
import Print from 'vue-print-nb';
/* 引入资源请求插件 */
import VueResource from 'vue-resource';
// 导出excel
import Blob from './export/Blob'
import Export2Excel from './export/Export2Excel'
Vue.prototype.showModel = showModel;
Vue.use(Print);
Vue.use(ElementUI);
/* 使用VueResource插件 */
Vue.use(VueResource);
Vue.prototype.IMGURL = imgUrl;
Vue.prototype.IMGURLT = imgUrlT;
Vue.prototype.FILEURL = fileUrl;
Vue.prototype.PRINTURL = printUrl;
Vue.prototype.EXCELURL = excelUrl;
Vue.prototype.EXPORTURL = exportUrl;
Vue.prototype.LIMIT = limit;
require('./css/app.less');

// 开发环境判断
// 开发环境判断
// process.env.NODE_ENV == 'development'

// 使用mock文件， 自己开发的时候请删除
// require('./mock/index');

// HeyUI已经设定为全局变量，无需引用
// 设定全局变量请参考根目录下的hey.conf.js文件

heyuiConfig();
Vue.use(HeyUI);

const router = routerConfig();

const has = Vue.directive('has', {
  inserted: function (el, binding) {
    // 获取按钮权限
    if (!Vue.prototype.$_has(binding.value)) {
      el.parentNode.removeChild(el);
    }
  }
});

Vue.prototype.$_has = function (value) {
  let isExit = false;
  let buttonpermsStr = Utils.getLocal2Json('botten');
  if (buttonpermsStr === undefined || buttonpermsStr === null) {
    return false;
  }
  for (let i = 0; i < buttonpermsStr.length; i++) {
    if (value === buttonpermsStr[i]) {
      isExit = true;
      break;
    }
  }
  return isExit;
};
export { has };

export default new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
