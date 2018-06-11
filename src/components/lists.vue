<template>
    <div class="list-main">
        <nav-title title="出借" v-if="detailShow"></nav-title>
        <div class="tab-nav" >
            <Tabs size="small" value="name" v-model="name"  @on-click="tab">
                <TabPane  v-for="(navList, index) in nav" :key="index" :label="navList.text" :name="navList.dataVal" >
                    <Scroll :on-reach-bottom="handleReachBottom" :height="height">
                        <div class="lists-content">
                            <div class="invesList" v-for="(item, index) in investList" :key="index" v-if="item.entityId != -1" @click="goInvest(item.id)">
                                <div class="invest" :class="[{'newinvest':(item.product_id == 5 && item.loan_schedule<100)},{'invest_no':item.loan_schedule==100}]" :data-title="item.title" :data-id="item.id" >
                                    <div class="invest-top fix">
                                        <div v-if="item.loan_schedule<100" class="fl" :class="[{'tits':item.product_id == 2},{'tit':item.product_id==7},{'titnew':item.product_id==5},{'titsaving':item.product_id==10}]">
                                            {{item.title}}
                                        </div>
                                        <div v-else class="fl" :class="[{'tits_no':item.product_id == 2},{'tit_no':item.product_id==7},{'titnew_no':item.product_id==5},{'titsaving_no':item.product_id==10}]">
                                            {{item.title}}
                                        </div>
                                        <div class="pf fr">
                                            <div class="img_lootall" v-if="item.loan_schedule==100"></div>
                                        </div>
                                    </div>
                                    <div class="bq" style="font-size:0.6rem;line-height:1.5rem;color:#1e93ff;text-align:left;">
                                        <span v-if="item.tags != ''" v-for="(item1, index) in item.tag" :key="index">{{item1}}</span>
                                    </div>
                                    <div class="invest-mid">
                                        <ul class=" fix">
                                            <li class="ll">
                                                <div class="value">
                                                    <div  v-if="item.product_id == 7"><span>{{item.apr}}</span>%~<span>{{item.topApr}}</span>%</div>
                                                    <div v-else-if="item.product_id == 10">
                                                        <div v-if="item.vipPlusRate == 0 && item.addapr == 0">
                                                            <span>{{item.billBasicApr}}</span>%
                                                        </div>
                                                        <div v-else>
                                                            <span>{{item.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{(item.vipPlusRate + item.addapr).toFixed(2)}}% <i></i></span>
                                                            <span class="bubble" @click="showBbubble(index)" @click.stop>
                                                            <i v-show="bubble === index">
                                                                参考基础：{{item.billBasicApr}}%<br/>
                                                                <p v-if="item.addapr > 0">
                                                                活动加息：{{item.addapr}}%
                                                                </p>
                                                                <p v-if="item.vipPlusRate > 0">
                                                                特权加息：{{item.vipPlusRate}}%
                                                                </p>
                                                            </i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div v-else>
                                                        <div v-if="item.vipPlusRate == 0 && item.addapr == 0">
                                                            <span>{{item.billBasicApr}}</span>%
                                                        </div>
                                                        <div v-else>
                                                            <span>{{item.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{(item.vipPlusRate + item.addapr).toFixed(2)}}% <i></i></span>
                                                            <span class="bubble" @click="showBbubble(index)" @click.stop>
                                                            <i v-show="bubble === index">
                                                                基础利率：{{item.billBasicApr}}%<br/>
                                                                <p v-if="item.addapr > 0">
                                                                活动加息：{{item.addapr}}%
                                                                </p>
                                                                <p v-if="item.vipPlusRate > 0">
                                                                特权加息：{{item.vipPlusRate}}%
                                                                </p>
                                                            </i>
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="status">
                                                    <p v-if=" item.product_id == 10">
                                                        参考年化
                                                    </p>
                                                    <p v-else>
                                                        往期年化
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="value">
                                                    <div v-if="item.product_id == 7 || item.product_id == 10 ">
                                                        <span>{{item.lockPeriod}}</span>天
                                                    </div>
                                                    <div v-else>
                                                        <span>{{item.period}}</span>天
                                                    </div>
                                                </div>
                                                <div class="status">
                                                    <p v-if=" item.product_id == 10 || item.product_id == 7">
                                                        锁定期限
                                                    </p>
                                                    <p v-else>
                                                        投资天数
                                                    </p>
                                                </div>
                                            </li>
                                            <li>
                                                <div class="value">
                                                    <div v-if="item.product_id != 10">
                                                        <span>{{item.min_invest_amount}}</span>元
                                                    </div>
                                                    <div v-else>
                                                        <div class="inves-btn">
                                                            <Button>立即投资</Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="status"  v-show="item.product_id != 10">
                                                    起投金额
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="invest-bottom" v-if="item.product_id != 10 ">
                                        <div class="bar-wrap">
                                            <div class="bar gradient" :style="{'width':(item.loan_schedule || 0)+'%'}"></div>
                                        </div> 
                                        <div class="information fix ">
                                            <p class="fl">
                                                已投:<span>{{(item.loan_schedule || 0)}}%</span>
                                            </p>
                                            <p class="fr">
                                                剩余<span style="color:#1e93ff">{{item.invest_amount}}</span>元可投
                                            </p>
                                        </div>
                                    </div>
                                    <div class="invest-bottom" v-else>
                                        <div class="information fix">
                                            <div class="fl">
                                                <p>
                                                    累计出借：
                                                    <span class="Fontcolor" v-if="item.version!=''">
                                                       {{item.version | numberFormats(0,".",",","ceil")}}笔
                                                    </span>
                                                    <span class="Fontcolor" v-else>
                                                        -
                                                    </span>
                                                </p>
                                                <p>
                                                    平均转出：
                                                    <span class="Fontcolor" v-if="item.avgTransPeriod != ''">
                                                        {{item.avgTransPeriod}}
                                                    </span>
                                                    <span class="Fontcolor" v-else>
                                                       -
                                                    </span>
                                                </p>
                                            </div>
                                            <div class="fr">
                                                <p>
                                                    累计出借：
                                                    <span class="Fontcolor" v-if="item.has_invested_amount != ''">
                                                        <i v-if="(item.has_invested_amount/10000)>1">
                                                            {{(item.has_invested_amount/10000) | numberFormats}}万元
                                                        </i>
                                                        <i v-else>
                                                            {{item.has_invested_amount | numberFormats}}元
                                                        </i>
                                                        
                                                    </span>
                                                    <span class="Fontcolor" v-else>
                                                        -
                                                    </span>
                                                </p>
                                                <p>
                                                    最长转出：
                                                    <span class="Fontcolor" v-if="item.maxTransPeriod != ''">
                                                        {{item.maxTransPeriod}}
                                                    </span>
                                                    <span class="Fontcolor" v-else>
                                                        -
                                                    </span>
                                                </p>
                                            </div>
                                        
                                    </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else  class="sold_out"></div>
                            <div v-show="investList == ''" class="nothing">暂无列表</div>
                        </div>
                    </Scroll>
                </TabPane>
            </Tabs>
        </div>
        <div class="tab-contentslist">
            <div class="tab-contentslist-left">
               <Icon type="volume-high" class=""></Icon>
            </div>
            <div class="tab-contentslist-right">
                <text-scorll :dataList="newList" scrollType="scroll-left-linear"> </text-scorll>
            </div>
        </div>
         <quick-menu :menu-count=count :list-text=icons :menu-url-list=list :bottom=bottom :background-color=backgroundColor :color=color :position=position :is-open-new-tab=isOpenNewTab @process="dataGet"></quick-menu>
    </div>
</template>

<script>
import navTitle from '../components/modules/title.vue'
import textScorll from '../components/modules/textScorll.vue'
import quickMenu from '../components/modules/quickMenu'
export default {
    data () {
      return {
        msg: '出借',
        detailShow: true,
        bubble:-1,
        name:0,
        nav:[
            {
                text: '梦想储蓄罐',
                dataVal: '10',
                active: false
            },
            {
               text: '金鹅宝',
                dataVal: '11',
                active: false
            },
        ],
        investList : [],
        newList: [],
        bidsAllCount: 0,
        productId:'', // 标类型
        signUUID:'', // 用户名
        currPage:1, // 分页
        height:"",
        ulWidth:"",
        count:5,
        icons:["短期限","长期限","满标率","最大可投","高利率"],
        list:[{"status":'5'},{"status":'4'},{"status":'3'},{"status":'2'},{"status":'1'}],
        backgroundColor:'#17c4c5',
        color:'#ffffff',
        position:'bottom-right',
        isOpenNewTab:false,
        bottom:'180px'
      }
    },
    created () {
        this.$store.state.showBottomNav = true
        this.signUUID = this.getDatas()
        let height = window.screen.height-120
        this.height = height
    },
    mounted () {
        this.axios({
          method: 'post',
          data: {
            OPT: '408',
            pageSize: 10,
            currPage: 1,
            orderFlag: "",
            productId: 10,
            signUUID: this.signUUID || ""
            }
        }).then((response) => {
            if(response.data.error == -1){
                this.bidsAllCount=response.data.bidsAllCount
                this.investList=response.data.bidsAllList
                for (let i = 0; i<this.investList.length; i++) {
                    let tex = this.investList[i].tags.split(',')
                    this.investList[i].tag = tex
                }
            }else{
                this.$Message.warning(response.data.msg)
            }
        }).catch((error) => {
            console.log(error)
        }) 
        this.axios({
          method: 'post',
          data: {
            OPT: '172'
            }
        }).then((response) => {
            this.newList = response.data.latest10Invests
            this.$nextTick(() => {
               //  this._calculateHeight()
            })
            
        }).catch((error) => {
            console.log(error)
        })
    },
    components: { navTitle,textScorll},
    methods: {
        current (index) {
            this.axios({
                method: 'post',
                data: {
                OPT: '408',
                pageSize: 10,
                currPage: index,
                orderFlag: "",
                productId: this.productId,
                signUUID: this.signUUID || ""
                }
            }).then((response) => {
                if(response.data.error == -1){
                    this.investList=response.data.bidsAllList
                    this.bidsAllCount = response.data.bidsAllCount
                    for (let i = 0; i<this.investList.length; i++) {
                        let tex = this.investList[i].tags.split(',')
                        this.investList[i].tag = tex
                    }
                }else{
                    this.$Message.warning(response.data.msg)
                }
            }).catch((error) => {
                console.log(error)
            }) 
            document.documentElement.scrollTop = document.body.scrollTop = 0
        },
        tab(productId) {
            if(this.productId == productId){
                return
            }else{
                this.productId = productId
                if(this.productId == 0){
                    this.productId = ""
                }
                this.current(1)
            }
            
        },
        showBbubble (index) {
           this.bubble = index
           setTimeout(() => {
               this.bubble = -1
           }, 2000);
        },
        handleReachBottom () {
            return new Promise(resolve => {
                let length =  Math.ceil(this.bidsAllCount/10)
                this.currPage += 1
                if(this.currPage >= length){
                    this.currPage = length
                    setTimeout(() => {
                        this.$Message.warning('没有更多了')
                    },2000)
                    
                }else{
                    let that = this
                    let last = that.investList[this.investList.length-1]
                    setTimeout(() => {
                        that.axios({
                            method: 'post',
                            data: {
                            OPT: '408',
                            pageSize: 10,
                            currPage: that.currPage,
                            orderFlag: "",
                            productId: that.productId,
                            signUUID: that.signUUID || ""
                            }
                        }).then((response) => {
                            if(response.data.error == -1){
                                let dataList = response.data.bidsAllList
                                for (var i = 0;i < dataList.length; i++){
                                    that.investList.push(dataList[i])
                                }
                                
                                for (let s = 0; s<this.investList.length; s++) {
                                    let tex = this.investList[s].tags.split(',')
                                    this.investList[s].tag = tex
                                }
                            }else{
                                this.$Message.warning(response.data.msg)
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                        resolve();
                    }, 2000);
                }
            });
        },
        goInvest (item) {
            this.$router.push({path:'/tender/invest',query:{id:item}})
        },
        dataGet (value) {
            this.axios({
                method: 'post',
                data: {
                    OPT: '408',
                    pageSize: 10,
                    currPage: 1,
                    orderFlag: value,
                    productId: this.productId,
                    signUUID: this.signUUID || ""
                    }
                }).then((response) => {
                    this.bidsAllCount=response.data.bidsAllCount
                    this.investList=response.data.bidsAllList
                    for (let i = 0; i<this.investList.length; i++) {
                        let tex = this.investList[i].tags.split(',')
                        this.investList[i].tag = tex
                    }
                }).catch((error) => {
                    console.log(error)
                }) 
        }

    }
}
</script>

<style lang="less">
.fl{
    float: left;
}
.fr{
    float: right;
}
.fix{
    &::after{
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
    }
}

.list-main{
    margin-top:3rem;
    & .tab-nav .ivu-tabs-bar{
        height:2.1rem;
        line-height: 2rem;
        background:#fff;
        font-size: 1rem;
        margin-bottom:1rem;
        position: fixed;
        z-index: 22;
        top:3rem;
        left:0;
        width:100%;
        & .ivu-tabs-nav{
            width:100%;
        }
        & .ivu-tabs-tab {
            width:50%;
            box-sizing: border-box;
        }
        & .ivu-menu-horizontal{
            height:100%;
            line-height: 2rem;
            & .active{
                color:#1e93ff;
                border-bottom:3px solid #1e93ff;
                box-sizing: border-box;
            }
        }
    }
    .ivu-tabs .ivu-tabs-tabpane{
        height:100%;
    }
    .ivu-scroll-container{
        box-sizing: border-box;
    }
    .tab-contentslist{
        position: fixed;
        top:5.1rem;
        left:0;
        width:100%;
        height:2rem;
        line-height: 2rem;
        background:#f3f8fc;
        & .tab-contentslist-left{
            font-size: 1.8rem;
            color:#1e93ff;
            height:2rem;
            width:2.5rem;
            position: absolute;
            left:0;
            top:0;
            background: #f3f8fc;
            z-index: 22;
        }
        & .tab-contentslist-right{
            width:100%;
            box-sizing: border-box;
            padding-left:2rem;
        }
    }
    .ivu-page{
        padding:1rem 0;
        .ivu-page-simple-pager{
            display: none;
        }
    }
    .lists-content {
        padding-top:4rem;
        & .sold_out{
            width: 100%;
            height: 2.1rem;
            background: url(../public/img/lists/soldout.png) no-repeat left center;
            background-size:100%;
            margin-top: -0.4666666666666667rem;
        }
        & .invest_no{
            & .img_lootall{
                height: 1.3333333333333333rem;
                width: 3.2666666666666666rem;
                border: none;
                color: #444f4f;
                background: url(../public/img/lists/lootall.png) no-repeat right center;
                background-size: 3.2666666666666666rem 1.3333333333333333rem;
                font-size: 0.8666666666666667rem;
            }
           & *{
              color:#888888!important;
            }
            & .gradient,& .bar{
            background:#dddddd!important;
            }
            & .bq{
                & span{
                    color:#888;
                    border-color:#888;
                }
            }
            & button{
                
                background:#888!important;
                & span{
                    color:#fff!important;
                }
            }
        }
    }
  .invest{
    padding:1rem;
    background: #fff;
    margin-bottom:1rem;
    text-align: left;
    &.newinvest{
      background: #fff url(../public/img/home/newinvest.png) no-repeat right top;
      background-size: 3.33333333rem 3.33333333rem;
    }
    & .titnew{
      padding-left: 2.5rem;
      background: url(../public/img/home/novic.png) no-repeat left center;
      background-size: 2.2333333333333334rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
    }
    & .tits{
      padding-left: 1.3rem;
      background: url(../public/img/home/img_shang.png) no-repeat left center;
      background-size: 0.8666666666666667rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
    }
    & .tit{
      padding-left: 1.3rem;
      background: url(../public/img/home/investitbg.png) no-repeat left center;
      background-size: 0.8666666666666667rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
    }
    & .titsaving {
        color: #444f4f;
        padding-left:2.5rem;
        background: url(../public/img/lists/img_saving.png) no-repeat left center;
        background-size:  2.2333333333333334rem 0.8666666666666667rem;
        font-size: 0.8666666666666667rem;
    }
   
    /* 理财-满标 */
    & .tits_no {
        color: #444f4f;
        padding-left: 1.3rem;
        background: url(../public/img/lists/img_shang_no.png) no-repeat left center;
        background-size: 0.8666666666666667rem 0.8666666666666667rem;
        font-size: 0.8666666666666667rem;
    }
    & .tit_no {
        color: #444f4f;
        padding-left: 1.3rem;
        background: url(../public/img/lists/investitbg_no.png) no-repeat left center;
        background-size: 0.8666666666666667rem 0.8666666666666667rem;
        font-size: 0.8666666666666667rem;
    }
    & .titnew_no {
        color: #444f4f;
        padding-left: 2.5rem;
        background: url(../public/img/lists/novice_no.png) no-repeat left center;
        background-size: 2.2333333333333334rem 0.8666666666666667rem;
        font-size: 0.8666666666666667rem;
    }
    & .titsaving_no {
        color: #444f4f;
        padding-left: 2.5rem;
        background: url(../public/img/lists/titsaving_no.png) no-repeat left center;
        background-size:  2.2333333333333334rem 0.8666666666666667rem;
        font-size: 0.8666666666666667rem;
    }

    & .invest-mid{
      margin:1rem 0;
    }
    & .bq{
       & span{
            font-size: 0.7rem;
            color: #1e93ff;
            height: auto;
            padding: 0.1rem 0.26666666666666666rem;
            border: 1px solid #1e93ff;
            line-height: 1rem;
            margin-top: 0.3rem;
            margin-left: 0.16666666666666666rem;
            border-radius: 0.2rem;
        }
    }
    & .invest-mid{
      &::after{
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      & li{
        float: left;
        width:33.333333%;
        text-align:center;
        & button{
            cursor: pointer;
            color: #fff;
            height: 2.933333333333333rem;
            line-height: 2.933333333333333rem;
            border-radius: 1rem;
            font-size: 1.0666666666666667rem;
            background: -webkit-linear-gradient(left, #24e9f0 , #2564ef);
            background: -o-linear-gradient(right, #24e9f0 , #2564ef);
            background: -moz-linear-gradient(right, #24e9f0 , #2564ef);
            background: linear-gradient(to right, #24e9f0 , #2564ef);
            border: 0;
            padding:0;
            width:90%;
            box-sizing: border-box;
            & span{
                font-size: 1rem!important;
            }
        }
      }
      & li:first-child{
        text-align:left;
      }
      & li .value{
        color: #444f4f;
        font-size: 1rem;
        position: relative;
        & span{
          font-size: 1.2rem;
        }
        & i{
          font-style: normal;
        }
      }
      & li .status{
        color: #949ead;
        font-size: 0.8rem;
    }
      & li.ll{
        & .value{
            color: #fd5e5e;
         font-weight: bold;
        }
      }
      
      /* 气泡 */
      & .bubble{display: inline-block;width:0.8666666666666667rem;height:0.8666666666666667rem;background: url(../public/img/home/notice_blue_icon.png) no-repeat;background-size: 100% 100%;margin:0;position: relative;}
      & .bubble i{position: absolute;width:6.533333333333333rem;height:4.2rem;top:-4.2rem;color:#9ea2a5;line-height:1.3rem;font-size: 0.6rem;text-align: left;background: url(../public/img/home/notice_white_bg.png) no-repeat;background-size: 100% 100%;left:-0.75rem;padding:0 0 0 0.5rem ;box-sizing: border-box;z-index: 7;}

      /* 额外加息气泡 */
      & .extra{position:relative;}
      & .extra i{position: absolute;width:3.4rem;height:1.4666666666666666rem;top:-1.4333333333333334rem;color:#fff;font-size: 0.6rem;text-align: center;line-height: 1.2666666666666666rem;background: url(../public/img/home/extra_bg.png) no-repeat;background-size: 100% 100%;left:0rem;}

    }
    .invest-bottom {
        margin-top:1rem;
        border-top:1px solid #edeeee;
         & .information p{
             padding-top:0.5rem;
             color:#9ea2a5;
              &  span {
                color: #0678fc;
            }
             & span.Fontcolor{
                 color:#444f4f;
                 & i{
                     font-style: normal;
                 }
             }
         }
       
        .fix{
            &::after{
                content: ".";
                display: block;
                height: 0;
                clear: both;
                visibility: hidden;
            }
        }
        .fr{
            float: right;
        }
        .fl{
            float: left;
        }
        & .bar-wrap {
            width: 100%;
            height: 0.2rem;
            background: #dddddd;
            margin-bottom: 0.5rem;
            & .bar{
                background: -webkit-linear-gradient(left, #24e9f0 , #2564ef);
                background: -o-linear-gradient(right, #24e9f0 , #2564ef);
                background: -moz-linear-gradient(right, #24e9f0 , #2564ef);
                background: linear-gradient(to right, #24e9f0 , #2564ef);
                color: #fff;
                height:100%;
            }
        }
    }
  }
}
</style>


