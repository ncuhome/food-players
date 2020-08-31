<template>
  <div class="first_c">
    <!--图鉴页面-->
    <div class="title">美食图鉴</div>
    <div class="atlas"></div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Atlas',
  components: {
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
</style>