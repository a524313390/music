<template>
	<div class="loading" >
		<img src="../common/images/loading.gif" width="24" height="24" alt="加载中.....">
		<p class="text">{{title}}</p>
	</div>
</template>

<script>
	export default{
		name:'loading',
		
		data(){
			return {
				title:'加载中....'
			}
		},
		computed:{
			
		}
	}
</script>

<style lang="less" >
	.loading{
		text-align: center;
		.text{
			font-size: 14px;
			color: #fff;
		}
	}
</style>
