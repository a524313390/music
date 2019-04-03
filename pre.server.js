var express= require('express');
var config=require('./config/index');
var app=express();
var axios=require('axios');
						app.get('/api/getDiscList', function(req, res) {    //
							var url = 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_get_diss_by_tag.fcg' // 原api  
							axios.get(url, {
								headers: {
									referer: 'https://c.y.qq.com/',
									host: 'c.y.qq.com'                //访问的域名
								},
								params: req.query                //req.query我打印过是url的data参数
							}).then((response) => {
			 
								res.json(response.data)            //发送一个JSON响应
			 
							}).catch((e) => {
								console.log(e)
							})
						})
						app.get('/api/getplaysongvkey', function (req, res) {
						var url = 'https://u.y.qq.com/cgi-bin/musicu.fcg'
									axios.get(url, {
										headers: {
											Origin: 'https://y.qq.com',
											Referer: 'https://y.qq.com/portal/player.html'
										},
										params: req.query
									}).then((response) => {
										
										res.json(response.data)
									}).catch((e)=>{
										console.log(e)
									})
						}),
						app.get('/api/lyric', function (req, res) {
						var url = 'https://c.y.qq.com/lyric/fcgi-bin/fcg_query_lyric_new.fcg'
						
								axios.get(url, {
									headers: {
										referer: 'https://c.y.qq.com/',
										host: 'c.y.qq.com'
									},
									params: req.query
								}).then((response) => {
									var ret = response.data
									if (typeof ret === 'string') {
										var reg = /^\w+\(({[^()]+})\)$/
										var matches = ret.match(reg)
										if (matches) {
											ret = JSON.parse(matches[1])
										}
									}
									res.json(ret)
								}).catch((e) => {
									console.log(e)
								})
						})
						
						app.get('/api/getSongList', function (req, res) {
							var url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
							axios.get(url, {
								headers: {
									referer: 'https://y.qq.com/',
									host: 'c.y.qq.com'
								},
								params: req.query
							}).then((response) => {
								var ret = response.data
								if (typeof ret === 'string') {
									// var reg = /^\w+\(({[^()]+})\)$/
									var reg = /{.*}/
									var matches = ret.match(reg)           
									if (matches) {
										ret = JSON.parse(matches[0])
									}
								}
								res.json(ret)
							}).catch((e) => {
								console.log(e)
							})
						})
						//搜索接口
						 app.get('/api/search', function(req, res) {
							  var url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp'
							  axios.get(url, {
								headers: {
								  referer: 'https://c.y.qq.com/',
								  host: 'c.y.qq.com'
								},
								params: req.query
							  }).then((response) => {
								res.json(response.data)
							  }).catch((e) => {
								console.log(e)
							  })
						 })
app.use(express.static('./dist'));
module.exports=app.listen('9000',function(error){
	if(error){
		console.log(error);
		return;
	}
	console.log('servers');
});