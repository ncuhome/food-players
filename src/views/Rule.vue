<template>
  <div class="first_c">
    <!--规则页面-->
    <div>
      <span 
        style="position: absolute;left: 7%;top: 5%;color: #ffffff" 
        class="iconfont iconxiazai6"
        @click="tohome"
      ></span>
    </div>
    <div class="tip">
      Hi 欢迎来到美食世界
      <br>
      <p v-if="count">你是第{{code}}位玩家</p>
    </div>
    <div class="up" v-show="upflag" id="touch">
      由此上划查看规则
      <div class="up-img-box">
        <img class="up-img" src="/img/上划.png" alt="">
      </div>
    </div>
    <transition name="el-zoom-in-bottom">
      <div 
      :style="{
          height: rule.height+'%',
          width: rule.width+'%',
          position: rule.position,
          bottom: rule.bottom+'%',
          fontSize: rule.fontSize+'px',
          color: rule.color,
          borderTopRightRadius: rule.radius+'px',
          borderTopLeftRadius: rule.radius+'px',
          padding: rule.padding+'px',
          boxSizing: rule.boxSizing,
          overflow: rule.overflow,
          letterSpacing: '3px',
          fontFamily: 'FZCuYuan-M03S',
          lineHeight: '22px'
        }"
        class="rule"
        v-show="rule.flag"
      >
        <div class="rule_2">
          <p style="width: 100%;text-align: center;font-size: .38rem; margin-bottom: .2rem;">游戏介绍</p>
            我们的游戏非常简单，共有十种美食待你辨认，在每一题中你只需要选出你看到的美食的名称就好了,
            每题仅可在规定时间内选择一次，且每题答题时间会逐渐变少。游戏允许中途退出，但我们十分希望你可以玩到最后，
            因为退出后就只能查看自己参与部分的答案，
            这样可能会让你错失认识更多南大美食的机会噢。
            完整参与游戏并答对八道美食后还可获得小家园周边兑换券一份，
            那么.现在就让我们一起进入南大的美食世界吧!
          <div class="togame" id="togame">
            <span>此处上划进入游戏</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Rule',
  components: {
  },
  data () {
    return {
      rule: {
        height: 80,
        width: 100,
        bottom: 0,
        position: 'absolute',
        fontSize: 18,
        color: '#ffffff',
        radius: 30,
        padding: 70,
        boxSizing: 'border-box',
        overflow: 'hidden',
        flag: 0,
      },
      startX: 0, // 鼠标开始点击的x坐标
      startY: 0,
      // 用于控制上划图标是否显示
      upflag: 1,
      // 用于控制是否提示玩家参与序号
      count: false,
      // 玩家序号
      code: 0,
    }
  },
  methods: {
 // 给目标添加事件，处理兼容
    addHandler (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false)
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler)
      } else {
        element['on' + type] = handler
      }
    },
// 具体的滑动处理
//（此处只需要处理上滑事件，所以处理较简单，还可以进行封装，处理各种滑动事件）
    handleTouchEvent (event) {
      switch (event.type) {
        case 'touchstart':
          this.startX = event.touches[0].pageX
          this.startY = event.touches[0].pageY
          break
        case 'touchend':
          var spanX = event.changedTouches[0].pageX - this.startX
          var spanY = event.changedTouches[0].pageY - this.startY
          // console.log('spanY', spanY)
          if (spanY < -30) { // 向上
            this.rule.flag = 1
            this.upflag = 0
          }
          if (Math.abs(spanX) > Math.abs(spanY)) {
            // 认定为水平方向滑动
          } else {
            // 认定为垂直方向滑动
          }
          break
        case 'touchmove':
          // 阻止默认行为
          // event.preventDefault()
          break
      }
    },
    gamestart () {
      this.$router.push('/GamePage')
    },
    async userInit(token) {
      let temp = await axios.get('https://foodplayerbe.ncuos.com/user/', {headers:{'Authorization':token}})
      if(temp.data.data === null|| temp.data.data === undefined)
        this.count = false
      else
        this.count = true
      this.code = temp.data.data
    },
    tohome() {
      this.$router.push('/')
    }
  },
  mounted () {
    // 给被滑动对象添加事件
    let element = document.getElementById('touch')
    this.addHandler(element, 'touchstart', this.handleTouchEvent)
    this.addHandler(element, 'touchend', this.handleTouchEvent)
    this.addHandler(element, 'touchmove', this.handleTouchEvent)
    let game = document.getElementById('togame')
    this.addHandler(game, 'touchstart', this.handleTouchEvent)
    this.addHandler(game, 'touchend', this.handleTouchEvent)
    this.addHandler(game, 'touchmove', this.handleTouchEvent)
    this.addHandler(game, 'touchend', this.gamestart)
    let token = 'passport' + ' ' + localStorage.getItem('ustoken')
    this.userInit(token)
  }
}
</script>

<style lang="stylus" scoped>
  .first_c
    background: url('/img/background.png') center center no-repeat
    background-size 100% 100%
    width 100%
    height 100%
    font-size .5rem
    overflow hidden
    .tip
      width 70%
      height 3rem
      position absolute
      left 50%
      top 35%
      transform translate(-50%, -50%)
      color #ffffff
      font-size .25rem
    .up
      position absolute
      top 100%
      transform translate(0%, -100%)
      width 100%
      font-size .2rem
      color #ffffff
      text-align center
      overflow hidden
      .up-img-box
        width .8rem
        height .8rem
        margin auto
        .up-img
          width 100%
          height 100%
    .rule
      background: url('/img/规则框.png')
      background-size 100% 120%
      overflow hidden
      .rule_2
        background: url('/img/规则框-2.png')
        background-size 100% 100%
        position absolute
        top 10%
        left 2%
        width 96%
        height 100%
        box-sizing border-box
        padding 10%
        padding-top 7%
        font-size .15rem
        overflow hidden
    .togame
      width 100%
      height .5rem
      position absolute
      top 77%
      left 0
      background-color rgba(112,112,112,0.6)
      text-align center
      box-sizing border-box
      padding-top .15rem
      z-index 2
</style>
