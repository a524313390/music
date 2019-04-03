import jsonp from '../common/js/jsonp.js';
import {commonParam,options} from './config.js';
import axios from 'axios';
function getSingerList(){
	const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'

	  const data = Object.assign({}, commonParam, {
		channel: 'singer',
		page: 'list',
		key: 'all_all_all',
		pagesize: 100,
		pagenum: 1,
		hostUin: 0,
		needNewCode: 0,
		platform: 'yqq'
	  })

	  return jsonp(url, data, options)
}
function getDetailList(singerId){
		const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
		let obj={
			hostUin: 0,
			needNewCode: 0,
			platform: 'yqq',
			order: 'listen',
			begin: 0,
			num: 80,
			songstatus: 1,
			singermid: singerId
		}
		const data=Object.assign({},commonParam,obj);
		
		return jsonp(url, data, options)
}
function getplaysongvkey(songmid) {
  const url = '/api/getplaysongvkey'
  const data = Object.assign({}, commonParam, {
		g_tk: 5381,
		loginUin: 0,
		hostUin: 0,
		format: 'json',
		inCharset: 'utf8',
		outCharset: 'utf-8',
		notice: 0,
		platform:' yqq.json',
		needNewCode: 0,
		data: {"req":{"module":"CDN.SrfCdnDispatchServer","method":"GetCdnDispatch","param":{"guid":"3309754632","calltype":0,"userip":""}},"req_0":{"module":"vkey.GetVkeyServer","method":"CgiGetVkey","param":{"guid":"3309754632","songmid":[""+songmid+""],"songtype":[0],"uin":"0","loginflag":1,"platform":"20"}},"comm":{"uin":0,"format":"json","ct":24,"cv":0}}
  })
 return axios.get(url, {
    params: data
  }).then((res) => {
   return Promise.resolve(res.data.req_0.data.midurlinfo[0].purl)
  })
}
export {getSingerList,getDetailList,getplaysongvkey}