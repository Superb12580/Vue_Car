<template>
  <div>
    <Header></Header>
    <div style="margin: 50px">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/cyq' }">车友圈</el-breadcrumb-item>
        <el-breadcrumb-item :to="{name: 'ckyh',query: {userId: userId}}"><span style="color: #409EFF"> {{userName}} </span>的个人中心</el-breadcrumb-item>
        <el-breadcrumb-item> Ta 的收藏</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div v-if="page.total !== 0">
      <el-row>
        <el-col :span="5" v-for="(item, index) in page.records" :key="index" :offset="1" style="margin-bottom: 20px">
          <router-link :to="{name: 'cxq',query: {styleId: item.style.styleId}}">
            <el-card :body-style="{ padding: '10px' }" shadow="hover">
              <img style="height: 180px" :src="item.style.stylePhoto" class="image">
              <div>
                <span>{{item.style.styleName}}</span>
                <div class="bottom clearfix">
                  <time class="time">上市时间：{{ item.style.sssj }}</time>
                  <el-button style="font-size: 13px" type="text" class="button">查看详情</el-button>
                </div>
              </div>
            </el-card>
          </router-link>
        </el-col>
      </el-row>
      <div style="margin-left: 50px">
        <el-pagination
          background="true"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.current"
          :page-sizes="[4, 8, 12, 16]"
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
  name: 'cksc',
  components: { Header },
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
      this.$http.get('/collection/item?size=' + val + '&userId=' + that.userId).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/collection/item?size=' + that.page.size + '&current=' + val + '&userId=' + that.userId).then(function (rest) {
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
    this.$http.get('/collection/item?userId=' + that.userId).then(function (rest) {
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
  .time {
    font-size: 13px;
    color: #999;
  }
</style>
