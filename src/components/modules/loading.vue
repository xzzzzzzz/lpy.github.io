
<template>
    <div class="demo-spin-container">
        <Spin fix  size="large"></Spin>
<!-- 
         <Spin fix>
            <Icon type="load-c" size=30 class="demo-spin-icon-load"></Icon>
            <div>Loading</div>
        </Spin> -->

    </div>
</template>
<script>
    export default {
        
    }
</script>

<style>
 .demo-spin-icon-load{
        animation: ani-demo-spin 1s linear infinite;
    }
    @keyframes ani-demo-spin {
        from { transform: rotate(0deg);}
        50%  { transform: rotate(180deg);}
        to   { transform: rotate(360deg);}
    }
    .demo-spin-container{
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 999;
        left:0;
        top:0;
    }
    .ivu-spin-fix{background:rgba(0, 0, 0, 0);}
</style>