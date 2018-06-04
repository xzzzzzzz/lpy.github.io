<template>

 <div class="tabs" >  
    <ul>  
      <router-link :to="{name:'Index'}" tag="li" exact>  
	      	<Icon type="home"></Icon>
	      	首页
      </router-link>  
      <router-link :to="{name:'Lists'}" tag="li">  
	      	<Icon type="ionic"></Icon>
	       	出借
      </router-link>  
      <router-link :to="{name:'Malls'}" tag="li">  
			<Icon type="star"></Icon>
			发现
      </router-link>  
      <router-link :to="{name:'Users'}" tag="li">  
	      	<Icon type="person"></Icon>
	       	账户
      </router-link>  
    </ul>  
</div>  
</template>



<script>
	

export default {
	data(){  
		return {
    }  
	}
}
</script>
<style lang="less">  
  .tabs {  
    position: fixed;  
    bottom: 0;  
    left: 0;  
    background: #fff;  
    border-top:1px solid #ccc;
    width: 100%;  
    ul {  
      display: table;  
      width: 100%;  
      & > li {  
        text-align: center;  
        display: table-cell;  
        padding: 8px 12px;  
        cursor: pointer; 
        font-size:0.8rem; 
        color: #757575;  
        i{
        	font-size:1.5rem;
	    	display:block;
	    }
        &.router-link-active{  
          color: #409cf9;  
        }   
      }  
    }  
  }  
</style>  