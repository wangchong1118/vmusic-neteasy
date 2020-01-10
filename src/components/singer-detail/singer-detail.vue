<template>
    <transition name="slide" appear>
        <music-list :songs="songs" :title="singer.name" :bgImage="singer.avatar"></music-list>
    </transition>
</template>

<script>
    import {mapGetters} from 'vuex'
    import {getSingerInfo, getSongInfo} from 'api/index'
    import {createSong} from 'common/js/song'
    import MusicList from 'components/music-list/music-list'

    export default {
        data(){
            return {
                songs: []
            }
        },
        computed: {
            singerId(){
                return this.singer.id
            },
            ...mapGetters([
                'singer'
            ])
        },
        created(){
            if(!this.singerId){
                this.$router.push('/singer');
                return;
            };
            this._getSingerInfo()
        },
        methods: {
            _getSingerInfo(){
                getSingerInfo(this.singerId).then(res => {
                    this.songs = this._formatSongs(res.hotSongs);
                })
            },
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
        },
        watch: {
            singerId(){
                this._getSingerInfo()
            }
        },
        components: {
            MusicList
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.slide-enter-active, .slide-leave-active
    transition: all .5s
.slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
    opacity: 0.5
</style>