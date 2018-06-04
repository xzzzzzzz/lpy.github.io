<template>
    <div class="indexPage">
      <nav-title title="首页1" v-if="detailShow"></nav-title>
      <Carousel autoplay >
          <Carousel-item  v-for="item in item" :key="item.image_filename" >
              <div class="demo-carousel">
                <img :src="url +(item.image_filename)">
              </div>
          </Carousel-item>
      </Carousel>
      <div class="notice">
        <ul class="new">
          <li class="l-l">
            <Icon type="volume-medium"></Icon>
          </li>
          <li class="l-m">
            <Carousel autoplay :dots="setting.dots" :arrow="setting.arrow" :autoplay-speed='setting.autoplaySpeed' class="newItem">
                <Carousel-item  v-for="(item,index) in newItems" :key="index" >
                  <a :href="newUrl+(item.id)">
                    <div class="demo-carousel">
                      {{item.title}}
                    </div>
                  </a>
                </Carousel-item>
            </Carousel>
          </li>
          <li class="l-r">
            <router-link :to='{name:"news"}'>
               <Icon type="more"></Icon>
            </router-link>
            <!-- <a href="https://m.xgqq.com/#find/news">
              <Icon type="more"></Icon>
            </a> -->
          </li>
        </ul>
      </div>
      <div class="novice">
        <router-link :to='{name:"novice"}'>
          <img src="../public/img/home/novice.png" alt="">
        </router-link>
      </div>
      <div class="mengx">
        <div class="mengx-head">
          <a href="http://m.xgqq.com/#saving/rule">查看说明</a>
        </div>
        <div class="money-content">
          <ul class="fix">
              <li class="drjx">
                  <p>
                      无资金站岗<br> 当日计息
                  </p>
              </li>
              <li class="lgl">
                  <p>
                      每日复利<br> 利滚利
                  </p>
              </li>
              <li class="bjx">
                  <p>
                      金额不局限<br> 每分可生息
                  </p>
              </li>
          </ul>
          <router-link to="/lists"></router-link>
      </div>
      </div>
      <div class="invesList">
          <!-- 新手标 -->
          <div class="xsb" v-if="noviceBid!=' '">
            <div class="invest newinvest" :data-title="noviceBid.title" :data-id="noviceBid.id" @click="goInvest(noviceBid.id)">
              <div class="invest-top fix" @click.stop>
                  <div class="fl titnew">
                      {{noviceBid.title}}
                  </div>
                  <div class="pf fr"></div>
              </div>
              <div class="bq" style="font-size:0.6rem;line-height:1.5rem;color:#1e93ff">
                <span v-if="noviceBid.tags != ''" v-for="(item,index) in noviceBid.tags" :key="index">{{item}}</span>
              </div>
              <div class="invest-mid">
                  <ul class="value fix">
                      <li class="ll"><span>{{noviceBid.apr}}</span>%</li>
                      <li><span>{{noviceBid.period}}</span>天</li>
                      <li><span>{{noviceBid.min_invest_amount}}</span>元</li>
                  </ul>
                  <ul class="status fix">
                      <li>历史年化</li>
                      <li>投资期限</li>
                      <li>起投金额</li>
                  </ul>
              </div>
              <div class="invest-bottom">
                  <div class="information fix">
                      <p class="fl">
                          剩余<span>
                              {{noviceBid.invest_amount}}
                            </span>元可投
                      </p>
                  </div>
              </div>
            </div>
          </div>
          <!-- 商票 -->
          <div class="sp" v-if="businessTenderList!=' '">
            <div class="invest" :data-title="businessTenderList.title" :data-id="businessTenderList.id" @click="goInvest(businessTenderList.id)">
              <div class="invest-top fix">
                  <div class="fl tits">
                      {{businessTenderList.title}}
                  </div>
                  <div class="pf fr"></div>
              </div>
              <div class="bq" style="font-size:0.6rem;line-height:1.5rem;color:#1e93ff">
                <span v-if="businessTenderList.tags != ''" v-for="(item,index) in businessTenderList.tags" :key="index">{{item}}</span>
              </div>
              <div class="invest-mid" @click.stop >
                  <ul class="value fix">
                      <li class="ll" v-if="businessTenderList.vipPlusRate == 0 && businessTenderList.addapr == 0">
                        <span>{{businessTenderList.apr}}</span>%
                      </li>
                      <li v-else>
                        <span>{{businessTenderList.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{businessTenderList.vipPlusRate + businessTenderList.addapr}}% <i></i></span>
                        <span class="bubble" @click="bubbles">
                          <i v-show="bubble">
                            基础利率：{{businessTenderList.billBasicApr}}%<br/>
                              <p v-if="businessTenderList.addapr > 0">
                              活动加息：{{businessTenderList.addapr}}%
                              </p>
                              <p v-if="businessTenderList.vipPlusRate > 0">
                              特权加息：{{businessTenderList.vipPlusRate}}%
                              </p>
                          </i>
                        </span>
                      </li>
                      <li><span>{{businessTenderList.period}}</span>天</li>
                      <li><span>{{businessTenderList.min_invest_amount}}</span>元</li>
                  </ul>
                  <ul class="status fix">
                      <li>历史年化</li>
                      <li>投资期限</li>
                      <li>起投金额</li>
                  </ul>
              </div>
              <div class="invest-bottom">
                  <div class="information fix">
                      <p class="fl">
                          剩余<span>
                              {{businessTenderList.invest_amount}}
                            </span>元可投
                      </p>
                  </div>
              </div>
            </div>
          </div>
          <!-- 钱钱赚 -->
          <div class="sp" v-if="qqTenderList != ' '">
            <div class="invest" :data-id="qqTenderList.id" @click="goInvest(qqTenderList.id)" >
              <div class="invest-top fix" @click.stop>
                  <div class="fl tits">
                      {{qqTenderList.title}}
                  </div>
                  <div class="pf fr"></div>
              </div>
              <div class="bq" style="font-size:0.6rem;line-height:1.5rem;color:#1e93ff">
                <span v-if="qqTenderList.tags != ''" v-for="(item,index) in qqTenderList.tags" :key="index">{{item}}</span>
              </div>
              <div class="invest-mid">
                  <ul class="value fix">
                      <li class="ll"><span style="font-size:1.4rem">{{qqTenderList.baseApr}}</span>%~<span style="font-size:1.4rem">{{qqTenderList.topApr}}</span>%</li>
                      <li><span>{{qqTenderList.lockPeriod}}</span>天</li>
                      <li><span>{{qqTenderList.min_invest_amount}}</span>元</li>
                  </ul>
                  <ul class="status fix">
                      <li>历史年化</li>
                      <li>锁定期限</li>
                      <li>起投金额</li>
                  </ul>
              </div>
              <div class="invest-bottom">
                  <div class="information fix">
                      <p class="fl">
                          剩余<span>
                              {{qqTenderList.invest_amount}}
                            </span>元可投
                      </p>
                  </div>
              </div>
            </div>
          </div>
      </div>
      <div class="underwriting">
        <ul class="fix">
          <li>
            <a href="#find/view~id=128">
              <div>
                <Icon type="ios-information-outline"></Icon>关于我们
              </div>
              <p>全民所有制国资控股</p>
            </a>
          </li>
          <li>
            <a href="#compliance/index" class="fix">
              <div class="aqbz"><Icon type="clipboard"></Icon>信息披露</div>
              <p>用户资金由江西银行存管</p>
            </a>
          </li>
        </ul>
      </div>

    </div>

   
</template>

<script>

import navTitle from '../components/modules/title.vue'
import global_ from '../components/modules/Global.vue'
export default {

    data () {
      return {
        url:global_.serverPath,
        newUrl:'https://m.xgqq.com/#find/view~id=',
        detailShow:false,
        setting: {
            autoplaySpeed: 3000,
            dots: 'none',
            arrow: 'never'
        },
        item:[],
        newItems:[],
        noviceBid:{}, // 新手标
        qqTenderList:{}, // 钱钱赚
        businessTenderList:{}, // 商票
        bubble:false
      }
    },
    created () {
        this.$store.state.showBottomNav = true
    },
    mounted: function() {
        var _this = this;
        
        this.axios({
          method: 'post',
          data: { OPT: '410', signUUID: ''}
        }).then((response) => {
          if(response.data.bids[5] != null){
            this.noviceBid=response.data.bids[5]
          }else{
            this.noviceBid = " "
          }
          if(response.data.bids[11] != null){
            this.businessTenderList=response.data.bids[11]
          }else{
            this.businessTenderList = " "
          }
          if(response.data.bids[7] != null){
            this.qqTenderList=response.data.bids[7]
          }else{
            this.qqTenderList = " "
          } 
            if(this.noviceBid != " "){
              this.noviceBid.tags =  this.noviceBid.tags.split(',')
            }
            if(this.businessTenderList != " "){
              this.businessTenderList.tags =  this.businessTenderList.tags.split(',')
            }
            if(this.qqTenderList != " "){
              this.qqTenderList.tags =  this.qqTenderList.tags.split(',')
            }
            console.log(this.noviceBid)
        }).catch((error) => {
            console.log(error)
        })
        this.axios({
          method: 'post',
          data: { OPT: '170'}
        }).then((response) => {
            this.item=response.data.banner;
            this.newItems=response.data.notices

        }).catch((error) => {
            console.log(error)
        })

    },
    components: { navTitle  },
    methods: {
      goInvest (item) {
        this.$router.push({path:'/tender/invest',query:{id:item}});
      },
      bubbles () {
        this.bubble = !this.bubble
        console.log(this.bubble)
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
.indexPage{
  .ivu-carousel{
    height:12.2rem;
  }
  img {
    width: 100%;
    display:block;
    height:12.2rem;
  }
  .notice{
    height: 2.666666666665rem;
    line-height: 2.666666666665rem;
    padding:0 1rem;
    box-sizing:border-box;
    background:#fff;
    & li{
      float: left;
      list-style:none;
      height:2.666666666665rem;
    }
    & li.l-l{
      color:#1e93ff;
      font-size: 2rem;
      width:10%;
    }
    & li.l-m{
      width:80%;
      .newItem{
        height:2.666666666665rem;
        background:#fff;
        line-height: 2.666666666665rem;
        box-sizing: border-box;
        a{
          color: rgb(79, 80, 80);
          .demo-carousel{
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    & li.l-r{
      float: right;
      width: 10%;
      height: 2.6666666666666665rem;
      font-size: 1.5rem;
      a{
        display: block;
        width:100%;
        height:100%;
        color: rgb(79, 80, 80);
      }
    }
  }
  .novice{
    width:100%;
    height:6.6666666666rem;
    margin-top:1rem;
    img{
      width:100%;
      height:6.6666666666rem;
    }
  }
  .mengx{
    width:90%;
    height:15rem;
    margin:1rem auto;
    background: url(../public/img/home/money-boxbg.png) no-repeat center center;
    background-size:100% 100%;
    .mengx-head{
      height: 4.3333333333rem;
      line-height: 3.333333333rem;
      padding-right: 1rem;
      background: url(../public/img/home/money-boxtitle.png) no-repeat center center;
      background-size: 5.11rem 1.9rem;
      a{
        float: right;
        color:#4f4f4f;
        font-size: 0.6rem;
      }
    }
    .money-content{
      a{
        display: block;
        width: 11.33333333333rem;
        height: 2.266666666666rem;
        margin: 0.8333333333rem auto 0;
        background: url(../public/img/home/toinvest.png) no-repeat;
        background-size: 100% 100%;
      }
      ul{
        overflow: hidden;
        margin-bottom:0.5rem;
        li{
          float: left;
          width:33.3333333%;
          text-align: center;
          padding-top:4.833333333rem;
          &.drjx{
                background: url(../public/img/home/drjx.png) no-repeat center 1rem;
              background-size: 4.2rem 3.566666666rem;
          }
          &.lgl{
                background: url(../public/img/home/lgl.png) no-repeat center 1rem;
              background-size: 4.2rem 3.566666666rem;
          }
          &.bjx{
                background: url(../public/img/home/bjx.png) no-repeat center 1rem;
              background-size: 4.2rem 3.566666666rem;
          }
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
    & .invest-top,& .invest-mid{
      margin-bottom:1rem;
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
      }
      & li:first-child{
        text-align:left;
      }
      & .value li{
        color: #444f4f;
        font-size: 1rem;
        position: relative;
        & span{
          font-size: 1.4rem;
        }
        & i{
          font-style: normal;
        }
      }
      & .value li.ll{
        color: #fd5e5e;
        font-weight: bold;
      }
      & .status li.ll{
        color: #949ead;
        font-size: 0.8rem;
      }
      /* 气泡 */
      & .bubble{display: inline-block;width:0.8666666666666667rem;height:0.8666666666666667rem;background: url(../public/img/home/notice_blue_icon.png) no-repeat;background-size: 100% 100%;margin:0 0 0 0.3rem;position:absolute;right:-0.6rem;top:0.9rem;}
      & .bubble i{position: absolute;width:6.533333333333333rem;height:4.2rem;top:-4.2rem;color:#9ea2a5;line-height:1.3rem;font-size: 0.6rem;text-align: left;background: url(../public/img/home/notice_white_bg.png) no-repeat;background-size: 100% 100%;left:-0.75rem;padding:0 0 0 0.5rem ;box-sizing: border-box;}

      /* 额外加息气泡 */
      & .extra{position:relative;}
      & .extra i{position: absolute;width:3.4rem;height:1.4666666666666666rem;top:-1.4333333333333334rem;color:#fff;font-size: 0.6rem;text-align: center;line-height: 1.2666666666666666rem;background: url(../public/img/home/extra_bg.png) no-repeat;background-size: 100% 100%;left:0rem;}

    }
    .invest-bottom {
        margin-top:1rem;
      & .information span {
        color: #0678fc;
      }
    }
  }
  .underwriting{
    & ul{
      &::after{
        content: ".";
        display: block;
        height: 0;
        clear: both;
        visibility: hidden;
      }
      & li{
        float: left;
        width:50%;
        text-align: center;
        padding:1rem 0;
        & a{
          color:#0e2642;
          font-size: 1.2rem;
          & .ivu-icon-ios-information-outline{
            margin-right:0.3rem;
            font-size: 1.3rem;
          }
          & div{
            margin-bottom: 0.3rem;
            height: 2rem;
            line-height: 2.3rem;
          }
          & div.aqbz{
            text-align: center;
            & i{
              margin-right: 0.3rem;
              font-size: 1.3rem;
            }
          }
          & p{
            font-size: 0.6rem;
            color:#888fa1;
          }
        }
      }
    }
  }
}
  

</style>

