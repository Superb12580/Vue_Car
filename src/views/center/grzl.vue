<template>
  <div>
    <div style="margin-left: 150px">
      <div style="margin-bottom: 50px;margin-left: 270px">
        <div v-if="user.sfrz === 1" style="float: right;margin-right: 380px;margin-top: 130px"><img style="width: 20px" src="../../assets/static/vip.png"><span style="margin-left: 10px;font-size: 10px;color: #ff6700">车家号认证</span></div>
        <el-upload
          action="http://localhost:8081/car/user/upload"
          :data="this.user"
          :on-success="success"
          :auto-upload="true">
          <el-button>
            <img style="width: 120px;height: 120px" v-if="user.photo" :src="user.photo">
            <el-avatar v-else :size="120"> {{user.userName}} </el-avatar>
          </el-button>
        </el-upload>
      </div>
      <div style="margin-left: 80px">
        <el-badge :value="user.messageCount" :max="10" class="item" type="primary">
          <el-button size="small" @click="toMessage">消息</el-button>
        </el-badge>
      <el-badge :value="user.attentionCount" :max="10" class="item">
        <el-button size="small" @click="toAttention">关注</el-button>
      </el-badge>
      <el-badge :value="user.collectionCount" :max="10" class="item" type="primary">
        <el-button size="small" @click="toCollection">收藏</el-button>
      </el-badge>
      <el-badge :value="user.fansCount" :max="10" class="item" type="warning">
        <el-button size="small" @click="toFans">粉丝</el-button>
      </el-badge>
        <el-dropdown style="margin-right: 20px">
  <span class="el-dropdown-link">
    更多<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item><el-button type="text" @click="dialogZlVisible = true, resetForm('zlForm')">编辑资料</el-button></el-dropdown-item>
            <el-dropdown-item><el-button type="text" @click="dialogFormVisible = true, resetForm('ruleForm')">修改密码</el-button></el-dropdown-item>
            <el-dropdown-item disabled divided>换绑邮箱</el-dropdown-item>
            <el-dropdown-item disabled>忘记密码</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      <el-button @click="qd" v-if="user.graded===0" type="success" round>点击签到</el-button>
      <el-button v-if="user.graded===1" type="primary" round disabled>已签到</el-button>
      </div>
    </div>
    <div style="margin-top: 50px">
      <el-row :gutter="20">
        <el-col :span="2" :offset="3"><div class="grid-content bg-purple"><h4>用户名：</h4></div></el-col>
        <el-col :span="3" ><div class="grid-content bg-purple"><h4>{{user.userName}}</h4></div></el-col>
        <el-col :span="2" :offset="3"><div class="grid-content bg-purple"><h4>性别：</h4></div></el-col>
        <el-col :span="3" ><div class="grid-content bg-purple"><h4>{{user.gender === 1 ? '男' : '女'}}</h4></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="2" :offset="3"><div class="grid-content bg-purple"><h4>邮箱：</h4></div></el-col>
        <el-col :span="4" ><div class="grid-content bg-purple"><h4>{{user.email}}</h4></div></el-col>
        <el-col :span="2" :offset="2"><div class="grid-content bg-purple"><h4>积分：</h4></div></el-col>
        <el-col :span="3" ><div class="grid-content bg-purple"><h4>{{user.grade}}</h4></div></el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="3" :offset="3"><div class="grid-content bg-purple"><h4>出生日期：</h4></div></el-col>
        <el-col :span="3" ><div class="grid-content bg-purple"><h4>{{user.dateBirth}}</h4></div></el-col>
        <el-col :span="3" :offset="2"><div class="grid-content bg-purple"><h4>个人签名：</h4></div></el-col>
        <el-col :span="6" ><div class="grid-content bg-purple"><h4>{{user.sign}}</h4></div></el-col>
      </el-row>
    </div>
<!--    修改密码-->
    <el-dialog title="修改密码" :visible.sync="dialogFormVisible" style="width: 1000px;margin: 0 auto">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="旧密码" prop="password">
          <el-input style="width: 300px" type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input style="width: 300px" type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input style="width: 300px" type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-right: 150px;margin-bottom: 30px">
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </div>
    </el-dialog>
<!--    编辑资料-->
    <el-dialog title="编辑资料" :visible.sync="dialogZlVisible">
    <el-form :model="zlForm" :rules="rulesZl" ref="zlForm" label-width="100px" class="demo-ruleForm" style="margin-left: 140px">
      <el-form-item label="用户名" prop="userName">
        <el-input style="width: 300px" v-model="zlForm.userName"></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="zlForm.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="dateBirth">
        <el-date-picker type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期" v-model="zlForm.dateBirth" style="width: 300px"></el-date-picker>
      </el-form-item>
      <el-form-item label="签名" prop="sign">
        <el-input type="textarea" style="width: 300px" v-model="zlForm.sign"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitZlForm ('zlForm')">保存</el-button>
        <el-button @click="resetForm ('zlForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-dialog>
  </div>
</template>
<!--个人资料-->
<script>
export default {
  name: 'grzl',
  // 页面刷新
  inject: ['reload'],
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
      user: {
        userId: '',
        userName: '张三',
        email: '12qwq3456@123.com',
        photo: 'url',
        sign: '这家伙很懒，什么都没有留下。',
        gender: 1,
        dateBirth: '2021-12-15',
        createTime: '2021-12-13 12:12:15',
        grade: 10,
        graded: 0,
        collectionCount: 35,
        attentionCount: 35,
        fansCount: 35,
        messageCount: 35,
        sfrz: 0
      },
      dialogFormVisible: false,
      dialogZlVisible: false,
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
      },
      zlForm: {
        userId: '',
        userName: '',
        gender: '',
        dateBirth: '',
        sign: ''
      },
      rulesZl: {
        userName: [
          { required: true, message: '请输入用户名', trigger: 'change' },
          { min: 1, max: 12, message: '长度在 1 到 12 个字符', trigger: 'change' }
        ],
        gender: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        dateBirth: { required: true, message: '请选择日期', trigger: 'change' }
      }
    }
  },
  methods: {
    // 图片上传成功
    success (response, file, fileList) {
      this.msg(response.msg)
      this.$store.commit('SET_USER', response.data)
      this.reload()
    },
    // 修改密码
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          that.ruleForm.userId = that.$store.getters.GET_USER.userId
          this.$http.post('/user/password', that.ruleForm).then(function (rest) {
            const data = rest.data
            that.msg(data.msg)
            if (data.code === 200) {
              that.dialogFormVisible = false
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
    // 编辑资料
    submitZlForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          that.zlForm.gender = that.zlForm.gender === '男' ? 1 : 0
          this.$http.post('/user/put', that.zlForm).then(function (rest) {
            const data = rest.data
            that.msg(data.msg)
            if (data.code === 200) {
              that.dialogZlVisible = false
              // 更新store
              that.$store.commit('SET_USER', data.data)
              that.reload()
            }
            // that.resetForm('zlForm')
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
    // 签到
    qd () {
      const that = this
      this.$http.post('/user/grade', { userId: that.$store.getters.GET_USER.userId }).then(function (rest) {
        const code = rest.data
        that.user.graded = 1
        that.user.grade = that.user.grade + 10
        that.msg(code.msg)
      }, function (error) {
        console.log(error)
      })
    },
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    },
    toAttention () {
      this.$router.push('/wdgz')
    },
    toCollection () {
      this.$router.push('/wdsc')
    },
    toFans () {
      this.$router.push('/wdfs')
    },
    toMessage () {
      this.$router.push('/wdxx')
    }
  },
  created () {
    const that = this
    this.$http.get('/user/user?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.user = rest.data.data
      // 编辑资料回显
      that.zlForm.userId = rest.data.data.userId
      that.zlForm.userName = rest.data.data.userName
      that.zlForm.dateBirth = rest.data.data.dateBirth
      that.zlForm.gender = rest.data.data.gender === 1 ? '男' : '女'
      that.zlForm.sign = rest.data.data.sign
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .el-row {
    margin-bottom: 20px;
  }
  :last-child {
    margin-bottom: 0;
  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }
  .bg-purple {
    background: #d3dce6;
  }
  .bg-purple-light {
    background: #e5e9f2;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
</style>
