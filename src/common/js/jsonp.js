import originJSONP from 'jsonp';
function jsopns(url,data,options){

	url+=(url.indexOf('?') <0 ? '?': '&')+param(data);
	return new Promise((resolve,reject)=>{
		originJSONP(url,options,(error,data)=>{
			if(!error){
				resolve(data)
			}else{
				reject(error)
			}
		})
	})
}

function param(data){
	let url='';
	for(let i in data){
		let value=data[i]!==undefined?data[i]:'';
		url+=`&${i}=${encodeURIComponent(value)}`
		
	}
	return url? url.substring(1):'';
}
export default jsopns;