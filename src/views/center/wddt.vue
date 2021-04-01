<template>
  <div>
    <el-button style="margin-left: 1000px" type="primary" icon="el-icon-plus" round @click="to">发表</el-button>
    <div v-if="page.total !== 0">
    <div>
      <el-timeline>
        <el-timeline-item v-for='(record,index) in page.records' :key="index" placement="top">
          <el-card>
            <h2><router-link :to="{name: 'dtxq',query: {essayId: record.essayId}}">{{record.essayTitle}}</router-link></h2>
            <h4 style="color: red" v-if="record.essayLabel">
              <span style="margin-right: 20px" v-for="item in record.essayLabel">#{{item.labelText}}#</span>
            </h4>
            发表于 {{record.createTime}}
            <el-badge :value="record.forwardCount" class="item2" type="primary">
              <el-button size="small" @click="forward(record.essayId)">转发</el-button>
            </el-badge>
            <el-badge :value="record.agreeCount" class="item">
              <el-button size="small" @click="agree(record.essayId)">点赞</el-button>
            </el-badge>
            <el-badge :value="record.commentCount" class="item" type="warning">
              <el-button size="small">评论</el-button>
            </el-badge>
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
  name: 'wddt',
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
      this.$http.get('/essay/user?size=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/essay/user?size=' + that.page.size + '&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
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
    },
    // 跳转发表动态
    to () {
      this.$router.push('/fbdt')
    }
  },
  created () {
    const that = this
    this.$http.get('/essay/user?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
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
