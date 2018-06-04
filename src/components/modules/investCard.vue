<template>
  <div class="lists-content">
      <div class="invesList" v-for="(item, index) in dataList" :key="index" v-if="dataList !== ''">
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
                                      <span>{{item.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{item.vipPlusRate + item.addapr}}% <i></i></span>
                                      <span class="bubble" @click="showBbubble(index)">
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
                                      <span>{{item.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{item.vipPlusRate + item.addapr}}% <i></i></span>
                                      <span class="bubble" @click="showBbubble(index)">
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
      <div class="invesList" v-if="data !== ''">
          <div class="invest" :class="[{'newinvest':(data.product_id == 5 && data.loan_schedule<100)},{'invest_no':data.loan_schedule==100}]" :data-title="data.title" :data-id="data.id" >
              <div class="invest-top fix">
                  <div v-if="data.loan_schedule<100" class="fl" :class="[{'tits':data.product_id == 2},{'tit':data.product_id==7},{'titnew':data.product_id==5},{'titsaving':data.product_id==10}]">
                      {{data.title}}
                  </div>
                  <div v-else class="fl" :class="[{'tits_no':data.product_id == 2},{'tit_no':data.product_id==7},{'titnew_no':data.product_id==5},{'titsaving_no':data.product_id==10}]">
                      {{data.title}}
                  </div>
                  <div class="pf fr">
                      <div class="img_lootall" v-if="data.loan_schedule==100"></div>
                  </div>
              </div>
              <div class="bq" style="font-size:0.6rem;line-height:1.5rem;color:#1e93ff;text-align:left;">
                  <span v-if="data.tags != ''" v-for="(data1, index) in data.tags" :key="index">{{data1}}</span>
              </div>
              <div class="invest-mid">
                  <ul class=" fix">
                      <li class="ll">
                          <div class="value">
                              <div  v-if="data.product_id == 7"><span>{{data.apr}}</span>%~<span>{{data.topApr}}</span>%</div>
                              <div v-else-if="data.product_id == 10">
                                  <div v-if="data.vipPlusRate == 0 && data.addapr == 0">
                                      <span>{{data.billBasicApr}}</span>%
                                  </div>
                                  <div v-else>
                                      <span>{{data.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{data.vipPlusRate + data.addapr}}% <i></i></span>
                                      <span class="bubble" @click="showBbubble(index)">
                                      <i v-show="bubble === index">
                                          参考基础：{{data.billBasicApr}}%<br/>
                                          <p v-if="data.addapr > 0">
                                          活动加息：{{data.addapr}}%
                                          </p>
                                          <p v-if="data.vipPlusRate > 0">
                                          特权加息：{{data.vipPlusRate}}%
                                          </p>
                                      </i>
                                      </span>
                                  </div>
                              </div>
                              <div v-else>
                                  <div v-if="data.vipPlusRate == 0 && data.addapr == 0">
                                      <span>{{data.billBasicApr}}</span>%
                                  </div>
                                  <div v-else>
                                      <span>{{data.billBasicApr}}</span>%<span class="extra" style="font-size:0.8rem;">+{{data.vipPlusRate + data.addapr}}% <i></i></span>
                                      <span class="bubble" @click="showBbubble(index)">
                                      <i v-show="bubble === index">
                                          基础利率：{{data.billBasicApr}}%<br/>
                                          <p v-if="data.addapr > 0">
                                          活动加息：{{data.addapr}}%
                                          </p>
                                          <p v-if="data.vipPlusRate > 0">
                                          特权加息：{{data.vipPlusRate}}%
                                          </p>
                                      </i>
                                      </span>
                                  </div>
                              </div>
                          </div>
                          <div class="status">
                              <p v-if=" data.product_id == 10">
                                  参考年化
                              </p>
                              <p v-else>
                                  往期年化
                              </p>
                          </div>
                      </li>
                      <li>
                          <div class="value">
                              <div v-if="data.product_id == 7 || data.product_id == 10 ">
                                  <span>{{data.lockPeriod}}</span>天
                              </div>
                              <div v-else>
                                  <span>{{data.period}}</span>天
                              </div>
                          </div>
                          <div class="status">
                              <p v-if=" data.product_id == 10 || data.product_id == 7">
                                  锁定期限
                              </p>
                              <p v-else>
                                  投资天数
                              </p>
                          </div>
                      </li>
                      <li>
                          <div class="value">
                              <div v-if="data.product_id != 10">
                                  <span>{{data.min_invest_amount}}</span>元
                              </div>
                              <div v-else>
                                  <div class="inves-btn">
                                      <Button>立即投资</Button>
                                  </div>
                              </div>
                          </div>
                          <div class="status"  v-show="data.product_id != 10">
                              起投金额
                          </div>
                      </li>
                  </ul>
              </div>
              <div class="invest-bottom" v-if="data.product_id != 10 ">
                  <div class="bar-wrap">
                      <div class="bar gradient" :style="{'width':(data.loan_schedule || 0)+'%'}"></div>
                  </div> 
                  <div class="information fix ">
                      <p class="fl">
                          已投:<span>{{(data.loan_schedule || 0)}}%</span>
                      </p>
                      <p class="fr">
                          剩余<span style="color:#1e93ff">{{data.invest_amount}}</span>元可投
                      </p>
                  </div>
              </div>
              <div class="invest-bottom" v-else>
                  <div class="information fix">
                      <div class="fl">
                          <p>
                              累计出借：
                              <span class="Fontcolor" v-if="data.version!=''">
                                  {{data.version | numberFormats(0,".",",","ceil")}}笔
                              </span>
                              <span class="Fontcolor" v-else>
                                  -
                              </span>
                          </p>
                          <p>
                              平均转出：
                              <span class="Fontcolor" v-if="data.avgTransPeriod != ''">
                                  {{data.avgTransPeriod}}
                              </span>
                              <span class="Fontcolor" v-else>
                                  -
                              </span>
                          </p>
                      </div>
                      <div class="fr">
                          <p>
                              累计出借：
                              <span class="Fontcolor" v-if="data.has_invested_amount != ''">
                                  <i v-if="(data.has_invested_amount/10000)>1">
                                      {{(data.has_invested_amount/10000) | numberFormats}}万元
                                  </i>
                                  <i v-else>
                                      {{data.has_invested_amount | numberFormats}}元
                                  </i>
                                  
                              </span>
                              <span class="Fontcolor" v-else>
                                  -
                              </span>
                          </p>
                          <p>
                              最长转出：
                              <span class="Fontcolor" v-if="data.maxTransPeriod != ''">
                                  {{data.maxTransPeriod}}
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
  </div>
</template>

<script>
export default {
    props:{
      dataList: {
        type : Array
      },
      data: {
        type: Object
      }
    },
    data () {
      return {
        bubble:-1
      }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return new Date(time).Format('yyyy-MM-dd')
        },
        numberFormats(number,decimals=2,dec_point=".",thousands_sep=",",roundtag='floor'){
            /*
				* 参数说明：
				* number：要格式化的数字
				* decimals：保留几位小数
				* dec_point：小数点符号
				* thousands_sep：千分位符号
				* roundtag:舍入参数，默认 "ceil" 向上取,"floor"向下取,"round" 四舍五入
				* */
				number = (number + '').replace(/[^0-9+-Ee.]/g, '');
				roundtag = roundtag || "ceil"; //"ceil","floor","round"
				var n = !isFinite(+number) ? 0 : +number,
					prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
					sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
					dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
					s = '',
					toFixedFix = function (n, prec) {
			
						var k = Math.pow(10, prec);
						console.log();
			
						return '' + parseFloat(Math[roundtag](parseFloat((n * k).toFixed(prec*2))).toFixed(prec*2)) / k;
					};
				s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
				var re = /(-?\d+)(\d{3})/;
				while (re.test(s[0])) {
					s[0] = s[0].replace(re, "$1" + sep + "$2");
				}
			
				if ((s[1] || '').length < prec) {
					s[1] = s[1] || '';
					s[1] += new Array(prec - s[1].length + 1).join('0');
				}
				return s.join(dec);
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

  .lists-content {
      & .sold_out{
          width: 100%;
          height: 2.1rem;
          background: url(../../static/img/lists/soldout.png) no-repeat left center;
          background-size:100%;
          margin-top: -0.4666666666666667rem;
      }
      & .invest_no{
          & .img_lootall{
              height: 1.3333333333333333rem;
              width: 3.2666666666666666rem;
              border: none;
              color: #444f4f;
              background: url(../../static/img/lists/lootall.png) no-repeat right center;
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
    background: #fff url(../../static/img/home/newinvest.png) no-repeat right top;
    background-size: 3.33333333rem 3.33333333rem;
  }
  & .titnew{
    padding-left: 2.5rem;
    background: url(../../static/img/home/novic.png) no-repeat left center;
    background-size: 2.2333333333333334rem 0.8666666666666667rem;
    font-size: 0.8666666666666667rem;
  }
  & .tits{
    padding-left: 1.3rem;
    background: url(../../static/img/home/img_shang.png) no-repeat left center;
    background-size: 0.8666666666666667rem 0.8666666666666667rem;
    font-size: 0.8666666666666667rem;
  }
  & .tit{
    padding-left: 1.3rem;
    background: url(../../static/img/home/investitbg.png) no-repeat left center;
    background-size: 0.8666666666666667rem 0.8666666666666667rem;
    font-size: 0.8666666666666667rem;
  }
  & .titsaving {
      color: #444f4f;
      padding-left:2.5rem;
      background: url(../../static/img/lists/img_saving.png) no-repeat left center;
      background-size:  2.2333333333333334rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
  }
  
  /* 理财-满标 */
  & .tits_no {
      color: #444f4f;
      padding-left: 1.3rem;
      background: url(../../static/img/lists/img_shang_no.png) no-repeat left center;
      background-size: 0.8666666666666667rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
  }
  & .tit_no {
      color: #444f4f;
      padding-left: 1.3rem;
      background: url(../../static/img/lists/investitbg_no.png) no-repeat left center;
      background-size: 0.8666666666666667rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
  }
  & .titnew_no {
      color: #444f4f;
      padding-left: 2.5rem;
      background: url(../../static/img/lists/novice_no.png) no-repeat left center;
      background-size: 2.2333333333333334rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
  }
  & .titsaving_no {
      color: #444f4f;
      padding-left: 2.5rem;
      background: url(../../static/img/lists/titsaving_no.png) no-repeat left center;
      background-size:  2.2333333333333334rem 0.8666666666666667rem;
      font-size: 0.8666666666666667rem;
  }

  & .invest-top,& .invest-mid{
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
    & .bubble{display: inline-block;width:0.8666666666666667rem;height:0.8666666666666667rem;background: url(../../static/img/home/notice_blue_icon.png) no-repeat;background-size: 100% 100%;margin:0;position: relative;}
    & .bubble i{position: absolute;width:6.533333333333333rem;height:4.2rem;top:-4.2rem;color:#9ea2a5;line-height:1.3rem;font-size: 0.6rem;text-align: left;background: url(../../static/img/home/notice_white_bg.png) no-repeat;background-size: 100% 100%;left:-0.75rem;padding:0 0 0 0.5rem ;box-sizing: border-box;}

    /* 额外加息气泡 */
    & .extra{position:relative;}
    & .extra i{position: absolute;width:3.4rem;height:1.4666666666666666rem;top:-1.4333333333333334rem;color:#fff;font-size: 0.6rem;text-align: center;line-height: 1.2666666666666666rem;background: url(../../static/img/home/extra_bg.png) no-repeat;background-size: 100% 100%;left:0rem;}

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
</style>


