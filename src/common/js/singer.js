class Singer{
	constructor(obj) {
		
	    this.id=obj.id;
		this.name=obj.name;
		this.avatar=`https://y.gtimg.cn/music/photo_new/T001R150x150M000${obj.id}.jpg?max_age=2592000`;

	}
	
}

export default Singer;