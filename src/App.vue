<template>
  <div id="app">
      <m-header></m-header>
      <tab></tab>
      <router-view></router-view>
  </div>
</template>

<script>
import MHeader from 'components/m-header/m-header'
import Tab from 'components/tab/tab'

import {getRecommend} from 'api/recommend'
// import {}

export default {
  name: 'App',
  created(){
    getRecommend().then(res => {
      console.log(res)
    })
  },
  components: {
    MHeader,
    Tab
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "~common/stylus/variable"

    #app
      color: $color-text
      background: $color-background-body
</style>
