<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  methods:{
    // 进入网页时再次刷新token
    async initToken () {
      const token = localStorage.getItem('ustoken');
      if(token) {
        const user = localStorage.getItem('user')
        const pass = localStorage.getItem('pass')
        if(user && pass) {
          const temp = await axios.post('https://os.ncuos.com/api/user/token', {username:user,password:pass})
          localStorage.setItem('ustoken', temp.data.token)
        }
      }
    }
  },
  mounted() {
    this.initToken();
  }
}
</script>


<style>
</style>
