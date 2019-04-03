<template>
	<div class="player" v-show="playList.length>0">
	<transition name="play">
		<div class="player-wrap" v-show="fullScreen">
			<div class="background">
				<div class="img-filter"></div>
				<img :src="currentSong.image" width="100%" height="100%" alt="">
			</div>
			<div class="top">
				<div class="back" @click='back'>
					<i class="icon-back"></i>
				</div>

				<h2 class="title" v-html="currentSong.name"></h2>
				<h3 class="names"  v-html="currentSong.singer">222</h3>
				
			</div>
		<!-- 	<div class="middle" @touchstart="middleStart" @touchmove="middleMove" @touchend="middleEnd"> -->
			<div class="middle" >
				<v-touch v-on:swipeleft="middleLeft" v-on:swiperight="middleRight">
				<div class="middle-l"  ref="middlel" >
					<div class="cd-wrap">
						<div class="cd" :class="playCD">
							<img :src="currentSong.image" class="cd-img" alt="">
						</div>
					</div>
					<div class="play-lyric">
						<div class="play-lyrci-content">
							{{playingLyric}}
						</div>
					</div>
				</div>
				<div class="middle-r" ref="middler">
					<scroll class="middle-wrap" ref='lyricList' :data="currentLyric && currentLyric.lines">
						<div class="lyric-wrap">
							<div v-if="currentLyric">
								<p ref='lyricline' class="text" :class="{'current':currentLineNumber==index}" v-for="(item,index) in currentLyric.lines">{{item.txt}}</p>
							</div>
							<div v-else>
								<loading></loading>
							</div>
						</div>
					</scroll>
				</div>
				</v-touch>
			</div>
			
			<div class="bottom">
				<div class="dot-wrap">
					<span class="dot" :class="{'active':currentShow=='cd'}"></span>
					<span class="dot" :class="{'active':currentShow=='lyric'}"></span>
				</div>
				<div class="music-time">
					<span class="time time-l">{{format(musicTime)}}</span>
					<div class="music-line">
						<lines :precent="precent" @changeMusicTime="changeMusicTime"></lines>
					</div>
					<span class="time time-r">{{format(currentSong.duration)}}</span>
				</div>
				<div class="oper">
					<div class="icon i-left" @click="changeModel">
						<i :class="iconMode"></i>
					</div>
					<div class="icon i-left" @click="prev">
						<i class="icon-prev"></i>
					</div>
					<div class="icon i-center">
						
						<i @click="togglePlay"   :class="playIcon"></i>
					</div>
					<div class="icon i-right" @click="next">
						<i class="icon-next"></i>
					</div>
					<div class="icon i-right">
						<i class="icon-not-favorite icon"></i>
					</div>
				</div>
			</div>
		</div>
	</transition>
	<transition name="min">
		<div class="min-player" @click="showDetail"  v-show="!fullScreen">
			<div class="icon" :class="playCD">
				<img :src="currentSong.image" width="40" height="40" alt="">
			</div>
			<div class="text">
				<h2 class="name" v-html="currentSong.name"></h2>
				<p class="desc" v-html="currentSong.singer"></p>
			</div>
			<div class="control" @click.stop="togglePlay">
				<i :class="playIcon"></i>
			</div>
			
			<div class="control">
				<i class="icon-mini icon-playlist"></i>
			</div>
		</div>
	</transition>
	<audio ref='audio' @ended="end" :src="currentSong.url" @canplay="ready" @error="error" @timeupdate="updateTime"></audio>
	</div>
</template>

<script>
	import {mapGetters,mapMutations} from 'vuex';
	import lines from '../../base/line';
	import playMode from '../../common/js/config';
	import {filterArray} from '../../common/js/util';
	import lyrics from 'lyric-parser';
	import scroll from '../../base/scroll';
	import loading from '../../base/loading';
	export default{
		name:'player',
		data(){
			return {
				songReady:false,
				musicTime:0,
				currentLyric:null,
				currentLineNumber:0,
				currentShow:'cd',
				playingLyric:''
			
			}
		},
		create(){
			this.touch={};
		},
		computed:{
			playIcon(){
				return this.playing?'icon-pause':'icon-play'
			},
			playCD(){
				return this.playing?'plays':'pauses';
			},
			precent(){
				return this.musicTime/this.currentSong.duration;
			},
			iconMode(){
				return this.modelIndex==playMode.sequenec ? 'icon-sequence':this.modelIndex==playMode.loop ? 'icon-loop': 'icon-random';
			},
			...mapGetters(['fullScreen','playList','currentSong','playing','currentIndex','modelIndex','sequenceList'])
		},
		methods:{
			back(){
				this.setFullScreen(false);
			},
			showDetail(){
				this.setFullScreen(true);
			},
			togglePlay(){
				this.setPlay(!this.playing);
				if(this.currentLyric){
					this.currentLyric.togglePlay()
				}
				
			},
			prev(){
				if(!this.songReady)return;
				let index=this.currentIndex-1;
				if(index<0){
					index=this.playList.length-1; 
				}
				this.setCurrentIndex(index);
				this.setCurrentIndex(index);
				if(!this.playing){
					this.togglePlay();
				}
				this.songReady=false;
			},
			next(){
				if(this.songReady){
					let index=this.currentIndex+1;
					if(index==this.playList.length){
						index=0; 
					}
					this.setCurrentIndex(index);
					if(!this.playing){
						this.togglePlay();
					}
				}
				this.songReady=false;
			},
			ready(){
				this.songReady=true;
			},
			error(){
				this.songReady=true;
			},
			updateTime(e){
				
				this.musicTime=e.target.currentTime;
				
				
			},
			end(){
				if(this.modelIndex==playMode.loop){
					
					this.loop();
				}else{
					
					this.next();
				}
				
			},
			loop(){
				this.$refs.audio.currentTime=0;
				this.$refs.audio.play();
				if(this.currentLyric){
					this.currentLyric.seek()
				}
			},
			_pad(num,n=2){
				let str=num.toString();
				while(str.length<n){
					num='0'+num;
					str++;
				}
				return num;
				
			},
			format(interval){
				interval=interval | 0;
				let minute=interval / 60 | 0;
				let second=this._pad(interval%60);
				return `${minute}:${second}`;
				
			},
			changeMusicTime(params){
				this.$refs.audio.currentTime=this.currentSong.duration*params
			
				
				if(this.currentLyric){
					this.currentLyric.seek(this.currentSong.duration*1000);
				}
			},
			changeModel(){
				let model=this.modelIndex+1;
				if(model>=3){
					model=0;
				}
				this.setPlayModel(model);
				let list=null;
				
				if(model==playMode.random){
					list=filterArray(this.sequenceList);
				}else{
					list=this.sequenceList;
				}
				
				this.setPlayList(list);
				this.resetCueentIndex(list);
			
			},
			resetCueentIndex(list){
				let index=list.findIndex(item=>{
					return item.id==this.currentSong.id;
				})
				this.setCurrentIndex(index)
			},
			getLyric(){
				this.currentSong.getLyric().then((res)=>{
					this.currentLyric= new lyrics(res,this.handleLyric)
					if(this.playing){
						this.currentLyric.play();
					}
					
					
				}).catch(()=>{
					this.currentLyric=null;
					this.playingLyric='';
					this.currentLineNumber=0;
				})
			},
			 handleLyric({lineNum, txt}) {
				
					this.currentLineNumber=lineNum;
				
				
				if(lineNum>5 && this.$refs.lyricline ){
						
						let lyricline=this.$refs.lyricline[lineNum-5];
						this.$refs.lyricList.scrollToElement(lyricline,1000);
					
					
				}else{
					this.$refs.lyricList.scrollToElement(0,0,1000);
				}
				this.playingLyric=txt;
			},
			middleLeft(){
				this.currentShow='lyric';
				const middleElement=this.$refs.middlel;
				const width=window.innerWidth;
				const middleR=this.$refs.middler;
				middleElement.style.transform=`translateX(-${width}px)`;
				middleElement.style.transition='all 0.5s';
				middleR.style.transform=`translateX(-${width}px)`;
				middleR.style.transition='all 0.5s';
			},
			middleRight(){
				this.currentShow='cd';
				const middleElement=this.$refs.middlel;
				const width=window.innerWidth;
				const middleR=this.$refs.middler;
				middleElement.style.transform="translateX(0)";
				middleR.style.transform='translateX(0px)';
			
			},
			...mapMutations({
				setFullScreen:'SET_FULL_SCREEN',
				setPlay:'SET_PLAYING_STATE',
				setCurrentIndex:'SET_CURRENT_INDEX',
				setPlayModel:'SET_PLAT_MODE',
				setPlayList:'SET_SUQENECE_LIST'
			})
		},
		watch:{
			currentSong(newOld,oldVal){
				if(newOld.id==oldVal.id){
					return;
				}
				if(this.currentLyric){
					this.currentLyric.stop();
				}
				this.$nextTick(()=>{
					
					this.$refs.audio.play();
					this.getLyric();
				})
			},
			playing(newVal){
				const audio=this.$refs.audio;
				this.$nextTick(()=>{
					
					newVal?this.$refs.audio.play():this.$refs.audio.pause();
				})
				
			}
		},
		mounted(){
		
			
		},
		components:{
			lines,
			scroll,
			loading
		}
		
	}
</script>

<style lang="less" scoped>
	@import '../../common/css/minxin';
	.player{
		
		.player-wrap{
			position: absolute;
			width: 100%;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			z-index: 151;
			background: @color-background;
			.background{
				position: fixed;
				width: 100%;
				height: 100%;
				left: 0;
				top: 0;
				z-index: -2;
				filter: blur(20px);
				.img-filter{
					position: fixed;
					width: 100%;
					height: 100%;
					left: 0;
					top: 0;
					background: rgba(0, 0, 0, .4);
				}
			}
			.top{
				.back{
					position: absolute;
					top: 8px;
					left: 10px;
					transform:rotate(-90deg);
					color: @color-theme;
					font-size:26px;
				}
				.title{
					width: 70%;
					margin: auto;
					text-align: center;
					color: #fff;
					.no-wrap();
					line-height: 40px;
					padding-top: 15px;
				}
				.names{
					width: 70%;
					margin: auto;
					text-align: center;
					color: #fff;
					.no-wrap();
				}
			}
			.middle{
				position: absolute;
				top:120px;
				bottom: 200px;
				width: 100%;
				overflow: hidden;
				white-space: nowrap;
				.middle-l{
					display: inline-block;
					width: 100%;
					margin: auto;
					
				}
				.middle-r{
					display: inline-block;
					width: 100%;
					position: relative;
					top: 0;
					left: 0;
					min-height: 353px;
					.middle-wrap{
						position: absolute;
						top: 0;
						left: 0;
						bottom: 200px;
						width: 100%;
					}
					.lyric-wrap{
						text-align: center;
						.current{
							color: #fff !important;
						}
					
						.text{
							margin: 15px 0;
							color:rgba(255, 255, 255, .6);
							font-size: @font-14;
						}
					}
				}
				.cd-wrap{
					width: 80%;
					height:100%;
					margin: auto;
					.cd{
						width: 100%;
						height: 100%;
						border-radius: 50%;
						overflow: hidden;
						border:10px solid rgba(255,255,255,0.1);
						
						.cd-img{
							width: 100%;
							height: 100%;
							border-radius: 50%;
						}
					}
				}
				.play-lyric{
					margin-top: 30px;
					text-align: center;
					color: rgba(255, 255, 255, .6);
				}
			}
			.bottom{
				position: absolute;
				bottom:50px;
				left: 0;
				width: 100%;
				.dot-wrap{
					width: 100%;
					text-align: center;
					margin-bottom: 20px;
					.dot{
						display: inline-block;
						width: 10px;
						height: 10px;
						border-radius: 50%;
						background: rgba(255, 255, 255, 0.5);
						margin-right: 10px;
						&.active{
							width: 20px;
							height: 10px;
							border-radius: 5px;
							transition: all .5s;
						}
					}
				}
				.music-time{
					width: 80%;
					margin: auto;
					display: flex;
					justify-content: space-between;
					align-items: center;
					margin-bottom: 20px;
					.time{
						width: 30px;
						flex: 0 0 30px;
						color: #fff;
						font-size: @font-14;
					}
					.music-line{
						flex: 1;
						margin: 0 20px;
					}
				}
				.oper{
					width: 80%;
					margin: auto;
					display: flex;
					align-items: center;
					color: @color-theme;
					font-size: 35px;
					justify-content: space-between;
				}
				
			}
		}
		.min-player{
			position: absolute;
			display: flex;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 60px;
			z-index: 150;
			background: #333;
			align-items: center;
			padding-left: 20px;
			box-sizing: border-box;
			.icon{
				flex: 0 0 40px;
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
			}
			.text{
				flex: 1;
				margin-left: 20px;
				color:#fff;
				font-size: @font-14;
				line-height: 1.5;
			}
			.control{
				flex: 0 030px;
				width: 30px;
				color: @color-theme;
				font-size: 25px;
				margin-right: 20px;
			}
		}
		.play-enter-active,.play-leave-active{
			transition: all .5s;
			.top,.bottom{
				 transition: all 0.4s;
			}
		}
		.play-enter,.play-leave-to{
			opacity: 0;
			.top{
				transform: translate3d(0, -100px, 0);
			}
			.bottom{
				transform: translate3d(0, 100px, 0);
			}	
		}
		.min-enter-active,.min-leave-active{
			transition: all .5s ;	
		}
		.min-enter,.min-leave-to{
			transform: translateY(60px);
		}
		.plays{
			animation: rotates 10s linear infinite;
		}
		.pauses{
			animation-play-state:paused;
		}
		@keyframes rotates{
			0%{
				transform:rotate(0);
			}
			100%{
				transform:rotate(360deg);
			}
		}
	}
</style>
