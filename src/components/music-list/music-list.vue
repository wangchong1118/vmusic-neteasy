<template>
    <div class="music-list">
        <div @click="back" class="back">
            <i class="icon-back"></i>
        </div>
        <h1 class="title" v-html="title"></h1>
        <div class="bg-image" :style="bgStyle" ref="bgImage">
            <div class="play-wrapper">
                <div class="play" v-show="songs.length>0" ref="playBtn" @click="random">
                  <i class="icon-play"></i>
                  <span class="text">随机播放全部歌曲</span>
                </div>
            </div>
            <div class="filter"></div>
        </div>
        <div class="bg-layer" ref="layer"></div>
        <scroll @scroll="scroll" :data="songs" :probe-tyupe="probeType" :listen-scroll="listenScroll" class="list" ref="list">
            <div class="song-list-wrapper">
                <song-list :songs="songs" @select="selectItem" :rank="rank"></song-list>
            </div>
            <div class="loading-container" v-show="!songs">
                <loading></loading>
            </div>
        </scroll>
    </div>
</template>

<script>
    import Scroll from 'base/scroll/scroll'
    import SongList from 'base/song-list/song-list'
    import Loading from 'base/loading/loading'
    import {playlistMixin} from 'common/js/mixin'
    import {prefixStyle} from 'common/js/dom'
    import {mapActions} from 'vuex'
    
    const transform = prefixStyle('transform')

    export default {
        props: {
            rank: {
              type: Boolean,
              default: false
            },
            bgImage: {
                type: String,
                default: ''
            },
            songs: {
                type: Array,
                default: []
            },
            title: {
                type: String,
                default: ''
            }
        },
        data(){
          return {
            scrollY: 0
          }
        },
        mixins: [playlistMixin],
        computed: {
            bgStyle(){
                return `background-image: url(${this.bgImage});`;
            }
        },
        watch: {
          scrollY(newY){
            let translateY = Math.max(this.minTranslateY, newY);
            let zIndex = 0;
            let scale = 1;
            this.$refs.layer.style[transform] = `translate3d(0, ${translateY}px, 0)`;
            
            const percent = Math.abs(newY / this.imageHeight);
            if(newY > 0){
              scale = 1 + percent;
              zIndex = 10;
            }
            if(newY < this.minTranslateY){
              zIndex = 10;
              this.$refs.bgImage.style.paddingTop = 0;
              this.$refs.bgImage.style.height = '40px';
              this.$refs.playBtn.style.display = 'none';
            }else{
              this.$refs.bgImage.style.paddingTop = '70%';
              this.$refs.bgImage.style.height = 0;
              this.$refs.playBtn.style.display = '';
            }
            this.$refs.bgImage.style.zIndex = zIndex;
            this.$refs.bgImage.style[transform] = `scale(${scale})`;
          }
        },
        created(){
          this.probeType = 3;
          this.listenScroll = true;
        },
        mounted(){
            this.imageHeight = this.$refs.bgImage.clientHeight;
            this.minTranslateY = -this.imageHeight + 40;
            this.$refs.list.$el.style.top = this.$refs.bgImage.clientHeight + 'px';
        },
        components: {
            Scroll,
            SongList,
            Loading
        },
        methods: {
          handlePlaylist(playlist){
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.list.$el.style.bottom = bottom
            this.$refs.list.refresh()
          },
          scroll(pos){
            this.scrollY = pos.y
          },
          back(){
            this.$router.back();
          },
          selectItem(item, index){
            this.selectPlay({
              list: this.songs,
              index
            })
          },
          random(){
            this.randomPlay({list: this.songs})
          },
          ...mapActions([
            'selectPlay',
            'randomPlay'
          ])
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .music-list
    position: fixed
    z-index: 100
    top: 0
    left: 0
    bottom: 0
    right: 0
    background: $color-background-body
    .back
      position absolute
      top: 0
      left: 6px
      z-index: 50
      .icon-back
        display: block
        padding: 10px
        font-size: $font-size-large-x
        color: $color-theme
    .title
      position: absolute
      top: 0
      left: 10%
      z-index: 40
      width: 80%
      no-wrap()
      text-align: center
      height: 40px
      line-height: 44px
      font-size: $font-size-large
      color: $color-white
    .bg-image
      position: relative
      width: 100%
      height: 0
      padding-top: 70%
      transform-origin: top
      background-size: cover
      .play-wrapper
        position: absolute
        bottom: 32px
        z-index: 50
        width: 100%
        .play
          box-sizing: border-box
          width: 164px
          padding: 10px 0
          margin: 0 auto
          text-align: center
          color: $color-theme
          border-radius: 100px
          font-size: 0
          background: $color-highlight-background
          .icon-play
            display: inline-block
            vertical-align: middle
            margin-right: 6px
            font-size: $font-size-large
          .text
            display: inline-block
            vertical-align: middle
            font-size: $font-size-medium
      .filter
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background: $color-text-d
    .bg-layer
      position: relative
      height: 100%
      background: $color-background-block
    .list
      position: fixed
      top: 0
      bottom: 0
      width: 100%
      background: $color-background-block
      .song-list-wrapper
        padding: 20px 30px
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>