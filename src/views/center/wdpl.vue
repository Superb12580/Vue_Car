<template>
  <div>
    <div style="margin-left: 1000px">
      <el-button type="primary" icon="el-icon-plus" round @click="to">发表</el-button>
    </div>
    <div>
      <el-timeline>
        <el-timeline-item v-for='record in page.records' :key="index" placement="top">
          <h3>{{record.commentText}}</h3>
          <h5>评论于 {{record.createTime}}</h5>
          <el-card v-if="record.essay">
            <router-link :to="{name: 'ckyh',query: {userId: record.essay.userId}}"><el-avatar :size="60" style="color: indianred"> {{record.essay.user.userName}} </el-avatar></router-link>
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
</template>
<!--我的评论-->
<script>
export default {
  name: 'wdpl',
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/comment/item?size=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/comment/item?size=' + that.page.size + '&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 跳转发表动态
    to () {
      this.$router.push('/fbdt')
    },
    // 转发
    forward (essayId) {
      this.$prompt('说点什么吧...', '转发', {
        confirmButtonText: '转发',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const that = this
        this.$http.post('/forward/add', { userId: that.$store.getters.GET_USER.userId, essayId: essayId, forwardTitle: value }).then(rest => {
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
      const that = this
      this.$http.post('/agree/addDelete', { userId: that.$store.getters.GET_USER.userId, essayId: essayId }).then(rest => {
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
    const that = this
    this.$http.get('/comment/item?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
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
</style>
