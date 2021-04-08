<template>
  <div>
    <router-link :to="{ path: '/fbwz'}"><el-button v-if="this.$store.getters.GET_USER.sfrz === 1" type="text" style="float: right;margin-right: 110px">发布文章</el-button></router-link>
    <div>
      <div v-if="page.total !== 0" class="left2">
      <!--一条新闻-->
      <div class="ytxw" v-for="news in page.records">
        <!--新闻右侧-->
        <div class="xwyc">
          <router-link :to="{name: 'wzxq',query: {id: news.id}}"><h3 style="height: 60px">{{news.title}}</h3></router-link>
          <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><h4 style="float: left">{{news.user.userName}}</h4></router-link>
          <div style="margin-top: 25px;float: left">
          <i class="vip"><img src="../../assets/icons/vip.png" alt="vip" /></i>
          <span style="font-size: 14px;margin-left: 20px">{{news.createTime}}</span>
          </div>
          <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{news.count}}</h5>
          <div style="margin-left: 350px">
          <router-link :to="{name: 'fbwz2',query: { id: news.id, title: news.title, userId: news.userId }}"><span v-if="news.zt === 2"><img style="width: 100px" src="../../assets/static/dsctj.jpg"></span></router-link>
          <router-link :to="{name: 'fbwz3',query: {id: news.id}}"><span v-if="news.zt === 3"><img style="width: 100px" src="../../assets/static/dsh.jpg"></span></router-link>
          <router-link :to="{name: 'fbwz3',query: {id: news.id}}"><span v-if="news.zt === 4"><img style="width: 100px" src="../../assets/static/yfb.jpg"></span></router-link>
          <router-link :to="{name: 'fbwz3',query: {id: news.id}}"><span v-if="news.zt === 5"><img style="width: 100px" src="../../assets/static/ybh.jpg"></span></router-link>
          </div>
        </div>
        <!--新闻图-->
        <div class="xwt">
          <router-link :to="{name: 'wzxq',query: {id: news.id}}">
            <img style="width: 100%;height: 100%" v-if="news.newsPhoto" :src="news.newsPhoto">
            <img style="width: 100%;height: 100%" v-else src="../../assets/carWzzs/0.jpg">
          </router-link>
        </div>
      </div>
      <div style="float: left;margin: 30px 0 30px 50px">
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
      <div style="padding: 200px 350px" v-else><h2 style="color: red">暂无数据</h2></div>
    </div>
  </div>
</template>
<!--选车-->
<script>
import Header from '../../components/header'
export default {
  name: 'wzlb',
  components: { Header },
  data () {
    return {
      page: {
        records: [],
        current: 1,
        total: 0,
        size: 5
      }
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/news/itemNewsSy?userId=' + this.$store.getters.GET_USER.userId + '&size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/news/itemNewsSy?userId=' + this.$store.getters.GET_USER.userId + '&size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    const that = this
    this.$http.get('/news/itemNewsSy?userId=' + this.$store.getters.GET_USER.userId).then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>

  .left2 {
    width: 850px;
    float: left;
    margin-top: 20px;
  }
  .ytxw {
    width: 1000px;
    height: 200px;
    margin: 10px 20px;
    border: 1px solid #ccc;
    float: left;
  }
  .vip img{
    margin: 0 3px;
    width: 40px;
  }
  .xwt {
    width: 220px;
    height: 160px;
    float: left;
    margin: 20px;
  }
  .xwyc {
    width: 680px;
    height: 160px;
    margin: 20px 20px 20px 0;
    float: right;
  }

  a {
    text-decoration: none;
    color: #1f2129;
  }
  a:hover {
    color: red;
  }
</style>
