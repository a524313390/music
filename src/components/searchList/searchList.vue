<template>
	<scroll class="list" :data="results" :scrollEnd="scrollEnd" @scrollToEnd="scrollToEnd">
		<ul class="list-wrap">
			<loading v-if="results.length<=0"></loading>
			<li class="list-item" v-if="results[0]" v-for="(item,index) in results" @click="select(item,index)">
				<i :class="getIconClass(item)"></i>
				<span class="name" v-html="getDisplayName(item,index)"></span>
			</li>
			
		</ul>
	</scroll>
</template>

<script>
	import {search} from '../../api/search';
	import {createSong} from '../../common/js/song';
	import scroll from '../../base/scroll';
	import {getplaysongvkey} from '../../api/singers';
	import loading from '../../base/loading';
	import {mapActions} from 'vuex';
	const TYPE_SINGER='singer';
	const preapge=20;
	export default{
		name:'home',
		data(){
			return {
				page:0,
				results:[],
				scrollEnd:true,
				hasMove:true,
				hasLoading:false
			}
		},
		props:{
			query:{
				type:String,
				default:''
			},
			showSinger:{
				type:Boolean,
				default:true
			}
		},
		watch:{
			query(){
				this.results=[];
				this.search();
			}
		},
		methods:{
			search(){
				this.hasMove=true;
				
				if(this.query=='')return;
		
				search(this.query,this.page,this.showSinger,preapge).then((res)=>{	
					if(res.code==0){
						this._filterArr(res.data);
						this._hasMove(res);
					}
				})
				
			},
			scrollToEnd(){
				if(!this.hasMove){
					return;
				}else{
					this.page=this.page+1;
					console.log(this.page);
					search(this.query,this.page,this.showSinger,preapge).then((res)=>{
								
						if(res.code==0){
							
							
							this._filterArr(res.data);
							this._hasMove(res);
						}
					})
				}
			},
			_hasMove(res){
				let totalNum=res.data.song.totalnum;//搜素总条数
				let curnum=res.data.song.curnum;//当前搜索多少个
				let curpage=res.data.song.curpage;//第几页
				// 没有更多数据的时候
				if(curpage*curnum>=totalNum && !res.data.song.list.length){
					this.hasMove=false;
				}
			},
			_filterArr(data){
				
				let res=[];
				if(data.zhida && data.zhida.singerid){
					
					res.push({...data.zhida,...{type:TYPE_SINGER}});
				}
				if(data.song){
					res=res.concat(this._listArr(data.song.list));
					
				}
			
				return res;
			},
			getIconClass(item){
				if(item.type==TYPE_SINGER){
					return 'icon-mine';
				}else{
					return 'icon-music';
				}
			},
			getDisplayName(item,index){
				if(item.singername){
					return item.singername;
				}else{
					return `${item.name}-${item.singer}`;
				}
				
			},
			_listArr(list){
				let result=[];
				
					list.forEach((item)=>{
						if(item.songid && item.albumid){
								var obj=new createSong(item);
								var musicUrl=obj.songVkey(item.songmid).then(res=>{
									obj.url=obj.url.replace('undefined','')+res;
								});
								result.push(obj);
								
						}
					})	
					this.results=this.results.concat(result);
			},
			select(item,index){
				
				this.selectPlay({list:this.results,index});
				this.$emit('addHistory',item.singer);
			},
			...mapActions(['selectPlay'])
		},
		components:{
			scroll,
			loading
		},
		mounted(){
			
		},
	}
</script>

<style lang="less" scoped>
	.list{
		position: fixed;
		top: 200px;
		bottom: 0;
		left: 5%;
		right: 0;
		z-index: -1;
		.list-wrap{
			width: 80%;
			margin: auto;
			margin-top: 30px;
			.list-item{
				color:@color-text-5;
				font-size: @font-14;
				margin-top: 15px;
				.name{
					display: inline-block;
					white-space: normal;
					overflow:hidden; //超出的文本隐藏
					text-overflow:ellipsis; //溢出用省略号显示
					white-space:nowrap;
					width: 80%;
				}
			}
		}
	}
</style>
