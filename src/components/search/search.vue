<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box @query="onQueryChange" ref="searchBox"></search-box>
    </div>
    <div class="shortcut-wrapper" v-show="!query">
      <div class="shortcut">
        <div class="hot-key">
          <h1 class="title">热门搜索</h1>
          <ul>
            <li @click="addQuery(item.first)" class="item" v-for="item in hotKey" :key="item.first">
              <span>{{item.first}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="search-result" v-show="query">
      <suggest :query="query"></suggest>
    </div>
  </div>
</template>

<script>
  import SearchBox from 'base/search-box/search-box'
  import Suggest from 'components/suggest/suggest'
  import {getSearchHotkeyList} from 'api/index'

  export default {
    data(){
      return {
        hotKey: [],
        query: ''
      }
    },
    created(){
      getSearchHotkeyList().then(res => {
        this.hotKey = res.hots
      })
    },
    methods: {
      addQuery(query){
        this.$refs.searchBox.setQuery(query)
      },
      onQueryChange(query){
        this.query = query
      }
    },
    components: {
      SearchBox,
      Suggest
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .search
    overflow: hidden
    .search-box-wrapper
      margin: 20px
    .shortcut-wrapper
      position: fixed
      top: 194px
      bottom: 0
      width: 100%
      .shortcut
        height: 100%
        overflow: hidden
        .hot-key
          margin: 0 20px 20px 20px
          .title
            margin-bottom: 24px
            font-size: $font-size-medium-x
            color: $color-text
          .item
            display: inline-block
            padding: 10px 14px
            margin: 0 10px 10px 0
            border-radius: 5px
            background: $color-background-body
            font-size: $font-size-medium
            color: $color-text-ll
        .search-history
          position: relative
          margin: 0 20px
          .title
            display: flex
            align-items: center
            height: 40px
            font-size: $font-size-medium
            color: $color-text-l
            .text
              flex: 1
            .clear
              extend-click()
              .icon-clear
                font-size: $font-size-medium
                color: $color-text-d
    .search-result
      position: fixed
      width: 100%
      top: 168px
      bottom: 0
</style>
