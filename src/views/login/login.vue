<template>
  <div class="register">
    <div class="big-box">
      <div class="center">
        <div class="box">
          <div class="left">
            <div class="items">
              <div class="item">
                <div class="icon icon1"></div>
                <div class="text">
                  <div class="nums">1亿+</div>
                  <div class="people">全国注册用户数</div>
                </div>
              </div>
              <div class="item">
                <div class="icon icon2"></div>
                <div class="text">
                  <div class="nums">1亿+</div>
                  <div class="people">汽车资讯总数</div>
                </div>
              </div>
              <div class="item">
                <div class="icon icon3"></div>
                <div class="text">
                  <div class="nums">500万+</div>
                  <div class="people">每日发布资讯数</div>
                </div>
              </div>
              <div class="item">
                <div class="icon icon4"></div>
                <div class="text">
                  <div class="nums">5,000万+</div>
                  <div class="people">每周发往车企业资讯数</div>
                </div>
              </div>
            </div>
          </div>
          <div class="right">
            <div class="contain">
              <div class="head">
                <router-link :to="{name: 'home'}"><img src="../../assets/static/logo.png"></router-link>
              </div>
              <el-form id="form" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="用户名" prop="userName">
                  <el-input v-model="ruleForm.userName" placeholder="用户名或邮箱"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input v-model="ruleForm.password" placeholder="密码" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                  <el-button @click="zc">立即注册</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      ruleForm: {
        userName: '',
        password: ''
      },
      rules: {
        userName: {
          required: true,
          message: '请输入用户名或邮箱',
          trigger: 'blur'
        },
        password: {
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }
      }
    }
  },

  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          this.$http.post('/login/test', this.ruleForm).then(function (rest) {
            const login = rest.data

            // 提示消息
            that.msg(login.msg)

            // 跳到主界面
            if (login.code === 200) {
              that.$store.commit('SET_USER', login.data)
              that.$router.push('/')
              if (login.data.sxts > 0) {
                that.msg2(login.data.sxts)
              }
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
    msg2 (data) {
      this.$notify({
        title: '提醒',
        message: '新收到 ' + data + ' 条消息',
        offset: 145,
        type: 'success'
      })
    },
    // 跳转注册
    zc () {
      this.$router.push('/register')
    }
  }
}
</script>
<style scoped>
  a {
    text-decoration: none;
  }

  .big-box {
    min-width: 1102px;
  }

  .big-box .header {
    height: 60px;
    line-height: 60px;
    background-color: #fff;
    border-bottom: 1px solid #e8e8e8;
    text-align: center;
  }

  .big-box .header .left,
  .big-box .header .right {
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }

  .big-box .left img.logo {
    display: inline-block;
    width: 90px;
    height: 40px;
    margin-bottom: 5px;
    cursor: pointer;
  }

  .big-box .left img.text {
    display: inline-block;
    width: 162px;
    height: 17px;
    margin-left: 10px;
  }

  .header .left h2 {
    font-weight: normal;
    color: #333;
    font-size: 22px;
    font-family: Arial, Helvetica, sans-serif;
  }

  .header .left span::before {
    display: inline-block;
    content: "";
    width: 1px;
    height: 22px;
    margin: 20px 10px 0;
    background-color: #ccc;
  }

  .big-box .header .right a {
    font-size: 14px;
    color: #333;
    margin-left: 30px;
  }

  .big-box .header .right a:hover {
    color: #ff6000;
  }

  .center {
    width: 1002px;
    height: 800px;
    margin: 0 auto;
    padding: 60px 0 20px;
    background: url(../../assets/static/bg.png) #fff center 70px no-repeat;
  }

  .center .box {
    display: flex;
    justify-content: flex-start;
    width: 758px;
    margin: 0 auto;
    border: 1px solid #ccc;
    border-top: transparent;
    border-bottom: transparent;
  }

  .box .left {
    width: 159px;
    padding: 50px 40px 0;
    border-top: 10px solid #ff9f20;
    background-color: #fff;
  }

  .box .left .item {
    margin-bottom: 60px;
    padding-left: 50px;
    position: relative;
  }

  .box .left .item .icon {
    position: absolute;
    width: 32px;
    height: 32px;
    top: 50%;
    left: 0;
    margin-top: -16px;
    background-image: url(../../assets/static/icon.png);
    background-repeat: no-repeat;
  }

  .icon1 {
    background-position: 0 0;
  }

  .icon2 {
    background-position: 0 -35px;
  }

  .icon3 {
    background-position: 0 -70px;
  }

  .icon4 {
    background-position: 0 -105px;
  }

  .box .left .item .text .nums {
    font-size: 14px;
    color: #666;
  }

  .box .left .item .text .people {
    font-size: 12px;
    color: #999;
  }

  .center .box .right {
    position: relative;
    width: 440px;
    padding: 0 40px 32px;
    border-top: 10px solid #ffc666;
    background-color: #fff;
    border-left: 2px dashed #ddd;
  }

  .right .contain .head {
    padding: 40px 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .right .contain .head h2 {
    font-size: 24px;
    font-weight: normal;
    color: #ff6000;
  }

  .right .contain .head a {
    color: #333;
  }

  .right .contain .head a:hover {
    color: #ff6000;
  }

  .txt {
    height: 40px;
    line-height: 40px;
  }

  .box .right {
    z-index: 0;
  }

  .box .right .contain .items {
    margin-bottom: 30px;
  }

  .box .right .contain .items label {
    display: block;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #333;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
  }

  .box .right .contain .items label span {
    padding-left: 20px;
    line-height: 15px;
    color: #ff6000;
    font-size: 12px;
    font-weight: normal;
    background-image: url(../../assets/static/jg.png);
    background-repeat: no-repeat;
    display: none;
  }

  .box .right .contain .items label span.active {
    display: block;
  }

  .box .right .contain .txt {
    font-size: 0;
    position: relative;
  }

  .box .right .contain .txt span.ico {
    position: absolute;
    width: 36px;
    height: 40px;
    text-align: center;
    top: 0;
    right: 0;
    background: url(../../assets/static/reate.png) center no-repeat;
    display: none;
  }

  .box .right .contain .txt span.active {
    display: block;
  }

  .contain .txt .chose {
    color: #aaa;
    font-size: 14px;
    display: inline-block;
    width: 56px;
    text-align: center;
    position: relative;
  }

  .contain .txt .chose::after {
    display: inline-block;
    content: "";
    width: 1px;
    height: 20px;
    background-color: #ccc;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }

  .contain .txt input::-webkit-input-placeholder {
    font-size: 14px;
    color: #ccc;
  }

  .contain .txt input {
    border: 0;
    outline: 0;
    width: 326px;
    height: 38px;
    line-height: 41px;
    padding-left: 10px;
    padding-right: 37px;
    background-color: #fff;
  }

  #phoneNums {
    width: 218px;
    padding-right: 80px;
  }

  .items .phone-nums .aaa {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .items .phone-nums .aaa .send {
    font-size: 14px;
    text-align: center;
    width: 108px;
    height: 40px;
    line-height: 40px;
    border-radius: 3px;
    background-color: #fff2e3;
    border: 1px solid #ffb865;
    color: #ff6000;
  }

  .items .phone-nums .aaa a:hover {
    background-color: #ffe8cd;
    border-color: #ffb865;
  }

  .items .phone-nums .aaa .checke {
    margin-bottom: 0;
  }

  .footer {
    position: relative;
  }

  .footer .register .btn1 {
    color: #fff;
    width: 438px;
    height: 40px;
    text-align: center;
    font-size: 18px;
    margin: 20px 0 30px;
    border: 0;
    outline: 0;
    background-color: #ff6000;
    border-radius: 3px;
    cursor: pointer;
  }

  .footer .had {
    text-align: center;
  }

  .footer .had a {
    color: #ff6000;
    padding-right: 20px;
    background: url(../../assets/static/right.png) right center no-repeat;
  }

  .footer .had a:hover {
    text-decoration: underline;
  }

  .bottom {
    width: 760px;
    height: 18px;
    margin: 0 auto;
    position: absolute;
    left: -241px;
    bottom: -10px;
    background-image: url(../../assets/static/bottom.png);
    background-repeat: no-repeat;
    z-index: 1000000;
  }
</style>
