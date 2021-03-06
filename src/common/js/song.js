import  {getLyric} from '../../api/song';
import {Base64} from 'js-base64';
import {getplaysongvkey} from '../../api/singers';
export default class Song{
	constructor({id,mid,singer,name,album,duration,image,url}) {
	    this.id=id;
		this.mid=mid;
		this.singer=singer;
		this.name=name;
		this.album=album;
		this.duration=duration;
		this.image=image;
		this.url=url;
		
	}
		getLyric() {
			if(this.lyric){
				return Promise().resolve(this.lyric);
			}
			return new Promise((resolve,reject)=>{
				getLyric(this.mid).then((res) => {
				  if (res.retcode === 0) {
						this.lyric = Base64.decode(res.lyric)
						resolve(this.lyric)
				  } else{
					  reject('not lyric');
				  }
				})
			})
			
		}
		songVkey(mid){
			
		
			return new Promise((resolve,reject)=>{
				getplaysongvkey(mid).then(res=>{
					resolve(res);
				})
			})
		}
}



export function createSong(musicData, songVkey) {


  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: 'http://dl.stream.qqmusic.qq.com/'+songVkey
  })
}

function filterSinger(singer){
	let result=[];
	if(!singer){
		return ''
	}
	singer.forEach(item=>{
		result.push(item.name)
	})

	return result.join('/');
}