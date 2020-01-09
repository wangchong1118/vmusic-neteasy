<template>
    <transition name="slide">
        <music-list :title="title" :bgImage="bgImage" :songs="songs" :rank='rank'></music-list>
    </transition>
</template>

<script>
    import MusicList from 'components/music-list/music-list'
    import {mapGetters} from 'vuex'
    import {getDiscSongList, getSongInfo} from 'api/index'
    import {createSong} from 'common/js/song'

    export default {
        data(){
            return {
                songs: [],
                rank: true
            }
        },
        computed: {
            title(){
                return this.toplist.name
            },
            bgImage(){
                if(this.songs.length){
                    return this.songs[0].image
                }
                return ''
            },
            ...mapGetters([
                'toplist'
            ])
        },
        created(){
            if(!this.toplist.id){
                this.$router.push('/rank');
                return;
            };
            getDiscSongList(this.toplist.id).then(res => {
                this.songs = this._formatSongs(res.tracks)
            }) 
        },
        components: {
            MusicList
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
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>