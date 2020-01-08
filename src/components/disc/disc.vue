<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs"></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import { getDiscSongList, getSongInfo } from "api/index"
    import {mapGetters} from 'vuex'
    import {createSong} from 'common/js/song'

    export default {
        data(){
            return {
                songs: []
            }
        },
        computed: {
            title(){
                return this.disc.name
            },
            bgImage(){
                return this.disc.picUrl
            },
            ...mapGetters([
                'disc'
            ])
        },
        components: {
            MusicList
        },
        created() {
            if(!this.disc.id){
                this.$router.push('/recommend');
                return;
            };
            getDiscSongList(this.disc.id).then(res => {
                this.songs = this._formatSongs(res.tracks);
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
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>