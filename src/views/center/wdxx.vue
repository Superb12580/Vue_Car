<template>
  <div>
    <el-table height="520px"
      :data="page.records.filter(data => !search || data.messageTitle.toLowerCase().includes(search.toLowerCase()))"
      style="width: 100%">
      <el-table-column
        width="120px"
        label="消息类型"
        prop="messageType2">
      </el-table-column>
      <el-table-column
        width="120px"
        label="消息标题"
        prop="messageTitle">
      </el-table-column>
      <el-table-column
        width="200px"
        label="消息详情"
        prop="messageText">
      </el-table-column>
      <el-table-column
        width="120px"
        label="发送人"
        prop="userName">
      </el-table-column>
      <el-table-column
        width="160px"
        label="通知时间"
        prop="createTime">
      </el-table-column>
      <el-table-column
        v-show="messageType=1"
        label="相关动态"
        prop="essayTitle">
      </el-table-column>
      <el-table-column
        width="150px"
        align="right">
        <template slot="header" slot-scope="scope">
          <el-input
            v-model="search"
            size="mini"
            placeholder="输入关键字搜索"/>
        </template>
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
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
<!--我的消息-->
<script>
export default {
  name: 'wdxx',
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
      search: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/message/item?size=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/message/item?size=' + that.page.size + '&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleDelete (index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
        const that = this
        this.$http.post('/message/delete', row).then(function (rest) {
          // 刷新页面
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
    }
  },
  created () {
    const that = this
    this.$http.get('/message/item?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
