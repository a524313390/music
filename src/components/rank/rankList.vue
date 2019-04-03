<template>
		<div class="ranks-wrap" >
			<music-list :title="hostList.topTitle" :bgImage="hostList.picUrl" :rank="iconFlag"  :songs="songs"></music-list>
		</div>
	
</template>

<script>
	import musicList from '../../base/musicList';
	import {mapGetters} from 'vuex';
	import {getTopMusicList} from '../../api/rank';
	import {createSong} from '../../common/js/song';
	import {getplaysongvkey} from '../../api/singers';
	export default{
		name:'rankList',
		data(){
			return {
				songs:[],
				iconFlag:true
				
			}
		},
		computed:{
			...mapGetters(['hostList'])
		},
		components:{
			musicList
		},
		created(){
			this._getTopMusicList();
		},
		methods:{
			_getTopMusicList(){
				if(!this.hostList.id){
					this.$router.push('/rank');
					return 
				}
				getTopMusicList(this.hostList.id).then((res)=>{
					this.songs=this._filterArray(res.songlist);
				})
			},
			_filterArray(list){
				let result=[];
				list.forEach(item=>{
					
					let musicData=item.data; 
					if(musicData.songid && musicData.albumid){
						getplaysongvkey(musicData.songmid).then(res=>{
							result.push(createSong(musicData,res))
						})
						
					}
				})
			
				return result;
			}
		}
	}
</script>

<style lang="less" scoped>
	.ranks-wrap{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: #222;
	}
</style>
