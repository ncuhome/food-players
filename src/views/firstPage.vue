<template>
  <div class="first_c">
    <div class="title_img">
      <img src="/img/美食玩家.png" alt="美食玩家">
    </div>
    <div class="choose">
      <el-button @click="change('1')" class="choose-item" type="warning">开始游戏</el-button>
      <br>
      <el-button @click="change('2')" class="choose-item" type="warning">查看图鉴</el-button>
      <br>
      <el-button @click="change('3')" class="choose-item" type="warning">我的奖品券</el-button>
    </div>
    <div class="f-img">
      <img class="b-img" src="/img/美食小家园.png" alt="">
    </div>
    <div class="imgtwo">
      <img class="b-imgtwo" src="/img/背景2.png" alt="">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'firstPage',
  components: {
  },
  methods: {
    change(type) {
      switch (type) {
        case '1':
          this.$router.push('/Rule')
          break
        case '2':
          this.$router.push('/Atlas')
          break
        case '3':
          this.$router.push('/Bonus')
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  .first_c
    background: url('/img/background.png') center center no-repeat
    background-size 100% 100%
    width 100%
    height 100%
    font-size .5rem
    overflow hidden
    .title_img
      position absolute
      left 50%
      top 20%
      transform translate(-50%, -50%)
    .choose
      position absolute
      top 80%
      left 100%
      transform translate(-130%, -50%)
      z-index 3
      .choose-item
        width 1.3rem
        background-color #FFC21C
        box-shadow 8px 5px rgba(222,113,3,0.7)
    .f-img
      width 2.8rem
      height 4.5rem
      position absolute
      bottom 0%
      left 0%
      transform translate(5%,0)
      overflow hidden
      box-sizing border-box
      z-index 2
      .b-img
        width 100%
        height 100%
    .imgtwo
      position absolute
      bottom 0%
      left 0%
      width 2rem
      height 4.2rem
      .b-imgtwo
        width 100%
        height 100%
</style>
