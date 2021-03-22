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
                <h2>邮箱注册</h2>
              </div>
              <el-form
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <div class="items">
                  <div class="mobile">
                    <div class="txt">
                      <!-- <span class="chose">+86</span> -->
                      <el-form-item label="电子邮箱" prop="email">
                        <el-input
                          placeholder="请填写邮箱地址"
                          v-model="ruleForm.email">
<!--                          @blur="sendEmail"-->
                        </el-input>
                      </el-form-item>

                      <span class="ico"></span>
                    </div>
                  </div>
                </div>
                <div class="items">
                  <div class="phone-nums">
                    <div class="aaa">
                      <el-form-item
                        label="获取验证码"
                        class="checke"
                        prop="code"
                      >
                        <el-input
                          v-model="ruleForm.code"
                          placeholder="请输入验证码"
                        ></el-input>
                      </el-form-item>
                      <el-button slot="append" @click="oncode">发送验证码</el-button>
                    </div>
                  </div>
                </div>
                <div class="items">
                  <div class="user">
                    <el-form-item label="输入用户名" prop="userName">
                      <el-input
                        placeholder="请输入用户名"
                        type="text"
                        v-model="ruleForm.userName"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="items">
                  <div class="psw">
                    <el-form-item label="输入密码" prop="password">
                      <el-input
                        placeholder="请输入密码"
                        type="password"
                        v-model="ruleForm.password"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="items">
                  <div class="psw-sure">
                    <el-form-item label="确认密码" prop="checkPass">
                      <el-input
                        placeholder="请输入相同的密码"
                        type="password"
                        v-model="ruleForm.checkPass"
                        autocomplete="off"
                      ></el-input>
                    </el-form-item>
                  </div>
                </div>
                <div class="footer">
                  <input type="checkbox"/>
                  <span class="read">
                    <span>我已阅读并同意</span>
                    <a href="javascript:;"> 服务声明和隐私条款 </a>
                  </span>

                  <div class="register">
                    <el-button
                      class="btn1"
                      type="primary"
                      @click="submitForm('ruleForm')"
                    >注册
                    </el-button
                    >
                  </div>
                  <div class="had">
                    已有汽车之家帐号，
<!--                    <button @click="flash()">立即登录</button>-->
                     <router-link  to="/login">立即登录</router-link>
                  </div>
                </div>
                <div class="bottom"></div>
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
  name: 'register',
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
      } else if (value !== this.ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }

    return {
      activeName: 'second',
      ruleForm: {
        email: '',
        userName: '',
        password: '',
        checkPass: '',
        code: ''
      },

      rules: {
        email: [
          {
            required: true,
            message: '请填写电子邮箱',
            trigger: 'blur'
          }
        ],
        userName: [
          {
            required: true,
            message: '请填写用户名',
            trigger: 'blur'
          },
          {
            min: 1,
            max: 12,
            message: '长度在1-12',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            validator: validatePass,
            trigger: 'blur'
          },
          {
            min: 1,
            max: 12,
            message: '长度在1-12',
            trigger: 'blur'
          }
        ],
        checkPass: [
          {
            required: true,
            validator: validatePass2,
            trigger: 'blur'
          }
        ],
        code: [
          {
            required: true,
            message: '请填写验证码',
            trigger: 'blur'
          },
          {
            min: 6,
            max: 6,
            message: '长度为6位',
            trigger: 'blur'
          }
        ]
      }
    }
  },

  methods: {
    sendEmail () {
      var regEmail = /^([a-zA-Z]|[0-9])(\w|\\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
      if (
        this.ruleForm.email !== '' &&
        !regEmail.test(this.ruleForm.email)
      ) {
        this.$message({
          message: '邮箱格式不正确',
          type: 'error'
        })
        return false
      }
    },
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
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    },
    // 发送验证码
    oncode () {
      if (this.ruleForm.email === '') {
        this.msg('邮箱不能为空')
        return false
      }
      if (this.sendEmail() === false) {
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
    background: url(../../assets/bg.png) #fff center 70px no-repeat;
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
    background-image: url(../../assets/icon.png);
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
    background-image: url(../../assets/jg.png);
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
    background: url(../../assets/reate.png) center no-repeat;
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
    background: url(../../assets/right.png) right center no-repeat;
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
    background-image: url(../../assets/bottom.png);
    background-repeat: no-repeat;
    z-index: 1000000;
  }
</style>
