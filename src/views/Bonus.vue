<template>
  <div class="first_c">
    <!--奖励券页面-->
    <div>
      <span 
        style="position: absolute;left: 7%;top: 5%;color: #ffffff" 
        class="iconfont iconxiazai6"
        @click="tohome"
      ></span>
    </div>
    <div>
      <img class="bonusPic" src="/img/奖券未领.png" alt="" v-show="untake">
      <img src="/img/奖券已领取.png" alt="" v-show="!untake">
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Bonus',
  components: {
  },
  data() {
    return {
      ifplay: false,
      untake: true,
      remian: true,
      message: '',
    }
  },
  methods: {
    async ifTake(token) {
      let temp = await axios.get('https://foodplayerbe.ncuos.com/user/lib', {headers:{'Authorization':token}})
      this.untake = temp.data.data.obtained
    },
    tohome() {
      this.$router.push('/')
    },
    async getremain() {
      let rem = await axios.get('https://foodplayerbe.ncuos.com/remaining')
      console.log(rem)
      if(rem.data.data.data === false){
        this.message = '抱歉，奖品已经被领完了哦'
      }
    }
  },
  mounted() {
    let token = 'passport' + ' ' + localStorage.getItem('token')
    this.ifTake(token)
    this.getremain()
    this.ifplay = this.$store.state.hadplay
  }
}
</script>

<style lang="stylus" scoped>
  .first_c
    background-color #F8B706
    background-size 100% 100%
    width 100%
    height 100%
    font-size .5rem
    .bonusPic
      height 80%
      width 80%
      position absolute
      top 55%
      left 50%
      transform translate(-50%,-50%)
</style>