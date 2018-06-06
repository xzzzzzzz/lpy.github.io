<template>
  <div class="main-wrap">
    <nav-title title="新手入门" v-if="detailShow" :showPrev='showPrev' :prev="prev"></nav-title>
    <div class="banner-wrap">
      <div class="banner">
        <img src="~@/static/img/novice/1.png">
      </div>
    </div> 
    <div class="banner-wrap">
      <div class="banner">
        <img src="~@/static/img/novice/2.png">
      </div>
    </div> 
    <div class="banner-wrap">
      <div class="banner">
        <img src="~@/static/img/novice/3.png">
        <div class="btn-wrap">
          <a href="javascript:;" class="ui-button" style="margin-bottom:1rem;">立即投资</a>
          <a href="#find/guidance" style="color:#1e93ff">一分钟了解小狗钱钱>>></a>
        </div>
      </div>
    </div> 
  </div>
</template>

<script>
import navTitle from '../../modules/title.vue'
  export default{
    components: {navTitle},
    data () {
      return {
        detailShow: true, // 是否显示头部标题 
        showPrev:true, // 是否显示返回按钮
        prev: {path:'/'} // 返回路径的name 
      }
    },
    created () {
        this.$store.state.showBottomNav = false // 是否显示底部导航
    },
  }
</script>

<style lang="less">
.main-wrap{
  padding-top:3rem;
}
.banner-wrap{
  width:100%;
  height:auto;
  & .banner{
    position: relative;
    img{
      width:100%; height:100%; display: block;border:0;
    }
    & .btn-wrap{
      position: absolute;
      width:100%;
      left:0;
      bottom:0.2rem;
      height:auto;
      overflow: hidden;
      & a{
        display:block;
        width:85%;
        height:2.7rem;
        margin:0 auto;
        text-align: center;
      }
      & a.ui-button{
        cursor: pointer;
        color: #fff;
        height: 2.933333333333333rem;
        line-height: 2.933333333333333rem;
        border-radius: 3rem;
        font-size: 1.0666666666666667rem;
        background: -webkit-linear-gradient(left, #24e9f0 , #2564ef);
        background: -o-linear-gradient(right, #24e9f0 , #2564ef);
        background: -moz-linear-gradient(right, #24e9f0 , #2564ef);
        background: linear-gradient(to right, #24e9f0 , #2564ef);
        border: 0;
      }
    }
  }
}
</style>
