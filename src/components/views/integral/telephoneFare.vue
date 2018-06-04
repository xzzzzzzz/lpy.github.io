<template>
  <div class="commodity-wrap">
    <nav-title title="话费充值" v-if="detailShow" :showPrev='showPrev' :prev="prev"></nav-title>
    <div class="topUp">
      <div class="topup_module">
        <template>
          <h3>选择运营商:</h3>
            <Tabs type="card">
                <TabPane label="中国移动">中国移动</TabPane>
                <TabPane label="中国联通">中国联通</TabPane>
                <TabPane label="中国电信">中国电信</TabPane>
            </Tabs>
        </template>
      </div>
      <div class="phoneNumber">
        <h3>输入手机号码:</h3>
        <input type="tel" name="">
      </div>
      <div class="comm_Btn">
        <Button shape="circle">立即兑换</Button>
      </div>
      <div class="goods_introduce"></div>    
    </div>
  </div>
</template>

<script>

import navTitle from '../../modules/title.vue'

export default{
    data () {
      return {

        detailShow: true, // 是否显示头部标题 
        showPrev:true, // 是否显示返回按钮
        prev: {path:'/malls'}, // 返回路径的name 
        title: '啊发到付',


      }
    },
    created () {
        this.$store.state.showBottomNav = false // 是否显示底部导航
        this.singUUID = this.getDatas()  
    },
    mounted: function(){
      this.axios({
        method: 'post',
        data: {
          OPT: '234', 
          singUUID: this.singUUID || '',
        }
      }).then((response) =>{
            this.topUpData = response.data.correList
        }).catch((error) => {
            console.log(error)
        })
    },
    components: {navTitle},
}
</script>

<style lang="less">
.commodity-wrap{
   padding-top:3rem;
   .topUp{
    padding: 1rem;
   }
   
}

</style>
