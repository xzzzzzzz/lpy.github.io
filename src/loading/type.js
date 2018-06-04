import Vue from 'vue'

import axios from 'axios'
var _bus = new Vue()  // 创建一个事件总线
var num = 0


// 发送请求前处理 
axios.interceptors.request.use((config) => { 
    num++
    _bus.$emit('showloading')
    return config

});

// 返回状态判断
axios.interceptors.response.use((res) =>{
 
    num--
    if (num <= 0) {
      _bus.$emit('closeLoading')      
    } else {
      _bus.$emit('showloading')      
    }

  if(res.status != 200){
    return Promise.reject(res);
    
  }
  
  return res;
});
export var bus = _bus   //暴露事件总线