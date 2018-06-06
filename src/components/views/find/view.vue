<template>
  <div class="newsView">
    <nav-title :title="newData.title" v-if="detailShow" :showPrev='showPrev' :prev="prev"></nav-title>
    <div class="content" v-html="newData.content">

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
        prev: {path:'/find/news'}, // 返回路径的name
        newData:{}, // 新闻
        id:0,
       }
    },
    created () {
        this.$store.state.showBottomNav = false // 是否显示底部导航
        this.id = this.$route.query.id
    },
  components: { navTitle },
  beforeRouteEnter(to, from, next){
    next(vm => {
      if(from.path === '/'){
        return vm.prev = {path:'/'}
      }else if(from === "/find/news"){
        return vm.prev = {path:'/find/news'}
      }
    })
  },
  mounted () {
    this.axios({
			method: 'post',
			data: {
				id: this.id,
        OPT: 129
			}
		}).then((response) => {
          this.newData = response.data
      }).catch((error) => {
          console.log(error)
      })
  }
}
</script>

<style lang="less">
.newsView{
  padding-top:3rem;
  & .content{
    white-space: normal;
    word-break: break-all;
    padding:1rem;
    text-align: left;
    font-size: 1rem;
    background:#fff;
    & img{
      max-width: 100%;
      display: block;
      margin:1rem auto;
    }
    & table{
      width:100%;
      overflow: hidden;
    }
  }
}
</style>
