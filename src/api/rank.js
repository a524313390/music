import jsonp from '../common/js/jsonp.js';
import {commonParam, options} from './config'
 function getTopList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'

  const data = Object.assign({}, commonParam, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, options)
}
function getTopMusicList(topid){
	
	const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_topList_cp.fcg';
	const data = Object.assign({}, commonParam, {
		topid,
	  page:'detail',
		type:'top',
		tpl:3,
		platform:'h5',
		needNewCode:1
	})
	return jsonp(url, data, options)
}
export {getTopList,getTopMusicList};