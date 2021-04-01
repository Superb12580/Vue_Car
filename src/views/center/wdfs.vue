<template>
  <div>
    <div v-if="page.total !== 0">
      <el-row>
        <el-col style="margin-bottom: 50px" :span="2" v-for="(record, index) in page.records" :key="record" :offset="2">
          <el-card :body-style="{ padding: '0px' }" shadow="hover">
            <router-link :to="{name: 'ckyh',query: {userId: record.user.userId}}">
              <div style="margin-left: 15px">
                <img style="width: 60px;height: 60px" v-if="record.user.photo" :src="record.user.photo">
                <el-avatar v-else :size="60" style="color: indianred"> {{record.user.userName}} </el-avatar>
              </div>
              <h3 style="text-align: center">{{record.user.userName}}</h3>
            </router-link>
            <div class="bottom clearfix">
              <el-button v-if="record.flagFans === 0" icon="el-icon-plus" @click="attention(record.user.userId, index)" type="primary" plain round size="mini">加关注</el-button>
              <el-button v-if="record.flagFans === 1" icon="el-icon-check" type="success" round size="mini" @click="attention(record.user.userId, index)">已互关</el-button>
            </div>
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
<!--我的粉丝-->
<script>
export default {
  name: 'wdfs',
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
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/attention/itemFans?thatId=' + that.$store.getters.GET_USER.userId + '&size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/attention/itemFans?thatId=' + that.$store.getters.GET_USER.userId + '&size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 关注取关
    attention (thatId, index) {
      const that = this
      this.$http.post('/attention/addDelete', { thatId: thatId, thisId: that.$store.getters.GET_USER.userId }).then(function (rest) {
        that.page.records[index].flagFans = that.page.records[index].flagFans === 0 ? 1 : 0
        that.msg(rest.data.msg)
      }, function (error) {
        console.log(error)
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
    this.$http.get('/attention/itemFans?thatId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .bottom {
    margin-top: 13px;
    margin-left: 18px;
    line-height: 12px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  a {
    color: #000;
    text-decoration: none;
  }
</style>
