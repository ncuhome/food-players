<template>
  <div class="first_c">
    <!--游戏页面-->
    <div class="head">
      <span class="help">
        <el-button @click="help()" type="warning" size="mini" round>
          帮助
        </el-button>
      </span>
      <span class="time-limit"></span>
    </div>
    <div class="game">
      <img style="width: 100%" src="/img/娃娃机.png" alt="">
      <div class="gameprin" ref="prin">
        <div class="nullA">
        </div>
        <img 
          class="pawimgA" 
          src="/img/pickA.png"
          ref="pawA"
        >
        <div class="nullB">
        </div>
        <img 
          class="pawimgB" 
          src="/img/pickB.png"
          ref="pawB"
        >
        <div class="nullC">
        </div>
        <img 
          class="pawimgC" 
          src="/img/pickC.png"
          ref="pawC"
        >
        <div class="game-item">
          <span>
            <img class="foodA" src="/img/test.png" alt="">
          </span>
          <span>
            <img class="foodB" src="/img/test.png" alt="">
          </span>
          <span>
            <img class="foodC" src="/img/test.png" alt="">
          </span>
        </div>
      </div>
      <div class="choice">
        <span class="choice-item-box">
          <el-button class="choice-item" @click="pick('1')">A</el-button>
        </span>
        <span class="choice-item-box">
          <el-button class="choice-item" @click="pick('2')">B</el-button>
        </span>
        <span class="choice-item-box">
          <el-button class="choice-item" @click="pick('3')">C</el-button>
        </span>
      </div>
      <div>
        <span></span>
        <span>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import anime from 'animejs'
import axios from 'axios'

export default {
  name: 'GamePage',
  components: {
  },
  data () {
    return {
      // 爪子的位置
      paw_a: 0,
      paw_b: 0,
      paw_c: 0,
      choice_item: 0,
    }
  },
  methods: {
    pick(type) {
      let that = this;
      console.log(that)
      let choice = type
      var long = this.$refs.prin.getBoundingClientRect().height - 160; //爪子伸长的距离
      console.log(long)
      switch (type) {
        case '1': {
          anime({
            targets:'.nullA',
            height: long,
            duration: 1000,
            easing: 'easeInOutExpo',
            direction: 'alternate',
          })
          anime({
            targets:'.pawimgA',
            translateY: long,
            duration: 1000,
            easing: 'easeInOutExpo',
            direction: 'alternate',
          })
          anime({
            targets:'.foodA',
            translateY: -long,
            delay: 1000,
            easing: 'easeInOutExpo',
          })
          break
        }
        case '2': {
          anime({
            targets:'.nullB',
            height: long,
            duration: 1000,
            easing: 'easeInOutExpo',
            direction: 'alternate',
          })
          anime({
            targets:'.pawimgB',
            translateY: long,
            duration: 1000,
            easing: 'easeInOutExpo',
            direction: 'alternate',
          })
          anime({
            targets:'.foodB',
            translateY: -long,
            delay: 1000,
            easing: 'easeInOutExpo',
          })
          break
        }
        case '3': {
          anime({
            targets:'.nullC',
            height: long,
            duration: 1000,
            easing: 'easeInOutExpo',
            direction: 'alternate',
          })
          anime({
            targets:'.pawimgC',
            translateY: long,
            duration: 1000,
            easing: 'easeInOutExpo',
            direction: 'alternate',
          })
          anime({
            targets:'.foodC',
            translateY: -long,
            delay: 1000,
            easing: 'easeInOutExpo',
          })
          break
        }
        default: break
      }
    },
    help() {
      this.$confirm('是否离开游戏?', '提示', {
          confirmButtonText: '狠心离开',
          cancelButtonText: '继续游戏',
          type: 'warning',
        }).then(() => {
            this.$router.push('/Rule')
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已回到游戏'
          });          
        });
    }
  },
  mounted() {
    // 首先获取爪子的位置(这里是固定的)
    this.paw_a = this.$refs.pawA.getBoundingClientRect().top
    this.paw_b = this.$refs.pawB.getBoundingClientRect().top
    this.paw_c = this.$refs.pawC.getBoundingClientRect().top
    console.log(this.paw_a)
    console.log(this.paw_b)
    console.log(this.paw_c)
    console.log('题目信息：')
    // 获取题目
    let token = 'passport' + ' ' + localStorage.getItem('token')
    let temp = axios.get('http://47.115.56.165/user/questions', {headers:{'Authorization':token}})
    console.log(temp)
  },
}
</script>

<style lang="stylus" scoped>
  .first_c
    background-color #EA5E1F
    background-size 100% 100%
    width 100%
    height 100%
    font-size .5rem
    .head
      width 100%
      .help
        width 1.38rem
        display inline-block
        text-align center
        position absolute
        .helpitems
          width 1.38rem
          height 1.11rem
          background-color #E6A23C
          position absolute
          top 100%
          z-index 2
          .helpitem
            width 1.38rem
            height .37rem
            border-style solid
            border-color #D4D6D7
            border-width  1px
            text-align center
            font-size .15rem
            color #ffffff
            padding-top .1rem
            box-sizing border-box
    .game
      width 100%
      height 5.45rem
      bottom 0%
      position absolute
      overflow hidden
      .gameprin
        width 3rem
        height 2.5rem
        position absolute
        left 50%
        top 4%
        transform translate(-50%,0)
        .nullA
          width .05rem
          height 0
          position absolute
          background-color #707070
          left 20%
          transform translate(-50%,0)
        .nullB
          width .05rem
          height 0
          position absolute
          background-color #707070
          left 50%
          transform translate(-50%,0)
        .nullC
          width .05rem
          height 0
          position absolute
          background-color #707070
          left 80%
          transform translate(-50%,0)
        .gamepaw
          width .41rem
          height .56rem
        .pawimgA
          left 13%
          position absolute
          width .41rem
          height .56rem
        .pawimgB
          left 43%
          position absolute
          width .41rem
          height .56rem
        .pawimgC
          left 73%
          position absolute
          width .41rem
          height .56rem
        .game-item
          width 100%
          height 1.16rem
          position absolute
          bottom 0
          .foodA
            width .55rem
            height 100%
            position absolute
            left 10.5%
          .foodB
            width .55rem
            height 100%
            position absolute
            left 40.5%
          .foodC
            width .55rem
            height 100%
            position absolute
            left 70.5%
      .choice
        width 100%
        position absolute
        bottom 35%
        padding-left 14%
        padding-right 14%
        box-sizing border-box
        .choice-item-box
          width 33%
          display inline-block
          text-align center
          .choice-item
            margin auto
            display inline-block
</style>
