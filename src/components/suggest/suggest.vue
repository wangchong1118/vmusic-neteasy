<template>
    <scroll class="suggest" :data="searchRes">
        <ul class="suggest-list">
            <li @click="selectItem(item)" class="suggest-item" v-for="item in searchRes" :key="item.id">
                <div class="icon">
                    <i :class="getIconCls(item)"></i>
                </div>
                <div class="name">
                    <p class="text" v-html="getItemName(item)"></p>
                </div>
            </li>
        </ul>
    </scroll>
</template>

<script>
    import {getSearchInfo} from 'api/index'
    import Scroll from 'base/scroll/scroll'
    import {mapActions, mapMutations} from 'vuex'
    import {getSingerInfo, getSongInfo, getSongDetail} from 'api/index'
    import {createSong} from 'common/js/song'
    import {createSinger} from 'common/js/singer'

    export default {
        props: {
            query: {
                type: String,
                default: ''
            },
            searchType: {
                type: Number,
                default: 1
            }
        },
        data(){
            return {
                page: 1,
                searchRes: []
            }
        },
        components: {
            Scroll
        },
        methods: {
            search(kw){
                let searchSinger = getSearchInfo(kw, this.page, 100)
                let searchSong = getSearchInfo(kw, this.page, 1)
                Promise.all([searchSinger, searchSong]).then(res => {
                    let searchSinger = searchSong = []
                    if(res[0].artists){
                        searchSinger = res[0].artists.map(item => {
                            return {
                                type: 'singer',
                                ...item
                            }
                        })
                    }
                    if(res[1].songs){
                        searchSong = res[1].songs.map(item => {
                            return {
                                type: 'song',
                                ...item
                            }
                        })
                    }
                    this.searchRes = searchSinger.concat(searchSong)
                })
            },
            getIconCls(item){
                if(item.type === 'singer'){
                    return 'icon-mine'
                }else if(item.type === 'song'){
                    return 'icon-music'
                }
            },
            getItemName(item){
                if(item.type === 'singer'){
                    return item.name
                }else if(item.type === 'song'){
                    let singers = ''
                    if(item.artists){
                        item.artists.forEach(singer => {
                            singers += ',' + singer.name
                        })
                    }
                    singers = singers.slice(1)
                    return singers + ' - ' + item.name
                }
            },
            selectItem(item){
                if(item.type === 'singer'){
                    getSingerInfo(item.id).then(res => {
                        this.$router.push({
                            path: '/singer/' + item.id
                        });
                        let currentSinger = createSinger(res.artist)
                        this.setSinger(currentSinger)
                    })
                }else if(item.type === 'song'){
                    Promise.all([getSongInfo(item.id), getSongDetail(item.id)]).then(res => {
                        let searchSong = createSong(res[1].songs[0], res[0].data[0])
                        this.selectPlay({
                            list: [searchSong],
                            index: 0
                        })
                    })
                }
            },
            ...mapActions([
                'selectPlay'
            ]),
            ...mapMutations({
                setSinger: 'SET_SINGER'
            })
        },
        watch: {
            query(newQuery){
                if(newQuery){
                    this.search(newQuery)
                }
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"

  .suggest
    height: 100%
    overflow: hidden
    .suggest-list
      padding: 24px 20px
      .suggest-item
        display: flex
        align-items: center
        padding-bottom: 24px
      .icon
        flex: 0 0 30px
        width: 30px
        [class^="icon-"]
          font-size: 14px
          color: $color-theme
      .name
        flex: 1
        font-size: $font-size-medium
        color: $color-text-ll
        overflow: hidden
        .text
          no-wrap()
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>