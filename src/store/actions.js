import * as types from './types';
import playMode from '../common/js/config';
import {filterArray} from '../common/js/util';
import {history} from '../common/js/history';
function finedsIndex(list,songs){
	return list.findIndex((item,index)=>{
		return item.id==songs.id;
	})
}
export const selectPlay=function({commit,state},{list,index}){
	
	commit(types.SET_SUQENECE_LIST,list)
	if(state.modelIndex===playMode.random){
		let randomList=filterArray(list)
		commit(types.SET_PLAY_LIST,randomList);
		index=finedsIndex(randomList,list[index]);
	}else{
		commit(types.SET_PLAY_LIST,list)
	}
	commit(types.SET_CURRENT_INDEX,index);
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)

	
}
export const randomPlay=function({commit,state},{list}){
	let randomList=filterArray(list)
	commit(types.SET_SUQENECE_LIST,list)
	commit(types.SET_PLAY_LIST,randomList)
	commit(types.SET_FULL_SCREEN,true)
	commit(types.SET_PLAYING_STATE,true)
	commit(types.SET_CURRENT_INDEX,0);
	commit(types.SET_PLAY_MODEL,playMode.random);
}
export const saveHistory=function({commit},params){
	
	commit(types.SET_SEARCH_HISTORY,history(params));
}