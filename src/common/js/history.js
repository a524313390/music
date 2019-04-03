const SEARCH_KEY='_search_';
const SEARCH_MAX_LENGTH=15;
function insetArr(arr,val,max){
	let index=arr.findIndex((item,index)=>{
		return item==val
	})
	
	//检测数组中是否有这个数据
	if(index<0){
		arr.unshift(val);
	}
	if(arr.length>=max){
		
		arr.pop();
		
	}
	
	
	
	return arr;
}
export function history(query){
	if(typeof(Storage)!=="undefined"){	
		let searchArr=localStorage.getItem(SEARCH_KEY)
		
		if(searchArr){
			let arr=JSON.parse(searchArr);
			var data=insetArr(arr,query,SEARCH_MAX_LENGTH);
			localStorage.setItem(SEARCH_KEY,JSON.stringify(data));	
			searchArr=localStorage.getItem(SEARCH_KEY);
		}else{
				
			localStorage.setItem(SEARCH_KEY,JSON.stringify([]));
		}
		
		return JSON.parse(searchArr);
	} else {
		alert('不支持本地缓存！');
	}
	
}

export function getStroage(){
	let arr= localStorage.getItem(SEARCH_KEY);
	if(typeof arr=='string'){
		arr=JSON.parse(arr);
	};
	return arr;
}