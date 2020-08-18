<template>
  <div class="first_c">
    <!--规则页面-->
    <div class="tip">
      Hi 欢迎来到美食世界
      <br>
      你是第9位玩家
    </div>
    <button v-on:click="slipup"></button>
    <div 
    :style="{
        height: rule.height+'%',
        width: rule.width+'%',
        backgroundColor: rule.backgroundColor,
        position: rule.position,
        bottom: rule.bottom+'%',
        fontSize: rule.fontSize+'px',
        color: rule.color,
        borderTopRightRadius: rule.radius+'px',
        borderTopLeftRadius: rule.radius+'px',
        padding: rule.padding+'px',
        boxSizing: rule.boxSizing,
        overflow: rule.overflow,
      }"
    >
      在游戏中，你需要选出你看到的美食名称；中途允许退出游戏，但退出后只允许查看自己参与部分的答案，这会让你错失认识更多南大美食的机会哦～
完整参与游戏，并答对全部美食，还可获得小家园周边一份哦～
现在让我们进入游戏吧！
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Rule',
  components: {
  },
  data () {
    return {
      rule: {
        height: 20,
        width: 100,
        backgroundColor: '#FFC21C',
        bottom: 0,
        position: 'absolute',
        fontSize: 18,
        color: '#ffffff',
        radius: 30,
        padding: 30,
        boxSizing: 'border-box',
        overflow: 'hidden',
        flag: 0,
      }
    }
  },
  methods: {
    slipup (){
      if(this.rule.flag === 0){
        this.rule.height = this.rule.height + 40
        this.rule.flag = 1
      } else{
        this.rule.height = this.rule.height - 40
        this.rule.flag = 0
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
    .tip
      width 70%
      height 3rem
      position absolute
      left 50%
      top 45%
      transform translate(-50%, -50%)
      color #ffffff
      font-size .25rem
</style>
