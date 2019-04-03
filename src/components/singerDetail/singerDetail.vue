<template>
	<transition name="silder">
		<div class="detail">
			
			<music-list :title="singer.name" :bgImage="singer.avatar" :songs="songs"></music-list>
		</div>
	</transition>
</template>

<script>

	import {mapGetters} from 'vuex';
	import {createSong} from '../../common/js/song';
	import {getDetailList,getplaysongvkey} from '../../api/singers';
	import musicList from '../../base/musicList';
	export default{
		name:'singerDetail',
		data(){
			return {
				songs:[]
			}
		},
		computed:{
			...mapGetters(['singer'])
		},
		created(){
			this._getDetail();
		},
		mounted(){
			
		},
		methods:{
			_filterSongs(list){
				let result=[];
				 let index = 1
				list.forEach(item=>{
					
					let {musicData}=item;

					if(musicData.songid && musicData.albumid){
						
						getplaysongvkey(musicData.songmid).then((res)=>{
							result.push(new createSong(musicData,res))
						})
					
					}
				})
				
				return result;
			},
			_getDetail(){
				if(!this.singer.id){
					this.$router.push('/singer');
					return false;
				}
				getDetailList(this.singer.id).then(res=>{
				
					if(res.code==0){
				
							this.songs=this._filterSongs(res.data.list);
					
						
						
					}
				})
			}
		},
		components:{
			musicList
			
		}
	}
</script>

<style lang="less"  scoped>
	.silder-enter-active,.silder-leave-active{
		transition: all 0.3s;
	}
	.silder-enter,.silder-leave-to{
		transform: translate3d(100%,0,0);
	}
	.detail{
		
	}
	
</style>
