import Recommend from 'components/recommend/recommend';
import Singer from 'components/singer/singer';
import Search from 'components/search/search';
import Rank from 'components/rank/rank';
import singerDetail from 'components/singerDetail/singerDetail';
import HostList from 'components/recommend/hostList';
import RankList from 'components/rank/rankList';
const routes=[
	{
		path:'/',
		redirect:'/recommend'
		
	},
	{
		path:'/singer',
		component:Singer,
		name:'singer',
		children:[
			{
				path:':id',
				component:singerDetail
			}
		]
	},
	{
		path:'/search',
		component:Search,
		name:'search'
	},
	{
		path:'/rank',
		component:Rank,
		name:'rank',
		children:[
			{
				path:':id',
				component:RankList
			}
		]
	},
	{
		path:'/recommend',
		component:Recommend,
		name:'recommend',
		children:[
			{
				path:':id',
				component:HostList
			}
		]
	},
]

export default routes;