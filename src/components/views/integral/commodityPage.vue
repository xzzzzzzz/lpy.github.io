<template>
  <div class="commodity-wrap">
    <nav-title title="商品详情" v-if="detailShow" :showPrev='showPrev' :prev="prev"></nav-title>

    <div class="commImg">
      <img :src="url + (commodityData.page_image)">
    </div>
    <div class="comm_tit">{{commodityData.commoditysname}}</div>
    <div class="comm_number">
        <div class="comm_number_num">
            {{commodityData.integral}}
            <span>库存：{{commodityData.dity_count}}</span>
        </div>
        <div class="comm_information">
           <div class="comm_line_left">
                  兑换数量
              </div>
              <div class="comm_line_right">
                  <v-counter :max="100" :min="1"></v-counter>
              </div>
        </div>
    </div>
    <div class="goods_introduce" v-html="commodityData.describes"></div>      
    <div class="comm_Btn">
      <Button shape="circle">立即兑换</Button>
    </div>
  </div>
</template>

<script>

import navTitle from '../../modules/title.vue'
import VCounter from '../../parts/counter'
import global_ from '../../modules/Global.vue'

export default{
    data () {
      return {
        url: global_.serverPath,
        detailShow: true, // 是否显示头部标题 
        showPrev:true, // 是否显示返回按钮
        prev: {path:'/malls'}, // 返回路径的name 
        commodityData: [],
        gralld: '',
      }
    },
    created () {
        this.$store.state.showBottomNav = false // 是否显示底部导航
        this.singUUID = this.getDatas()  
        this.gralld = this.$route.query.id
    },
    mounted: function(){
      this.axios({
        method: 'post',
        data: {
          OPT: '221', 
          gralId: this.gralld,
          singUUID: this.singUUID || '',
        }
      }).then((response) =>{
            this.commodityData = response.data.dity
        }).catch((error) => {
            console.log(error)
        })
    },
     components: {VCounter, navTitle},
}
</script>

<style lang="less">
.commodity-wrap{
   padding-top:3rem;
   background-color: #fff;
   font-size:0.9rem;
   .commImg{
    width: 100%;
    height: 17.4rem;
    border-bottom: 1px solid #f7f7f7;
    img{
      width:100%;
      height: 100%;
    }
   }
   .comm_tit{
      padding: 1rem 1.2rem 0.5rem;
      text-align:left;
      font-size:1.2rem;
      font-weight: 500;
    }
    .comm_number{
      width:100%;
      text-align:left;
      .comm_number_num{
        color: #fd5e5e;
        padding: 0rem 1rem 0.7rem;
        border-bottom:1px solid #f7f7f7; 
        & span{
          float:right;
        }
      }
      .comm_information{
        height:4rem;
        padding:1rem 0.9rem;
        border-bottom:1px solid #f7f7f7; 
        .comm_line_left{
          float:left;
          text-align:left;
        }
        .comm_line_right{
          float:right;

        }
      }
    }
    & .goods_introduce{
      padding:0.7rem 1rem 1rem;
      font-size: 0.8666666666666667rem;
      line-height: 1.4666666666666666rem;
      padding-bottom: 1rem;
      word-break: break-all;
      word-wrap: break-word;
      text-align:left;
    }
    & .comm_Btn{
      width:100%;
      height:4rem;
      margin:0;
      background-color: #fff;
      box-shadow: 0 -0.3rem 0.566666666666rem rgba(0,0,0,.1);
      position: fixed;
      bottom:0;
      & button{
        width:80%;
        height: 2.6666666666666665rem;
        margin:0.733333333rem auto 0;
        background: -webkit-linear-gradient(left, #24e9f0 , #2564ef);
        background: -o-linear-gradient(right, #24e9f0 , #2564ef);
        background: -moz-linear-gradient(right, #24e9f0 , #2564ef);
        background: linear-gradient(to right, #24e9f0 , #2564ef);
        border:0;
        box-sizing: border-box;
        color:#fff;
        font-size: 1.0666666666666667rem;
      }
    }
}

</style>
