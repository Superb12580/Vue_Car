<template>
  <div>
    <Header></Header>
    <div class="step">
    <el-steps :space="200" :active="flag" finish-status="success">
      <el-step title="标签" description="选择一个标签">></el-step>
      <el-step title="标题" description="长度在 3 到 150 个字符">></el-step>
      <el-step title="正文" description="美好的事情就发生在笔尖">></el-step>
    </el-steps>
    </div>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <div style="margin-bottom: 20px">
        <el-form-item label="标签" prop="essayLabel">
      <el-select clearable style="width: 400px" v-model="ruleForm.essayLabel" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.labelId"
          :label="item.labelText"
          :value="item.labelId">
        </el-option>
      </el-select>
        </el-form-item>
      </div>
      <div @click="flag1">
      <el-form-item label="标题" prop="essayTitle">
        <el-input style="width: 400px" v-model="ruleForm.essayTitle"></el-input>
      </el-form-item>
      </div>
      <div @click="flag2">
      <el-form-item label="正文" prop="essayText">
        <mavon-editor v-model="ruleForm.essayText"></mavon-editor>
      </el-form-item>
      </div>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
  components: { Header },
  name: 'fbdt',
  data () {
    return {
      flag: 0,
      ruleForm: {
        essayTitle: '',
        essayText: '',
        userId: '',
        // 标签值
        essayLabel: ''
      },
      rules: {
        essayTitle: [
          { required: true, message: '请输入标题', trigger: 'blur' },
          { min: 3, max: 150, message: '长度在 3 到 150 个字符', trigger: 'blur' }
        ],
        essayText: [
          { required: true, message: '请输入正文', trigger: 'blur' }
        ]
      },
      options: []
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.flag = 3
          this.$confirm('确认是否发布?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            const that = this
            // 用户id
            that.ruleForm.userId = this.$store.getters.GET_USER.userId
            this.$http.post('/essay/add', this.ruleForm).then(function (rest) {
              that.$router.push('/wddt')
            }, function (error) {
              console.log(error)
            })

            this.$message({
              type: 'success',
              message: '发布成功!'
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消发布'
            })
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.flag = 0
      this.$refs[formName].resetFields()
    },
    flag1 () {
      this.flag = 1
    },
    flag2 () {
      this.flag = 2
    }
  },
  created () {
    const that = this
    this.$http.get('/label/list').then(function (rest) {
      that.options = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>
<style scoped>
  .step {
    margin: 50px 50px 50px 450px;
  }
</style>
