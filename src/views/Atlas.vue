<template>
  <div class="first_c">
    <!--图鉴页面-->
    <div v-show="!showatlas">
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
    <div class="info" v-show="showatlas">
      <div style="margin-left:.3rem,margin-top:.3rem">
        <span class="iconfont iconxiazai6"></span>
      </div>
      <div class="item-img">
        <div style="margin-bottom:.2rem">
          <p :style="{fontSize:'.27rem',color:'#EA5E1F'}">{{atlasinfo[page].name}}</p>
        </div>
        <img style="width:100%" src="/img/图鉴测试.jpg" :alt="page">
        <div style="margin-top: .4rem">
          <p>{{atlasinfo[page].body}}</p>
        </div>
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
      page: 0,
    }
  },
  methods: {
    async getimg(token) {
      let temp = await axios.get('http://47.115.56.165/user/lib', {headers:{'Authorization':token}})
      console.log('temp',temp.data)
      let second = temp.data.data
      for(let i = 0;i < temp.data.data.answerRecord.length;i++) {
        let item = {
          picUrl: second.answerRecord[i].picUrl,
          id: i,
          name: second.answerRecord[i].name,
          body: second.answerRecord[i].body,
        }
        this.atlasinfo.push(item)
      }
      console.log('info:',this.atlasinfo)
    },
    showinfo(index) {
      this.showatlas = true
      this.page = index
    }
  },
  mounted() {
    console.log('图鉴信息：')
    // 获取题目
    let token = 'passport' + ' ' + localStorage.getItem('token')
    this.getimg(token)
  },
}
</script>

<style lang="stylus" scoped>
  .first_c
    background-color #FFEBB5
    background-size 100% 100%
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
      height 80%
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
</style>