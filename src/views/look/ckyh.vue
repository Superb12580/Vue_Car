<template>
  <div>
    <Header></Header>
    <div style="margin-left: 180px;margin-top: 25px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cyq' }">车友圈</el-breadcrumb-item>
        <el-breadcrumb-item><span style="color: #409EFF"> {{user.userName}} </span>的个人中心</el-breadcrumb-item>
      </el-breadcrumb>
      <div style="margin: 40px 0 30px 420px">
        <img style="width: 80px;height: 80px" v-if="user.photo" :src="user.photo">
        <el-avatar v-else :size="80"> {{user.userName}} </el-avatar>
        <div v-if="user.sfrz === 1" style="margin-top: 15px"><img style="width: 20px" src="../../assets/static/vip.png"><span style="margin-left: 10px;font-size: 10px;color: #ff6700">车家号认证</span></div>
        <div style="margin-left: 100px" v-show="!flag">
          <el-button style="margin-right: 20px" type="info" round size="mini" icon="el-icon-phone-outline" plain @click="sx">私信</el-button>
          <el-button v-if="user.flagAttention === 0" icon="el-icon-plus" @click="attention" type="primary" round size="mini">关注</el-button>
          <el-button v-else icon="el-icon-check" type="success" round size="mini" @click="attention">已关注</el-button>
        </div>
      </div>
      <div style="margin-left: 160px">
        <el-badge v-if="user.sfrz === 1" :value="user.newsCount" :max="10" class="item">
          <el-button size="small" @click="toWz(user.userId)">Ta的文章</el-button>
        </el-badge>
      <el-badge :value="user.attentionCount" :max="10" class="item">
        <el-button size="small" @click="toAttention(user.userId, user.userName)">Ta的关注</el-button>
      </el-badge>
      <el-badge :value="user.collectionCount" :max="10" class="item" type="primary">
        <el-button size="small" @click="toCollection(user.userId, user.userName)">Ta的收藏</el-button>
      </el-badge>
      <el-badge :value="user.fansCount" :max="10" class="item" type="warning">
        <el-button size="small" @click="toFans(user.userId, user.userName)">Ta的粉丝</el-button>
      </el-badge>
      <el-badge :value="user.essayCount" :max="10" class="item">
        <el-button size="small" @click="toEssay(user.userId, user.userName)">Ta的动态</el-button>
      </el-badge>
      <el-badge :value="user.commentCount" :max="10" class="item" type="primary">
        <el-button size="small" @click="toComment(user.userId, user.userName)">Ta的评论</el-button>
      </el-badge>
      </div>
    </div>
    <div style="margin-top: 50px;margin-left: 200px">
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
<!--    私信-->
    <el-dialog title="发私信" :visible.sync="dialogFormVisible" style="width: 1000px;margin: 0 auto">
      <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px">
        <el-form-item label="标题" prop="messageTitle">
          <el-input style="width: 300px" v-model="ruleForm.messageTitle" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="私信内容" prop="messageText">
          <el-input style="width: 300px" type="textarea" v-model="ruleForm.messageText" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" style="margin-right: 150px;margin-bottom: 30px">
        <el-button type="primary" @click="send('ruleForm')">发送</el-button>
        <el-button @click="resetForm('ruleForm')">清空</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<!--个人资料-->
<script>
import Header from '../../components/header'
export default {
  components: { Header },
  name: 'ckyh',
  data () {
    return {
      // 是否为本人
      flag: false,
      // 私信弹窗
      dialogFormVisible: false,
      // 私信
      ruleForm: {
        thisId: '',
        thatId: '',
        messageTitle: '',
        messageText: ''
      },
      rules: {
        messageText: { required: true, message: '请输入私信内容', trigger: 'blur' }
      },
      user: {
        userId: '',
        userName: '张三',
        email: '12qwq3456@123.com',
        photo: '',
        sign: '这家伙很懒，什么都没有留下。',
        gender: 1,
        dateBirth: '2021-12-15',
        createTime: '2021-12-13 12:12:15',
        grade: 10,
        graded: 0,
        collectionCount: 35,
        attentionCount: 35,
        fansCount: 35,
        essayCount: 35,
        forwardCount: 35,
        commentCount: 35,
        flagAttention: 0
      }
    }
  },
  methods: {
    toWz (userId) {
      this.$router.push({ path: '/ckwz', query: { userId: userId } })
    },
    toAttention (userId, userName) {
      this.$router.push({ path: '/ckgz', query: { userId: userId, userName: userName } })
    },
    toCollection (userId, userName) {
      this.$router.push({ path: '/cksc', query: { userId: userId, userName: userName } })
    },
    toFans (userId, userName) {
      this.$router.push({ path: '/ckfs', query: { userId: userId, userName: userName } })
    },
    toEssay (userId, userName) {
      this.$router.push({ path: '/ckdt', query: { userId: userId, userName: userName } })
    },
    toComment (userId, userName) {
      this.$router.push({ name: 'ckpl', query: { userId: userId, userName: userName } })
    },
    // 关注取关
    attention () {
      const thatId = this.$route.query.userId
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.post('/attention/addDelete', { thatId: thatId, thisId: user.userId }).then(function (rest) {
        that.user.flagAttention = that.user.flagAttention === 0 ? 1 : 0
        that.msg(rest.data.msg)
      }, function (error) {
        console.log(error)
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    sx () {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      this.dialogFormVisible = true
      this.resetForm('ruleForm')
    },
    // 私信
    send (formName) {
      const thatId = this.$route.query.userId
      const user = this.$store.getters.GET_USER
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
          that.ruleForm.thisId = thatId
          that.ruleForm.thatId = user.userId
          this.$http.post('/message/add', that.ruleForm).then(function (rest) {
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
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    }
  },
  created () {
    const thatId = this.$route.query.userId
    const user = this.$store.getters.GET_USER
    let userId = '0'
    if (user) {
      userId = user.userId
    }
    // 如果是本人
    if (thatId == userId) {
      this.flag = true
    }
    const that = this
    this.$http.get('/user/item?userId=' + userId + '&thatId=' + thatId).then(function (rest) {
      that.user = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
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
