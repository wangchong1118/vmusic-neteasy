<template>
    <scroll class="listview" :data="data" ref="listview" :listenScroll="listenScroll" :probeType="probeType" @scroll="scroll">
        <ul>
            <li v-for="group in data" :key="group.title" class="list-group" ref="listGroup">
                <h2 class="list-group-title">{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" :key="item.id" class="list-group-item">
                        <img v-lazy="item.avatar" alt="item.name" class="avatar">
                        <span class="name">{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart="onShortcutTouchstart" @touchmove.stop.prevent="onShortcutTouchmove">
            <ul>
                <li v-for="(item, index) in shortcutList" :key="index" class="item" :class="{'current': currentIndex === index}" :data-index="index">{{item}}</li>
            </ul>
        </div>
        <div class="list-fixed" v-show="fixedTitle" ref="fixed">
          <h1 class="fixed-title">{{fixedTitle}}</h1>
        </div>
        <div v-show="!data.length" class="loading-container">
          <loading></loading>
        </div>
    </scroll>
</template>

<script>
import Scroll from "base/scroll/scroll";
import Loading from "base/loading/loading";
import { getData } from "common/js/dom";

export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data(){
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    this.touch = {};
    this.listenScroll = true;
    this.listHeight = [];
    this.probeType = 3;
  },
  computed: {
    shortcutList() {
      return this.data.map(group => {
        return group.title.substr(0, 1);
      });
    },
    fixedTitle(){
      if(this.scrollY > 0){
        return '';
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
    }
  },
  watch: {
    data(){
      setTimeout(() => {
        this._calHeight()
      }, 20)
    },
    scrollY(newY){
      const listHeight = this.listHeight;
      // 1. 当滚动到顶部，newY > 0
      if(newY > 0){
        this.currentIndex = 0;
        return;
      }
      // 2. 在中间部位滚动式， newY < 0
      for(let i=0; i<listHeight.length-1; i++){
        let height1 = listHeight[i];
        let height2 = listHeight[i + 1];
        if(-newY >= height1 && -newY < height2){
          this.currentIndex = i
          this.diff = height2 + newY;
          return;
        }
      }
      // 3. 滚动到底部，且 -newY 大于最后一个元素的上限
      this.currentIndex = this.listHeight.length - 2;
    },
    diff(newDiff){
      let fixedTop = (newDiff > 0 && newDiff < 30) ? (newDiff - 30) : 0;
      if(this.fixedTop == fixedTop){
        return
      }
      this.fixedTop = fixedTop
      this.$refs.fixed.style.transform = `translate3d(0, ${fixedTop}px, 0)`;
    }
  },
  methods: {
    onShortcutTouchstart(ev) {
      let curTouchIndex = getData(ev.target, "index");
      let firstTouch = ev.touches[0];
      this.touch.y1 = firstTouch.pageY;
      this.touch.curTouchIndex = curTouchIndex;
      this.$refs.listview.scrollToElement(this.$refs.listGroup[curTouchIndex], 0);
    },
    onShortcutTouchmove(ev) {
      let firstTouch = ev.touches[0];
      this.touch.y2 = firstTouch.pageY;
      let delta = (this.touch.y2 - this.touch.y1) / 18 | 0;
      let curTouchIndex = parseInt(this.touch.curTouchIndex) + delta;
      this.$refs.listview.scrollToElement(this.$refs.listGroup[curTouchIndex], 0);
    },
    scroll(pos){
      this.scrollY = pos.y;
    },
    _calHeight(){
      this.listHeight = [];
      const listGroup = this.$refs.listGroup;
      let height = 0;
      this.listHeight.push(height);
      for(let i=0; i< listGroup.length;i++){
        let group = listGroup[i];
        height += group.clientHeight;
        this.listHeight.push(height)
      }
    }
  },
  components: {
    Scroll,
    Loading
  }
};
</script>


<style scoped lang="stylus" rel="stylesheet/stylus">
@import '~common/stylus/variable';

.listview {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background: $color-background;

    .list-group {
        padding-bottom: 30px;

        .list-group-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }

        .list-group-item {
            display: flex;
            align-items: center;
            padding: 20px 0 0 30px;

            .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
            }

            .name {
                margin-left: 20px;
                color: $color-text-l;
                font-size: $font-size-medium;
            }
        }
    }

    .list-shortcut {
        position: absolute;
        z-index: 30;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 20px;
        padding: 20px 0;
        border-radius: 10px;
        text-align: center;
        background: $color-background-d;
        font-family: Helvetica;

        .item {
            padding: 3px;
            line-height: 1;
            color: $color-text-l;
            font-size: $font-size-small;

            &.current {
                color: $color-theme;
            }
        }
    }

    .list-fixed {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;

        .fixed-title {
            height: 30px;
            line-height: 30px;
            padding-left: 20px;
            font-size: $font-size-small;
            color: $color-text-l;
            background: $color-highlight-background;
        }
    }

    .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
    }
}
</style>
