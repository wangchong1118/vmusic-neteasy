<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd">
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import {prefixStyle} from 'common/js/dom'

    const transform = prefixStyle('transform')

    export default {
        props: {
            percent: {
                type: Number,
                default: 0
            }
        },
        watch: {
            percent(newPercent){
                if(newPercent >= 0 && !this.touch.initiated){
                    const barWidth = this.$refs.progressBar.clientWidth - 16
                    const offsetWidth = newPercent * 1000 * barWidth
                    this.$refs.progress.style.width = `${offsetWidth}px`
                    this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
                }
            }
        },
        created(){
            this.touch = {}
        },
        methods: {
            progressTouchStart(e){
                this.touch.initiated = true
                this.touch.startX = e.touches[0].pageX
                this.touch.left = this.$refs.progress.clientWidth
            },
            progressTouchMove(e){
                if(!this.touch.initiated){
                    return
                }
                const deltaX = e.touches[0].pageX - this.touch.startX
                const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - 16, Math.max(0, this.touch.left + deltaX))
                this.$refs.progress.style.width = `${offsetWidth}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px, 0, 0)`
            },
            progressTouchEnd(){
                this.touch.initiated = false
                this._triggerPercent()
            },
            progressClick(e){
                this.$refs.progress.style.width = `${e.offsetX}px`
                this.$refs.progressBtn.style[transform] = `translate3d(${e.offsetX}px, 0, 0)`
                this._triggerPercent()
            },
            _triggerPercent(){
                const barWidth = this.$refs.progressBar.clientWidth - 16
                const percent = this.$refs.progress.clientWidth / barWidth
                this.$emit('percentChange', percent)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-bar
    height: 30px
    .bar-inner
      position: relative
      top: 13px
      height: 4px
      background: $color-dialog-background
      .progress
        position: absolute
        height: 100%
        background: $color-theme
      .progress-btn-wrapper
        position: absolute
        left: -8px
        top: -13px
        width: 30px
        height: 30px
        .progress-btn
          position: relative
          top: 7px
          left: 7px
          box-sizing: border-box
          width: 16px
          height: 16px
          border: 3px solid $color-white
          border-radius: 50%
          background: $color-theme
</style>