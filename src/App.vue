<template>
  <div id="app" >
    <Loading v-show="showloading" ></Loading>  
    <Loading v-show="closeLoading" ></Loading>  
    <div class="content">  
       <router-view/>  
    </div> 
    <nav-bottom v-if="$store.state.showBottomNav"></nav-bottom> 


  </div>
</template>
 
<script>
import { bus } from './loading/type.js'
import Loading from './components/modules/loading.vue'  
import navBottom from './components/modules/barBottom.vue'

export default {
  name: 'App',
  data(){  
    return { 
      showHeadAndSide:true,
      showloading: false,
      closeLoading: false,
    }  
  },  

  created(){
     var _this = this
     bus.$on('showloading',function(){
        _this.showloading = true    // loading出现
     })
     bus.$on('closeLoading',function(){
     
        _this.showloading = false   // loading消失
     })
  },
  components: { navBottom , Loading }

  // components: { Loading }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
