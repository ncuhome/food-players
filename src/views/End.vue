<template>
  <div class="first_c">
    <!--结束页面-->
    <div class="background">
      <img style="width: 100%" src="/img/礼花.png" alt="">
    </div>
    <div class="tocheck">
      <el-button type="danger" class="check">查看答案</el-button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

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
      this.record = localStorage.getItem('record')
      console.log(this.record)
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
</style>