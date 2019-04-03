<template>
	<div class="singer">
		<singer-view  v-if="singerList.length>0" @selectDetail="selectDetail"  ref="singerDetail" :data="singerList"></singer-view>
		
			<router-view></router-view>
		
	</div>
</template>

<script>
	import {getSingerList} from '../../api/singers.js';
	import Singer from '../../common/js/singer.js';
	import singerView from '../../base/singerView';
	import {mapMutations} from 'vuex';
	export default{
		name:'singer',
		data(){
			return {
				singerList:[]
			}
		},
		created(){
			this._getSinger();
			
			
				
		
		},
		mounted(){
		},
		methods:{
			_getSinger(){
				getSingerList().then(res=>{
					if(res.code==0){
						this.singerList=res.data.list;
						this.singerList=this._filterSinger(res.data.list);	
					}
				})
			},
			_filterSinger(list){
				let host_num=10;
				let map={
					hot:{
						title:'热门',
						items:[]
					}
				}
			
				list.forEach((item,index)=>{
					//热门
					if(index<host_num){
						map.hot.items.push(new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name,
						}))
					}
					//分类
					const key=item.Findex;
					if(!map[key]){
						map[key]={
							title:key,
							items:[]
						}
					}
					map[key].items.push(new Singer({
							id:item.Fsinger_mid,
							name:item.Fsinger_name,
					}))	
					
				})	
				//对象转数组
				let host=[]
				let arr=[];
				for(let key in map){
					
					let val=map[key];
					if(val.title.match(/[a-zA-Z]/)){
						arr.push(val)
					}else if(map[key].title==='热门'){
						host.push(val)
					}
				}
				arr.sort((a,b)=>{
					return a.title.charCodeAt(0)-b.title.charCodeAt(0);
				})
		
				return host.concat(arr);
			},
			selectDetail(params){
				if(params.id){
					this.$router.push({
						path:`/singer/${params.id}`
					})
					this.setSinger(params);
				}
			},
			...mapMutations({
				setSinger:'SET_SINGER'
			})
			
		},
		components:{
			singerView
		}
	}
</script>

<style scoped lang="less">
	.singer{
		position: fixed;
		top:103px;
		bottom: 0;
		width: 100%;
		
	}
</style>
