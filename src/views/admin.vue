<template>
  <div>
    <div class="formContent">
      <el-form  label-width="80px">
        <el-form-item label="食物介绍" type="textarea">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="正确答案">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="错误答案">
          <el-input></el-input>
        </el-form-item>
        <el-form-item label="错误答案">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-upload
            class="upload-demo"
            drag
            action=""
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item>
          <el-button @click="submit">上传</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

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
    }
  },
  methods: {
    async submit() {
      const token = 'passport' + ' ' + localStorage.getItem('token')
      const res = await axios.post(
        'http://47.115.56.165/admin/question', 
        {headers:{'Authorization':token}}
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
      const token = 'passport' + ' ' + localStorage.getItem('token')
      const res = await axios.get(
        'http://47.115.56.165/admin/qiniu/token', 
        {headers:{'Authorization':token}}
      )
      this.data.passport = res.data.data.data
      console.log(res)
    }
  },
  mounted() {
    this.getPassport()
  }
}
</script>

<style lang="stylus" scoped>
.formContent
  width 70%
</style>
