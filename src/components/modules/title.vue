<template>
  	<div  class="topTitle">
		{{title}}
		<router-link class="show_prev" :to="prev" v-if="showPrev">
			<Icon type="ios-arrow-back"></Icon>
		</router-link>
		<router-link class="show_rule" :to="{name:rule}" v-if="showRule">
			{{title_rule}}
		</router-link>

	</div>
</template>

<script>
	export default {
		props: {
			title: String,
			prev: Object, // 返回路径
			rule: String, // 返回路径
			showPrev:{ // 是否显示返回
				type: Boolean,
				default: false
			},
			showRule:{
				type: Boolean,
				default: false
			}
		},
		data () {
			return {
				title_rule: '规则'
			}
		}
	}
</script>

<style lang="less">
  .topTitle {
    position: fixed;  
    top: 0;  
    left: 0;  
    height:3rem;
    line-height:3rem;
    font-size: 1rem;
    width:100%;
		background: linear-gradient(to right, #24e9f0 , #2564ef); /* 标准的语法 */
		color:#fff;
		z-index: 9;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		
		& a{
			position: absolute;
			width:3rem;
			text-align: center;
			height:3rem;
			line-height: 3rem;
			color:#fff;
			top:0;
			font-size: 1.3rem;
		}
		& a.show_prev{
			left: .2rem;
		}
		& a.show_rule{
			right: 0.55rem;
			font-size: 1.1rem;
		}	
		
		

  }

</style>
