<template>
		

			<div class="music-list">
				<div class="back" @click="back">
					<i class="icon-back"></i>
				</div>
				<h1 class="title" v-html='title' ref="title"></h1>
				<div class="bgimage" :style="bgStyle"  ref="imgHeight">
					<div class="filter"></div>
					<div class="play-wrap">
						<div class="play" v-if="songs.length>0">
							<i class="icon-play"></i>
							<span class="text" @click="random">随机播放全部</span>
						</div>
					</div>
				</div>
				
				<scroll  :data="songs" @scroll="scroll" class="scroll" ref="songTop"  :pro-type="proType" :listen-scroll="listenScroll">
					
					<div class="song-group" >
						<loading  class="loading" v-if="!songs.length" ></loading>
						<song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
					</div>
				</scroll>
			</div>
			
	
		
</template>

<script>
	import loading from './loading';
	import scroll from './scroll';
	import songList from './songList';
	import {mapActions } from 'vuex'; 
	export default{
		name:'musicList',
		props:{
			bgImage:{
				type:String,
				default:''
			},
			songs:{
				type:Array,
				default(){
					return []
				}
			},
			title:{
				type:String,
				default:''
			},
			rank:{
				type:Boolean,
				default:false
			}
		},
		data(){
			return {
				proType:3,
				listenScroll:true,
				scrollY:0
			}
		},
		computed:{
			bgStyle(){
				return `background-image:url(${this.bgImage}); `
			}
		},
		mounted(){
			
				this.imageHeight=this.$refs.imgHeight.clientHeight;
				this.titleHeight=this.$refs.title.clientHeight;
			
				this.$refs.songTop.$el.style.top=this.imageHeight+'px';
				console.log(this.$props)
		},
		methods:{
			back(){
				this.$router.go(-1);
			},
			scroll(pos){
				
				this.scrollY=pos.y;
				let height=this.imageHeight-this.titleHeight;
				let scrollTop=Math.abs(this.scrollY);
				
				if(scrollTop>=height){
					this.$refs.songTop.$el.style.top=this.titleHeight+'px';
					this.$refs.songTop.$el.style.overflow='hidden';	
				}else{
					this.$refs.songTop.$el.style.top=this.imageHeight+'px';
					this.$refs.songTop.$el.style.overflow='visible';
				}	
				//图片的放大缩小
				let pren=Math.abs(this.scrollY/this.imageHeight);
				
				if(pos.y>0){
				
					this.$refs.imgHeight.style.transform=`scale(${pren+1})`;
				
					
				}else if(pos.y==0){
					this.$refs.imgHeight.style.transform=`scale(1)`;
				}
			},
			selectItem(item,index){
				this.selectPlay({list:this.songs,index});
				
			},
			random(){
				this.randomPlay({
					list:this.songs
				})
			},
			...mapActions (['selectPlay','randomPlay'])
		},
		components:{
			songList,
			scroll,
			loading
		},
		
	}
</script>

<style lang="less" scoped>
	.music-list{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		z-index: 100;
		background: @color-background;
			.scroll{
				width: 100%;
				
			}
			.back{
				position: absolute;
				top: 6px;
				left:6px;
				z-index: 35;
				.icon-back{
					display: block;
					padding: 10px;
					color: @color-theme;
				}
			}
			.title{
				text-align: center;
				line-height: 3;
				color: @color-text;
				position: absolute;
				top:0;
				left: 0;
				z-index: 34;
				width: 100%;
			}
			.play-wrap{
				position: absolute;
				bottom: 20px;
				width: 100%;
				text-align: center;
				z-index: 13;
				.play{
					box-sizing: border-box;
					display: inline-block;
					width: 135px;
					border: 1px solid @color-theme;
					padding:7px 0px;
					border-radius: 5px;
					.icon-play,.text{
						font-size: @font-14;
						color: @color-theme;
						
					}
					
				}
			}
			.bgimage{
				position: absolute;
				top: 0;
				left: 0;
				height: 0;
				width: 100%;
				padding-top: 70%;
				padding-bottom: 1px;
				background-size: cover;
				.filter{
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					z-index: 12;
					background:rgba(7,17,27,0.4);
				}
			}
			.scroll{
				position: fixed;
				top: 0;
				bottom: 0;
				z-index: 30;
				.loading{
					position: relative;
					top: 150px;
					color: #fff;
				}
			}
	}
	
		

</style>
