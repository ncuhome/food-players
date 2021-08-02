<template>
  <div class="first_c">
    <div @click="tohome" style="position: absolute; left: .4rem;color: #ffffff" v-show="! answerinfo">
      <span class="iconfont iconxiazai6"></span>
    </div>
    <div class="title" v-show="! answerinfo">答案</div>
    <div class="atlas" v-show="! answerinfo">
      <span 
        class="atlas-items"
        v-for="(item,index) in answers"
        :key="index"
        @click="showInfo(item.id)"
      >
        <img class="atlas-img" :src="item.picUrl" :alt="index">
        <div style="font-size: 20px; color: #EA5E1F">{{item.name}}</div>
      </span>
    </div>
    <div class="info" v-show="answerinfo" id="toslip">
      <div style="margin-left:.3rem,margin-top:.3rem">
        <span @click="change" style="margin-left: .4rem;color: #FFC21C" class="iconfont iconxiazai6"></span>
      </div>
      <div class="item-img">
        <div style="margin-bottom:.2rem">
          <p :style="{fontSize:'.27rem',color:'#EA5E1F'}">{{foodname}}</p>
        </div>
        <img style="width:100%" :src="realFood" :alt="foodname">
        <div style="margin-top: .4rem">
          <p>{{foodinfo}}</p>
        </div>
      </div>
      <div class="slip">
        <div class="iconfont iconjiantou-copy-copy-copy row"></div>
        <span 
          style="
            width: 60%;
            margin: 2rem.3rem;
            height: .55rem;
            vertical-align: middle;
            display: table-cell;
          "
        >
          左右滑动查看其他答案
        </span>
        <div class="iconfont iconjiantou-copy-copy-copy1 row"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Answers',
  components: {
  },
  data() {
    return {
      answers:[],
      answerinfo: false,
      // 控制详情页显示的内容
      realFood: '',
      foodname: '',
      foodinfo: '',
      page: 0,
      // 用于控制左右滑动事件
      startX:0,
      startY:0,
    }
  },
  methods:{
    async getans(token) {
      let temp = await axios.get('https://foodplayerbe.ncuos.com/user/answer/current', {headers:{'Authorization':token}})
      let second = temp.data.data
      if(second){
        for(let i = 0;i < temp.data.data.length;i++) {
          let item = {
            picUrl: second[i].picUrl,
            realFood: second[i].realPicUrl,
            id: i,
            name: second[i].name,
            body: second[i].body,
          }
          this.answers.push(item)
        }
      } else {
        return this.$message.error(temp.data.msg)
      }
    },
    showInfo(index) {
      this.answerinfo = true
      this.page = index
      this.foodname = this.answers[index].name
      this.foodinfo = this.answers[index].body
      this.realFood = this.answers[index].realFood
      let slipdom = document.getElementById('toslip')
      this.addHandler(slipdom, 'touchstart', this.handleTouchEvent)
      this.addHandler(slipdom, 'touchend', this.handleTouchEvent)
      this.addHandler(slipdom, 'touchmove', this.handleTouchEvent)
    },
    // 用于添加事件
    addHandler (element, type, handler) {
      if (element.addEventListener) {
        element.addEventListener(type, handler, false)
      } else if (element.attachEvent) {
        element.attachEvent('on' + type, handler)
      } else {
        element['on' + type] = handler
      }
    },
    handleTouchEvent (event) {
      switch (event.type) {
        case 'touchstart':
          this.startX = event.touches[0].pageX
          this.startY = event.touches[0].pageY
          break
        case 'touchend':
          let spanX = event.changedTouches[0].pageX - this.startX
          let spanY = event.changedTouches[0].pageY - this.startY
          if (spanY < -30) { // 向上
          }
          if (Math.abs(spanX) > Math.abs(spanY)) {
            // 认定为水平方向滑动
            if (spanX < 0) {
              // 向左滑动
              this.page = this.page + 1
              if (this.page === this.answers.length){
                this.page = this.answers.length - 1
                return
              }
              this.foodname = this.answers[this.page].name
              this.foodinfo = this.answers[this.page].body
              this.realFood = this.answers[this.page].realFood
            }
            else {// 向右滑动
              this.page = this.page - 1
              if (this.page < 0){
                this.page = 0
                return
              }
              this.foodname = this.answers[this.page].name
              this.foodinfo = this.answers[this.page].body
              this.realFood = this.answers[this.page].realFood
            }
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
    change() {
      this.answerinfo = !this.answerinfo;
    },
    tohome() {
      this.$router.replace('/')
    }
  },
  mounted() {
    let token = 'passport' + ' ' + localStorage.getItem('ustoken')
    this.getans(token)
  }
}
</script>

<style lang="stylus" scoped>
  .first_c
    background-color #FFEBB5
    background-size 100% 100%
    background-attachment fixed
    width 100%
    height 100%
    font-size .5rem
    .title
      background-color #F8B706
      width 100%
      height 1rem
      text-align center
      color #743816
      padding-top .25rem
      box-sizing border-box
    .atlas
      width 100%
      background-color #FFEBB5
      .atlas-items
        width 50%
        display inline-block
        text-align center
        margin-top .5rem
        .atlas-img
          width .55rem
          height 100%
    .info
      width 100%
      height 100%
      .item-img
        position absolute
        left 50%
        top 40%
        transform translate(-50%,-50%)
        width 3.3rem
        text-align center
        font-size .18rem
        color #743816
      .slip
        position absolute
        bottom 0%
        width 100%
        height .7rem
        color #FFC21C
        font-size .12rem
        text-align center
        display table
        .row
          font-size .4rem
          width 20%
          display inline-block
          height .7rem
          box-sizing border-box
          padding-top .15rem
</style>