<template>
  <div id="login">
    <el-container>
      <el-header>
        <router-link :to="{name: 'Home'}"><img src="../../assets/logo.png"></router-link>
      </el-header>
      <el-main>
        <el-form id="form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item prop="email" label="邮箱">
            <el-input v-model="ruleForm.email" placeholder="输入注册邮箱"></el-input>
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input v-model="ruleForm.code" placeholder="请输入验证码" maxlength="6" show-word-limit>
              <el-button slot="append" @click="onCode">发送验证码</el-button>
            </el-input>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="输入用户名"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" placeholder="设置密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkPass">
            <el-input type="password" v-model="ruleForm.checkPass" placeholder="再次输入密码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-main>
    </el-container>

  </div>
</template>

<script>export default {
  name: 'register2',
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        email: '',
        code: '',
        userName: '',
        password: '',
        checkPass: ''
      },
      rules: {
        email: [
          {
            required: true,
            message: '请输入邮箱地址',
            trigger: 'blur'
          },
          {
            type: 'email',
            message: '请输入正确的邮箱地址',
            trigger: ['blur', 'change']
          }
        ],
        code: [
          {
            required: true,
            message: '请输入验证码',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'blur'
          },
          {
            min: 3,
            max: 8,
            message: '长度在 3 到 8 个字符',
            trigger: 'blur'
          }
        ],
        password: {
          required: true,
          validator: validatePass,
          trigger: 'blur'
        },
        checkPass: {
          required: true,
          validator: validatePass2,
          trigger: 'blur'
        }
      }
    }
  },
  methods: {
    // 点击注册
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          this.$http.post('/register/test', this.ruleForm).then(function (rest) {
            const register = rest.data
            // 提示消息
            that.msg(register.msg)

            // 跳到登录界面
            if (register.code === 200) {
              that.$router.push('/login')
            }
          }, function (error) {
            console.log(error)
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 清空表单
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
    },
    // 发送验证码
    onCode () {
      if (this.ruleForm.email === '') {
        this.msg('邮箱不能为空')
        return false
      }
      const that = this
      this.$http.post('/register/email', this.ruleForm).then(function (rest) {
        const email = rest.data
        that.msg(email.msg)
        if (email.code === 200) {
          // 发送验证码
          that.$http.post('/register/send', that.ruleForm).then(function (rest) {

          })
        }
      }, function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  #login {
    text-align: center;
  }

  #form {
    width: 400px;
    margin: 100px auto;
  }
</style>
