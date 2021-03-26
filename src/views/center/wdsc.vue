<template>
  <div>
    <div v-if="page.total !== 0">
    <el-row>
      <el-col :span="5" v-for="(item, index) in page.records" :key="index" :offset="1" style="margin-bottom: 20px">
        <router-link :to="{name: '',query: {styleId: item.style.styleId}}">
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
<!--我的收藏-->
<script>
export default {
  name: 'wdsc',
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
      this.$http.get('/collection/item?size=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
        // 动态照片
        for (const i in rest.data.data.records) {
          that.page.records[i].style.stylePhoto = require('../../assets/' + rest.data.data.records[i].style.stylePhoto)
        }
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/collection/item?size=' + that.page.size + '&current=' + val + '&userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
        that.page = rest.data.data
        // 动态照片
        for (const i in rest.data.data.records) {
          that.page.records[i].style.stylePhoto = require('../../assets/' + rest.data.data.records[i].style.stylePhoto)
        }
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    const that = this
    this.$http.get('/collection/item?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
      // 动态照片
      for (const i in rest.data.data.records) {
        that.page.records[i].style.stylePhoto = require('../../assets/' + rest.data.data.records[i].style.stylePhoto)
      }
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>

  a {
    text-decoration: none;
  }
  .time {
    font-size: 13px;
    color: #999;
  }
</style>
