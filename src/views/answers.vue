<template>
  <div class="first_c">
    <div class="title" v-show="! answerinfo">答案</div>
    <div class="atlas" v-show="! answerinfo">
      <span 
        class="atlas-items"
        v-for="(item,index) in answers"
        :key="index"
        @click="showInfo(item.id)"
      >
        <img class="atlas-img" :src="item.picUrl" :alt="index">
        <div>{{item.name}}</div>
      </span>
    </div>
    <div class="info" v-show="answerinfo">
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
    }
  },
  methods:{
    async getans(token) {
      let temp = await axios.get('https://foodplayerbe.ncuos.com/user/answer/current', {headers:{'Authorization':token}})
      console.log(temp)
      let second = temp.data.data
      for(let i = 0;i < temp.data.data.length;i++) {
        let item = {
          picUrl: second[i].picUrl,
          realFood: second[i].realPicUrl,
          id: i,
          name: second[i].name,
          body: second[i].body,
        }
        this.atlasinfo.push(item)
      }
      console.log(this.answers)
    },
    showInfo(index) {
      this.answerinfo = true
      this.foodname = this.atlasinfo[index].name
      this.foodinfo = this.atlasinfo[index].body
      this.realFood = this.atlasinfo[index].picUrl
    }
  },
  mounted() {
    console.log('答案信息：')
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
</style>