<template>
  <div class="login_c">
    <!--仅用于管理员登录-->
    <div class="title_img" v-show="!Loading">
      <img src="/img/美食玩家.png" alt="美食玩家">
      <img class="t_two" src="/img/t2.png" alt="food players">
    </div>
    <div class="login_box" v-show="!Loading">
      <!--登录表单区域-->
      <el-form :model="loginForm" :rules="loginRules" ref="loginrefs" label-width="0px">
        <el-form-item prop="username">
          <el-input prefix-icon="iconfont iconshenfenzheng" size="large" v-model="loginForm.username" placeholder="请输入学号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input prefix-icon="iconfont iconmima" v-model="loginForm.password" placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button 
            class="iconfont iconchangjiantou" 
            type="primary" 
            round 
            @click="logincheck"
          ></el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="
      width: 100%;
      height: 100px;
      position: absolute;
      top: 35%;
      text-align: center;
      -webkit-animation: rotate 2.0s infinite linear;
      animation: rotate 2.0s infinite linear;
      " 
      v-show="Loading"
    >
      <div class="dot1"></div>
      <div class="dot2"></div>
    </div>
    <div 
      v-show="Loading" 
      style="
        width: 100%;
        height: .2rem;
        color: #FFC21C;
        font-size: .15rem;
        text-align: center;
        position: absolute;
        top: 55%"
    >正在进入美食世界</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      // 登陆表单数据绑定对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则对象
      loginRules: {
        // 验证是否输入用户名
        username: [
          { required: true, message: '请输入学号', trigger: 'blur' }
        ],
        // 验证密码是否合法
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
        ]
      },
      Loading: false,
    }
  },
  methods: {
    logincheck () {
      if((this.loginForm.username != '') && (this.loginForm.password != ''))
        this.Loading = true
      this.$refs.loginrefs.validate(async valid => {
        if (!valid) return
        let temp = await this.$http.post('https://os.ncuos.com/api/user/token', this.loginForm)
        console.log(temp)
        if (temp.data.status !== 1) return this.$message.error('登陆失败')
        localStorage.setItem('token', temp.data.token)
        let test = localStorage.getItem('token')
        console.log(test)
        this.$router.push('/firstPage')
        return this.$message.success('登陆成功')
      })
    },
  }
}
</script>

<style lang="stylus" scoped>
  .login_c
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
    .login_box
      width 68%
      height 2.4rem
      position absolute
      left 50%
      top 50%
      transform translate(-50%, -50%)
      button.el-button
        width .8rem
        height .8rem
        border none
        border-radius .4rem
        box-shadow 0px 2px 3px grey
        position relative
        top 50%
        left 50%
        transform translate(-50%, 90%)
        background-color rgba(255,255,255,0.5)
        color grey
        font-size .3rem
    .code
      width 100%
      position absolute
      top 50%
      height .2rem
      .code_c
        position absolute
        transform translate(-50%)
        left 50%
        width 100%
        font-size .1rem
        color #ffffff
        text-align center
        text-decoration underline
    .register
      width 100%
      position absolute
      top 90%
      .register_c
        position absolute
        transform translate(-50%)
        left 50%
        width 100%
        font-size .1rem
        color #ffffff
        text-align center
        text-decoration underline
</style>