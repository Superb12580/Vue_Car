<template>
  <div>
    <Header></Header>
    <div style="margin: 50px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cyq' }">车友圈</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'ckyh',query: {userId: userId}}"><span style="color: #409EFF"> {{userName}} </span>的个人中心</el-breadcrumb-item>
        <el-breadcrumb-item> Ta 的评论</el-breadcrumb-item>
      </el-breadcrumb>
      <el-button style="margin-left: 1100px" type="primary" icon="el-icon-plus" round @click="to">发表</el-button>
    </div>
    <div v-if="page.total !== 0">
    <div>
      <el-timeline>
        <el-timeline-item v-for='record in page.records' :key="index" placement="top">
          <h2><router-link :to="{name: 'ckyh',query: {userId: record.userId}}">{{record.user.userName}}</router-link><i class="vip"><img src="../../assets/icons/vip.png" alt="vip" /> </i></h2>
          <h3>{{record.commentText}}</h3>
          <h5>评论于 {{record.createTime}}</h5>
          <el-card style="padding-left: 50px" v-if="record.essay">
            <router-link :to="{name: 'ckyh',query: {userId: record.essay.userId}}">
              <img style="width: 60px;height: 60px" v-if="record.essay.user.photo" :src="record.essay.user.photo">
              <el-avatar v-else :size="60" style="color: indianred"> {{record.essay.user.userName}} </el-avatar>
            </router-link>
            <h2><router-link :to="{name: 'dtxq',query: {essayId: record.essay.essayId}}">{{record.essay.essayTitle}}</router-link></h2>
            <h4 style="color: red" v-if="record.essay.label">#{{record.essay.label.labelText}}#</h4>
            发表于 {{record.essay.createTime}}
            <el-badge :value="record.essay.forwardCount" class="item2" type="primary">
              <el-button size="small" @click="forward(record.essay.essayId)">转发</el-button>
            </el-badge>
            <el-badge :value="record.essay.agreeCount" class="item">
              <el-button size="small" @click="agree(record.essay.essayId)">点赞</el-button>
            </el-badge>
            <el-badge :value="record.essay.commentCount" class="item" type="warning">
              <el-button size="small">评论</el-button>
            </el-badge>
          </el-card>
          <el-card v-else>
            <h4>原文已删除</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div>
      <el-pagination
        background="true"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page.current"
        :page-sizes="[5, 8, 10, 15]"
        :page-size="page.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="page.total">
      </el-pagination>
    </div>
    </div>
    <div style="margin: 200px 500px" v-else><h2 style="color: red">暂无数据</h2></div>
  </div>
</template>
<!--我的评论-->
<script>
import Header from '../../components/header'
export default {
  name: 'ckpl',
  components: { Header },
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      // 用户Id
      userId: '',
      // 用户名称
      userName: '张三'
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/comment/item?size=' + val + '&userId=' + that.userId).then(function (rest) {
        that.page = rest.data.data
        // 处理照片
        for (const i in rest.data.data.records) {
          that.page.records[i].essay.user.photo = require('../../assets/' + rest.data.data.records[i].essay.user.photo)
        }
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/comment/item?size=' + that.page.size + '&current=' + val + '&userId=' + that.userId).then(function (rest) {
        that.page = rest.data.data
        // 处理照片
        for (const i in rest.data.data.records) {
          that.page.records[i].essay.user.photo = require('../../assets/' + rest.data.data.records[i].essay.user.photo)
        }
      }, function (error) {
        console.log(error)
      })
    },
    // 跳转发表动态
    to () {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      this.$router.push('/fbdt')
    },
    // 转发
    forward (essayId) {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      this.$prompt('说点什么吧...', '转发', {
        confirmButtonText: '转发',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const that = this
        this.$http.post('/forward/add', { userId: user.userId, essayId: essayId, forwardTitle: value }).then(rest => {
          that.$router.push('/cyq')
        })
        const msg = value == null ? '' : value
        this.$message({
          type: 'success',
          message: '已转发 ' + msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消转发'
        })
      })
    },
    // 点赞
    agree (essayId) {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.post('/agree/addDelete', { userId: user.userId, essayId: essayId }).then(rest => {
        that.reload()
        const msg = rest.data.msg
        that.msg(msg)
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
    this.userId = this.$route.query.userId
    this.userName = this.$route.query.userName
    const that = this
    this.$http.get('/comment/item?userId=' + this.userId).then(function (rest) {
      that.page = rest.data.data
      // 处理照片
      for (const i in rest.data.data.records) {
        that.page.records[i].essay.user.photo = require('../../assets/' + rest.data.data.records[i].essay.user.photo)
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
  .item2 {
    margin-top: 10px;
    margin-right: 40px;
    margin-left: 500px;
  }
  .vip img{
    margin: 0 3px;
    width: 40px;
  }
  a {
    color: #000;
    text-decoration: none;
  }
</style>
