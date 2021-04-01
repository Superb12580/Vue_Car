<template>
  <div>
    <Header></Header>
    <div style="margin-left: 150px">
      <div style="margin: 80px 450px 30px 450px">
        <img style="width: 80px;height: 80px" v-if="user.photo" :src="user.photo">
        <el-avatar v-else :size="80"> {{user.userName}} </el-avatar>
        <el-button style="margin-left: 50px" v-if="user.flagAttention === 0" icon="el-icon-plus" @click="attention" type="primary" plain round size="mini">关注</el-button>
        <el-button style="margin-left: 50px" v-else icon="el-icon-check" type="success" round size="mini" @click="attention">已关注</el-button>
      </div>
      <div style="margin-left: 210px">
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
    if (thatId === userId) {
      this.$router.push('/grzl')
      return false
    }
    const that = this
    this.$http.get('/user/item?userId=' + userId + '&thatId=' + thatId).then(function (rest) {
      that.user = rest.data.data
      if (rest.data.data.photo) {
        that.user.photo = require('../../assets/' + rest.data.data.photo)
      }
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
