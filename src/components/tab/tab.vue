<template>
	<div class="tab">
		<router-link tag="div" class="tab-item" to="/recommend">
			<span>推荐</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/singer">
			<span>歌手</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/rank">
			<span>排行</span>
		</router-link>
		<router-link tag="div" class="tab-item" to="/search">
			<span>搜索</span>
		</router-link>
		
	</div>
</template>

<script>
	export default{
		name:'tab'
	}
</script>

<style scoped lang="less">
	.tab{
		margin-top: 15px;
		display: flex;
		align-items: center;
		height: 44px;
		text-align: center;
		.tab-item{
			flex: 1;
			color: @color-text;
			padding: 8px 0;
			font-size: @font-14;
		}
		.router-link-active{
			border-bottom: 2px solid @color-theme;
			color: @color-theme;
		}
	}
</style>
