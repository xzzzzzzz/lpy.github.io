<template>
    <div>
        <nav-title title="个人中心" v-if="detailShow"></nav-title>
        <h1>{{ msg }}</h1>
    </div>
</template>

<script>

import navTitle from '../components/modules/title.vue'
export default {
    data () {
      return {
        msg: '个人中心',
        detailShow:true,
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
        this.axios({
          method: 'post',
          data: { signUUID:getDatas,OPT: '10030'}
        }).then((response) => {

        }).catch((error) => {
            console.log(error)
        })
        
    }
}
</script>
