<template>
  <div id="edit">
    <el-form id="form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
<!--      <el-form-item label="头像" prop="photo">-->
<!--&lt;!&ndash;        <el-input type="file" v-model="ruleForm.photo"></el-input>&ndash;&gt;-->
<!--        <input type="file" name="photo"/>-->
<!--      </el-form-item>-->
<!--      <el-upload action="G:/upload_file" list-type="picture-card" :auto-upload="false">-->
<!--        <i slot="default" class="el-icon-plus"></i>-->
<!--        <div slot="file" slot-scope="{file}">-->
<!--          <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">-->
<!--          <span class="el-upload-list__item-actions">-->
<!--            <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">-->
<!--              <i class="el-icon-zoom-in"></i>-->
<!--            </span>-->
<!--            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleDownload(file)">-->
<!--              <i class="el-icon-download"></i>-->
<!--            </span>-->
<!--            <span v-if="!disabled" class="el-upload-list__item-delete" @click="handleRemove(file)">-->
<!--              <i class="el-icon-delete"></i>-->
<!--            </span>-->
<!--          </span>-->
<!--        </div>-->
<!--      </el-upload>-->
<!--      <el-dialog :visible.sync="ruleForm.dialogVisible">-->
<!--        <img width="100%" :src="ruleForm.photo" alt="">-->
<!--      </el-dialog>-->
<!--      &lt;!&ndash;      图片上传结束&ndash;&gt;-->
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="ruleForm.userName" clearable></el-input>
      </el-form-item>
      <el-form-item label="性别" prop="gender">
        <el-radio-group v-model="ruleForm.gender">
          <el-radio label="1" value="男"></el-radio>
          <el-radio label="0" value="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="出生日期" prop="dateBirth">
        <el-date-picker v-model="ruleForm.dateBirth" type="date" placeholder="选择日期"
                        style="width: 300px"></el-date-picker>
      </el-form-item>
      <el-form-item label="个性签名">
        <el-input type="textarea" v-model="ruleForm.sign" clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>export default {
  name: 'edit',
  data () {
    return {
      ruleForm: {
        userName: '',
        gender: '',
        dateBirth: '',
        sign: ''
        // 上传
        // photo: '',
        // dialogVisible: false,
        // disabled: false
      },
      rules: {
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
        gender: [
          {
            required: true,
            message: '请选择性别',
            trigger: 'change'
          }
        ],
        dateBirth: [
          {
            type: 'date',
            required: true,
            message: '请选择日期',
            trigger: 'change'
          }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          this.$http.put('/user/put', this.ruleForm).then(function (rest) {
            const put = rest.data
            // 提示消息
            that.msg(put.msg)

            // 跳到登录界面
            if (put.code === 200) {
              that.$router.push('/')
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
    // 上传
    // handleRemove (file) {
    //   console.log(file)
    // },
    // handlePictureCardPreview (file) {
    //   this.dialogImageUrl = file.url
    //   this.dialogVisible = true
    // },
    // handleDownload (file) {
    //   console.log(file)
    // }
  }
}
</script>

<style scoped>
  #edit {
    text-align: center;
  }

  #form {
    width: 400px;
    margin: 100px auto;
  }
</style>
