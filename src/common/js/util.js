function random(min,max){
	return Math.floor(Math.random() *(max-min+1)+min);
}
function filterArray(arr){
	let _arr=arr.slice();
	for(let i= 0;i <_arr.length;i++){
		let j=random(0,i);
		let tem=_arr[i];
		_arr[i]=_arr[j];
		_arr[j]=tem;
		
	}
	return _arr;
}

export {filterArray};