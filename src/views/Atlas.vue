<template>
  <div class="first_c">
    <!--图鉴页面-->
    <div v-show="!showatlas">
      <div @click="tohome" style="position: absolute; left: .4rem;color: #ffffff">
        <span class="iconfont iconxiazai6"></span>
      </div>
      <div class="title">美食图鉴</div>
      <div class="atlas">
        <span 
          class="atlas-items"
          v-for="(item,index) in atlasinfo"
          :key="index"
          @click="showinfo(item.id)"
        >
          <img class="atlas-img" :src="item.picUrl" :alt="index">
        </span>
      </div>
    </div>
    <div class="info" v-show="showatlas" id="toslip">
      <div style="margin-left:.3rem,margin-top:.3rem">
        <span @click="change" style="margin-left: .4rem;color: #FFC21C" class="iconfont iconxiazai6"></span>
      </div>
      <div class="item-img">
        <div style="margin-bottom:.2rem">
          <p :style="{fontSize:'.27rem',color:'#EA5E1F'}">{{foodname}}</p>
        </div>
        <img style="width:100%" :src="foodpic" :alt="page">
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
          左右滑动了解更多美食
        </span>
        <div class="iconfont iconjiantou-copy-copy-copy1 row"></div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'Atlas',
  components: {
  },
  data() {
    return {
      atlasinfo: [],
      showatlas: false,
      // 用于控制详情页显示的内容
      page: 0,
      foodname: '',
      foodinfo: '',
      foodpic: '',
      // 用于控制左右滑动事件
      startX:0,
      startY:0,
    }
  },
  methods: {
    async getimg(token) {
      let temp = await axios.get('https://foodplayerbe.ncuos.com/user/lib', {headers:{'Authorization':token}})
      let second = temp.data.data
      if(second){
        for(let i = 0;i < second.answerRecord.length;i++) {
          let item = {
            picUrl: second.answerRecord[i].picUrl,
            realPic: second.answerRecord[i].realPicUrl,
            id: i,
            name: second.answerRecord[i].name,
            body: second.answerRecord[i].body,
          }
          this.atlasinfo.push(item)
        }
      } else {
        return this.$message.error(temp.data.msg)
      }
    },
    showinfo(index) {
      this.showatlas = true
      this.page = index
      this.foodname = this.atlasinfo[index].name
      this.foodinfo = this.atlasinfo[index].body
      this.foodpic = this.atlasinfo[index].realPic
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
              if (this.page === this.atlasinfo.length){
                this.page = this.atlasinfo.length - 1
                return
              }
              this.foodname = this.atlasinfo[this.page].name
              this.foodinfo = this.atlasinfo[this.page].body
              this.foodpic = this.atlasinfo[this.page].realPic
            }
            else {// 向右滑动
              this.page = this.page - 1
              if (this.page < 0){
                this.page = 0
                return
              }
              this.foodname = this.atlasinfo[this.page].name
              this.foodinfo = this.atlasinfo[this.page].body
              this.foodpic = this.atlasinfo[this.page].realPic
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
      this.showatlas = !this.showatlas
    },
    tohome() {
      this.$router.push('/')
    }
  },
  mounted() {
    let token = 'passport' + ' ' + localStorage.getItem('ustoken')
    this.getimg(token)
  },
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
      height 1.5rem
      text-align center
      color #743816
      padding-top .5rem
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