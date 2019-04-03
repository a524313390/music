<template>
	<div class="rank">
		<scroll class="rank-wrap">
			<ul class="rank-item">
				<loading class="loading" v-if="!songs.length"></loading>
				<li class="rank-li" v-for="item in songs" @click="selectRank(item)">
					<div class="rank-img">
						<img v-lazy="item.picUrl" width="100" height="100" alt="">
					</div>
					<div class="rank-con">
						<ul class="item-wrap">
							<li v-for="(list,index) in item.songList"  class="list">
								<span class="singername">{{index+1}}&nbsp;&nbsp;&nbsp;{{list.singername}}-{{list.songname}}</span>
								
							</li>
						
						</ul>
					</div>
				</li>
			</ul>
		</scroll>
		<transition name="silde">
			<router-view></router-view>
		</transition>
	</div>
</template>

<script>
	import {getTopList} from '../../api/rank';
	import scroll from "../../base/scroll";
	import loading from "../../base/loading";
	import {mapMutations} from "vuex";
	export default{
		name:'rank',
		data(){
			return {
				songs:[]
			}
		},
		created(){
			this._getTopList();
		},
		methods:{
			_getTopList(){
				getTopList().then(res=>{
					if(res.code==0){
						this.songs=res.data.topList;
					}
				})
			},
			selectRank(item){
				
				this.$router.push({
					path:'/rank/'+item.id
				})
				
				this.setTopList(item);
			},
			...mapMutations({
				setTopList:"SET_HOST_LIST"
			})
		},
		
		components:{
			scroll,
			loading
		}
	}
</script>

<style scoped lang="less">
	@import '../../common/css/minxin';
	.rank{
		.rank-wrap{
			padding: 20px;
			position: fixed;
			top: 105px;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
			.rank-item{
				.loading{
					position: absolute;
					top: 100px;
					color: #fff;
					left: 45%;
				}
				.rank-li{
					display: flex;
					align-items: center;
					background: rgba(0, 0, 0, 0.2);
					margin: 15px 0;
					overflow: hidden;
					&:first-child{
						margin-top: 0;
					}
					.rank-img{
						background: #fff;
						width: 100px;
						height: 100px;
						flex: 0 0 100px;
					}
					.rank-con{
						
						padding-left: 20px;
						color: #fff;
						font-size: @font-12;
						.list{
							margin-top: 10px;
							&:first-child{
								margin-top: 0px;
							}
							.singername{
								display: block;
								max-width:220px;
								
								.no-wrap();
								
							}
							
						}
					}
				}
			}
		}
		.silde-enter-active, .silde-leave-active {
		  transition: all 0.3s;
		}
		.silde-enter, .silde-leave-to {
		  transform: translate3d(100%,0,0)!important;
		}
	}
</style>
