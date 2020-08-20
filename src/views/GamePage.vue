<template>
  <div class="first_c">
    游戏页面
    <!--游戏页面-->
    <div class="game">
      <div class="game-prin">
        <div 
          :style="{
            width: row.width+'rem',
            height: row.height+'px',
            backgroundColor: row.backgroundColor,
            position:row.position,
            left:'20%',
            transform: 'translate(-50%,0)'
          }"
        >
        </div>
        <img 
          :style="{
            width: img_picker.width + 'rem',
            height: img_picker.height + 'rem',
            position: img_picker.position,
            left: '20%',
            transform: 'translate(-50%,0)'
          }" 
          src="/img/pickA.png" 
          alt=""
        >
        <div 
          :style="{
            width: row.width+'rem',
            height: row.height+'px',
            backgroundColor: row.backgroundColor,
            position:row.position,
            left:'50%',
            transform: 'translate(-50%,0)'
          }"
        >
        </div>
        <img 
          :style="{
            width: img_picker.width + 'rem',
            height: img_picker.height + 'rem',
            position: img_picker.position,
            left: '50%',
            transform: 'translate(-50%,0)'
          }" 
          src="/img/pickB.png" 
          alt=""
        >
        <div 
          :style="{
            width: row.width+'rem',
            height: row.height+'px',
            backgroundColor: row.backgroundColor,
            position:row.position,
            left:'80%',
            transform: 'translate(-50%,0)'
          }"
        >
        </div>
        <img 
          :style="{
            width: img_picker.width + 'rem',
            height: img_picker.height + 'rem',
            position: img_picker.position,
            left: '80%',
            transform: 'translate(-50%,0)'
          }" 
          src="/img/pickC.png" 
          alt=""
        >
        <div class="game-item"></div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'GamePage',
  components: {
  },
  data () {
    return {
      row: {
        width: .05,
        height:0,
        backgroundColor: '#707070',
        position: 'absolute',
      },
      img_picker: {
        width: .41,
        height: .56,
        position: 'absolute',
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
    .game
      width 100%
      height 6rem
      bottom 0%
      position absolute
      background-color rgb(109,190,198)
      .game-prin
        width 3rem
        height 2.8rem
        background-color rgb(247,246,245)
        position absolute
        left 50%
        top 10%
        transform translate(-50%,0)
</style>
