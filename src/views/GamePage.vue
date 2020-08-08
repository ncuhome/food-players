<template>
  <div class="first_c">
    <!--游戏页面-->
    <div class="title_img">
      <img src="/img/美食玩家.png" alt="美食玩家">
      <img class="t_two" src="/img/t2.png" alt="food players">
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'GamePage',
  components: {
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
    .title_img
      position absolute
      left 50%
      top 25%
      transform translate(-50%, -50%)
      .t_two
        top 60%
        left 50%
        position absolute
        transform translate(-50%, -50%)
</style>
