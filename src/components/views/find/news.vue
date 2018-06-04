<template>
	<div class="news-main">
		<nav-title title="新闻公告" v-if="detailShow" :showPrev='showPrev' :prev="prev"></nav-title>
		<div class="main-wrap">
			<template>
			    <Tabs type="card" v-model="name" value="name1" @on-click="clickTab">
			        <TabPane label="公告" name="7">
			        	<Scroll :on-reach-bottom="handleReachBottom" :height="height">
			        		<Card dis-hover v-for="(item, index) in noticeList" :key="index">
								<h2>{{item.title}}</h2>
								<DatePicker type="date" format="yyyy-MM-dd">{{item.start_show_time.time}}</DatePicker>
							</Card>
						</Scroll>
			        </TabPane>
			        <TabPane label="新闻" name="9">
			        	<Scroll :on-reach-bottom="handleReachBottom" :height="height">
			        		<Card dis-hover v-for="(item, index) in noticeList" :key="index">
								<h2>{{item.title}}</h2>
								<DatePicker type="date" format="yyyy-MM-dd">{{item.start_show_time.time}}</DatePicker>
							</Card>
						</Scroll>
			        </TabPane>
			    </Tabs>
			</template>
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
        prev: {path:'/'}, // 返回路径的name 
        noticeList:[],
        totleNum: '',
        name: '',
        currPage: 1,
        height: ''
       }
    },
    created () {
        this.$store.state.showBottomNav = false // 是否显示底部导航 
        let height = window.screen.height-180
        this.height = height 
       
    },
	components: { navTitle },
	mounted: function() {
	/*	let cur = document.querySelectorAll("div[class='topTitle']");
        console.log("cur===",cur)
         let curHeight = cur[0].clientHeight;
        console.log("curHeight",curHeight);*/

		this.axios({
			method: 'post',
			data: {
				OPT: '131',
				typeId: 7,
				currPage: 1,
				pageSize: 10 ,
			}
		}).then((response) => {
            this.noticeList = response.data.list
            this.totleNum = response.data.totleNum
        }).catch((error) => {
            console.log(error)
        })
	},
	methods: {
		current(index){
			this.axios({
                method: 'post',
                data: {
	                OPT: '131',
	                typeId: 7,
	                currPage: index,
	                pageSize: 10,
                }
            }).then((response) => {
                this.noticeList=response.data.list
                this.totleNum = response.data.totleNum
                
            }).catch((error) => {
                console.log(error)
            }) 
            //document.documentElement.scrollTop = document.body.scrollTop = 0
		},

		clickTab:function(name){ 
 			this.axios({
	          method: 'post',
	          data: { 
	          	OPT: '131' ,
	          	typeId: name, 
	          	currPage: 1,
	          	pageSize:10 
	          },
	        }).then((response) => {
	            this.noticeList=response.data.list;

	        }).catch((error) => {
	            console.log(error)
	        })

			console.log(name);
        }, 
		handleReachBottom () {
            return new Promise(resolve => {
                const listLength = Math.ceil(this.totleNum/8);
                this.currPage += 1
               // console.log("kkkk===", listLength);
                 console.log("kkkk===", name);

                if(this.currPage >= listLength){
                	this.currPage = listLength
                	setTimeout(() => {
                        console.log('没有更多了')
                    },2000)
                }else{
                	setTimeout(() => {
                    	this.axios({
			                method: 'post',
			                data: {
				                OPT: '131',
				                typeId: this.name,
				                currPage: this.currPage,
				                pageSize: 10,
		                	}
		            	}).then((response) => {
		            		let dataList = response.data.list
                            for (var i = 0;i < dataList.length; i++){
                                this.noticeList.push(dataList[i])
                                console.log("dataList", dataList[i]);
                            }
			            }).catch((error) => {
			                console.log(error)
			            }) 
                  		console.log(this.noticeList)
                    //this.current(this.i)
                    	resolve();
            		}, 2000);
           		} 
                   
            });
        },
        
	},
}
</script>

<style lang="less">
.main-wrap{
  padding-top:3rem;
}

.news-main{
	.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar {
		padding:1rem;
		margin-bottom:initial;
		& .ivu-tabs-nav-container{
			overflow: initial;
		}
		& .ivu-tabs-nav{
			width: 100%;
			.ivu-tabs-ink-bar{
				height:initial;
			}
			& .ivu-tabs-tab{
				width: 50%;
			    height: 2.2rem;
			    text-align: center;
			    line-height: 2.2rem;
			    border: 1px solid #1e93ff;
			    background: #fff;
			    color: #1e93ff;
			    box-sizing: border-box;
			    font-size: 1.1rem;
			    padding:0;
			    margin: 0;
			}
			& .ivu-tabs-tab-active{
				background: #1e93ff;
	    		color: #fff;
			}
		}
	}
	.ivu-scroll-loader-wrapper{
			padding:0;
		}

	.ivu-card-bordered{
		border:0;
		border-bottom: 1px solid #dddee1;
		& .ivu-card-body{
			padding:0.3rem 1rem;
			text-align:left;
			& h2{
				font-size:1rem;
				font-weight: normal;
			}
		}
	}
	.ivu-card{
		border-radius:0;
	}

	/*.news-data{
		padding:0 1rem;
		text-align: left;
		border-bottom: 1px solid #dfdfdf;
		background: #fff;
		& h2{
			padding: 5px 0 0;
			line-height: 1.8rem;
			font-size: 1rem;
			font-weight: normal;
		}
		& .date{
			line-height: 1.5rem;
		    padding-bottom: 5px;
		    color: #999;
		    font-size: 0.8rem;
		}

	}*/
}

/*	.ivu-tabs-bar ivu-tabs-tab:first-child {
    border-radius: 0.3333333333333333rem 0 0 0.3333333333333333rem;
}
.ivu-tabs-bar ivu-tabs-tab:last-child {
    border-radius: 0 0.3333333333333333rem 0.3333333333333333rem 0;
}*/
	
</style>