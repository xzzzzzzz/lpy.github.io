<template>
  <div class="investSuccess">
    <navTitle title="投资成功" v-if="detailShow" :showPrev="showPrev" :prev="prev"></navTitle>
    <div class="title">{{title}}</div>
    <div class="main">
      <ul>
        <li class="fix"><span class="fl">投资金额</span><span class="fr">{{amount}}元</span></li>
        <li class="fix"><span class="fl">预计收益</span><span class="fr">{{rate}}元</span></li>
        <li class="fix"><span class="fl">还款时间</span><span class="fr">{{repaymentTime}}</span></li>
      </ul>
    </div>
    <div class="btn-wrap">
      <Button type="primary" class="gradient" @click="complete">完成</Button>
    </div>
  </div>
</template>

<script>
  import navTitle from '../../modules/title.vue'
  export default {
    data () {
      return {
        detailShow: true,
        showPrev: true,
        prev: {path:'/tender/invest',query:{id:this.$route.query.bid}},
        title:"",
        amount:'',
        rate:'',
        repaymentTime:''
      }
    },
    created () {
      this.$store.state.showBottomNav = false
      this.singUUID = this.getDatas()
      this.title = unescape(this.$route.query.title)
      this.amount = this.$route.query.amount
      this.rate = this.$route.query.rate
      this.repaymentTime = this.$route.query.repaymentTime
    },
    components: {
      navTitle
    },
    methods:{
      complete () {
        this.$router.push({path:'/tender/invest',query:{id:this.$route.query.bid}})
      }
    }
  }
</script>

<style lang="less">
.investSuccess{
  background:url(../../../static/img/invest/chenggong.png) no-repeat center 8rem;
  background-size:4rem 4rem;
  padding:13rem 1rem 0;
  & .title{
    line-height: 2rem;
    font-size: 1rem;
    margin-bottom:2rem;
  }
  & .main{
    border-top:1px solid #d6d6d6;
    border-bottom:1px solid #d6d6d6;
    padding:1rem 0;
    & li{
      height: 1.9333333333333333rem;
      line-height: 1.9333333333333333rem;
      color: #888;
      font-size: 0.8rem;
    }
  }
  & .btn-wrap{
    margin-top:2rem;
    & button{
      width:100%;
      height:3rem;
      border:0;
    }
  }

}
</style>

