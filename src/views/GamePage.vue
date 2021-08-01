<template>
  <div class="first_c">
    <!--游戏页面-->
    <div class="head">
      <span class="help">
        <el-button @click="help()" type="warning" size="mini" round>
          离开
        </el-button>
      </span>
      <span class="time-limit iconfont icondaojishi">
        <div style="font-size: .16rem;height: 100%;">
          还剩
          <span style="font-size: .2rem">{{limitTime}}</span>
          秒
        </div>
      </span>
      <span 
        @click="musicPause" 
        style="
          width: 20%;
          display: inline-block;
          color: #F4EA2A;
          font-size: .25rem" 
        class="iconfont iconyinle"
      >
        <audio src="/music/小手鞠.mp3" loop autoplay ref="musicPlay"></audio>
      </span>
    </div>
    <div 
      style="
        width: 100%;
        height: 5.55rem;
        background: url('/img/大背景.png') center center no-repeat;
        background-size: 109% 100%;
        bottom: 0%;
        position: absolute;
      "
    >
      <div class="game">
        <div id = "content"></div>
        <div class="gameprin" ref="prin">
          <div class="paw-content">
            <div class="nullA">
            </div>
            <img 
              class="pawimgA" 
              src="/img/paw.png"
              ref="pawA"
            >
          </div>
          <div class="paw-content">
            <div class="nullB">
            </div>
            <img 
              class="pawimgB" 
              src="/img/paw.png"
              ref="pawB"
            >
          </div>
          <div class="paw-content">
            <div class="nullC">
            </div>
            <img 
              class="pawimgC" 
              src="/img/paw.png"
              ref="pawC"
          >
          </div>
          <div class="game-item">
            <div class="foodA" ref="A">
              <img style="width: 80%" src="/img/碟子.png" :alt="problem[0]">
              <div 
                style="position: absolute;
                  top: 50%;
                  transform: translate(5%,-50%);
                  word-wrap: break-word;
                  padding: 10px;
                  display: block;
                  margin: 0 auto;
                  color: #EA5E1F"
              >{{problem[0]}}</div>
            </div>
            <div class="foodB" ref="B">
              <img style="width: 80%" src="/img/碟子.png" :alt="problem[1]">
              <div 
                style="position: absolute;
                  top: 50%;
                  transform: translate(8%,-50%);
                  word-wrap: break-word;
                  padding: 10px;
                  color: #EA5E1F"
              >{{problem[1]}}</div>
            </div>
            <div class="foodC" ref="C">
              <img style="width: 80%" src="/img/碟子.png" :alt="problem[2]">
              <div 
                style="position: absolute;
                  top: 50%;
                  transform: translate(11%,-50%);
                  word-wrap: break-word;
                  padding: 10px;
                  color: #EA5E1F"
              >{{problem[2]}}</div>
            </div>
          </div>
        </div>
        <div class="choice">
          <span class="choice-item-box">
            <img src="/img/stick.png" class="choice-item" @click="pick('1')" v-show="choiceClose">
            <!--点击后的拉杆-->
            <img src="/img/stickA.png" class="choice-item" v-show="!choiceClose && !choiceCloseA">
            <!--其他拉杆点击后的拉杆-->
            <img src="/img/stickB.png" class="choice-item" v-show="choiceCloseA">
          </span>
          <span class="choice-item-box">
            <img src="/img/stick.png" class="choice-item" @click="pick('2')" v-show="choiceClose">
            <img src="/img/stickA.png" class="choice-item" v-show="!choiceClose && !choiceCloseB">
            <img src="/img/stickB.png" class="choice-item" v-show="choiceCloseB">
          </span>
          <span class="choice-item-box">
            <img src="/img/stick.png" class="choice-item" @click="pick('3')" v-show="choiceClose">
            <img src="/img/stickA.png" class="choice-item" v-show="!choiceClose && !choiceCloseC">
            <img src="/img/stickB.png" class="choice-item" v-show="choiceCloseC">
          </span>
        </div>
        <div class="problem-c" :style="{fontSize: '.16rem',color: '#fff'}">
          <span class="pro-text" 
            style="
              vertical-align: middle; 
              background: url('/img/题目框.png') center center; 
              background-size: 80% 80%;
              background-repeat: no-repeat"
          >
            <img style="max-height: 80%;max-width: 80%;display: inline-block" :src="imgUrl" alt="">
          </span>
          <span class="pro-text">
            <el-button class="toEnd" @click="next" :disabled="nextClose">{{tonext}}</el-button>
          </span>
        </div>
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
      // 存储返回的题目信息
      info: {},
      // 用于储存/切换图片
      imgUrl: '',
      // 用于储存/切换题目
      problem: [],
      // 用于切换题目
      flag: 1,
      // 储存答题情况，返回给后端
      result: ['','','','','','','','','','',],
      // 按钮文本
      tonext: '确定，下一题',
      // 用于确定切换音乐播放状态
      playMusic: true,
      // 做题时间
      limitTime: 0,
      timer: null,
      // 用于切换按钮状态
      nextClose: true,
      // 用于切换拉杆状态
      choiceClose: true,
      // 用于设置拉杆禁用
      choiceCloseA: false,
      choiceCloseB: false,
      choiceCloseC: false,
      // 用于终止时间减少
      breaktime: false,
      // 用于使选项复位
      release: 0,
    }
  },
  methods: {
    pick(type) {
      this.breaktime = true
      this.choiceClose = false
      this.nextClose = false
      let long = this.$refs.prin.getBoundingClientRect().height - 110 //爪子伸长的距离
      switch (type) {
        case '1': {
          this.release = 1
          this.choiceCloseB = true
          this.choiceCloseC = true
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
          this.result[this.flag-1] = this.problem[0]
          break
        }
        case '2': {
          this.release = 2
          this.choiceCloseA = true
          this.choiceCloseC = true
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
          this.result[this.flag-1] = this.problem[1]
          break
        }
        case '3': {
          this.release = 3
          this.choiceCloseB = true
          this.choiceCloseA = true
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
          this.result[this.flag-1] = this.problem[2]
          break
        }
        default: break
      }
      //this.next()
      console.log(this.result)
    },
    help() {
      this.$confirm('是否离开游戏?', '提示', {
          confirmButtonText: '狠心离开',
          cancelButtonText: '继续游戏',
          type: 'warning',
        }).then(() => {
            this.$router.push('/')
        }).catch(() => {
          this.$message({
            type: 'success',
            message: '已回到游戏',
            duration: 1000
          });          
        });
    },
    next() {
      let long = this.$refs.prin.getBoundingClientRect().height-155;
      let tag = this.release
      if(tag == 1){
        anime({
          targets:'.foodA',
          translateY: 0-long,
          easing: 'easeInOutExpo',
        })
        this.release = 0
      }else if(tag == 2){
        anime({
          targets:'.foodB',
          translateY: 0-long,
          easing: 'easeInOutExpo',
        })
        this.release = 0
      }
      else if(tag == 3){
        anime({
          targets:'.foodC',
          translateY: 0-long,
          easing: 'easeInOutExpo',
        })
        this.release = 0
      }
      this.nextClose = true
      this.choiceClose = true
      this.choiceCloseA = false
      this.choiceCloseB = false
      this.choiceCloseC = false
      this.flag = this.flag + 1
      this.breaktime = false
      if(this.flag === this.info.length + 1) {
        this.breaktime = true
        this.setrecord()
      }
      this.problem = this.info[this.flag-1].selections
      this.imgUrl = this.info[this.flag-1].picUrl
      this.timecount(this.flag)
      if(this.flag === this.info.length) {
        this.tonext = '确定，查看结果'
      }
    },
    async getimg(token) {
      let temp = await axios.get(
        'https://foodplayerbe.ncuos.com/user/questions', 
        {headers:{'Authorization':token}
      })
      this.info = temp.data.data
      this.imgUrl = this.info[0].picUrl
      this.problem = this.info[0].selections
    },
    async setrecord() {
      let token = 'passport' + ' ' + localStorage.getItem('ustoken')
      let record = await axios.post(
        'https://foodplayerbe.ncuos.com/user/answers', 
        this.result,
        {headers:{'Authorization':token,'Content-Type':'application/json'}})
      let score = record.data.data
      this.$store.commit('change',score)
      if(score && score.score >= 60) {
        let played = true
        this.$store.commit('recordpla',played)
      }
      this.$router.push('/End')
    },
    musicPlay() {
      this.$refs.musicPlay.play()
    },
    musicPause() {
      this.playMusic = !this.playMusic
      if(this.playMusic)
        this.$refs.musicPlay.play()
      else
        this.$refs.musicPlay.pause()
    },
    timecount(index) {
      let tag = Math.ceil(index/5)
      let count = 30 - 5 * tag
      this.limitTime = count
      if(this.breaktime){
        return
      }
      this.timer = setInterval (() => {
        if(this.limitTime > 0 && this.limitTime <= count) {
          if(this.breaktime){
            return
          }
          this.limitTime--
        }
        else {
          if(!this.breaktime) {
            this.breaktime = !this.breaktime
            this.result[index-1] = ''
          }
          this.nextClose = false
          this.choiceClose = false
          this.choiceCloseA = true
          this.choiceCloseB = true
          this.choiceCloseC = true
          clearInterval(this.timer)
          this.timer = null
        }
      }, 1000)
    }
  },
  mounted() {
    // 获取题目
    let token = 'passport' + ' ' + localStorage.getItem('ustoken')
    this.getimg(token)
    this.musicPlay()
    this.timecount(this.flag)
  },
}
</script>

<style lang="stylus" scoped>
  .first_c
    background-color #EA5E1F
    background-size cover
    width 100%
    height 100%
    font-size .5rem
    .head
      width 100%
      display inline
      text-align center
      .help
        width 20%
        display inline-block
        text-align center
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
      .time-limit
        width 60%
        display inline-block
        font-size .44rem
        color #FFEBB5
        vertical-align middle
    .game
      background: url('/img/娃娃机.png') center center no-repeat
      background-size 104% 100%
      width 100%
      height 5.45rem
      bottom 0%
      position absolute
      clear both
      .gameprin
        width 75%
        height 28.5%
        position absolute
        left 50%
        top 11.3%
        transform translate(-50%,0)
        .paw-content
          width 33.3%
          height .56rem
          display inline-block
          position relative
          text-align center
          .nullA
            width .05rem
            height 1px
            position absolute
            background-color #6DBEC6
            left 50%
            transform translate(-50%,0)
          .nullB
            width .05rem
            height 1px
            position absolute
            background-color #6DBEC6
            left 50%
            transform translate(-50%,0)
          .nullC
            width .05rem
            height 1px
            position absolute
            background-color #6DBEC6
            left 50%
            transform translate(-50%,0)
          .gamepaw
            width .41rem
            height .56rem
          .pawimgA
            width .41rem
            height .56rem
          .pawimgB
            width .41rem
            height .56rem
          .pawimgC
            width .41rem
            height .56rem
        .game-item
          width 100%
          height 42%
          position absolute
          bottom 4%
          text-align center
          font-size .18rem
          color #ffffff
          .foodA
            width 30%
            height 100%
            display inline-block
            text-align center
            box-sizing border-box
          .foodB
            width 30%
            height 100%
            display inline-block
            text-align center
            box-sizing border-box
          .foodC
            width 30%
            height 100%
            display inline-block
            text-align center
      .choice
        width 100%
        position absolute
        bottom 42%
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
      .problem-c
        position absolute
        bottom 0%
        width 100%
        height 35%
        text-align center
        display table
        .pro-text
          width 40%
          height 100%
          display table-cell
          line-height .3rem
          box-sizing border-box
          text-align center
          vertical-align top
          .toEnd
            height 40%
            background-color #FFC21C
            color #ffffff
            font-size .15rem
            border-radius .15rem
            border-style none
            box-shadow 0px 6px #DE7103
            margin-top 30%
</style>
