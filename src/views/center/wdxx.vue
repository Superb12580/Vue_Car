<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick" style="margin-left: 50px">
        <el-tab-pane label="系统消息" name="first">
          <el-table height="450px"
                    stripe
                    :data="page.records.filter(data => !search || data.messageText.toLowerCase().includes(search.toLowerCase()))"
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
              label="发送人"
              width="120px">
            <template slot-scope="scope">
              <router-link :to="{name: 'ckyh',query: {userId: scope.row.thatId}}">{{scope.row.userName}}</router-link>
            </template>
            </el-table-column>
            <el-table-column
              width="200px"
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
                    :data="page2.records.filter(data => !search || data.messageText.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column
              width="120px"
              label="消息标题"
              prop="messageTitle">
            </el-table-column>
            <el-table-column
              width="110px"
              label="相关人">
              <template slot-scope="scope">
                <router-link :to="{name: 'ckyh',query: {userId: scope.row.userId}}">{{scope.row.user.userName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              width="210px"
              label="消息详情"
              prop="messageText">
            </el-table-column>
            <el-table-column
              width="120px"
              label="发送人">
              <template slot-scope="scope">
                <router-link :to="{name: 'ckyh',query: {userId: scope.row.thatId}}">{{scope.row.userName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              width="160px"
              label="通知时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              label="相关动态">
              <template slot-scope="scope">
                <router-link :to="{name: 'dtxq',query: {essayId: scope.row.essayId}}">{{scope.row.essayTitle}}</router-link>
              </template>
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
<!--        -->
        <el-tab-pane label="评论消息" name="xr">
          <el-table height="450px"
                    stripe
                    :data="page4.records.filter(data => !search || data.messageText.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column
              width="120px"
              label="消息标题"
              prop="messageTitle">
            </el-table-column>
            <el-table-column
              width="110px"
              label="点赞用户">
              <template slot-scope="scope">
                <router-link :to="{name: 'ckyh',query: {userId: scope.row.userId}}">{{scope.row.user.userName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              width="210px"
              label="消息详情"
              prop="messageText">
            </el-table-column>
            <el-table-column
              width="120px"
              label="发送人">
              <template slot-scope="scope">
                <router-link :to="{name: 'ckyh',query: {userId: scope.row.thatId}}">{{scope.row.userName}}</router-link>
              </template>
            </el-table-column>
            <el-table-column
              width="160px"
              label="通知时间"
              prop="createTime">
            </el-table-column>
            <el-table-column
              label="相关评论">
              <template slot-scope="scope">
                <router-link :to="{name: 'dtxq',query: {essayId: scope.row.essayId2}}">{{scope.row.commentText}}</router-link>
              </template>
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
              @size-change="handleSizeChange4"
              @current-change="handleCurrentChange4"
              :current-page="page4.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="page4.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page4.total">
            </el-pagination>
          </div>
        </el-tab-pane>
<!--        -->
        <el-tab-pane label="私信" name="third">
          <el-table height="450px"
                    stripe
                    :data="page3.records.filter(data => !search || data.messageText.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
            <el-table-column
              width="120px"
              label="私信标题"
              prop="messageTitle">
            </el-table-column>
            <el-table-column
              width="250px"
              label="私信详情"
              prop="messageText">
            </el-table-column>
            <el-table-column
              width="120px"
              label="发送人">
              <template slot-scope="scope">
                <router-link :to="{name: 'ckyh',query: {userId: scope.row.thatId}}">{{scope.row.userName}}</router-link>
              </template>
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
                  type="text"
                  @click="sx(scope.$index, scope.row)">回复</el-button>
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
<!--我的消息-->
<script>
export default {
  name: 'wdxx',
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
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
      page4: {
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
    handleSizeChange4 (val) {
      const that = this
      this.$http.get('/message/item?size=' + val + '&messageType=3&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page4 = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange4 (val) {
      const that = this
      this.$http.get('/message/item?size=' + that.page4.size + '&messageType=3&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page4 = rest.data.data
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
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    sx (index, row) {
      this.ruleForm.thatId = this.$store.getters.GET_USER.userId
      this.ruleForm.thisId = row.thatId
      this.dialogFormVisible = true
      this.resetForm('ruleForm')
    },
    // 私信
    send (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const that = this
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
    this.$http.get('/message/item?messageType=3&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page4 = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  a:hover {
    color: red;
  }
  a {
    text-decoration: none;
    color: #000;
    font-weight: bolder;
  }
</style>
