<template>
	<transition name="silder">
		<div class="hostList">
			<music-list v-if="this.songs.length>0" :title="hostList.dissname" :bgImage="hostList.imgurl" :songs="songs"></music-list>
			
		
		</div>
	</transition>
</template>

<script>
	import musicList from '../../base/musicList';
	import {mapGetters} from 'vuex';
	import {getHostList} from '../../api/recommend';
	import {getplaysongvkey} from '../../api/singers';
	import {createSong} from '../../common/js/song';
	export default{
		name:'hostLists',
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			...mapGetters(['hostList'])
		},
		components:{
			musicList
		},
		
		methods:{
			_getHostList(){
				
				getHostList(this.hostList.dissid).then((res=>{
					if(res.code==0){
						var arr=res.cdlist[0].songlist;
						this.songs=this._filterArr(arr);
					}
				}))
			},
			_filterArr(list){
				let result=[];
				list.forEach((item)=>{
					if(item.songid && item.albumid){
						getplaysongvkey(item.songmid).then((res)=>{
							result.push(new createSong(item,res))
						})
						
					}
				})
				
				return result;
			}
		},
		created(){
			this._getHostList();
		},
		mounted(){
			if(this.hostList.length<=0){
				this.$router.push('/recommend');
				return false;
			}
			console.log(this.$route.params)
		},
	}
</script>

<style lang="less" scoped>
	.silder-enter-active, .silder-leave-active {
	  transition: all 0.3s;
	}
	.silder-enter, .silder-leave-to {
	  transform: translate3d(100%,0,0)!important;
	}
</style>
