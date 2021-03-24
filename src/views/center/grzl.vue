<template>
  <div>
    <div style="margin-left: 150px">
      <div style="margin-bottom: 50px;margin-left: 250px"><el-avatar :size="80"> {{user.userName}} </el-avatar></div>
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
      <el-button @click="qd" v-if="user.graded===0" type="success" round>点击签到</el-button>
      <el-button v-if="user.graded===1" type="primary" round disabled>已签到</el-button>
      </div>
    </div>
    <div style="margin-top: 50px">
      <el-row :gutter="20">
        <el-col :span="2" :offset="3"><div class="grid-content bg-purple"><h4>用户名：</h4></div></el-col>
        <el-col :span="3" ><div class="grid-content bg-purple"><h4>{{user.userName}}</h4></div></el-col>
        <el-col :span="2" :offset="3"><div class="grid-content bg-purple"><h4>性别：</h4></div></el-col>
        <el-col :span="3" ><div class="grid-content bg-purple"><h4>{{user.gender}}</h4></div></el-col>
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
export default {
  name: 'grzl',
  // 页面刷新
  inject: ['reload'],
  data () {
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
        messageCount: 35
      }
    }
  },
  methods: {
    // 签到
    qd () {
      const that = this
      this.$http.post('/user/grade', { userId: that.$store.getters.GET_USER.userId }).then(function (rest) {
        const code = rest.data
        that.reload()
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
