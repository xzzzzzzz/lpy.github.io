<template>
  <div class="myInvestment">
    <navTitle title="我的投资" v-if="detailShow" :showPrev="showPrev" :prev="prev"></navTitle>
    <Tabs value="name1">
        <TabPane label="投资记录" name="name1">
          <div class="invest">
            <Scroll :on-reach-bottom="handleReachBottom" :height="height"  v-if="investList.length>'0'">
              <div class="item" v-for="(item,index) in investList" :key="index">
                <input type="hidden" class="timeid">
                <div class="c" g-act-tap="true">
                  <div class="title fix">
                    <h3 class="fl">{{item.title}}</h3>
                    <span class="bh">特权加息：{{item.aprPlus}}%</span>
                    <br>
                  </div>
                  <div class="time" style="padding:0.5rem 0;" v-if="item.product_id == 0">
                    <p v-if="item.zero_type == 0">
                      还款日：{{item.time.time|formatDate}}
                    </p>
                    <p v-else>
                      锁定期结束日：{{item.lockDate.time|formatDate}}
                      <span style="padding-left:0.5rem;">
                        锁定期:	{{item.lockPeriod}}天
                      </span>
                    </p>
                  </div>
                  <div class="time" style="padding:0.5rem 0;" v-else>
                    <p v-if="item.product_id == 10">
                      {{item.lockDate.time|formatDate}}后可免费退出
                    </p>
                    <p v-else>
                       还款日：{{item.time.time|formatDate}}
                    </p>
                  </div>
                  <ul class="fix">
                    <li>
                      <p class="date">
                        本金：{{item.invest_amount}}元
                      </p>
                    </li>
                      <li style="font-size:0.8rem;" v-if="item.product_id == 0">
                        <p class=""  v-if="item.zero_type == 0">
                          参考收益：<span>{{item.preyield|numberFormats}}元</span>
                        </p>
                        <p v-else>
                          固定返现：<span :class="{'green':item.status==5}">{{item.preyield|numberFormats}}元</span>
                        </p>
                      </li>
                      <li style="font-size:0.8rem;"  v-else>
                         <p class=""  v-if="item.product_id == 10">
                            累计收益：<span>{{item.sumEarnings|numberFormats}}元</span>
                          </p>
                          <p v-else>
                            参考收益：<span>{{item.preyield|numberFormats}}元</span>
                          </p>
                      </li>
                  </ul>
                  <div class="staus" v-if="item.product_id == 10">
                    <p v-if="item.match_status==11">
                      <span class="green">已完成</span>
                    </p>
                    <p v-else>
                      <span class="red">计息中</span>
                    </p>
                  </div>
                  <div class="staus" v-else>
                    <p v-if="item.bid_type == 1">
                      <span v-if="item.status == 2" class="red">计息中</span>
                      <span v-else-if="item.status == 4" class="green">已完成</span>
                    </p>
                    <p v-else>
                      <span v-if="item.status == 4" class="red">计息中</span>
                      <span v-else-if="item.status == 5" class="green">已完成</span>
                      <span v-else>募集中</span>
                    </p>
                  </div>
                </div>
              </div>
            </Scroll>
            <div class="item" v-else :style="{'height':height+'px'}">
              暂无投资记录
            </div>
          </div>
          <quick-menu :menu-count=count :list-text=icons :menu-url-list=list :background-color=backgroundColor :color=color :position=position :is-open-new-tab=isOpenNewTab @process="dataGet"></quick-menu>
        </TabPane>
        <TabPane label="约标记录" name="name2">标签二的内容</TabPane>
    </Tabs>
  </div>
</template>

<script>
  import navTitle from '../../modules/title.vue'
  import quickMenu from '../../modules/quickMenu'
  export default {
    data () {
      return {
        detailShow: true,
        showPrev: true,
        prev: {path:'/users'},
        height:'600',
        investList:[],
        bidsAllCount:'',
        currPage:1,
        count:5,
        icons:["已完成","待计息","计息中","募集中","全部"],
        list:[{"status":'5'},{"status":'3'},{"status":'4'},{"status":'0'},{"status":' '}],
        backgroundColor:'#17c4c5',
        color:'#ffffff',
        position:'bottom-right',
        isOpenNewTab:false,
      }
    },
    created () {
      this.$store.state.showBottomNav = false
      let height = window.screen.height-95
      this.height = height
    },
    components: {
      navTitle,
      quickMenu
    },
    mounted(){
      var getDatas = this.getDatas()
      this.axios({
          method: 'post',
          data: {
            OPT: '177',
            pageSize: 10,
            currPage: 1,
            status: " ",
            id: getDatas
            }
        }).then((response) => {
            this.bidsAllCount=response.data.bidsAllCount
            this.investList=response.data.list
        }).catch((error) => {
            console.log(error)
        }) 
    },
    methods:{
      complete () {
        // this.$router.push({path:'/tender/invest',query:{id:this.$route.query.bid}})
      },
      dataGet (value) {
      console.log(value)
      var getDatas = this.getDatas()
        this.axios({
          method: 'post',
          data: {
            OPT: '177',
            pageSize: 10,
            currPage: 1,
            status: value,
            id: getDatas
            }
        }).then((response) => {
            this.bidsAllCount=response.data.bidsAllCount
            this.investList=response.data.list
            console.log(this.investList.length)
        }).catch((error) => {
            console.log(error)
        })   
      },
       handleReachBottom () {
         var getDatas = this.getDatas()
            return new Promise(resolve => {
                let length =  Math.ceil(this.bidsAllCount/10)
                this.currPage += 1
                if(this.currPage >= length){
                    this.currPage = length
                    setTimeout(() => {
                        console.log('没有更多了')
                    },2000)
                    
                }else{
                    let that = this
                    let last = that.investList[this.investList.length-1]
                    setTimeout(() => {
                        that.axios({
                            method: 'post',
                            data: {
                            OPT: '177',
                            pageSize: 10,
                            currPage: that.currPage,
                            status: "",
                            id: getDatas
                            }
                        }).then((response) => {
                            let dataList = response.data.list
                            for (var i = 0;i < dataList.length; i++){
                                that.investList.push(dataList[i])
                            }
                        }).catch((error) => {
                            console.log(error)
                        })
                        resolve();
                    }, 2000);
                }
            });
        },
    }
  }
</script>

<style lang="less">
.myInvestment{
  padding-top:3rem;
  & .ivu-tabs-bar{
    margin-bottom:0;
    background:#fff;
  }
  & .ivu-tabs-nav{
    width:100%;
    & .ivu-tabs-tab{
      width:50%;
      box-sizing: border-box;
      margin-right:0;
    }
  }
  & .item{
    padding:0.5rem 1rem;
    & .c {
      padding:0.5rem 1rem 0;
      background:#fff;
      cursor:pointer;
      border-radius:5px;
      position:relative;
      & .title {
        font-size:1rem;
        height:2rem;
        line-height:2rem;
        &  h3 {
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
          font-weight: normal;
          font-size: 1rem;
        }
        & span {
          font-size:0.8rem;
          color:#ADADAD;
          float:right;
          color:#1e93ff;
        }
      }
      & .time {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size:0.8rem;
        color:#888;
        text-align: left;
      }
      & .staus {
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        font-size:0.8rem;
        text-align:center;
        position:absolute;
        width:2.8rem;
        height:1.2rem;
        line-height:1.4rem;
        color:#fff;
        right:-0.2rem;
        top:2.5rem;
        & span{
          display: block;
          background:url(../../../public/img/invest/mj.png) no-repeat center center;
          background-size:100% 100%;
        }
        & span.green{
          background:url(../../../public/img/invest/wc.png) no-repeat center center;
          background-size:100% 100%;
        }
        & span.red{
          background:url(../../../public/img/invest/jx.png) no-repeat center center;
          background-size:100% 100%;
        }
      }
      & ul {
        padding:0rem 0 0.5rem 0;
        & li {
          float:left;
          padding:0 0.5rem;
          & p {
            color:#888888;
            line-height:1.5333333333333334rem;
            font-size:0.8rem;
            & span {
              font-size:0.8rem;
              color:#fd5e5e;
            }
            & span.green {
              font-size:0.8rem;
              color:#888;
            }
          }
        }
        & li:first-child {
          float:left;
          padding-left:0;
          background:url(../../../public/img/invest/bglist.png) no-repeat right center;
          background-size:1px 0.8rem;
        }
      }
    }
  }
}
</style>
