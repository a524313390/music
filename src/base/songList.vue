<template>
	<div class="songs">
		
		<ul>
				<li  v-for="(item,index) in songs" class="songs-item" @click="selectItem(item,index)">
				<div class="rank" v-if="rank">
					<span :class="getRankClass(index)"  >{{getRankText(index)}}</span>
				</div>
				<div class="content">
					<div class="name">{{item.name}}</div>
					<div class="desc">{{desc(item.singer,item.album)}}</div>
				</div>
			</li>
		</ul>
	</div>
</template>

<script>

	export default{
		name:'songList',
		data(){
			return {
				
			}
		},
		props:{
			songs:{
				type:Array,
				default(){
					return []
				}
			},
			rank:{
				type:Boolean,
				default:false
			}
		},
		computed:{
			desc(){
				return function(singer,album){
					return `${singer}-${album}`;
				}
			}
		},
		components:{
			
		},
		methods:{
			selectItem(item,index){
				this.$emit('select',item,index);
			},
			getRankClass(index){
				if(index<=2){
					return `icon icon${index}`
				}else{
					return 'text';
				}
			},
			getRankText(index){
				if(index>=3){
					return index+1; 
				}
			}
		},
		mounted(){
		
		}
	}
</script>

<style lang="less" scoped>
	@import '../common/css/minxin.less';

	.songs{
		width: 100%;
		.songs-item{
			display: flex;
			align-items: center;
			height: 64px;
			font-size: 14px;
			box-sizing: border-box;
		}
		background: @color-background;
		padding: 20px 30px;
		.rank{
			min-width:25px;
			max-width: 25px;
			height: 25px;
			overflow: hidden;
			margin-right: 15px;
			.icon{
				display: inline-block;
				
				width: 25px;
				height: 25px;
				background-size: 25px 25px;
				&.icon0{
					.bg-img('first');
				}
				&.icon1{
					.bg-img('second');
				}
				&.icon2{
					.bg-img('third');
				}
				
			}
			.text{
				color:@color-theme;
				font-size: @font-14;
			}
		}
		.content{
			flex: 1;
			.name{
				color: #fff;
				.no-wrap();
				
			}
			.desc{
				.no-wrap();
				margin-top: 10px;
				color: @color-text-3;
			}
		}
	}
</style>
