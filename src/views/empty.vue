<template>
  
</template>

<script>
export default {
  namespace: 'Empty',
  methods: {},
  created(){
    console.log('test')
    this.$router.replace({ path:'/Login' })
  }
}
</script>
