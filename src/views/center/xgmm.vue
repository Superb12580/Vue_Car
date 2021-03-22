<template>
  <div class="form">
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="旧密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="新密码" prop="newPassword">
        <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button>忘记密码</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<!--修改密码-->
<script>
export default {
  name: 'xgmm',
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        password: '',
        newPassword: '',
        checkPass: '',
        userId: ''
      },
      rules: {
        password: { required: true, message: '请输入密码', trigger: 'blur' },
        newPassword: { required: true, validator: validatePass, trigger: 'blur' },
        checkPass: { required: true, validator: validatePass2, trigger: 'blur' }
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          that.ruleForm.userId = that.$store.getters.GET_USER.userId
          this.$http.post('/user/password', this.ruleForm).then(function (rest) {
            const data = rest.data
            that.msg(data.msg)
            if (data.code === 200) {
              that.$router.push('/grzl')
            }
            that.resetForm('ruleForm')
          }, function (error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    }
  }
}
</script>

<style scoped>
  .form {
    width: 400px;
    margin-left: 300px;
    margin-top: 50px;
  }
</style>
