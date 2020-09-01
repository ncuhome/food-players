<template>
  <div class="first_c">
    <!--图鉴页面-->
    <div class="title">美食图鉴</div>
    <div class="atlas">
      <span class="atlas-items">
        <img class="atlas-img" src="/img/test.png" alt="">
      </span>
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
    }
  },
  methods: {
    async getimg(token) {
      let temp = await axios.get('http://47.115.56.165/user/lib', {headers:{'Authorization':token}})
      console.log('temp',temp.data)
      this.atlasinfo = temp.data.answerRecord
      console.log('info:',this.atlasinfo)
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
    background-color #F8B706
    background-size 100% 100%
    width 100%
    height 100%
    font-size .5rem
    .title
      width 100%
      height 20%
      text-align center
      color #743816
      padding-top .5rem
      box-sizing border-box
    .atlas
      width 100%
      height 80%
      background-color #FFEBB5
      .atlas-items
        width 50%
        display inline-block
        text-align center
        margin-top .5rem
        .atlas-img
          width .55rem
          height 100%
</style>