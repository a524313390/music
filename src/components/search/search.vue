<template>
	<div class="search">
		<searchs @query="querys"  ref="search"></searchs>
		<div class="hotkey-wrap" v-show="!query">
			<h1 class="hot-title">热门搜索</h1>
			<div class="hotkey-con-wrap">
				<ul class="hotkey-con">
					<li @click="addQuery(item.k)" class="hot-item" v-for="item in hotkey">
						<span class="text">{{item.k}}</span>
					</li>
				</ul>
			</div>
		</div>
		<div class="search-result"  v-show="query">
			<search-list @addHistory="addHistory" :query="query"></search-list>
		</div>
		<div class="history"  v-show="searchHistory&&searchHistory.length && !query ">
			<div class="title">
				<span class="name">搜索历史</span>
				<span class="clear" @click="clearSearch">
					<i class="icon-clear"></i>
				</span>
			</div>
			<ul class="item-ul">
				<li v-for="item in searchHistory" class="item" @click="changeQuerys(item)">{{item}}</li>
			</ul>
		</div>
	
			<confirm ref="confrim" @hidenConfrim="clearHistory"></confirm>
		
	</div>
</template>

<script>
	import searchs from '../../base/search-box';
	import getHostKey from '../../api/search';
	import searchList from '../searchList/searchList';
	import {mapActions,mapGetters} from 'vuex';
	import confirm from '../../base/confrim';
	import scroll from '../../base/scroll';
	export default{
		name:'search',
		data(){
			return { 
				hotkey:[],
				query:'',
				clear:false,
				
			}
		},
		components:{
			searchs,
			searchList,
			confirm,
			scroll
		},
		computed:{
			...mapGetters(['searchHistory'])
		},
		created(){
			this._getHotKey();
			
		},
		methods:{
			querys(val){
				this.query=val;
			},
			clearHistory(val){
				
				localStorage.removeItem('_search_');
				this.saveHistory([]);
				this.$refs.confrim.confrimFlag=false;
			},
			clearSearch(){
				this.$refs.confrim.confrimFlag=true;
				
			},
			changeQuerys(item){
				this.$refs.search.changQuery(item);
			},
			_getHotKey(){
				getHostKey().then(res=>{
					if(res.code==0){
						let arr=res.data.hotkey.slice(0,10)
						this.hotkey=arr;
						
					}
				})
			},
			addQuery(key){
				
				
				this.$refs.search.setQuery(key);
			},
			addHistory(query){
				this.saveHistory(query);
			},
			...mapActions({
				saveHistory:'saveHistory'
			})
		}
	}
</script>

<style lang="less" scoped>
	.search{
		.hotkey-wrap{
			width: 80%;
			margin: auto;
			color: #fff;
			font-size: 14px;
			.hot-title{
				color:@color-text-3;
				margin-bottom: 10px;
			}
			.hotkey-con-wrap{
				.hotkey-con{
				
					.hot-item{
						display: inline-block;
						background:#333;
						padding: 5px 8px;
						margin: 0 20px 10px 0;
						color: rgba(255,255,255,0.3);
						border-radius: 6px;
					}
				}
			}
		}
		.history{
			width: 80%;
			margin: auto;
			color: #fff;
			font-size: 14px;
			margin-top: 20px;
			color: rgba(255, 255, 255, 0.5);
			.title{
				display: flex;
				margin-bottom: 20px;
				justify-content: space-between;
			}
			.item-ul{
				.item{
					margin: 10px 0;
					font-size: 14px;
					
				}
			}
		}
	}
</style>
