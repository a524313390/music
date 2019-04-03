<template>
  <div id="app">
    <headers></headers>
	<tab></tab>
	<keep-alive>
		<router-view></router-view>
	</keep-alive>
	<play></play>
  </div>
</template>

<script>
	import headers from 'components/header/header';
	import tab from 'components/tab/tab';
	import play from './components/player/player';
export default {
  name: 'App',
	components:{
		headers,
		tab,
		play
	}
}
</script>

<style lang="less">
*{
	touch-action: pan-y;
}

</style>
