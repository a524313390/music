<template>
	<div class="search">
		<i class="icon-search"></i>
		<input type="text" class="input" v-model="query" :placeholder="placeholder">
		<i class="icon-dismiss" @click="clearSearch" v-show="query"></i>
		
	</div>
</template>

<script>
	export default{
		name:'search',
		data(){
			return {
				query:''
			}
		},
		props:{
			placeholder:{
				type:String,
				default:'搜索歌曲 歌手'
			}
		},
		methods:{
			clearSearch(){
				this.query='';
			},
			setQuery(query){
				this.query=query;
			},
			changQuery(val){
				this.query=val;
			}
		},
		created(){
			this.$watch('query',(newVal)=>{
				this.$emit('query',newVal);
			})
		},
		
	}
</script>

<style lang="less" scoped>
	.search{
		display: flex;
		align-items: center;
		box-sizing: border-box;
		width: 100%;
		padding: 0 15px;
		height: 40px;
		background:#333;
		
		width: 80%;
		margin: 15px auto;
		
		.icon-search{
			font-size: 24px;
			color: @color-backgrounds;
			font-weight: bold;
		}
		.input{
			flex: 1;
			margin: 0 5px;
			line-height: 28px;
			background:#333;
			font-size: @font-14;
			outline: none;
			border: none;
			color: #fff;
			text-indent: 15px;
		}
		.icon-dismiss{
			font-size: 16px;
			color: @color-background;
		}
	}
</style>
