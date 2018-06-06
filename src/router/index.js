import Vue from 'vue'
import Router from 'vue-router'
import Index from '../components/Index' //首页
import Lists from '../components/Lists' //出借
import Malls from '../components/Malls' //发现
import Users from '../components/Users' // 个人中心
import Login from '../components/Login' // 个人中心
import Novice from '../components/views/activity/novice' // 新手专区
import Invest from '../components/views/tender/invest' // 投资详情
import InvestSuccess from '../components/views/tender/investSuccess' // 投资成功
import News from '../components/views/find/news' // 新闻公告
import NewsView from '../components/views/find/view' // 新闻公告内容
import TelephoneFare from '../components/views/integral/telephoneFare' //话费充值详情页
import CommodityPage from '../components/views/integral/commodityPage' //商城产品详情

import md5 from 'blueimp-md5';
import qs from 'qs'


import axios from 'axios'
import VueAxios from 'vue-axios'




Vue.use(Router,VueAxios,axios)



// 挂载路由
const router =  new Router({
  // mode: 'history',
   routes:[
        {
          path: '/',
          name: 'Index',
          component: Index 
        },
        {  
          path: '/lists',  
          name: 'Lists',  
          component: Lists 
        },
        {  
          path: '/malls',  
          name: 'Malls',  
          component: Malls,
          meta: {
            requireAuth: false
          }
        },
        {  
          path: '/users',  
          name: 'Users',  
          component: Users
        },
        {  
          path: '/login',  
          name: 'Login',  
          component: Login   
        },
        {
          path: '/tender/invest',
          name: 'Invest',
          component: Invest
        },
        {
          path: '/activity/novice',
          name: 'novice',
          component: Novice
        },
        {
          path: '/find/news',
          name: 'news',
          component: News
        },
        {
          path: '/find/view',
          name: 'newsView',
          component: NewsView
        },
        {
          path: '/tender/investSuccess',
          name: 'investSuccess',
          component: InvestSuccess
        },
        {  
          path: '/integral/telephoneFare',  
          name: 'TelephoneFare',  
          component: TelephoneFare
        },
        {  
          path: '/integral/commodityPage',  
          name: 'CommodityPage',  
          component: CommodityPage
        }
      ]
});


// // 判断路由是否需要登录

router.beforeEach((to, from, next) => {
    if (to.meta.requireAuth) {
        if (localStorage.getItem('token')) {
            next()
        } else {
          next({
            path:'login',
            query : {redirect : to.fullPath}
          })
        }
    } else {
        next()
    }
})

export default router




// 时间格式化
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

const curDate = new Date;
const localTime = curDate .getTime();
const offsetTime = curDate .getTimezoneOffset() *60000;
const utcTime = localTime +offsetTime;
const bjDate = new Date(utcTime + 3600000 * 8);
const bdtimesss = new Date(bjDate).Format('yyyy-MM-dd hh:mm:ss');


export const getTime = () => {
  return bdtimesss;

}
	


var SECRET = "GDgLwwdK270Qj1w4";

export const sign = (param) => {
    let secret = SECRET;
    let source;
    let signStr;
    // 对参数名进行字典排序  
    let array = new Array();
    for (var key in param) {
      array.push(key);
    }
    array.sort();

    // 拼接有序的参数名-值串  
    let paramArray = [];
    for (var index in array) {
      let key = array[index];
      paramArray.push(key + "=" + param[key]);
    }
     
    source = paramArray.join("&") + secret;
    signStr = md5(source);
    return signStr;
  
}


export const getSignParam = (param) => {
  param._t = getTime();
  var s = sign(param);
  param._s = s;
  return param;

}


// 请求url
axios.defaults.baseURL = BASE_URL


// 发送请求前处理 
axios.interceptors.request.use((config) => {

	if(config.method  === 'post'){
		let data = qs.parse(config.data)
		config.data = qs.stringify({
			...getSignParam(data)
		})
	}else if(config.method === 'get') {
        config.params = {
			     _t: _t,
            ...config.params
        }
    }
	return config;
},(error) =>{
	return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) =>{

  console.log(res)

	if(res.status != 200){
		return Promise.reject(res);
    
	}else{
    if(res.data.error == '-1000'){//具体的判断token失效的参数
        localStorage.clear()
        // router.push('/login');
        var dfd = router.currentRoute.name
        console.log("-1000000",dfd)
        
          router.replace({
              path: 'login',
              query: {redirect: router.currentRoute.fullPath}
          })
        
    }else{
        return res
    }

  }
	return res;
}, (error) => {
  //404等问题可以在这里处理
	return Promise.reject(error);
});








