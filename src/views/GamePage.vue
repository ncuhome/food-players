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
          <span 
            v-for="(item,index) in imgUrl"
            :key="index"
          >
            <img class="foodA" :src="item.Url" :alt="index" v-if="item.show">
          </span>
          <span
            v-for="(item,index) in imgUrl"
            :key="index"
          >
            <img class="foodB" :src="item.Url" :alt="index" v-if="item.show">
          </span>
          <span
            v-for="(item,index) in imgUrl"
            :key="index"
          >
            <img class="foodC" :src="item.Url" :alt="index" v-if="item.show">
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
      <div class="problem-c" :style="{fontSize: '.16rem',color: '#fff'}">
        <span class="pro-text">
          <p>A:{{problem[0]}}</p>
          <p>B:{{problem[1]}}</p>
          <p>C:{{problem[2]}}</p>
        </span>
        <span class="pro-text">
          <el-button @click="next" round>{{tonext}}</el-button>
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
      // 存储返回的题目信息
      info: {},
      // 用于储存/切换图片
      imgUrl: [],
      // 用于储存/切换题目
      problem: [],
      // 用于切换题目
      flag: 0,
      // 储存答题情况，返回给后端
      result: [],
      // 按钮文本
      tonext: '确定，下一题'
    }
  },
  methods: {
    pick(type) {
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
          this.result[this.flag] = this.problem[0]
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
          this.result[this.flag] = this.problem[1]
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
          this.result[this.flag] = this.problem[2]
          break
        }
        default: break
      }
      console.log(this.result)
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
    },
    next() {
      this.flag = this.flag + 1
      if(this.flag === this.info.length) {
        this.setrecord()
      }
      this.problem = this.info[this.flag].selections
      this.imgUrl[this.flag - 1].show = false
      this.imgUrl[this.flag].show = true
      if(this.flag === this.info.length - 1) {
        this.tonext = '确定，查看结果'
      }
    },
    async getimg(token) {
      let temp = await axios.get('http://47.115.56.165/user/questions', {headers:{'Authorization':token}})
      console.log(temp.data.data)
      this.info = temp.data.data
      console.log('info:',this.info)
      for(let i = 0;i < this.info.length;i++) {
        let imgdata = {
          id: i,
          Url: this.info[i].picUrl,
          show: false
        }
        this.imgUrl.push(imgdata)
      }
      this.imgUrl[0].show = true
      this.problem = this.info[0].selections
      console.log('选项：',this.problem)
    },
    async setrecord() {
      let token = 'passport' + ' ' + localStorage.getItem('token')
      console.log('token:',token)
      let record = await axios.post(
        'http://47.115.56.165/user/answers', 
        this.result,
        {headers:{'Authorization':token,'Content-Type':'application/json'}})
      let score = record.data.data
      this.$store.commit('change',score)
      console.log('record:',record.data.data)
      this.$router.push('/End')
    }
  },
  mounted() {
    console.log('题目信息：')
    // 获取题目
    let token = 'passport' + ' ' + localStorage.getItem('token')
    this.getimg(token)
    /*
    async function getimg(any) {
      let temp = await axios.get('http://47.115.56.165/user/questions', {headers:{'Authorization':token}})
      console.log(temp.data.data)
      any = temp.data.data
      console.log('info:',any)
    }
    getimg(this.info)
    console.log("thisinfo",this.info)
    */
    /*
    let test = getimg()
    console.log('test:',test)
    */
    /*
    for(let i = 1;i <= 20;i++) {
      let pro = {
        url: test[i].picUrl,
        sec: test[i].selections
      }
      this.info.push(pro)
    }
    console.log('info:',this.info)*/
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
      .problem-c
        position absolute
        bottom 0%
        width 100%
        height 1.6rem
        .pro-text
          width 50%
          height 1.6rem
          display inline-block
          line-height .3rem
          padding-left .3rem
          box-sizing border-box
</style>
