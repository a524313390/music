<template>
	<div class="line">
		<div class="linnes" ref="line" @click="checkLine"></div>
		<div class="duration" ref="duratiom"></div>
		<div class="radio" ref="radio" @touchstart.prevent="touchStart" @touchmove.prevent="touchMove" @touchend="touchEnd"></div>
		

	</div>
</template>

<script>
	const radioWidth=15;
	export default{
		name:'lines',
		data(){
			return {
				title:'进度条'
			}
		},
		props:{
			precent:{
				type:Number,
				default:0
			}
		},
		computed:{
			
		},
		watch:{
			precent(newVla){
				if(newVla>=0 && !this.touch.initflag){
					const lineW=this.$refs.line.clientWidth;				
					const offsetWidth=newVla*lineW;
					this.$refs.duratiom.style.width=`${offsetWidth}px`;
					this.$refs.radio.style.transform=`translate3d(${offsetWidth}px,0,0)`;
				}
			}
		},
		methods:{
			touchStart(e){
			
				this.touch.initflag=true;
				this.touch.startX=e.touches[0].pageX;//获取开始触摸的位置
				this.touch.left=this.$refs.duratiom.clientWidth;//获取进度条偏移的位置
			
			},
			touchMove(e){
				if(!this.touch.initflag)return;
				//获取拖动的距离，用结束位置-开始位置
				let defailX=e.touches[0].pageX-this.touch.startX;
				//加上之前拖动的距离
				let offsetWidth=Math.max(0,this.touch.left+defailX);
				//获取总宽度，控制拖动距离不能超出
				let width=this.$refs.line.clientWidth;
				if(offsetWidth<=0){
					offsetWidth=0
				}
				if(offsetWidth>=width){
					offsetWidth=width;
				}
				
				
				this._offset(offsetWidth)
			},
			touchEnd(e){
				this.touch.initflag=false;
				this.tiggerTime();
			},
			tiggerTime(){
				//获取总宽度
				let width=this.$refs.line.clientWidth;
				//获取拖动后的宽度
				let offsetWidth=this.$refs.duratiom.clientWidth;
				
				let timer=offsetWidth/width;
				this.$emit('changeMusicTime',timer);
			},
			checkLine(e){
				this._offset(e.offsetX);
				this.tiggerTime();
			},
			_offset(offsetWidth){
				this.$refs.radio.style.transform=`translate3d(${offsetWidth}px,0,0)`;
				this.$refs.duratiom.style.width=`${offsetWidth}px`;
			}
		},
		created(){
			this.touch={};
		},
	}
</script>

<style lang="less" scoped>
	.line{
		position: relative;
		top: 0;
		left: 0;
		.linnes{
			width: 100%;
			height: 4px;
			background: rgba(0,0,0,0.3);
			position: absolute;
			top: 0;
			left: 0;
			z-index: 20;
		}
		.duration{
		
			height: 4px;
			background: @color-theme;
			position: absolute;
			top: 0;
			left: 0;
			z-index: 21;
		}
		.radio{
			position: absolute;
			top: -4px;
			left: -6px;
			width: 10px;
			height: 10px;
			border-radius: 50%;
			background: @color-theme;
			border:2px solid #fff;
			z-index: 22;
		}
	}
</style>
