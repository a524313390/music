<template>
	<div class="headers">
		<div class="img"></div>
		<h1 class="text">Music</h1>
	</div>
</template>

<script>
	export default{
		name:'headers',
		data(){
			return {
				
			}
		}
	}
</script>

<style scoped lang="less"> 
@import "~@/common/css/minxin.less";
.headers{
	top: 10px;
	position: relative;
	height: 44px;
	text-align: center;
	color: @color-theme;

	.img{
		display: inline-block;
		height: 32px;
		width: 30px;
		.bg-img('~@/common/images/logo');
		background-size: 30px 32px;
		vertical-align: middle;
	}
	.text{
		display: inline-block;
		font-size: @font-18;
		line-height: 44px;
	}
}
</style>
