<template>
  <div class="singer" ref="singer">
    <list-view @select="selectSinger" :data="singerList" ref="list"></list-view>
    <router-view></router-view>
  </div>
</template>

<script>
import { getSingerList } from "api/index";
import { getFirstLetter } from "common/js/util";
import {playlistMixin} from 'common/js/mixin'
import ListView from "base/listview/listview";
import {mapMutations} from 'vuex';

export default {
  name: "Singer",
  data() {
    return {
      singerList: []
    };
  },
  mixins: [playlistMixin],
  created() {
    getSingerList().then(res => {
      this.singerList = this._addFirstLetter(res.artists);
      this.singerList = this._formatSingerList(this.singerList);
    });
  },
  components: {
    ListView
  },
  methods: {
    handlePlaylist(playlist){
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.singer.style.bottom = bottom
      this.$refs.list.refresh()
    },
    selectSinger(singer){
      this.$router.push({
        path: '/singer/' + singer.id
      });
      this.setSinger(singer);
    },
    _addFirstLetter(list) {
      return list.map(item => {
        return {
          ...item,
          firstLetter: getFirstLetter(item.name)
        };
      });
    },
    _formatSingerList(list) {
      let map = {
        hot: {
          title: "热门",
          items: []
        }
      };
      list.forEach((item, index) => {
        if (index < 20) {
          map.hot.items.push({
            id: item.id,
            name: item.name,
            avatar: item.picUrl
          });
        }
        if (!map[item.firstLetter]) {
          map[item.firstLetter] = {
            title: item.firstLetter,
            items: []
          };
        }
        map[item.firstLetter].items.push({
          id: item.id,
          name: item.name,
          avatar: item.picUrl
        });
      });

      let res = [];
      let hot = [];
      for (let key in map) {
        let val = map[key];
        if (val.title.match(/[a-zA-Z]/)) {
          res.push(val);
        } else if (val.title == "热门") {
          hot.push(val);
        }
      }

      res.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0);
      });
      return hot.concat(res);
    },
    ...mapMutations({
      setSinger: 'SET_SINGER'
    })
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
.singer
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
</style>
