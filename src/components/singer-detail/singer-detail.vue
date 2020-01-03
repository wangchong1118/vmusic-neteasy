<template>
    <transition name="slide" appear>
        <div class="singer-detail">
            歌手详情
        </div>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerInfo, getSongInfo} from 'api/index'
    import {createSong} from 'common/js/song'

    export default {
        data(){
            return {
                songs: []
            }
        },
        computed: {
            ...mapGetters([
                'singer'
            ])
        },
        created(){
            if(!this.singer.id){
                this.$router.push('/singer');
                return;
            };
            getSingerInfo(this.singer.id).then(res => {
                this.songs = this._formatSongs(res.hotSongs);
                console.log(this.songs);
            })
        },
        methods: {
            _formatSongs(list){
                let res = [];
                list.forEach(item => {
                    getSongInfo(item.id).then(songInfo => {
                        let song = createSong(item, songInfo.data[0]);
                        res.push(song)
                    })
                })
                return res;
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "~common/stylus/variable"

.singer-detail
    position: fixed
    z-index: 100
    top: 0
    left: 0
    right: 0
    bottom: 0
    background: $color-background-body

.slide-enter-active, .slide-leave-active
    transition: all .5s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
    opacity: 0.5
</style>