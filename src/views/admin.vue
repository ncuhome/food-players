<template>
  <div>
    <div class="formContent">
      <el-form :model="question" label-width="80px">
        <el-form-item label="食物介绍" type="textarea">
          <el-input v-model="question.body"></el-input>
        </el-form-item>
        <el-form-item label="正确答案">
          <el-input v-model="question.correctAnswer"></el-input>
        </el-form-item>
        <el-form-item label="错误答案1">
          <el-input v-model="question.wrongAnswer1"></el-input>
        </el-form-item>
        <el-form-item label="错误答案2">
          <el-input v-model="question.wrongAnswer2"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="upload">点击选择绘制图片</el-button>
          <input type="file" ref="evfile" @change="uploadFile_change" style="display:none">
        </el-form-item>
        <el-form-item>
          <el-button @click="uploadReal">点击选择实物图片</el-button>
          <input type="file" ref="enfile" @change="uploadFile_change_real" style="display:none">
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">提交题目</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import * as qiniu from 'qiniu-js';


export default {
  name: 'Admin',
  components: {},
  data() {
    return {
      question: {
        body: '',
        correctAnswer: '',
        wrongAnswer1: '',
        wrongAnswer2: '',
        picUrl: '',
        realPicUrl: '',
      },
      passport: '',
      fileNum: false,
      limit: 1,
      picList: [],
      realList: [],
    }
  },
  methods: {
    async submit() {
      console.log(this.question)
      const token = localStorage.getItem('ustoken')
      const res = await axios.post(
        'https://foodplayerbe.ncuos.com/admin/question', 
        this.question,
        {headers:{'Authorization':token}},
      )
      if(res.data.data.status === 1) {
        this.$message({
          message: '上传成功',
          type: 'success'
        })
      } else {
        this.$message({
          message: '上传失败',
          type: 'warning'
        })
      }
    },
    async getPassport() {
      const token = localStorage.getItem('ustoken')
      const res = await axios.get(
        'https://foodplayerbe.ncuos.com/admin/qiniu/token', 
        {headers:{'Authorization':token}}
      )
      return res
    },
    upload() {
      this.$refs.evfile.click()
    },
    uploadReal() {
      this.$refs.enfile.click()
    },
    uploadFile_change(evfile) {
      this.getPassport().then(res => {
        const token = res.data.data
        console.log(token)
        var file = evfile.target.files[0]
        const key = evfile.name
        var observable = qiniu.upload(file, key, token)
        observable.subscribe({
          next: (result) => {
          // 主要用来展示进度
            console.log(result)
          },
          error: (errResult) => {
          // 失败报错信息
            console.log(errResult)
          },
          complete: (result) => {
          // 接收成功后返回的信息
            this.question.picUrl = 'http://sww.mingzhuziyou.top/' + result.key
            console.log(1111111111111111111111111111111)
            console.log(t1)
          }
        })
      })
    },
    uploadFile_change_real(enfile) {
      this.getPassport().then(res => {
        const token = res.data.data
        console.log(token)
        var file = enfile.target.files[0]
        const key = enfile.name
        var observable = qiniu.upload(file, key, token)
        observable.subscribe({
          next: (result) => {
          // 主要用来展示进度
            console.log(result)
          },
          error: (errResult) => {
          // 失败报错信息
            console.log(errResult)
          },
          complete: (result) => {
          // 接收成功后返回的信息
            console.log(2222222222222222222222222222222222222222)
            this.question.realPicUrl = 'http://sww.mingzhuziyou.top/' + result.key
            console.log(t1)
          }
        })
      })
    },
  },
  mounted() {
  }
}
</script>

<style lang="stylus" scoped>
.formContent
  width 70%
</style>
