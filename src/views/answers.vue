<template>
  <div class="first_c">
    <div class="title">答案</div>
      <div class="atlas">
        <span 
          class="atlas-items"
          v-for="(item,index) in answers"
          :key="index"
        >
          <img class="atlas-img" :src="item.picUrl" :alt="index">
        </span>
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
    }
  },
  methods:{
    async getans(token) {
      let temp = await axios.get('http://47.115.56.165/user/answer/current', {headers:{'Authorization':token}})
      console.log(temp)
      this.answers = temp.data.data
      console.log(this.answers)
    }
  },
  mounted() {
    console.log('答案信息：')
    let token = 'passport' + ' ' + localStorage.getItem('token')
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
</style>