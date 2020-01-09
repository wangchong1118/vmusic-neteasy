<template>
  <div class="rank" ref="rank">
    <scroll class="toplist" :data="topList" ref="topList">
      <ul>
        <li @click="selectItem(item)" class="item" v-for="item in topList" :key="item.id">
          <div class="icon">
            <img v-lazy="item.coverImgUrl" width="100" height="100" alt="item.name">
          </div>
          <ul class="songlist">
            <li class="song" v-for="(song, index) in item.tracks" :key="song.first">
              <span>{{index + 1}}.</span>
              <span>{{song.first}} - {{song.second}}</span>
            </li>
          </ul>
        </li>
      </ul>
      <div class="loading-container" v-show="!topList.length">
        <loading></loading>
      </div>
    </scroll>
    <router-view></router-view>
  </div>
</template>

<script>
  import {getRankList} from 'api/index'
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import {playlistMixin} from 'common/js/mixin'
  import {mapMutations} from 'vuex'

  export default {
    data(){
      return {
        topList: []
      }
    },
    mixins: [playlistMixin],
    created(){
      getRankList().then(res => {
        this.topList = res.filter(item => {
          return item.tracks.length > 0
        })
      })
    },
    components: {
      Scroll,
      Loading
    },
    methods: {
      handlePlaylist(playlist){
        const bottom = playlist.length ? '60px' : ''
        this.$refs.rank.style.bottom = bottom
        this.$refs.topList.refresh()
      },
      selectItem(item){
        this.$router.push({
          path: `/rank/${item.id}`
        })
        this.setTopList(item)
      },
      ...mapMutations({
        setTopList: 'SET_TOPLIST'
      })
    }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .rank
    position: fixed
    width: 100%
    top: 88px
    bottom: 0
    .toplist
      height: 100%
      overflow: hidden
      background: $color-background-body
      .item
        display: flex
        margin: 0 10px
        margin-top: 10px
        height: 100px
        background: $color-background-block
        &:last-child
          padding-bottom: 20px
        .icon
          flex: 0 0 100px
          width: 100px
          height: 100px
        .songlist
          flex: 1
          display: flex
          flex-direction: column
          justify-content: center
          padding: 0 20px
          height: 100px
          overflow: hidden
          background: $color-highlight-background
          color: $color-text-ll
          font-size: $font-size-medium
          .song
            no-wrap()
            line-height: 26px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
