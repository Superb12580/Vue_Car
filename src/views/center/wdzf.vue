<template>
  <div>
    <el-button style="margin-left: 1000px" type="primary" icon="el-icon-plus" round @click="to">发表</el-button>
    <div v-if="page.total !== 0">
    <div>
      <el-timeline>
        <el-timeline-item v-for='(record,index) in page.records' :key="index" placement="top">
          <el-button style="float: right;margin-top: 20px" icon="el-icon-delete" type="text" @click="sczf(record.id, record.userId, record.essay.essayId)">删除</el-button>
          <h3 v-if="record.forwardTitle">{{record.forwardTitle}}</h3>
          <h3 style="height: 10px;width: 15px" v-else></h3>
          <h5>转发于 {{record.createTime}}</h5>
          <el-card v-if="record.essay">
            <router-link :to="{name: 'ckyh',query: {userId: record.essay.userId}}">
              <img style="width: 60px;height: 60px" v-if="record.essay.user.photo" :src="record.essay.user.photo">
              <el-avatar v-else :size="60" style="color: indianred"> {{record.essay.user.userName}} </el-avatar>
            </router-link>
            <h2><router-link :to="{name: 'dtxq',query: {essayId: record.essay.essayId}}">{{record.essay.essayTitle}}</router-link></h2>
            <h4 style="color: red" v-if="record.essay.essayLabel">
              <span style="margin-right: 20px" v-for="item in record.essay.essayLabel">#{{item.labelText}}#</span>
            </h4>
            发表于 {{record.essay.createTime}}
            <el-badge :value="record.essay.forwardCount" class="item2" type="primary">
              <el-button size="small" @click="forward(record.essay.essayId)">转发</el-button>
            </el-badge>
            <el-badge :value="record.essay.agreeCount" class="item">
              <el-button size="small" @click="agree(record.essay.essayId)">点赞</el-button>
            </el-badge>
            <el-badge :value="record.essay.commentCount" class="item" type="warning">
              <el-button size="small" @click="comment(record.essay.essayId)">评论</el-button>
            </el-badge>
          </el-card>
          <el-card v-else>
            <h4>原文已删除</h4>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
    <div style="margin-left: 50px">
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
<!--我的动态-->
<script>
export default {
  name: 'wdzf',
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
      this.$http.get('/forward/item?size=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/forward/item?size=' + that.page.size + '&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 评论
    comment (essayId) {
      const user = this.$store.getters.GET_USER
      this.$prompt('说说你的看法...', '评论', {
        confirmButtonText: '评论',
        cancelButtonText: '取消',
        inputPattern: /[^]/,
        inputErrorMessage: '说点什么吧...'
      }).then(({ value }) => {
        const that = this
        this.$http.post('/comment/add', { userId: user.userId, essayId: essayId, commentText: value }).then(rest => {
          that.reload()
        })
        this.$message({
          type: 'success',
          message: '已评论 ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        })
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
    // 删除转发
    sczf (id, userId, essayId) {
      const that = this
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$http.post('/forward/delete', { id: id, userId: userId, essayId: essayId }).then(function (rest) {
          that.msg(rest.data.msg)
          that.reload()
        }, function (error) {
          console.log(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
    this.$http.get('/forward/item?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
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
  a {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
</style>
