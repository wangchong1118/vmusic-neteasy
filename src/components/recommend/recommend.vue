<template>
  <div class="recommend">
    <scroll ref="scroll" class="recommend-content" :data="recommendSongList">
      <div>
        <div v-if="bannerList.length" class="slider-wrapper">
          <slider>
            <div v-for="(item, index) in bannerList" :key="index">
              <a :href="item.url">
                <img :src="item.imageUrl" :alt="item.typeTitle">
              </a>
            </div>
          </slider>
        </div>
        <div class="recommend-list">
          <h1 class="list-title">热门歌单推荐</h1>
          <ul>
            <li v-for="item in recommendSongList" :key="item.id" class="item">
              <div class="icon">
                <img @load="_loadImg" :src="item.picUrl" width="60" height="60" :alt="item.name">
              </div>
              <div class="text">
                <h2 class="name">{{item.name}}</h2>
                <p class="desc">{{item.copywriter}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </scroll>
  </div>
</template>

<script>
import { getBanner, getRecommendSongList } from "api/index";

import Scroll from "base/scroll/scroll";
import Slider from "base/slider/slider";

export default {
  name: "Recommend",
  data() {
    return {
      bannerList: [],
      recommendSongList: []
    };
  },
  created() {
    getBanner().then(res => {
      this.bannerList = res;
    });
    getRecommendSongList().then(res => {
      this.recommendSongList = res;
    });
  },
  methods: {
    _loadImg() {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh();
        this.checkLoaded = true;
      }
    }
  },
  components: {
    Slider,
    Scroll
  }
};
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.recommend {
  position: fixed;
  width: 100%;
  top: 88px;
  bottom: 0;

  .recommend-content {
    height: 100%;
    overflow: hidden;

    .slider-wrapper {
      position: relative;
      width: 100%;
      overflow: hidden;
    }

    .recommend-list {
      .list-title {
        height: 65px;
        line-height: 65px;
        text-align: center;
        font-size: $font-size-medium-x;
        color: $color-theme;
      }

      .item {
        display: flex;
        box-sizing: border-box;
        align-items: center;
        padding: 0 20px 20px 20px;

        .icon {
          flex: 0 0 60px;
          width: 60px;
          padding-right: 20px;
        }

        .text {
          display: flex;
          flex-direction: column;
          justify-content: center;
          flex: 1;
          line-height: 20px;
          overflow: hidden;
          font-size: $font-size-medium;

          .name {
            margin-bottom: 10px;
            color: $color-text;
          }

          .desc {
            color: $color-text-d;
          }
        }
      }
    }

    .loading-container {
      position: absolute;
      width: 100%;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
</style>
