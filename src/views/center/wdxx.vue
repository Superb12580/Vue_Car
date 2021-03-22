<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 50px">
        <el-tab-pane label="系统消息" name="first">
          <el-table height="450px"
                    stripe
                    :data="page.records.filter(data => !search || data.messageTitle.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column
              width="120px"
              label="消息标题"
              prop="messageTitle">
            </el-table-column>
            <el-table-column
              width="250px"
              label="消息详情"
              prop="messageText">
            </el-table-column>
            <el-table-column
              width="120px"
              label="发送人"
              prop="userName">
            </el-table-column>
            <el-table-column
              width="260px"
              label="通知时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              width="250px"
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
        </el-tab-pane>
        <el-tab-pane label="动态消息" name="second">
          <el-table height="450px"
                    stripe
                    :data="page2.records.filter(data => !search || data.messageTitle.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column
              width="120px"
              label="消息标题"
              prop="messageTitle">
            </el-table-column>
            <el-table-column
              width="210px"
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
              @size-change="handleSizeChange2"
              @current-change="handleCurrentChange2"
              :current-page="page2.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="page2.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page2.total">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="私信" name="third">
          <el-table height="450px"
                    stripe
                    :data="page3.records.filter(data => !search || data.messageTitle.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column
              width="120px"
              label="消息标题"
              prop="messageTitle">
            </el-table-column>
            <el-table-column
              width="250px"
              label="消息详情"
              prop="messageText">
            </el-table-column>
            <el-table-column
              width="120px"
              label="发送人"
              prop="userName">
            </el-table-column>
            <el-table-column
              width="260px"
              label="通知时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              width="250px"
              align="right">
              <template slot="header" slot-scope="scope">
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="输入关键字搜索"/>
              </template>
              <template slot-scope="scope">
                <el-button
                  style="margin-left: 30px"
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <el-pagination
              background="true"
              @size-change="handleSizeChange3"
              @current-change="handleCurrentChange3"
              :current-page="page3.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="page3.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page3.total">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
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
      activeName: 'second',
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      page2: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      page3: {
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
      this.$http.get('/message/item?size=' + val + '&messageType=0&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/message/item?size=' + that.page.size + '&messageType=0&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChange2 (val) {
      const that = this
      this.$http.get('/message/item?size=' + val + '&messageType=1&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page2 = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange2 (val) {
      const that = this
      this.$http.get('/message/item?size=' + that.page2.size + '&messageType=1&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page2 = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChange3 (val) {
      const that = this
      this.$http.get('/message/item?size=' + val + '&messageType=2&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page3 = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange3 (val) {
      const that = this
      this.$http.get('/message/item?size=' + that.page3.size + '&messageType=2&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page3 = rest.data.data
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
    },
    handleClick (tab, event) {
      console.log(tab, event)
    }
  },
  created () {
    const that = this
    this.$http.get('/message/item?messageType=0&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
    this.$http.get('/message/item?messageType=1&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page2 = rest.data.data
    }, function (error) {
      console.log(error)
    })
    this.$http.get('/message/item?messageType=2&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page3 = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
</style>
