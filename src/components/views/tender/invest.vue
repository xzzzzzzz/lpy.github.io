<template>
  <div class="investPage">
    <navTitle :title="investData.title" v-if="detailShow" :showPrev="showPrev" :prev="prev"></navTitle>
    <div class="investWrap">
      <div class="investTop">
        <div class="data"  v-if="investData.productId == 10">
          <div class="start" style="margin-bottom:1rem;">
            <p>参考年化</p>
          </div>
          <div class="value">
            <p v-if="(investData.vipPlusRate > 0 || investData.addapr > 0) && investData.loanSchedule < 100">
              <span>{{investData.billBasicApr}}</span>%+ <span class="minfont">{{((investData.vipPlusRate)+(investData.addapr)).toFixed(2)}}%<i></i>
                <span class="bubble" @click="showBubble">
                  <i v-show="bubble" @click.stop>
                    <p>参考基础：{{investData.billBasicApr}}%</p>
                    <p v-show="investData.addapr>0">活动加息：{{investData.addapr}}%</p>
                    <p v-show="investData.vipPlusRate>0">特权加息：{{investData.vipPlusRate}}%</p>
                  </i>
                </span>
              </span>
            </p>
            <p v-else>
              <span>{{investData.billBasicApr}}</span>%
            </p>
          </div>
        </div>
        <div class="data" v-else-if="investData.productId == 7">
          <div class="start">
            <p>往期年化</p>
          </div>
          <div class="value">
            <p>
              <span>{{investData.baseApr}}</span>%~<span>{{investData.topApr}}</span>%
            </p>
          </div>
        </div>
        <div class="data" v-else>
          <div class="start"  style="margin-bottom:1rem;">
            <p>往期年化</p>
          </div>
          <div class="value">
            <p v-if="(investData.vipPlusRate > 0 || investData.addapr > 0) && investData.loanSchedule < 100">
              <span>{{investData.billBasicApr}}</span>%+ <span class="minfont">{{((investData.vipPlusRate)+(investData.addapr)).toFixed(2)}}%<i></i>
                <span class="bubble" @click="showBubble">
                  <i v-show="bubble" @click.stop>
                    <p>往期基础：{{investData.billBasicApr}}%</p>
                    <p v-show="investData.addapr>0">活动加息：{{investData.addapr}}%</p>
                    <p v-show="investData.vipPlusRate>0">特权加息：{{investData.vipPlusRate}}%</p>
                  </i>
                </span>
              </span>
            </p>
            <p v-else>
              <span>{{investData.billBasicApr}}</span>%
            </p>
          </div>
        </div>
        <div class="dateList">
          <ul class="fix" v-if="investData.productId == 10 || investData.productId == 7">
            <li>
              <div>
                <p class="start">
                  锁定期
                </p>
                <p class="value">
                  <span>{{investData.lockPeriod}}</span>天
                </p>
              </div>
            </li>
            <li>
              <div v-if="investData.productId == 7">
                <p class="start">
                  投资期限
                </p>
                <p class="value">
                  <span>{{investData.period}}</span>天
                </p>
              </div>
              <div v-else>
                <p class="start">&nbsp;</p>
                <p class="value">&nbsp;</p>
              </div>
            </li>
            <li>
              <div>
                <p class="start">
                  起投金额
                </p>
                <p class="value">
                  <span>{{investData.minInvestAmount}}</span>元
                </p>
              </div>
            </li>
          </ul>
          <ul class="fix" v-else>
            <li>
              <div>
                <p class="start">
                  投资期限
                </p>
                <p class="value">
                  <span>{{investData.period}}</span>天
                </p>
              </div>
            </li>
            <li>
              <div>
                <p class="start">&nbsp;</p>
                <p class="value">&nbsp;</p>
              </div>
            </li>
            <li>
              <div>
                <p class="start">
                  起投金额
                </p>
                <p class="value">
                  <span>{{investData.minInvestAmount}}</span>元
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="jsdateList">
        <ul class="fix"  v-if="investData.productId == 10">
          <li>
            <a href="javascript:;">
              项目详情
            </a>
          </li>
          <li>
            <a href="javascript:;">
              标的明细
            </a>
          </li>
          <li>
            <a href="javascript:;">
              投资记录<span>{{investData.investTimes}}笔)</span>
            </a>
          </li>
        </ul>
        <ul class="fix"  v-else>
          <li>
            <a href="javascript:;">
              产品详情
            </a>
          </li>
          <li>
            <a href="javascript:;">
              多重保障
            </a>
          </li>
          <li>
            <a href="javascript:;">
              投资记录<span>({{investData.investTimes}}笔)</span>
            </a>
          </li>
        </ul>
      </div>
      <div class="schedule_content" v-if="investData.productId == 10">
        <ul class="fix">
          <li>
            锁定期 / 不可转让债权
            <p class="pa active">
              今日投资<br>
              {{investData.toDay}}<br>
            </p>
          </li>
          <li>
            <p class="pa">
              {{investData.lockPeriod}}天<br>
              {{investData.endDay}}<br>
            </p>
          </li>
          <li>
            转让期 / 免手续费
            <p class="pa">
              {{investData.lockPeriod+1}}天<br>
              免费退出<br>
            </p>
          </li>
        </ul>
      </div>
      <div class="privilegeList" v-if='singUUID == " "'>
        <ul>
          <li>
            <div class="fix">
              <div class="fl">
                加息券<span>(<span>0</span>张可用)</span>
              </div>
              <div class="fr noon">
                登录后可用<Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
          </li>
          <li>
            <div class="fix">
              <div class="fl">
                返现券<span>(<span>0</span>张可用)</span>
              </div>
              <div class="fr noon">
               登录后可用<Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
          </li>
          <li>
            <div class="fix">
              <div class="fl">特权加息</div>
              <div class="fr noon pr">
                登录后可用
              </div>
            </div>
          </li>
          <li v-if="investData.productId != 10">
            <div class="fix">
              <div class="fl">最大募集期</div>
              <div class="fr pr">72小时</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="privilegeList" v-else>
        <ul v-if="investData.loanSchedule<100 && (investData.amount-investData.hasInvestedAmount) > 0 ">
          <li v-if="interestLength > 0">
            <input type="hidden" v-model="interestId">
            <div class="fix" @click="showPicker('interPicker')">
              <div class="fl">
                加息券<span>(<span>{{interestLength}}</span>张可用)</span>
              </div>
              <div class="fr" :class="{'noon':interestValue == '不使用'}">
                {{interestValue}}<span v-if="interestValue != '不使用'">%</span><Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
            <Picker :show="showInterPicker" :selectData="interestPickData" @cancel="colsePicker('interPicker')" @confirm="finishInterPicker"></Picker>
          </li>
          <li v-else>
            <div class="fix">
              <div class="fl">
                加息券<span>(<span>0</span>张可用)</span>
              </div>
              <div class="fr noon">
                不可用<Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
          </li>
          <li v-if="backLength > 0">
            <input type="hidden" v-model="backId">
            <div class="fix" @click="showPicker('backPicker')">
              <div class="fl">
                返现券<span>(<span>{{backLength}}</span>张可用)</span>
              </div>
              <div class="fr" :class="{'noon':backValue == '不使用'}">
                {{backValue}}<span v-if="backValue != '不使用'">元</span><Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
            <Picker :show="showBackPicker" :selectData="backPickData" @cancel="colsePicker('backPicker')" @confirm="finishBackPicker"></Picker>
          </li>
          <li v-else>
            <div class="fix">
              <div class="fl">
                返现券<span>(<span>0</span>张可用)</span>
              </div>
              <div class="fr noon">
               不可用<Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
          </li>
          <li>
            <div class="fix">
              <div class="fl">特权加息</div>
              <div class="fr pr" v-if="investData.vipPlusRate>0">
                {{investData.vipPlusRate}}%
              </div>
              <div class="fr pr noon" v-else>
                无
              </div>
            </div>
          </li>
          <li v-if="investData.productId != 10">
            <div class="fix">
              <div class="fl">最大募集期</div>
              <div class="fr pr">72小时</div>
            </div>
          </li>
        </ul>
        <ul v-else>
          <li>
            <div class="fix">
              <div class="fl">
                加息券<span>(<span>0</span>张可用)</span>
              </div>
              <div class="fr noon">
                不可用<Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
          </li>
          <li>
            <div class="fix">
              <div class="fl">
                返现券<span>(<span>0</span>张可用)</span>
              </div>
              <div class="fr noon">
               不可用<Icon type="ios-arrow-right" color="#8c96a7"></Icon>
              </div>
            </div>
          </li>
          <li>
            <div class="fix">
              <div class="fl">特权加息</div>
              <div class="fr noon pr">
                不可用
              </div>
            </div>
          </li>
          <li v-if="investData.productId != 10">
            <div class="fix">
              <div class="fl">最大募集期</div>
              <div class="fr pr">72小时</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="invest_textProfit" v-if="volumes.needMaxInvestAmount > 0 && (investData.productId == 2 || investData.productId == 11)">
        	再投<span class="text_red in_vote">{{volumes.needMaxInvestAmount}}</span>元，额外享受最大收益率!
      </div>
      <div class="investContent">
          <div class="top fix">
            <div class="fl">
              <div v-if="investData.productId == 10">
                <p v-if="investData.amount/10000 > 1">融资金额：<span>{{(investData.amount/10000)|numberFormats}}</span>万元</p>
                <p v-else>融资金额：<span>{{investData.amount|numberFormats}}</span>元</p>
              </div>
              <div v-else-if="investData.productId == 7">
                <p>
                  预期收益：<span class="red">{{(qqProfit)}}</span>元
                </p>
              </div>
              <div v-else>
                <p>
                  预期收益：<span class="red">{{(spProfit)}}</span>元
                </p>
              </div>
            </div>
            <div class="fr">
              <p>
                <span v-if="((investData.amount-investData.hasInvestedAmount)/10000) > 1">
                  剩余金额：{{((investData.amount-investData.hasInvestedAmount)/10000)|numberFormats}}万元
                </span>
                <span v-else>
                  剩余金额：{{(investData.amount-investData.hasInvestedAmount)|numberFormats}}元
                </span>
              </p>
            </div>
          </div>
          <div class="number">
            <InputNumber :max="investData.amount-investData.hasInvestedAmount" :min="investData.minInvestAmount" :step="investData.minInvestAmount" v-model="amount" :formatter="value => `${value|numberFormats}元`" :parser="value => value.replace('元', '')" v-if="investData.loanSchedule<100" @on-change="changAmount"></InputNumber>
            <InputNumber :max="0" :min="0"  v-model="amount" :formatter="value => `${value|numberFormats}元`" :parser="value => value.replace('元', '')" disabled='disabled' v-else></InputNumber>
          </div>
          <div class="" v-if="investData.productId == 10">
            <div class="cytime">
									<p class="saving_profit">持有时间：</p>
									<div class="relate">
										<swiper class="swiper-container" :options="swiperOption" ref="mySwiper" @change="onTouchEnd">
                        <swiper-slide class="swiper-slide">
                          <p>0个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>1个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>2个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>3个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>4个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>5个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide swiper-slide-prev">
                          <p>6个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide swiper-slide-active">
                          <p>7个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide swiper-slide-next">
                          <p>8个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>9个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>10个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>11个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                        <swiper-slide class="swiper-slide">
                          <p>12个月</p>
                          <img src="../../../public/img/invest/ruler.png" alt="" class="sc-image">
                        </swiper-slide>
                  </swiper>
                  <div class="rule_b">
                    <input type="hidden" id="mouth">
                    <input type="hidden" id="investMoney" v-model="amount">
                    <input type="hidden" id="interestVolumes" v-model="interestValue">
                    <input type="hidden" id="vipPlusRate" v-model="investData.vipPlusRate">
                    <input type="hidden" id="investaprs" v-model="investData.billBasicApr">
                    <input type="hidden" id="addaprs" v-model="investData.addapr">
                    <p id="mouthText"></p>
                  </div>
                <span class="swiper-notification" aria-live="assertive" aria-atomic="true"></span>
									<p class="saving_profit">预期收益：<span class="red" id="savingsProfit"></span>元</p>
									</div>
								</div>
          </div>
          <div v-if="investData.loanSchedule < 100 && singUUID != ' '">
            <div v-if="investData.productId == 2 || investData.productId == 10 || investData.productId == 11">
              <div class="invest_textProfit invest_line" v-if="volumes.needMinInvestAmount > 0">
               最低<span class="text_red">{{volumes.needMinInvestAmount}}</span>元可使用<span class="text_red">{{volumes.needMinCouponStr}}</span>
              </div>
              <div class="invest_textProfit invest_line" v-else-if="volumes.status == 1">
               自动为您匹配最优用券，
               <span class="text_red best_coupon">{{volumes.interestVolumes[0].value}}%加息券</span>
              </div>
              <div class="invest_textProfit invest_line" v-else-if="volumes.status == 3">
                自动为您匹配最优用券，
               <span class="text_red best_coupon">{{volumes.returnCurrentVolumes[0].value}}元返现券</span>
              </div>
            </div>
          </div>
          
          <div class="invitation">
            <a href="javascript:;">邀请好友</a>
          </div>
          <div class="investBtn">
            <div v-if="singUUID == ' '">
              <Button shape="circle" @click="login">登录</Button>
            </div>
            <div v-else>
               <Button shape="circle" v-if="investData.status == 1 || investData.status == 2 && investData.loanSchedule < 100" :disabled="!single" @click="investment">立即投资</Button>
               <Button shape="circle" disabled="disabled" v-else-if="investData.status == 2 && investData.loanSchedule == 100">已满标</Button>
               <Button shape="circle" disabled="disabled" v-else>计息中</Button>
            </div>
          </div>
          <div class="agreement"  v-if="investData.productId == 10">
            <Checkbox v-model="single">我已阅读并同意</Checkbox><a href="javascript:;">《服务协议样本》</a>
          </div>
          <div class="agreement" v-else>
            <Checkbox v-model="single">我已阅读并同意</Checkbox><a href="javascript:;">《借款协议样本》</a>
          </div>
      </div>
      <div class="investment_number" v-if="investData.productId == 10">
        <ul class="fix">
          <li class="fl">
            <p class="start">累计投资人数</p>
            <p class="value">
              <span>{{investData.investTimes}}</span>人
            </p>
          </li>
          <li class="fl">
            <p class="start">累计投资金额</p>
            <p class="value">
              <span v-if="((investData.hasInvestedAmount)/10000) > 1">
                {{((investData.hasInvestedAmount)/10000)|numberFormats}}万
              </span>
              <span v-else>
                {{(investData.hasInvestedAmount)|numberFormats}}
              </span>元
            </p>
          </li>
          <li class="fl">
            <p class="start">平均转出时间</p>
            <p class="value" style="color:#444f4f;">
              {{investData.avgTransPeriod}}
            </p>
          </li>
          <li class="fl">
            <p class="start">最长转出时间</p>
            <p class="value" style="color:#444f4f;">
              {{investData.maxTransPeriod}}
            </p>
          </li>
        </ul>
      </div>
      <div class="ruleList">
        <div class="rule">
          <a href="javascript:;">计息规则</a>
          <span>|</span>
          <a href="javascript:;">补贴规则</a>
        </div>
        <p>市场有风险，投资需谨慎</p>
      </div>
    </div>
    <!-- 重新测评 -->
    <Modal
        v-model="modal"
        class-name="vertical-center-modal">
        <div class="con-1">
						您的风险测评结果为<br>
						<span class="typeSolution">{{typeSolution}}</span>
						<ul class="fix">
							<li>
								<span>推荐月均投资额</span>
								<span>{{recommendMoney}}</span>
							</li>
							<li>
								<span>推荐投资产品</span>
								<span>{{recommendProduct}}</span>
							</li>
							<li>
								<span>推荐投资期限</span>
								<span>{{productPeriod}}</span>
							</li>
						</ul>
					</div>
          <div slot="footer">
            <Button type="ghost" shape="circle" v-if="cpnum">重新测评</Button>
            <Button type="ghost" shape="circle" v-else @click="colseModal('modal')">我知道了</Button>
            <Button type="primary" shape="circle" @click="investModal">继续投资</Button>
          </div>
    </Modal>
    <!-- 投资 -->
    <Modal
        v-model="investmodal"
        class-name="vertical-center-modal">
        <div class="con-1">
          <br>
          <br>
					确认投资
        </div>
          <div slot="footer">
            <Button type="ghost" shape="circle" @click="colseModal('investmodal')">取消</Button>
            <Button type="primary" shape="circle" @click="investSubmit">确定</Button>
          </div>
    </Modal>
    <!-- 去充值 -->
    <Modal
        v-model="rechageModal"
        class-name="vertical-center-modal">
        <div class="con-1">
          <br>
          <br>
					余额不足，请充值
        </div>
          <div slot="footer">
            <Button type="primary" shape="circle" @click="torechage">去充值</Button>
          </div>
    </Modal>
  </div>
</template>

<script>
  import navTitle from '../../modules/title.vue'
  import { swiper, swiperSlide } from 'vue-awesome-swiper'
  export default {
    data () {
      return {
        detailShow: true,
        showPrev: true,
        prev: {path:'/lists'},
        bubble:false, // 气泡开关
        singUUID: '', // 用户id
        borrowId:'', // 标的id存放
        investData:{}, // 标的信息接口数据
        volumes:{}, // 券接口数据
        single:true,  //同意开关
        amount:0, // 投资金额 
        showInterPicker: false, // 加息券选择器开关
        showBackPicker: false, // 返现券选择器开关
        interestValue: "不使用", // 加息券text
        interestId: " ", // 加息券id
        interestLength: 0, // 加息券数量
        backValue: "不使用", // 返现券text
        backId: " ", // 返现券id
        backLength: 0, // 返现券数量
        interestPickData: {  // 加息券数据
          columns: 1, // picker的列数
          default: [
            {
              text:'不使用',
              value: " "
            }
          ], // 默认显示哪个
          // 第一列的数据结构
          pData1: [
            {
              text:'不使用',
              value: " "
            }
          ]
        },
        backPickData: { // 返现券数据
          columns: 1, // picker的列数
          default: [
            {
              text:'不使用',
              value: " "
            }
          ], // 默认显示哪个
          // 第一列的数据结构
          pData1: [
            {
              text:'不使用',
              value: " "
            }
          ]
        },
        qqProfit:0, // 钱钱赚收益
        spProfit:0, // 商票收益
        savingsProfit:0,  // 储蓄罐收益
        mouth:1, // 月份
        userData:{}, //用户信息
        modal:false, // 测评弹窗
        investmodal:false, // 投资确认弹窗
        rechageModal:false, // 充值弹窗
        typeSolution:"", //测评结果
        recommendMoney:"",// 月均投资额
        recommendProduct:"", // 投资产品
        productPeriod:"", // 投资期限
        cpnum:"", // 测评左侧按钮文字
        swiperOption: {
          // NotNextTick is a component's own property, and if notNextTick is set to true, the component will not instantiate the swiper through NextTick, which means you can get the swiper object the first time (if you need to use the get swiper object to do what Things, then this property must be true)
          // notNextTick是一个组件自有属性，如果notNextTick设置为true，组件则不会通过NextTick来实例化swiper，也就意味着你可以在第一时间获取到swiper对象，假如你需要刚加载遍使用获取swiper对象来做什么事，那么这个属性一定要是true
          notNextTick: true,
          // swiper configs 所有的配置同swiper官方api配置
          autoplay: false,
          direction : 'horizontal',
					loop: false,
					speed: 1000,
					autoplay: false,
					freeMode: false,
					slidesPerView: 6,
					touchRatio: 0.5,
					initialSlide:1,
					followFinger: false,
					centeredSlides: true,
          grabCursor : true,
          setWrapperSize :true,
          autoHeight: true,
          paginationClickable :true,
          mousewheelControl : true,
          observeParents:true,
          // if you need use plugins in the swiper, you can config in here like this
          // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
          debugger: true,
          // swiper callbacks
          // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
           on: {
						slideChangeTransitionEnd: function(){
              document.getElementById('mouth').value = this.activeIndex
              document.getElementById('mouthText').innerHTML = this.activeIndex+'个月'
              calcDelta4(this.activeIndex)
              function calcDelta4(mouth) {
                var investMoney = Number(document.getElementById('investMoney').value); //本金
                var interestVolumes = Number(document.getElementById('interestVolumes').value); //加息卷利息
                var vipPlusRate = Number(document.getElementById('vipPlusRate').value); //特权加息
                var investaprs = Number(document.getElementById('investaprs').value);//基础年化
                var addaprs = Number(document.getElementById('addaprs').value);//基础年化
                var mouth =Number(mouth); //月份
                var day = mouth * 30
                if(isNaN(interestVolumes)){
                  interestVolumes = 0
                }
                if(isNaN(vipPlusRate)){
                  vipPlusRate = 0
                }
                if (interestVolumes > 0) {
                    //有加息券计算
                    var pow = Math.pow((1 + ((investaprs / 100 + vipPlusRate / 100 + addaprs / 100 + interestVolumes / 100) / 365)), mouth * 30)
                    var pow2 = Math.pow((1 + ((investaprs / 100 + vipPlusRate / 100 + addaprs / 100 + interestVolumes / 100) / 365)), 365)
                    console.log('使用加息券:=====', pow)
                    // pow = Math.pow((1 + ( (info.getApr()/100 + info.getVipPlusRate()/100  + interestVolumes.value/100 ) / 365)),scaleBar.getmPosition()* 30);
                  } else {
                    //无加息券计算
                    var pow = Math.pow((1 + ((investaprs / 100 + vipPlusRate / 100 + addaprs / 100) / 365)), mouth * 30)

                    var pow2 = Math.pow((1 + ((investaprs / 100 + vipPlusRate / 100 + addaprs / 100) / 365)), 365)

                    console.log('未使用加息券:=====', pow)
                    console.log('未使用加息券2:=====', pow2)
                  }
                  var target4 = (pow * investMoney - investMoney).toFixed(2)
                  var target5 = (pow2 * investMoney - investMoney).toFixed(2)
                  if (mouth < 12) {
                   document.getElementById("savingsProfit").innerHTML = target4
                  } else {
                    document.getElementById("savingsProfit").innerHTML = target5
                  }
                  console.log('3444', investMoney)
                  console.log('特权加息', vipPlusRate)
                  console.log('加息券', interestVolumes)
                  console.log('基础利率', investaprs)
                  console.log('活动加息', addaprs)
                  console.log('总利率', ((investaprs / 100 + vipPlusRate / 100 + addaprs / 100)))
                  console.log('data', mouth)
                  console.log('day', day)
                  console.log('pow', pow)
                  console.log('target4', target4)
                  console.log('target5', target5)
                  console.log('apr====', (1 + ((investaprs / 100 + vipPlusRate / 100 + interestVolumes / 100) / 365)))
              } 
              
						}
					}
        }
      }
    },
    created () {
      this.$store.state.showBottomNav = false
      this.singUUID = this.getDatas()
      this.borrowId = this.$route.query.id
    },
    components: {
      navTitle, swiper, swiperSlide
    },
    computed: {
      swiper () {
        if(this.investData.productId == 10){
          
          return this.$refs.mySwiper.swiper
        }
      }
    },
    updated () {
      if(this.investData.productId == 10){
          
          this.$nextTick(() => {
              // console.log('this is current swiper instance object', this.swiper)
          })
        }
    },
    mounted () {
      this.axios({
          method: 'post',
          data: {
              borrowId: this.borrowId,
              signUUID: this.singUUID || "",
              OPT: 11
            }
        }).then((response) => {
            this.investData = response.data
            if(this.investData.loanSchedule < 100){
              this.amount = this.investData.minInvestAmount
            }
            this.$nextTick(() => {
              if(this.singUUID != " "){ // 劵列表接口
                this.changAmount()
              }else{
                this.calcDelta1(0)
              }
              // var lockPeriod = this.investData.lockPeriod;
              // if (lockPeriod >= 30 && lockPeriod < 90) {
              //   this.mouth = 1
              // } else if (lockPeriod >= 90 && lockPeriod < 180) {
              //   this.mouth = 3
              // } else if (lockPeriod >= 180 && lockPeriod < 365) {
              //   this.mouth = 6
              // } else if (lockPeriod == 365) {
              //   this.mouth = 12
              // }
              if(this.investData.productId == 10){
                 document.getElementById('mouth').value = this.mouth 
                document.getElementById('mouthText').innerHTML = this.mouth+'个月'
              }
             
            })
        }).catch((error) => {
            console.log(error)
        })
        // 个人用户信息
        if(this.singUUID != " "){
          this.axios({
            method: 'post',
            data: {
                userId: this.singUUID || "",
                OPT: 207
              }
          }).then((response) => {
              this.userData = response.data
              
              this.$nextTick(() => {
                
              })
          }).catch((error) => {
              console.log(error)
          })
        }
    },
    methods: {
      showPicker (opt) {
        if(opt == "interPicker"){
          this.showInterPicker = true
        }
        if(opt == "backPicker"){
          this.showBackPicker = true
        }
      },
      colsePicker (opt) {
        if(opt == "interPicker"){
          this.showInterPicker = false
        }
        if(opt == "backPicker"){
          this.showBackPicker = false
        }
      },
      finishInterPicker (value) {
        if(value.select1 != ""){
          if(this.volumes.couponMutex == false){
            this.interestValue = value.select1.text
            this.interestId = value.select1.value
            if(value.select1.text === '不使用'){
              this.calcDelta1(0)
            }else{
              this.calcDelta1(value.select1.text)
            }
          }else{
            this.interestValue = value.select1.text
            this.interestId = value.select1.value
            console.log('dddd====',value.select1.text)
            if(value.select1.text === '不使用'){
              this.calcDelta1(0)
            }else{
              this.backValue = "不使用"
              this.backId = " "
              this.calcDelta1(value.select1.text)
            }
            
          }
        }
        this.colsePicker('interPicker')
      },
      finishBackPicker (value) {
        if(value.select1 != ""){
          if(this.volumes.couponMutex == false){
            this.backValue = value.select1.text
            this.backId = value.select1.value
          }else{
            this.backValue = value.select1.text
            this.backId = value.select1.value
            if(value.select1.text === '不使用'){
              
            }else{
              this.interestValue = '不使用'
              this.interestId = " "
              this.calcDelta1(0)
            }
          }
        }
        this.colsePicker('backPicker')
      },
      FilterData (a,b) {   //循环判断数组a里的元素在b里面有没有，有的话就放入新建立的数组中
        var result = new Array()
        var c = b.toString()
        for(var i=0;i<a.length;i++) {
          if (c.indexOf(a[i].toString()) > -1) {
              for (var j=0;j<b.length;j++) {
              if (a[i]!=b[j]) {
                result.push(b[j])
                break
              }
            }
          }      
        }
        if(a == this.interestPickData.pData1){
          return this.interestPickData.pData1 = result
        }else{
          return this.backPickData.pData1 = result
        }
        
      },
      showBubble () {
        this.bubble=!this.bubble
      },
      calcDelta1 (currentRate) {
        const _this = this
        console.log(currentRate)
				if(currentRate == undefined){
					var currentRate = 0;
        }
        
				if(_this.investData.productId == 10){
					_this.calcDelta3(currentRate)
				}
				console.log("vipAprs",_this.volumes.vipApr)


				if(_this.volumes.vipApr != undefined){
					var investRate = Number(_this.investData.apr + _this.volumes.vipApr)
				}else{
					var investRate = Number(_this.investData.apr)
				}

				console.log("investRate", investRate)
				var investMoney = Number(_this.amount)
				var investDays = Number(_this.investData.period)
				var target1 = Number((investMoney * ( (investRate / 100) / 365 ) * investDays).toFixed(2))

				var target2 = Number((investMoney * ( (currentRate / 100) / 365 ) * investDays).toFixed(2))
				var target = Number((target1 + target2).toFixed(2))
        console.log('amoutt====>', target)
        _this.spProfit = target

				var baseApr = _this.investData.baseApr
				var topApr =  _this.investData.topApr
				var lockPeriod = _this.investData.lockPeriod
				var floatApr =  _this.investData.floatApr
				var period =  _this.investData.period
				console.log("初始利率", baseApr); 
				console.log("上限利率", topApr); 
				console.log("锁定期", lockPeriod); 
				console.log("浮动利率", floatApr); 
				console.log("最高天数", period); 


				var lockins = ((investMoney * (baseApr / 100) / 365) * lockPeriod)
				// console.log("锁定期利息", lockins); 
				
				var floatingperiod = Number((topApr * 1 - baseApr * 1) / floatApr).toFixed()    //浮动期天数
				
				// console.log("浮动期天数", floatingperiod); 
				

				var floatingrate = ((baseApr * 1 + floatApr * 1) + (baseApr * 1 + floatApr * 1 * floatingperiod) )/ 2
				
				// console.log("浮动期利率", floatingrate); 

				var floatinginterest = (investMoney * (floatingrate / 100)) / 365 * floatingperiod

				// console.log("浮动期利息", floatingrate); 

				var timedays = period - lockPeriod - floatingperiod

				// console.log("上限期天数", timedays); 

				var limitinterest = (investMoney * (topApr / 100)) / 365 * timedays

				// console.log("上限期利息", timedays); 
				
				var qqbinterest = Number(lockins*1 + floatinginterest*1 + limitinterest*1).toFixed(2)
				var qqbinterests =lockins*1 + floatinginterest*1 + limitinterest*1


				console.log("总利息", qqbinterest); 
				
         _this.qqProfit = qqbinterest
				//$.cookie('qqbinterest',qqbinterest);

				var target11 = ((investMoney * (investRate / 100)  * investDays) / 365).toFixed(2);
				// var selectInterest = 	_this.formData.returnCurrentVolume = t.find('li').attr('data-id') || "";

				console.log("investMoney",investMoney)
				console.log("investRate",investRate)
				console.log("investDays",investDays)
				// console.log("selectInterest",selectInterest)


				// var fffff = investMoney * (investRate + vipAprs + investDays) *
				// investAmount*(apr + selectInterest.value  + vipApr )*period/36500

				// 投资金额 ＊ （年华＋特权加息＋vipApr）＊ period  ／  36500

				//$("#yuji").html(target11)
				console.log("kkkkkkk====", target11);

				
      },
      calcDelta3 (currentRate) { // 储蓄罐收益计算
        let _this = this
				// 计算储蓄罐利率  公式:本金 * (（1+（apr）/365）^天数)-本金
				console.log('加息======',currentRate)
				var investMoney = Number(_this.amount); //本金
        var interestVolumes = Number(currentRate); //加息卷利息
        if(_this.volumes.vipApr == undefined){
          var vipPlusRate = 0; //特权加息
        }else{
          var vipPlusRate = Number(_this.volumes.vipApr); //特权加息
        }
				
				var investaprs = Number(_this.investData.billBasicApr);//基础年化
				var addaprs = Number(_this.investData.addapr);//基础年化
				var mouth =Number(document.getElementById('mouth').value) ; //月份
        var day = mouth*30
        console.log('特权加息',vipPlusRate)
				if(interestVolumes > 0 ){
					//有加息券计算
					var pow =Math.pow((1 + ((investaprs/100 + vipPlusRate/100 + addaprs/100 + interestVolumes/100) /365)),mouth*30)
				 	var pow2 = Math.pow((1 + ((investaprs/100 + vipPlusRate/100 + addaprs/100 + interestVolumes/100) /365)),365)
					console.log('使用加息券:=====',pow)
				 // pow = Math.pow((1 + ( (info.getApr()/100 + info.getVipPlusRate()/100  + interestVolumes.value/100 ) / 365)),scaleBar.getmPosition()* 30);
				}else{
          //无加息券计算
          var pow = Math.pow((1 + ((investaprs/100 + vipPlusRate/100 + addaprs/100) /365)),mouth*30)

          var pow2 = Math.pow((1 + ((investaprs/100 + vipPlusRate/100 +addaprs/100) /365)),365)
				

					console.log('未使用加息券:=====',pow)
					console.log('未使用加息券2:=====',pow2)
				}
				var target4 = (pow*investMoney-investMoney).toFixed(2)
				var target5 = (pow2*investMoney-investMoney).toFixed(2)
				if(mouth < 12){
				 document.getElementById("savingsProfit").innerHTML = target4
				}else{
				 document.getElementById("savingsProfit").innerHTML = target5
				}
				
				console.log('3444',investMoney)
				console.log('特权加息',vipPlusRate)
				console.log('加息券',interestVolumes)
				console.log('基础利率',investaprs)
				console.log('活动加息',addaprs)
				console.log('总利率',((investaprs/100 + vipPlusRate/100 + addaprs/100)))
				console.log('data',mouth)
				console.log('day',day)
				console.log('pow',pow)
				console.log('target4',target4)
				console.log('target5',target5)
				console.log('apr====',(1 + ((investaprs/100 + vipPlusRate/100 + interestVolumes/100) /365)))
      },
      changAmount () { // 金额变化
        if(this.singUUID == " "){
          this.calcDelta1(0)
        }else{
           this.axios({
            method: 'post',
            data: {
                bid: this.borrowId,
                amount: this.amount,
                user_id: this.singUUID,
                OPT: 152
              }
          }).then((response) => {
              let interestVolumes = response.data.interestVolumes
              let returnCurrentVolumes = response.data.returnCurrentVolumes
              console.log(interestVolumes,returnCurrentVolumes)
              this.interestPickData.pData1 = [{
                text:'不使用',
                value: " "
              }]
              this.backPickData.pData1 = [{
                text:'不使用',
                value: " "
              }]
              for(let i=0;i<interestVolumes.length;i++){
                let interesArr = {}
                let interesText = interestVolumes[i].value
                let interesValue = interestVolumes[i].id
                interesArr = {
                  'text':interesText,
                  'value':interesValue
                }
                this.interestPickData.pData1.push(interesArr)
                this.interestLength = interestVolumes.length
              }
              for(let i=0;i<returnCurrentVolumes.length;i++){
                let backArr = {}
                let backText = returnCurrentVolumes[i].value
                let backValue = returnCurrentVolumes[i].id
                backArr = {
                  'text':backText,
                  'value':backValue
                }
                this.backPickData.pData1.push(backArr)
                this.backLength = returnCurrentVolumes.length
              }
              this.volumes = response.data
              if(this.volumes.couponMutex == false){
                  if(this.volumes.interestVolumes != ''){
                    this.interestValue = this.volumes.interestVolumes['0'].value
                    this.interestId = this.volumes.interestVolumes['0'].id
                    this.backValue = "不使用"
                    this.backId = " "
                    this.calcDelta1(this.interestValue)
                  }else if(this.volumes.returnCurrentVolumes != ""){
                    this.interestValue = "不使用"
                    this.interestId = " "
                    this.backValue = this.volumes.returnCurrentVolumes['0'].value
                    this.backId = this.volumes.returnCurrentVolumes['0'].id
                    this.calcDelta1(0)
                  }else{
                    this.interestValue = "不使用"
                    this.backValue = "不使用"
                    this.interestId = " "
                    this.backId = " "
                    this.calcDelta1(0)
                  }
                }else{
                  if(this.volumes.status == 0){
                    this.interestValue = "不使用"
                    this.backValue = "不使用"
                    this.interestId = " "
                    this.backId = " "
                    this.calcDelta1(0)
                  }else if(this.volumes.status == 1){
                    this.interestValue = this.volumes.interestVolumes['0'].value
                    this.interestId = this.volumes.interestVolumes['0'].id
                    this.backValue = "不使用"
                    this.backId = " "
                    this.calcDelta1(this.interestValue)
                  }else if(this.volumes.status == 2){
                    this.interestValue = "不使用"
                    this.backValue = "不使用"
                    this.interestId = " "
                    this.backId = ""
                    this.calcDelta1(0)
                  }else if(this.volumes.status == 3){
                    this.interestValue = "不使用"
                    this.backValue = this.volumes.returnCurrentVolumes['0'].value
                    this.interestId = " "
                    this.backId = this.volumes.returnCurrentVolumes['0'].id
                    this.calcDelta1(0)
                  }else{
                    this.interestValue = "不使用"
                    this.backValue = "不使用"
                    this.interestId = " "
                    this.backId = " "
                    this.calcDelta1(0)
                  }
                }
          }).catch((error) => {
              console.log(error)
          }) 
        }
         
      },
      valid () {
        // var v1 = $.trim(investInput.val());
        let _this = this
				var v1 = _this.amount
				var v = Number(v1);
        var msg = null;
        var dataMin = _this.investData.minInvestAmount;
        var dataMax = Number(_this.investData.amount-_this.investData.hasInvestedAmount);
        var dataMol = _this.userData.balance
				if(v1 == ""){
          _this.$Message.warning('请输入购买金额');
					return false;
				}
				if(_this.investData.productId != 10){
					if(v % dataMin != 0){
					
						_this.$Message.warning("购买金额必须为" + dataMin + "的整数倍");
						return false;
					}
				}
				
				
				if(dataMol < dataMin){
          _this.$Message.warning("余额不足，请先充值");
          _this.rechageModal = true
					return false;
				}
				if(dataMol < v){
          _this.$Message.warning("余额不足 " + v + " 元，请先充值");
           _this.rechageModal = true
					return false;
				}
				
				if(v < dataMin){
					_this.$Message.warning("购买金额不能低于 " + dataMin + " 元");
					return false;
				}
				
				if(v > dataMax){
					_this.$Message.warning("购买金额不能超过 " + dataMax + " 元");
					return false;
				}
				console.log("v1v1v1v1v1v1v1v1v1v1v1v1v1v1:",v1)
				console.log("vvvvvvvvvvvvvvvvvvvvvvvvvvvv:",v)
				return true;
      },
      investment () {
        let _this = this
        if(!this.valid()){
          return
        }
        this.axios({
            method: 'post',
            data: {
                bidId:_this.borrowId,
                signUUID: _this.singUUID || "",
                amount:_this.amount,
                OPT: 10042
              }
          }).then((response) => {
              console.log(response.data)

              this.$nextTick(() => {
                if (response.data.error == -1) {
                  if (response.data.data.code == -1) {
                    _this.investmodal=true
                  } else if (response.data.data.code == -4) {
                   
                  } else if (response.data.data.code == -5) {
                    _this.modal = true
                    _this.typeSolution=response.data.data.typeSolution
                    _this.recommendMoney=response.data.data.recommendMoney
                    _this.recommendProduct=response.data.data.recommendProduct
                    _this.productPeriod=response.data.data.productPeriod

                    if (response.data.data.canNumber == 0) {
                      _this.cpnum = false
                    } else {
                     _this.cpnum = true
                    }

                  } else {
                    _this.$Message.warning(response.data.data.msg)
                  }
                } else {
                  _this.$Message.warning(response.data.msg)
                }
              })
          }).catch((error) => {
              console.log(error)
          })
      },
      login () {
        this.$router.push({path:'/login'})
      },
      torechage () {
        this.$router.push({path:'/rechage',query:{amount:this.amount,bid:this.borrowId}})
      },
      colseModal (type) {
        if(type == 'modal'){
          this.modal = false
        }else if(type == 'investmodal'){
          this.investmodal = false
        }
      },
      investModal () {
        this.investmodal = true
        this.modal = false
      },
      investSubmit () {
        this.axios({
            method: 'post',
            data: {
                amount: this.amount,
                userId: this.singUUID,
                borrowId: this.borrowId,
                dealPwd: " ",
                interestVolume: this.interestId,
                returnCurrentVolume: this.backId,
                red: " ",
                OPT: 16
              }
          }).then((response) => {
              console.log(response.data)
              var interestRate = ""
              if(this.investData.productId == 10){
                interestRate = this.savingsProfit
              }else if(this.investData.productId == 11){
                interestRate = this.spProfit
              }
              var titles = escape(this.investData.title) 
              this.$nextTick(() => {
                if(response.data.error == -1){
                  this.$router.push({path:'/tender/investSuccess',query:{title:titles,amount:this.amount,rate:interestRate,repaymentTime:this.investData.repayment,bid:this.borrowId}})
                }else{
                  this.$Message.warning(response.data.msg)
                }
                
              })
          }).catch((error) => {
              console.log(error)
          })
      },
      onTouchEnd (){
        
        
        
          var interestValue = this.interesValue
          if(interestValue === '不使用'){
            this.calcDelta3(0)
          }else{
            this.calcDelta3(interestValue)
          }
          console.log(this.swiper.activeIndex)
        
      }
    }
  }
</script>

<style lang="less">
.investPage{
  padding-top:3rem;
  & .investTop{
    padding:1rem 1rem 2rem;
    background: -webkit-linear-gradient(left, #24e9f0 , #2564ef);
    background: -o-linear-gradient(right, #24e9f0 , #2564ef);
    background: -moz-linear-gradient(right, #24e9f0 , #2564ef);
    background: linear-gradient(to right, #24e9f0 , #2564ef);
    & .data{
      padding-bottom:1rem;
      & .minfont{
        font-size: 0.8rem;
        position: relative;
        & i{
          font-style: normal;
          position:absolute;
          width:3.4rem;
          height:1.4666666666666666rem;
          top:-1.6333333333333334rem;
          color:#fff;
          background: url(../../../public/img/invest/extra_bg.png) no-repeat;
          background-size: 100% 100%;
          left:-0.5rem;
        }
      }
      & .bubble{
        display: inline-block;
        width:0.8666666666666667rem;
        height:0.8666666666666667rem;
        background: url(../../../public/img/invest/notice_white_icon.png) no-repeat;
        background-size: 100% 100%;
        margin:0 0 0 0.3rem;
        position:absolute;
        right: -1.5rem;
        top:0rem;
        z-index: 8;
        & i{
          position: absolute;
          width:6.533333333333333rem;
          height:4.2rem;
          top:-4.2rem;
          color:#9ea2a5;
          line-height:1.3rem;
          font-size: 0.6rem;
          text-align: left;
          background: url(../../../public/img/invest/notice_white_bg.png) no-repeat;
          background-size: 100% 100%;
          left:-0.75rem;
          padding:0 0 0 0.6rem ;
          box-sizing: border-box;
          z-index: 99999999;
        }
      }

    }
    & .start {
      font-size:0.8rem;
      color:#fff;
      text-align:center;
    }
    & .value{
      color:#fff;
      font-size:0.9rem;
      text-align:center;
      & span{
        font-size:1.6rem;

      }
    }
    & .dateList{
      & li{
        float:left;
        width:33.33333333%;
      }
    }
  }
  & .jsdateList{
    background-color: #fff;
    & li{
      float: left;
      width:33.3333333%;
      padding:0.8rem 0;
      & a{
        display: inline-block;
        font-size: 0.8rem;
        width:100%;
        border-right:2px solid #8c96a7;
        color:#0e2642;
        & span{
          color:#fd5e5e;
          font-size: 0.3rem;
        }
      }
    }
    & li:last-child{
      & a{
        border-right:0;
      }
    }
  }
  & .schedule_content {
    padding: 1rem;
    margin-top: 1rem;
    background: #fff;
    & li{
      float: left;
      position: relative;
      height:1.2rem;
      margin-top:3rem;
      & .pa{
        height:3.5rem;
        position: absolute;
        top:-3.6rem;
        left:0;
        color:#8c96a7;
        width:4rem;
        text-align: left;
        background: url(../../../public/img/invest/schedule_bg.png) no-repeat;
        background-size: 1px 0.6666666666666666rem;
        line-height: 1rem;
      }
      & .pa.active{
        color:#1e93ff;
      }
    }
    & li:nth-child(1){
      width:49%;
      background:#1e93ff;
      border-radius: 5px 0 0 5px;
      color:#fff;
      font-size: 0.7333333333333333rem;
      text-align:center;
      line-height:1.2rem; 
      & .pa{
        left:0.2rem;
        background-position:0.5rem bottom;
      }
    }
    & li:nth-child(2){
      width:0.1rem;
      background: #fff;
      font-size: 0.7333333333333333rem;
      & .pa{
        left:-2rem;
        background-position:2rem bottom;
        text-align: center;
      }
    }
    & li:nth-child(3){
      width:49%;
      background:#dddddd;
      border-radius: 0px 5px 5px 0px;
      color:#fff;
      font-size: 0.7333333333333333rem;
      text-align:center;
      line-height:1.2rem;
      &  .pa{
        text-align: right;
        left:5rem;
        background-position: 3.7rem bottom;
      }
    }
    
}
  & .privilegeList{
    background: #fff;
    font-size: 1rem;
    margin:1rem 0;
    & li{
      color:#444444;
      height:3rem;
      line-height: 3rem;
      border-bottom:1px solid #f2f5f9;
      padding:0 1rem;
      & .noon{
        color:#8c96a7!important;
      }
      & .pr{
        padding-right:1rem!important;
      }
      & .fl{
        & span{
          color:#fd5e5e;
          & span{
            color:#444444;
          }
        }
      }
      & .ivu-icon-ios-arrow-right{
        margin-left:0.5rem;
      }
    }
  }
  & .invest_textProfit{
    font-size: 0.8rem;
    line-height: 2rem;
    background: #fff;
    margin:1rem 0;
    & .text_red{
      font-size: 0.5rem;
      color:#fd5e5e;
    }
  }
  & .investContent{
    padding:1rem;
    background: #fff;
    font-size: 1rem;
    & .top{
      color: #8c96a7;
      line-height: 2rem;
      margin-bottom: 0.5rem;
      font-size:0.5rem;
      & .fl{
        & .red{
          color:#fd5e5e;
        }
      }
    }
    & .number{
      & .ivu-input-number{
        overflow: visible;
        width:50%;
        height:2.1rem;
        line-height: 2.1rem;
        border-radius: 0;
        box-sizing: border-box;
        border:0;
      }
      & .ivu-input-number-focused{
        box-shadow: none;
      }
      & .ivu-input-number-input-wrap{
        //  overflow: visible;
        // height:2.1rem;
        // line-height: 2.1rem;
        // border-radius: 0;
        // box-sizing: border-box;
        // border:0;
        position: absolute;
        z-index: 22;
        border:1px solid #dddee1;
        height:100%;
        width:100%;
      }
      & .ivu-input-number-handler-wrap{
        width:100%;
        opacity:1;
        background:transparent;
        box-sizing: border-box;
        border-left:0;
        & .ivu-input-number-handler-up{
          right:-2rem;
          width:2rem;
          height:100%;
          top:0;
          position: absolute;
          border:1px solid #dddee1;
          background: #d5d5d5;
        }
        & .ivu-input-number-handler-down{
          left:-2rem;
          width:2rem;
          height:100%;
          top:0;
          position: absolute;
          border:1px solid #dddee1;
          background: #d5d5d5;
        }
        & .ivu-input-number-handler-down-inner,& .ivu-input-number-handler-up-inner{
          width:100%;
          height:100%;
          right:0;
          line-height: 2rem;
          color:#fd5e5e;
        }
        & .ivu-input-number-handler-up-disabled .ivu-input-number-handler-up-inner,& .ivu-input-number-handler-down-disabled .ivu-input-number-handler-down-inner{
          color:#999!important;
        }
        & .ivu-icon-ios-arrow-up:before{
          content:'\F217'
        }
        & .ivu-icon-ios-arrow-down:before{
          content:'\F208'
        }
      }
    }
    & .saving_profit{
       color: #8c96a7;
      line-height: 2rem;
      font-size:0.5rem;
      text-align: left;
      & .red{
        color:#fd5e5e;
      }
    }
    & .invitation{
      padding:1rem 0;
      & a{
        color:#1e93ff;
      }
    }
    & .investBtn{
      width:100%;
      margin:0 0 1rem;
      & .ivu-btn{
        width:100%;
        background: -webkit-linear-gradient(left, #24e9f0 , #2564ef);
        background: -o-linear-gradient(right, #24e9f0 , #2564ef);
        background: -moz-linear-gradient(right, #24e9f0 , #2564ef);
        background: linear-gradient(to right, #24e9f0 , #2564ef);
        padding:0.5rem 0;
        border:0;
        color:#fff;
        font-size:1rem;
      }
      & .ivu-btn[disabled]{
        color: #f7f7f7;
        background: #cacaca;
        border-color: #dddee1;
      }
    }
    & .agreement{
      font-size: 0.6rem;
      text-align: left;
      & .ivu-checkbox-wrapper{
        margin-right:0
      }
      & a{
        color:#2c3e50;
      }
    }
    & .invest_line{
      text-align: center;
      border: 1px solid #ccc;
      margin-top: 1rem;
      background-color: #fff;
    }
    & .cytime{
      padding:1rem;
      color:#8c96a7;
      font-size: 0.8rem;
      & .relate{
        position: relative;
        & .rule_b{position:absolute;width:1px; height:2rem;background: #fd5555 ;top:1rem;left:50%;margin-left:-1px;}
        & .rule_b p{position:absolute;top:-1rem;left:-1rem;color:#fd5555;width:3rem;}
      }
    }
    & .swiper-container{
      height:4rem!important;
      & .swiper-slide{
        margin-top:2rem;
        position: relative;
        box-sizing: border-box;
        & p{
          position:absolute;
          top:-1rem;
          left:0.5rem;
        }
      }
      
      & img{
        max-width: 100%;
        border: 0;
      }
    }

  }
  & .ruleList{
    padding:1rem 0;
    & .rule{
      padding:1rem 0 0;
      font-size: 1rem;
      color:#1e93ff;
      & a{
        color:#1e93ff;
        padding:0 0.5rem;
      }
    }
  }
  & .investment_number{
    background: #fff;
    font-size: 1rem;
    padding: 1rem;
    margin-top: 1rem;
    & li{
      float: left;
      width:50%;
      color:#9ea2a5;
      text-align: center;
      & p{
        margin-top:0.5rem;
        & span{
          color:#fd5e5e;
          font-size: 1.3rem;
        }
      }
    }
  }
}

.vertical-center-modal{
    display: flex;
    align-items: center;
    justify-content: center;
    & .ivu-modal{
        top: 0;
      margin:40px!important;
        & .con-1{
          text-align: center;
          & .typeSolution{
            color:#1e93ff;
            font-size: 1.5rem;
          }
        }
        & .ivu-modal-footer{
          border-top:0;
          text-align: center;
        }
    }
}
</style>
