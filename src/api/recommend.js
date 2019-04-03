import jsonp from '../common/js/jsonp.js';
import {commonParam,options} from './config.js';
import axios from 'axios';
 function getRecommend(){

	const url='https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
	let obj={
		platform: 'h5',
		needNewCode: 1,
		uin: 0
		
	}
	const data=Object.assign({},commonParam,obj);
	return jsonp(url,data,options)
}
function getDiscList(){
	const url='/api/getDiscList';
	let obj={
		platform: 'yqq',
		hostUin: 0,
		sin: 0,
		ein:29,
		sortId:5,
		needNewCode:0,
		categoryId:10000000, 
		rnd:Math.random(),
		format:'json'
		
	}
	const data=Object.assign({},commonParam,obj);
	return axios.get(url,{
		params:data
	}).then(res=>{
		return Promise.resolve(res.data)
	})
}

function getHostList(disstid) {
  const url = '/api/getSongList'
  const data = Object.assign({}, commonParam, {
    disstid,
    type: 1,
    json: 1,
    utf8: 1,
    onlysong: 0,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    g_tk: 67232076
  })
  return axios.get(url, {
    params: data
  }).then(res => {
    return Promise.resolve(res.data)
  })
}


export{getRecommend,getDiscList,getHostList};