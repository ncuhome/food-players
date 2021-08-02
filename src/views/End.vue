<template>
  <div class="first_c">
    <!--结束页面-->
    <div>
      <div class="background">
        <img style="width: 100%" src="/img/礼花.png" alt="">
        <img class="cup" src="/img/奖杯.png" alt="">
        <div class="score">
          最终得分<span :style="{color:'#F4EA2A',fontSize:'.5rem',marginLeft:'.1rem',marginRight:'.1rem'}">{{record.score}}</span>分
        </div>
        <div
          :style="{
            width: '100%',
            position: 'absolute',
            top: '60%',
            textAlign: 'center',
            color: '#EA5E1F',
            fontSize: '.25rem',
          }"
        >共超过{{record.level}}名玩家</div>
      </div>
      <div class="tocheck">
        <el-button type="danger" class="check" @click="toAnswers">查看答案</el-button>
        <el-button type="danger" class="check" @click="toHome">返回首页</el-button>
      </div>
    </div>
    <div class="NCU">
      <img src="/img/NCU.png" alt="">
    </div>
  </div>
</template>

<script>

export default {
  name: 'GamePage',
  components: {
  },
  data() {
    return {
      record: {},
    }
  },
  methods: {
    getrecord() {
      let temp = this.$store.state.record
      this.record = temp
    },
    toAnswers() {
      this.$router.push('/Answers')
    },
    toHome() {
      this.$router.push('/')
    }
  },
  mounted() {
    this.getrecord()
  }
}
</script>

<style lang="stylus" scoped>
  .first_c
    background-color #FFEBB5
    background-size 100% 100%
    width 100%
    height 100%
    font-size .5rem
    .background
      width 100%
      height 50%
      .cup
        position absolute
        top 40%
        left 50%
        transform translate(-50%,-50%)
      .score
        width 100%
        text-align center
        color #ffffff
        font-size .3rem
        position absolute
        top 51.5%
        left 50%
        transform translate(-50%,-50%)
    .tocheck
      position absolute
      bottom 15%
      width 100%
      display inline-block
      text-align center
      .check
        background-color #FFC21C
        border none 
        height .4rem
        box-shadow 8px 3px #DE7103
        border-radius .1rem
    .NCU
      position absolute
      bottom 0
      width 100%
      text-align center
</style>