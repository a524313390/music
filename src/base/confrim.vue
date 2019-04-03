<template>
	 <transition name="fade">
	<div class="confrim" v-if="confrimFlag" @click="hide">
			<div class="con" ref='con'>
				<div class="title">
					{{title}}
				</div>
				<div class="bottom">
					<div class="left" @click.stop="left">确定</div>
					<div class="right"  @click="hide">取消</div>
				</div>
			</div>
	</div>
	</transition>
</template>

<script>
	export default{
		name:'confrim',
		data(){
			return {
				confrimFlag:false
			}
		},
		props:{
			title:{
				type:String,
				default:'是否删除?'
			}
		},
		methods:{
			hide(){
				this.confrimFlag=false;
			},
			left(){

				this.$emit('hidenConfrim',true);
			},
		},
		
	}
</script>

<style lang="less" scoped>
	.confrim{
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.7);
		color: rgba(255, 255, 255, 255);
		display: flex;
		align-items: center;
		justify-content: space-around;
		.con{
			width: 70%;
			height: 150px;
			border: 1px solid rgba(255, 255, 255, 0.3);
			
			.title{
				text-align: center;
				margin-top: 30px;
				color: rgba(255, 255, 255, 0.9);
			}
			.bottom{
				display: flex;
				margin: 50px 30px;
				justify-content: space-between;
				.left,.right{
					flex:0 0 80px;
					height: 30px;
					line-height: 30px;
					text-align: center;
					background: rgba(0, 0, 0, 0.9);
					border: 1px solid rgba(255, 255, 255, 0.3);
				}
			}
		}

		.con{
			animation: confrim-zoom 0.4s;
		}
	}
	@keyframes confrim-zoom{
		0%{
			transform: scale(0);
		}
		50%{
			transform: scale(1.1);
		}
		100%{
			transform: scale(1);
		}
	}
	.fade-enter-active, .fade-leave-active {
			transition: opacity 0.5s;
	}
	.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
		  opacity: 0;
	}
	
</style>
