<template>
  <div>
    <Header></Header>
    <div style="margin: 50px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cyq' }">车友圈</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'ckyh',query: {userId: userId}}"><span style="color: #409EFF"> {{userName}} </span>的个人中心</el-breadcrumb-item>
        <el-breadcrumb-item> Ta 的粉丝</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="page.total !== 0">
      <el-row>
        <el-col style="margin-bottom: 50px" :span="2" v-for="(record, index) in page.records" :key="record" :offset="2">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <router-link :to="{name: 'ckyh',query: {userId: record.user.userId}}">
              <div style="margin-left: 22px"><el-avatar :size="60" style="color: indianred"> {{record.user.userName}} </el-avatar></div>
              <h3 style="text-align: center">{{record.user.userName}}</h3>
            </router-link>
          </el-card>
        </el-col>
      </el-row>
      <div style="margin-left: 50px">
        <el-pagination
          background="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[6, 10, 12, 18]"
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
import Header from '../../components/header'
export default {
  name: 'ckfs',
  components: { Header },
  data () {
    return {
      page: {
        records: [{
          // 是否互相关注
          flagFans: 1
        }],
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
      this.$http.get('/attention/itemFans?thatId=' + that.userId + '&size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/attention/itemFans?thatId=' + that.userId + '&size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.userId = this.$route.query.userId
    this.userName = this.$route.query.userName
    const that = this
    this.$http.get('/attention/itemFans?thatId=' + that.userId).then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  a {
    color: #000;
    text-decoration: none;
  }
</style>
