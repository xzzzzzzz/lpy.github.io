<template>
  <div class="TextScroll"> 
    <div id="colee_left" style="overflow:hidden;width:100%;">
        <table cellpadding="0" cellspacing="0" border="0">
            <tr>
                <td id="colee_left1" valign="top" align="center">
                    <table cellpadding="2" cellspacing="0" border="0">
                        <tr align="center">
                            <td v-for="(item,index) in dataList" :key="index">
                                {{item.investTime.time|formatDate}}投资人{{item.userName}}投资{{item.title}}{{item.amount}}元
                            </td>
                        </tr>
                    </table>
                </td>
                <td id="colee_left2" valign="top">
                </td>
            </tr>
        </table>
    </div>
  </div>
</template>
<script>
export default {
    name: 'TextScroll',
    props: {
        dataList: {
            type: Array,
            default: [],
        }
    },
    data() {
        return {

        }
    },
    filters: {
        formatDate(time) {
            var date = new Date(time);
            return new Date(time).Format('yyyy-MM-dd')
        }
    },
    mounted () {
        setTimeout(() => {
            this.getText()
        }, 1000)
    },
    methods: {
        getText() {
            // 使用div时，请保证colee_left2与colee_left1是在同一行上.
            var speed=30//速度数值越大速度越慢
            var colee_left2=document.getElementById("colee_left2");
            var colee_left1=document.getElementById("colee_left1");
            var colee_left=document.getElementById("colee_left");
            colee_left2.innerHTML=colee_left1.innerHTML
            function Marquee3(){
                if(colee_left2.offsetWidth-colee_left.scrollLeft<=0){//offsetWidth 是对象的可见宽度
                    colee_left.scrollLeft-=colee_left1.offsetWidth//scrollWidth 是对象的实际内容的宽，不包边线宽度
                }else{
                    colee_left.scrollLeft++
                }
            }
            var MyMar3=setInterval(Marquee3,speed)
            colee_left.onmouseover=function() {clearInterval(MyMar3)}
            colee_left.onmouseout=function() {MyMar3=setInterval(Marquee3,speed)}
            
        }
    }
}
</script>

<style scoped>
.TextScroll{
    width: 100%;
    height:2rem;
    line-height: 2rem;
}
.TextScroll td{
    padding:0 0.5rem;
    white-space:nowrap;
}
</style>