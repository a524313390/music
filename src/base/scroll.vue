<template>
	<div class="wrapper" ref='wrapper'>
		<slot></slot>
	</div>
</template>

<script>
import Bscroll from 'better-scroll' ;
export default{
	name:'scroll',
	props:{
		proType:{
			type:Number,
			default:1
		},
		click:{
			type:Boolean,
			default:true
		},
		datas:{
			type:Array,
			default:null
		},
		listenScroll:{
			type:Boolean,
			default:false
		},
		scrollEnd:{
			type:Boolean,
			default:false
		}
	},
	mounted(){
	
		var that=this;
		setTimeout(function(){
			
			that._initScroll();
			
		},100)
	},
	
	methods:{
		_initScroll(){
			var that=this;
			if(!this.$refs.wrapper){
				return
			}
			
			this.scroll=new Bscroll(this.$refs.wrapper,{
				probeType:this.proType,
				click:this.click
			})
			
			if(this.listenScroll){
				
				this.scroll.on('scroll',(pos)=>{
					
					that.$emit('scroll',pos);
				})
			}
			if(this.scrollEnd){
				this.scroll.on('scrollEnd',()=>{
					if(this.scroll.y<=(this.scroll.maxScrollY+50)){
					
						this.$emit('scrollToEnd');
					}
				})
			}
		},
		enable(){
			this.scroll && this.scroll.enable();
		},
		disable(){
			this.scroll && this.scroll.disable();
		},
		refresh(){
			this.scroll && this.scroll.refresh();
		},
		scrollTo(){
			this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
		},
		scrollToElement(){
		
			this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
		},
	},
	wacth:{
		datas(){
			console.log(1)
			var that=this;
			setTimeout(function(){
				that.scroll && this.refresh();
			},20)
		}
	}
}
</script>

<style scoped lang="less">
	
</style>
