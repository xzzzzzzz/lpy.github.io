<template>
    <div class="user">
        <nav-title title="个人中心" v-if="detailShow"></nav-title>
        <div class="top1 fix gradient">
            <div class="fl messages">
                <a href="#user/message"></a>
            </div>
            <div class="fl name">
                <p style="height:100%;overflow:hidden;">
                    <span v-if="userData.realityName">
                        {{userData.realityName|realNameFormat}}
                    </span>
                    <span v-else>未实名</span>
                    <a href="#user/members">
                        <span class="grade" :class="'v'+userData.vipGrade"></span>
                    </a>
                </p>
            </div>
            <div class="fr aq">
                <a href="#user/set"></a>
            </div>
        </div>
        <div class="user-top gradient">
            <div class="top2">
                <ul class="fix">
                    <li class="all fix">
                        <div class="fl" style="width:50%;">
                            <p style="">总资产(元) <span class="eye" v-if="eye" @click="toggleEye"></span><span class="eyeClose" v-else  @click="toggleEye"></span></p>
                            <p class="mtext">
                                <span class="openEye" v-if="eye">{{(userData.totalBalance+userData.totalWaitFor)|numberFormats}}</span>
                                <span class="closeEye" v-else>****</span>
                            </p>
                        </div>
                        <div class="tired fl">
                            <span>
                                <a href="#vip/accumulated" v-if="accumulated != null">
                                    月度有奖冲档<br>还差{{accumulated.marginAmount|numberFormats}}元
                                </a>
                                <a href="#vip/accumulated" v-else>
                                    月度累投<br>
                                    {{0|numberFormats}}元
                                </a>
                            </span>
                        </div>
                    </li>
                    <li>
                        <p>总余额(元)</p>
                        <p class="mtext">
                            <span class="openEye" v-if="eye">{{userData.totalBalance|numberFormats}}</span>
                            <span class="closeEye" v-else>****</span>
                        </p>
                    </li>
                    <li>
                        <p>总待收(元)</p>
                        <p class="mtext">
                            <span class="openEye" v-if="eye">{{userData.totalWaitFor|numberFormats}}</span>
                            <span class="closeEye" v-else>****</span>
                        </p>
                    </li>

                </ul>
            </div>
            <div class="top3">
                <ul class="fix">
                    <li>
                        <div>
                            <p class="mtext">
                            可用余额(元)	<br>	
                                <span class="openEye" v-if="eye">{{userData.balance|numberFormats}}</span>
                                <span class="closeEye" v-else>****</span>
                            </p>
                        </div>
                        <div>
                            <p class="mtext">
                            冻结余额(元)<br>
                                <span class="openEye" v-if="eye">{{userData.freeze|numberFormats}}</span>
                                <span class="closeEye" v-else>****</span>
                            </p>
                        </div>
                    </li>
                    <li>
                        <div>
                            <p class="mtext">
                            待收利息(元)
                                <span class="openEye" v-if="eye">{{userData.waitForProfit|numberFormats}}</span>
                                <span class="closeEye" v-else>****</span>
                            </p>
                        </div>
                        <div>
                            <p class="mtext">
                            待收本金(元)
                                <span class="openEye" v-if="eye">{{userData.taBill|numberFormats}}</span>
                                <span class="closeEye" v-else>****</span>
                            </p>
                        </div>
                        <div>
                            <p class="mtext">
                            待收补贴(元)
                                <span class="openEye" v-if="eye">{{userData.sumSubsidy|numberFormats}}</span>
                                <span class="closeEye" v-else>****</span>
                            </p>
                        </div>
                        
                    </li>
                </ul>
            </div>      
            <div class="top4" @click="trantion">
                <Icon type="ios-arrow-down" v-if="down"></Icon>
                <Icon type="ios-arrow-up" v-else></Icon>
            </div>
        </div>
        <div class="user-mid">
            <ul class="fix">
                <li>
                    <a href="javascript:;">
                        <p class="stats">累计收益(元)</p>
                        <p class="value">
                           {{userData.totalIncome|numberFormats}}
                        </p>
                    </a>
                </li>
                <li>
                    <a href="javascript:;">
                        <p class="stats">体验金(元)</p>
                        <p class="value">
                           {{holdAmount|numberFormats}}
                        </p>
                    </a>
                </li>
            </ul>
        </div>
        <div class="welfare">
            <ul>
                <li class="welfare_0">
                    <a href="#user/members">
                        <p>
                            <span>会员中心</span><br>
                            <span style="color:#8c96a7;font-size:0.8rem">投升级，享特权</span>	
                        </p>
                    </a>
                    <p class="qidai"></p>
                </li>
                <li class="welfare_1">
                    <a href="#vip/task">
                        <p>
                            <span>任务中心</span><br>
                            <span style="color:#8c96a7;font-size:0.8rem">做任务，领福利</span>	
                        </p>
                    </a>
                    <p class="qidai"></p>
                </li>
                <li class="welfare_2">
                    <a href="#vip/ranking"> 
                        <p>
                            <span>排榜大厅</span><br>
                            <span style="color:#8c96a7;font-size:0.8rem">来打榜，抢福利</span>
                        </p>
                        
                    </a>
                    <p class="qidai">

                    </p>
                </li>
                <li class="welfare_3">
                    <a href="#vip/medal">
                        <p class="">
                            <span>勋章墙</span><br>
                            <span style="color:#8c96a7;font-size:0.8rem">做任务，拿福利</span>	
                        </p>
                    </a>
                    <p class="qidai"></p>
                </li>
            </ul>

        </div>
        <div class="user-content">
            <div class="zjxx">
                <ul>
                    <li class="touzi" g-act-tap="true">
                        <a href="#user/invest">
                            我的投资
                        </a>
                    </li>
                    <li class="jyjl" g-act-tap="true">
                        <a href="#user/transactionRecord">
                            资金变动
                        </a>
                    </li>
                    <li g-act-tap="true" class="wdjf">
                        <a href="#worldCup/myPoints">
                            我的积分
                        </a>
                    </li>
                    <li g-act-tap="true" class="dhjl">
                        <a href="#integral/exchangeRecord">
                            兑换记录
                        </a>
                    </li>
                    <li class="wdyh" g-act-tap="true">
                        <a href="#user/discount">
                            我的福利
                        </a>
                    </li>
                    <li class="wdsc" g-act-tap="true">
                        <a href="#user/collection">
                            我的收藏
                        </a>
                    </li><li class="wdyq" g-act-tap="true">
                        <a href="#user/invite">
                            邀请赚钱
                        </a>
                    </li>
                    
                    <li class="ljtz" g-act-tap="true">
                        <a href="#signin/view">
                            每日签到
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="user-btn-blank">
            <div class="user-btn fix">
                <a href="#user/cresh" class="tx" g-act-tap="true">提现</a>
                <a href="#user/recharge" class="cz" g-act-tap="true">充值</a>
            </div>
        </div>
    </div>
</template>

<script>

import navTitle from '../components/modules/title.vue'
export default {
    data () {
      return {
        detailShow:false,
        falg : 0,
        down:true,
        eye:true,
        userData:{},
        accumulated:{},
        holdAmount:0,
      }
    },
    created () {
        this.$store.state.showBottomNav = true
    },
    components: { navTitle },
    mounted: function() {
       
        const getDatas = this.getDatas();
        // console.log("userIds",userIds)
        console.log("getDatas",getDatas)
        // 用户信息
        this.axios({
          method: 'post',
          data: { 
            userId: getDatas,
            OPT: 205
          }
        }).then((response) => {
            var data = response.data
            if(data.error == -1){
                this.userData = data
               this.holdAmount = this.userData.experienceAccount.holdAmount
                 this.axios({
                    method: 'post',
                    data: { 
                        signUUID: getDatas,
                        OPT: 10030
                    }
                    }).then((response) => {
                        var data = response.data
                        if(data.error == -1){
                            this.accumulated = data.data.data
                        }else{
                        this.$Message.warning(data.msg)
                        }
                        console.log(this.accumulated)
                    }).catch((error) => {
                        console.log(error)
                    })
            }else{
               this.$Message.warning(data.msg)
            }
        }).catch((error) => {
            console.log(error)
        })
        // 月度累投
       
    },
    methods: {
        trantion () {
            if(this.falg == 0){
                document.getElementsByClassName('top3')[0].style.height = "6rem"
                this.down = false
                this.falg = 1
            }else if(this.falg == 1){
                document.getElementsByClassName('top3')[0].style.height = "0"
                this.down = true
                this.falg = 0
            }
        },
        toggleEye () {
            this.eye = !this.eye
        }
    }
}
</script>

<style lang="less">
.user{
    & .top1 {
        color:#fff;
        text-align:center;
        padding:1rem;
        position:fixed;
        top:0;
        left:0;
        width:100%;
        box-sizing:border-box;
        z-index:22;
        & .messages {
            width:20%;
            height:2rem;
            background:url(../public/img/user/message.png) no-repeat left center;
            background-size:1.33333333333rem 1rem;
            & a{
                display: block;
                height:100%;
            }
        }
        & .name {
            width:60%;
            height:2rem;
            font-size:1.1333333333rem;
            line-height:2rem;
            & .grade {
                display:inline-block;
                margin-left:0.5rem;
                width:1.8rem;
                height:1.0666666666666667rem;
                line-height:1.0666666666666667rem;
                border-radius:3rem;
                font-size:0.8rem;
                background:#78c3f5;
                text-align:center;
                color:#fff;
            }
            & .grade.v1 {
                background:url(../public/img/vip/v1.png) no-repeat center center;
                background-size:100% 100%;
            }
            & .grade.v2 {
                background:url(../public/img/vip/v2.png) no-repeat center center;
                background-size:100% 100%;
            }
            & .grade.v3 {
                background:url(../public/img/vip/v3.png) no-repeat center center;
                background-size:100% 100%;
            }
            & .grade.v4 {
                background:url(../public/img/vip/v4.png) no-repeat center center;
                background-size:100% 100%;
            }
            & .grade.v5 {
                background:url(../public/img/vip/v5.png) no-repeat center center;
                background-size:100% 100%;
            }
            & .grade.v6 {
                background:url(../public/img/vip/v6.png) no-repeat center center;
                background-size:100% 100%;
            }
            & .grade.v7 {
                background:url(../public/img/vip/v7.png) no-repeat center center;
                background-size:100% 100%;
            }
        }
        & .aq {
            width:20%;
            height:2rem;
            background:url(../public/img/user/aq.png) no-repeat right center;
            background-size:1.2333333333333334rem 1.3666666666666667rem;
            & a{
                display: block;
                height:100%;
            }
        }
    }
    & .user-top{
        background: #fff;
        padding:1rem 1rem 0;
        margin-top: 3rem;
        & .top2 {
            width:100%;
            & ul {
                padding:0 0 1rem;
                & li {
                    padding-left:1rem;
                    box-sizing:border-box;
                    width:50%;
                    float:left;
                    height:3.2rem;
                    line-height:1.6rem;
                    font-size:0.8rem;
                    color:#fff;
                    text-align:left;
                    & .mtext {
                        font-size:1rem;
                        color:#fff;
                        & span {
                            color:#fff;
                        }
                    }
                }
                 & li.all {
                    width:100%;
                    text-align:left;
                    margin-bottom:1rem;
                    padding-left:1rem;
                    & .eye {
                        display:inline-block;
                        width:1.2333333333333334rem;
                        height:0.7333333333333333rem;
                        background:url(../public/img/user/eye.png) no-repeat center center;
                        background-size:100% 100%;
                        margin-left:0.5rem;
                    }
                    & .eyeClose {
                        display:inline-block;
                        width:1.2333333333333334rem;
                        height:0.7333333333333333rem;
                        background:url(../public/img/user/closeEye.png) no-repeat center center;
                        background-size:100% 100%;
                        margin-left:0.5rem;
                    }
                }
            }
            & .mid {
                border-left:1px solid #adadad;
                border-right:1px solid #adadad;
            }
        }
        & .top3 {
            height:0rem;
            overflow:hidden;
            text-align: left;
            transition: all 1s;
            font-size: 0.6rem;
            & li {
                float:left;
                width:50%;
                color:#fff;
                font-size:0.73333333333rem;
                padding-left:1rem;
                box-sizing:border-box;
                line-height:1.3666666666666667rem;
            }
        }
        & .top4 {
            height:2rem;
            line-height: 2rem;
            font-size: 1.2rem;
            color:#fff;
            width:100%;
            // background:url(../public/img/user/down.png) no-repeat center center;
            // background-size:0.8666666666666667rem 0.4666666666666667rem;
        }
        & .tired {
            background:url("../public/img/saving/month_up_icon.png");
            background-repeat:no-repeat;
            background-position:0.5rem center;
            background-size:0.8rem 0.9333333333333333rem;
            position:relative;
            background-color:rgba(146,216,248,0.8);
            width:50%;
            height:2.4666666666666666rem;
            color:#fff;
            font-size:0.8rem;
            text-align:left;
            line-height:1.2rem;
            border-radius:50px;
            margin:0 auto;
            box-sizing:border-box;
            display:block;
            & a {
                color:#fff;
            }
            & span {
                position:absolute;
                width:95%;
                height:100%;
                background:url("../public/img/saving/arrow.png");
                background-repeat:no-repeat;
                background-position:right center;
                background-size:0.4rem 0.7333333333333333rem;
                left:0;
                top:0;
                box-sizing:border-box;
                padding:0.1rem 0 0 1.4rem;
                & a{
                    display: block;
                    width:100%;
                    height:100%;
                    font-size: 0.5rem;
                }
            }
        }

    }
    & .user-mid {
        padding:1rem;
        background:#fff;
        & li {
            float:left;
            width:50%;
            box-sizing:border-box;
            padding-left:1rem;
            line-height:1.6rem;
            text-align: left;
            & .stats {
                color:#8c96a7;
                font-size:0.8rem;
            }
            & .value {
                color:#444f4f;
                font-size: 1rem;
            }
        }
    }
    & .welfare {
        margin:1rem auto;
        & li {
            height:4rem;
            border-bottom:1px solid #f3f8fc;
            background:#fff;
            padding:0 1rem;
            text-align: left;
            & a {
                padding-left:2.533333333333333rem;
                display:block;
                height:100%;
                & p {
                    background:url(../public/img/home/you1.png) no-repeat right center;
                    height:100%;
                    box-sizing:border-box;
                    background-size:0.4666666666666667rem 0.8666666666666667rem;
                    line-height:1.5rem;
                    padding-top:0.6rem;
                    color:#444f4f;
                }
            }
        }
        & li.welfare_1 a {
            background:url(../public/img/user/welfare_1.png) no-repeat left center;
            background-size:1.2rem 1.2rem;
        }
        & li.welfare_2 a {
            background:url(../public/img/user/welfare_2.png) no-repeat left center;
            background-size:1.3333333333333333rem 1.3rem;
        }
        & li.welfare_3 a {
            background:url(../public/img/user/welfare_3.png) no-repeat 0.2rem center;
            background-size:1rem 1.4666666666666666rem;
        }
        & li.welfare_0 a {
            background:url(../public/img/saving/vip_center_icon.png) no-repeat left center;
            background-size:1.4666666666666666rem 1.4666666666666666rem;
        }
    }
    & .user-content {
        margin-bottom:5rem;
        & .zjxx {
            background:#fff;
            font-size:1rem;
            color:#444444;
            & ul {
                height:auto;
                overflow:hidden;
                background:#fff;
                padding-bottom:1rem;
                & li{
                    float:left;
                    width:25%;
                    box-sizing:border-box;
                    -webkit-box-sizing:border-box;
                    background:#fff;
                    overflow:hidden;
                    zoom:1;
                    & a{
                        position:relative;
                        padding-top:66%;
                        width:100%;
                        height:auto;
                        display:block;
                        overflow:hidden;
                        text-align:center;
                        font-size:0.8666666666666667rem;
                        color:#0e2642;
                    }
                    & span {
                        display:block;
                        background:url(../public/img/home/you1.png) no-repeat right center;
                        background-size:0.4666666666666667rem 0.8666666666666667rem;
                    }
                }
                & li:last-child a {
                    border-bottom:none;
                }
                & .touzi {
                    background:url(../public/img/user/touzi.png) no-repeat center center;
                    background-size:1.8rem 1.6333333333333333rem;
                }
                & .jyjl {
                    background:url(../public/img/user/jiaoyijilu.png) no-repeat center center;
                    background-size:1.6rem 1.5666666666666667rem;
                }
                & .yzd {
                    background:url(../public/img/user/yuezhangdan.png) no-repeat center center;
                    background-size:30% auto;
                }
                & .yhk {
                    background:url(../public/img/user/yinhangka-.png) no-repeat center center;
                    background-size:24% auto;
                }
                & .wdsc {
                    background:url(../public/img/user/shoucang.png) no-repeat center center;
                    background-size:1.4666666666666666rem 1.4666666666666666rem;
                }
                & .wdyh {
                    background:url(../public/img/user/youhui.png) no-repeat center center;
                    background-size:1.6rem 1.0666666666666667rem;
                }
                & .wdyq {
                    background:url(../public/img/user/yaoqing.png) no-repeat center center;
                    background-size:1.5rem 1.2rem;
                }
                & .wdxx {
                    background:url(../public/img/user/xiaoxi.png) no-repeat center center;
                    background-size:24% auto;
                }
                & .wdjf {
                    background:url(../public/img/user/wdjf.png) no-repeat center center;
                    background-size:1.4666666666666666rem 1.2rem;
                }
                & .dhjl {
                    background:url(../public/img/user/dhjl.png) no-repeat center center;
                    background-size:1.4666666666666666rem 1.4666666666666666rem;
                }
                & .ljtz {
                    background:url(../public/img/user/ljtz.png) no-repeat center center;
                    background-size:1.4666666666666666rem 1.4666666666666666rem;
                }
            }
        }
    }
    & .user-btn-blank {
        overflow:hidden;
        position:fixed;
        bottom:3.7rem;
        left:0;
        width:100%;
        & .user-btn {
            background:#f7f7f7;
            padding:1rem;
            left:0;
            bottom:3.26667rem;
            width:100%;
            box-sizing:border-box;
            z-index:1;
            height:4.666666666666667rem;
            & a{
                float:left;
                width:48%;
                height:2.8666666666666667rem;
                box-shadow:0 4px 10px rgba(0,0,0,.3);
                border-radius:3rem;
                font-size:1.1333333333333333rem;
                text-align:center;
                line-height:2.8666666666666667rem;
            }
            & .tx {
                background:#fff;
                color:#1e93ff;
                margin-right:3%;
            }
            &  .cz {
                background:-webkit-linear-gradient(left,#24e9f0,#2564ef);
                /* Safari 5.1 - 6.0 */
            background:-o-linear-gradient(right,#24e9f0,#2564ef);
                /* Opera 11.1 - 12.0 */
            background:-moz-linear-gradient(right,#24e9f0,#2564ef);
                /* Firefox 3.6 - 15 */
            background:linear-gradient(to right,#24e9f0,#2564ef);
                /* 标准的语法 */color:#fff;
            }
        }
    }

}
</style>

