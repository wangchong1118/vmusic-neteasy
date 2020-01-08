import {mapGetters} from 'vuex'

export const playlistMixin = {
    computed: {
        ...mapGetters([
            'playlist'
        ])
    },
    mounted() {
        this.handlePlaylist(this.playlist)
    },
    activated() {
        this.handlePlaylist(this.playlist)
    },
    watch: {
        playlist(newPlaylist) {
            this.handlePlaylist(newPlaylist)
        }
    },
    methods: {
        handlePlaylist() {
            throw new Error('component must implement hanlePlaylist method')
        }
    }
}