<template>
	<div class="recommend">
		<div class="loadings" v-if="!recommendList.length">
			
			<loading  ></loading>
			
		</div>
		<scroll class="list-box" ref="scrolls" v-if="discList.length>0" :data="discList">
		<div>
			
			<div class="silder">
				<swiper :options="swiperOption"  v-if="recommendList.length>0" >
					<swiper-slide v-for="(slide, index) in recommendList" :key="index">
						<a :href="slide.linkUrl">
							<img class="needsclick" v-lazy="slide.picUrl" alt="" style="width: 100%;height: 160px;">
						</a>
					</swiper-slide>
					<div class="swiper-pagination" slot="pagination"></div>
				</swiper>	
			</div>
			<h2 class="title">热门歌单推荐</h2>
			
				
					<ul class="list" style="padding-bottom: 20px;">
						<li v-for="(item,inex)  in discList" @click="selectItem(item,inex)">
							<div class="icon">
								<img v-lazy="item.imgurl"  width="60" alt="">
							</div>
							<div class="text">
								<h2 class="name" v-html="item.creator.name"></h2>
								<p v-html="item.dissname"></p>
							</div>
						</li>
					</ul>
				
		</div>
		</scroll>
	
			<router-view></router-view>
		
	</div>
</template>
<script>
	import {getRecommend,getDiscList} from '../../api/recommend.js';
	import { swiper, swiperSlide } from "vue-awesome-swiper";
	import scroll from '../../base/scroll';
	import loading from '@/base/loading';
	import {mapMutations} from 'vuex';
	require("swiper/dist/css/swiper.css");

	export default{
		name:'recommend',
		data(){
			var that=this;
			return {
				recommendList:[],
				discList:[],
				// //以下配置不懂的，可以去swiper官网看api，链接http://www.swiper.com.cn/api/
				swiperOption: {
					autoplay:{
						disableOnInteraction: false,
						delay: 1000,
					},
					loop:true,
					preventLinksPropagation:false,
					pagination: {
						el: '.swiper-pagination'
					}
				},
				
			}
		},
		created(){
				this._getRecommend();
				this._getDiscList();
				
		},
		methods:{
			_getRecommend(){
				getRecommend().then((res)=>{
					if(res.code==0){
						this.recommendList=res.data.slider;
						
					}
				})
			},
			_getDiscList(){
				getDiscList().then((res)=>{
					
					if(res.code==0){
						this.discList=res.data.list;
						
					}
				})
			},
			selectItem(item,index){
			
				this.$router.push({
					path:'/recommend/'+item.dissid,
				})
				this.setHostList(item);
			},
			...mapMutations({
				setHostList:'SET_HOST_LIST'
			})
		},
		components:{
			swiper,
			swiperSlide,
			scroll,
			loading
		},
		mounted(){
			
			
		}
		
	}
</script>

<style scoped lang="less">
	.recommend{
		position: fixed;
		width: 100%;
		top: 88px;
		bottom: 0px;
		.loadings{
			position: absolute;
			top:50px;
			left: 45%;
		}
		.list-box{
			height: 100%;
			overflow: hidden;
			.silder{
				padding-top: 15px;
			}
		}
		.title{
			margin:20px 0;
			color: @color-theme;
			text-align: center;
			font-size: @font-14;
		}
		.list{
			margin: 0 20px;
			li{
				display: flex;
				font-size: @font-12;
				color: #fff;
				margin: 20px 0;
				align-items: center;
				.icon{
					margin-right: 20px;
				}
				.text{
					.name{
						margin-bottom: 15px;
						
					}
					p{
						color: @color-dialog;
					}
				}
			}
		}
		
	}
</style>
