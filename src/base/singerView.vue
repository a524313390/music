<template>
	<scroll class="listView" :datas='data' ref="listScroll" :listenScroll="listenScroll" @scroll="scroll" :proType="proType">
		<loading v-if="!data.length"></loading>	
		<ul>
			<li  v-for="(item,index) in data"  class="item" ref="listGroup">
				<h2 class="list-group-title">{{item.title}}</h2>
				<ul>
					<li v-for="(lists,index) in item.items" @click="details(lists)"   class="list-group-item">
						<img  v-lazy="lists.avatar" class="avatar" alt="">
						<span class="name">{{lists.name}}</span>
					</li>
				</ul>
			</li>
			
		</ul>
		<div class="right" >
			<ul>
				<li v-for="(title,indexs) in listTitle " :class="{active:currentIndex==indexs}" :data-index="indexs" @touchstart="ontitle($event,indexs)" class="title-item">{{title}}</li>
			</ul>
		</div>
		<div class="list-fixed" v-if="fixedTitle">
			<h1 class="fixed-title">{{fixedTitle}}</h1>
		</div>
	</scroll>
</template>

<script>
	import scroll from './scroll'; 
	import loading from '@/base/loading';
	export default{
		name:'singerView',
		props:{
			data:{
				type:Array
			}
		},
		data(){
			return {
				scrollY:-1,
				listenScroll:true,
				proType:2,
				currentIndex:0
			}
		},
		created(){
			setTimeout(()=>{
				this._getEveryHeight();
			})
		},
		components:{
			scroll,
			loading
		},
		mounted(){
			
		},
		computed:{
			listTitle(){
				return this.data.map((item)=>{
					
					return item.title.substr(0,1);
				})
			},
			//顶部显示对应的title
			fixedTitle(){
				return this.data[this.currentIndex] ? this.data[this.currentIndex].title :''
			}
		},
		methods:{
			ontitle(e,index){
					//滚动到第几个元素
					this.$refs.listScroll.scrollToElement(this.$refs.listGroup[index],0);
					this.currentIndex=index;
			},
			scroll(pos){
				//获取实时滚动位置
				this.scrollY=pos.y;
				
			},
			//获取内容中每个item的高度
			_getEveryHeight(){
				this.listHeight=[];//存放每个元素的高度
				const list=this.$refs.listGroup;
			
				let height=0;//默认为0
				this.listHeight.push(height);
				for(let i=0;i<list.length;i++){
					let item=list[i];
					height+=item.clientHeight;
					this.listHeight.push(height);
				}
				
			},
			details(params){
			
				this.$emit('selectDetail',params);
			}
		},
		watch:{
			data(){
				//当data发声变化的时候就调用计算高度的函数
				setTimeout(()=>{
					this._getEveryHeight();
				},1000)
			},
			//监听scrollY纵向滚动的位置，得到滚动元素对应的下标
			scrollY(y,old){
				
				const height=this.listHeight;
				for(let i=0;i<height.length;i++){
					let h1=height[i];
					let h2=height[i+1];
					//如果遍历到最后一个
					if(!h2 || (-y>h1 && -y<h2)){
						this.currentIndex=i;
						return;
					}else{
						this.currentIndex=0;	
					}
				}
			},
			
		}
	}
</script>
<style lang="less" scoped>
	.listView{
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		background: @color-background;
		.list-group-title{
			color:@color-text-5;
			font-size: 14px;
			margin: 10px 0;
			background: @color-linght;
			height: 30px;
			line-height: 30px;
			text-indent: 15px;
		}
		.list-group-item{
			display: flex;
			align-items: center;
			padding: 20px 0 0 30px;
			.avatar{
				width: 50px;
				height: 50px;
				border-radius: 50%;
				
			}
			.name{
				color: @color-text-5;
				font-size: @font-14;
				margin-left: 20px;
			}
		}
		.right{
			position: absolute;
			right: 0;
			top: 50%;
			transform: translateY(-50%);
			width: 20px;
			border-radius: 10px;
			text-align: center;
			background:@color-backgrounds;
			color: @color-text-5;
			font-size: 12px;
			padding: 20px 0;
			.title-item{
				padding: 3px;
				line-height: 1;
			}
			.active{
				color: @color-theme;
			}
		}
		.list-fixed{
			position: absolute;
			top:-10px;
			left: 0;
			width: 100%;
			color:@color-text-5;
			font-size: 14px;
			margin: 10px 0;
			background: @color-linght;
			height: 30px;
			line-height: 30px;
			text-indent: 15px;
			
		}
	}
</style>
