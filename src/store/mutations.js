import * as types from './types';
const mutations={
	[types.SET_SINGER](state,params){
		
		state.singer=params;
	},
	[types.SET_PLAYING_STATE](state,params){
		
		state.playing=params;
	},
	[types.SET_PLAY_LIST](state,params){
		
		state.playList=params;
	},
	[types.SET_FULL_SCREEN](state,params){
		
		state.fullScreen=params;
	},
	[types.SET_SUQENECE_LIST](state,params){
		
		state.sequenceList=params;
	},
	[types.SET_PLAT_MODE](state,params){
		
		state.modelIndex=params;
	},
	[types.SET_CURRENT_INDEX](state,params){
		
		state.currentIndex=params;
	},
	[types.SET_PLAY_MODEL](state,params){
	
		state.modelIndex=params;
	},
	[types.SET_HOST_LIST](state,params){
		state.hostList=params;
	},
	[types.SET_SEARCH_HISTORY](state,params){
		state.searchHistory=params;
	}
} 
export default mutations;