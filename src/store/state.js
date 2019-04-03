import playMode from '../common/js/config';
import {getStroage} from '../common/js/history';



let state={
	singer:{},
	playing:false,
	fullScreen:false,
	playList:[],
	sequenceList:[],
	modelIndex:playMode.sequenec,
	currentIndex:-1,
	hostList:[],
	searchHistory:getStroage(),
}
export default state;