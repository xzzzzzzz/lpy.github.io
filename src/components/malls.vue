<template>
    <div class="rule_wrap">
        <nav-title title="积分商城" v-if="detailShow" :showPrev='showPrev' :prev="prev" :showRule='showRule' :rule="rule"></nav-title>
        <Carousel autoplay>
            <CarouselItem v-for="item in item" :key="item.image_filename" arrow="never">
                <div class="demo-carousel">
                    <img :src="url + (item.image_filename)" >
                </div>
            </CarouselItem>
        </Carousel>
        <div class="rule_info">
             <router-link class="info_me_item" :to="{path: item.path}" v-for="item in infoTypes" :class="['info_me_' + item.id]">
                <div class="info_me_item_inner">
                    <div class="info_name">{{item.name}}</div>
                </div>
            </router-link>
        </div>
        <div class="list_container">
            <!-- 热门推荐 -->
            <div class="list_content fix">
                <div class="the_title">
                     <h2>热门推荐</h2>
                </div> 
                <div class="hot_list">
                    <ul>
                        <li class="hot_one">
                            <router-link :to='{name:"TelephoneFare"}'>
                                <div class="img">
                                    <img :src="url + correspondence_img">
                                </div>
                                <div class="text">
                                    <p class="text_a">话费充值</p>
                                    <p class="text_b"></p>
                                </div>
                            </router-link>
                        </li>
                        <li vi-if="newbig.entityId !=-1" @click="goCommodityPage(newbig.id)">
                            <div class="img">
                                <img :src="url + (newbig.ex_image)">
                            </div>
                            <div class="text">
                                <p class="text_a">{{newbig.commoditysname}}</p>
                                <p class="text_b">{{newbig.integral}}积分</p>
                            </div>
                        </li>
                        <li vi-if="newSmall1.entityId !=-1" @click="goCommodityPage(newSmall1.id)">
                            <div class="img">
                                <img :src="url + (newSmall1.ex_image)">
                            </div>
                            <div class="text">
                                <p class="text_a">{{newSmall1.commoditysname}}</p>
                                <p class="text_b">{{newSmall1.integral}}积分</p>
                            </div>
                        </li>
                        <li vi-if="newSmall2.entityId !=-1" @click="goCommodityPage(newSmall2.id)">
                            <div class="img">
                                <img :src="url + (newSmall2.ex_image)">
                            </div>
                            <div class="text">
                                <p class="text_a">{{newSmall2.commoditysname}}</p>
                                <p class="text_b">{{newSmall2.integral}}积分</p>
                            </div>
                        </li>
                    </ul>
                </div>              
            </div>
             <!-- 钱钱推荐 -->
            <div class="list_content fix">
                <div class="the_title">
                    <h2>钱钱推荐</h2>
                </div> 
                <div class="hot_list">
                    <ul>
                        <li v-for="item in news" vi-if="item.entityId !=-1" @click="goCommodityPage(item.id)">
                            <div class="img">
                                <img :src="url + (item.ex_image)">
                            </div>
                            <div class="text">
                                <p class="text_a">{{item.commoditysname}}</p>
                                <p class="text_b">{{item.integral}}积分</p>
                            </div>
                        </li>
                    </ul>
                </div>  
            </div>
             <!-- 虚拟商品 -->
            <div class="list_content fix">
                <div class="the_title">
                    <h2>虚拟商品</h2>
                </div> 
                 <div class="hot_list">
                    <ul>
                        <li v-for="item in ditynew" vi-if="item.entityId !=-1" @click="goCommodityPage(item.id)">
                            <div class="img">
                                <img :src="url + (item.ex_image)">
                            </div>
                            <div class="text">
                                <p class="text_a">{{item.commoditysname}}</p>
                                <p class="text_b">{{item.integral}}积分</p>
                            </div>
                        </li>
                    </ul>
                </div>  
            </div>
            <!-- 事物商品 -->
            <div class="list_content fix">
                <div class="the_title">
                    <h2>事物商品</h2>
                </div>
                 <div class="hot_list">
                    <ul>
                        <li v-for="item in dityheat" vi-if="item.entityId !=-1" @click="goCommodityPage(item.id)">
                            <div class="img">
                                <img :src="url + (item.ex_image)">
                            </div>
                            <div class="text">
                                <p class="text_a">{{item.commoditysname}}</p>
                                <p class="text_b">{{item.integral}}积分</p>
                            </div>
                        </li>
                    </ul>
                </div>  
            </div>
        </div>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>

import navTitle from '../components/modules/title.vue'
import global_ from '../components/modules/Global.vue'
export default {
    data () {
      return {
        url:global_.serverPath,
        detailShow:true,
        showPrev:true, // 是否显示返回按钮
        showRule:true, // 是否显示右边规则
        prev: {path:'/'}, // 返回路径的name 
        rule: 'Index', // 返回路径的name 
        msg: '发现',
        item: [],
        correspondence_img: [],  //话费充值
        newbig: [],  //iphone7
        newSmall1: [],  //ipad mini
        newSmall2: [],  //小米手环
        news: [],  //钱钱推荐
        ditynew: [],  //虚拟商品
        dityheat: [],  //事物商品
        infoTypes:[
            {
              name: '我的积分',
              id: 'me',
              path: 'aaaa',   
            },
            {
              name: '生活缴费',
              id: '2x',
              path: 'bbbb',   
            },
            {
              name: '许愿树',
              id: 'wif',
              path: 'cccc',   
            },
            {
              name: '超值换换换',
              id: 'fenmi',
              path: 'ddddd',   
            },
        ],
        
      }
    },
    created () {

        this.$store.state.showBottomNav = true

        // const getDatas = this.getDatas();
        // // console.log("userIds",userIds)
        // console.log("getDatas",getDatas)
        // this.axios({
        //   method: 'post',
        //   data: { signUUID:getDatas,OPT: '10030'}
        // }).then((response) => {

        // }).catch((error) => {
        //     console.log(error)
        // })
    },
    mounted: function(){
        this.axios({
            method: 'post',
            data: {OPT: '131', typeId: '53'}
        }).then((response) =>{
            this.item=response.data.list;
        }).catch((error) => {
            console.log(error)
        })

        this.axios({
            method: 'post',
            data: {OPT: '257'}
        }).then((response) =>{
            this.correspondence_img = response.data.correspondence_img;
            this.newbig = response.data.newbig;
            this.newSmall1 = response.data.newSmall1;
            this.newSmall2 = response.data.newSmall2;
            this.news = response.data.new;
            this.ditynew = response.data.ditynew;
            this.dityheat = response.data.dityheat;
            console.log("correspondence_img", correspondence_img)

        }).catch((error) => {
            console.log(error)
        })

    },
    components: { navTitle },
    methods:{
        goCommodityPage (item){
            this.$router.push({path:'/integral/commodityPage',query:{id:item}})
        }
    }
}
</script>

<style lang="less" >

.rule_wrap{
    padding-top:3rem;
    .ivu-carousel{
        height:9.2rem;
        .demo-carousel{
            .ivu-carousel-item{
            height:9.2rem;
            }
            img {
                width: 100%;
                display:block;
                height:9.2rem;
            }
        }
    }
    .list_container{
         padding:0;
         .list_content{
            padding: .7rem 0.7rem 0 0;
            ul li{
                 width:50%;
                 height:auto;
                 padding: 0 0 0.7rem 0.7rem;
                 float:left;
                 .img{
                    width:100%;
                    height:7.333rem;
                    img{
                        width:100%;
                        height:100%;
                    }
                 }
                 .text{
                    padding:0.7rem 0;
                    p.text_a{
                        font-size:0.8rem;
                        font-weight: 700;
                        height:2rem;
                    }
                     p.text_b{
                        font-size:0.8rem;
                        height:2rem;
                        color: #fd5555;
                    }

                 }
            }
        }
        .the_title{
            height:1.2rem;
            line-height:1.4rem;
            text-align:left;
            border-left: 3px solid #fc5d5e;
            margin:1rem 0 1rem 1rem;
            h2{
                padding-left:0.7rem;
                font-size:1.2rem;
                font-weight:normal;
            }

         }
    }
    /*清除浮动代码*/ 
    .fix:after{content:".";display:block;height:0;clear:both;visibility:hidden}
}
.rule_info{
    height:6rem;
    .info_me_item{
        display:inline-block;
        width:25%;
        height:6rem;
        float:left;
    }
    .info_me_item_inner{
            
    }
    .info_me_me .info_me_item_inner{
        background: url(../public/img/malls/me.png) no-repeat center 1rem;
        background-size: 2.4rem 2.4rem;
    }
    .info_me_2x .info_me_item_inner{
        background: url(../public/img/malls/2x.png) no-repeat center 1rem;
        background-size: 2.4rem 2.4rem;
    }
    .info_me_wif .info_me_item_inner{
        background: url(../public/img/malls/wif.png) no-repeat center 1rem;
        background-size: 2.4rem 2.4rem;
    }
    .info_me_fenmi .info_me_item_inner{
        background: url(../public/img/malls/fenmi.png) no-repeat center 1rem;
        background-size: 2.4rem 2.4rem;
    }
    .info_name{
        padding-top:4rem;
        font-size:0.8rem;
        color: #000;
    }
   
}
    
</style>
