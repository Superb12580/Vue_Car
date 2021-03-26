<template>
  <div>
    <Header></Header>
    <div style="margin: 50px auto">
    <div class="right">
      <div class="rmcx">
        <div class="hot">
        <span class="xian"></span>
        <h2 class="car">热门车型</h2>
        <div class="item clearfix">
          <div class="left">
            <router-link :to="{name: '',query: {userId: 1}}"><span>1.奥迪A4L</span></router-link>
            <router-link :to="{name: '',query: {userId: 1}}"><span>2.宝马3系</span></router-link>
              <router-link :to="{name: '',query: {userId: 1}}"><span>3.奥迪A6L</span></router-link>
                <router-link :to="{name: '',query: {userId: 1}}"><span>4.奔驰C级</span></router-link>
                  <router-link :to="{name: '',query: {userId: 1}}"><span>5.凯美瑞</span></router-link>
          </div>
          <div class="right">
            <router-link :to="{name: '',query: {userId: 1}}"><span>6.雅阁</span></router-link>
              <router-link :to="{name: '',query: {userId: 1}}"><span>7.宝马5系</span></router-link>
                <router-link :to="{name: '',query: {userId: 1}}"><span>8.奔驰E级</span></router-link>
                  <router-link :to="{name: '',query: {userId: 1}}"><span>9.思域</span></router-link>
                    <router-link :to="{name: '',query: {userId: 1}}"><span>10.迈腾</span></router-link>
          </div>
        </div>
        </div>
      </div>
      <div class="cjhtj"></div>
      <div class="yqlj"></div>
    </div>
    <div style="width: 1px;height: 1360px;background-color: #ff6700;float: right;margin-right: 20px"></div>
    <div v-if="page.total !== 0" class="left">
      <!--一条新闻-->
      <div class="ytxw" v-for="news in page.records">
        <!--新闻右侧-->
        <div class="xwyc">
          <router-link :to="{name: 'wzxq',query: {id: news.id}}"><h3 style="margin-bottom: 60px">{{news.title}}</h3></router-link>
<!--          <div><sapn style="font-size: 14px">{{news.text}}</sapn></div>-->
          <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><h4 style="float: left">{{news.user.userName}}</h4></router-link>
          <div style="margin-top: 25px;float: left">
          <i class="vip"><img src="../../assets/icons/vip.png" alt="vip" /></i>
          <span style="font-size: 14px;margin-left: 20px">{{news.createTime}}</span>
          </div>
          <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{news.count}}</h5>
        </div>
        <!--新闻图-->
        <div class="xwt"><router-link :to="{name: 'wzxq',query: {id: news.id}}"><img style="width: 100%;height: 100%" :src="news.newsPhoto"></router-link></div>
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
      this.$http.get('/news/list?size=' + val).then(function (rest) {
        that.page = rest.data.data
        // 动态照片
        for (const i in rest.data.data.records) {
          that.page.records[i].newsPhoto = require('../../assets/' + rest.data.data.records[i].newsPhoto)
        }
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/news/list?size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
        // 动态照片
        for (const i in rest.data.data.records) {
          that.page.records[i].newsPhoto = require('../../assets/' + rest.data.data.records[i].newsPhoto)
        }
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    const that = this
    this.$http.get('/news/list').then(function (rest) {
      that.page = rest.data.data
      // 动态照片
      for (const i in rest.data.data.records) {
        that.page.records[i].newsPhoto = require('../../assets/' + rest.data.data.records[i].newsPhoto)
      }
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .right {
    width: 400px;
    height: 1800px;
    float: right;
  }
  .left {
    width: 850px;
    float: left;
  }
  .ytxw {
    width: 810px;
    height: 200px;
    background-color: #eee;
    margin: 10px 20px;
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
    width: 530px;
    height: 160px;
    margin: 20px 20px 20px 0;
    float: right;
  }
  .rmcx {
    width: 360px;
    height: 280px;
    margin: 20px;
  }
  .cjhtj {
    width: 360px;
    height: 500px;
    background-color: #0c73c2;
    margin: 20px;
  }
  .yqlj {
    width: 360px;
    height: 500px;
    background-color: #409EFF;
    margin: 20px;
  }
  a {
    text-decoration: none;
    color: #1f2129;
  }
  a:hover {
    color: #ff6700;
  }
/*  */
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  .hot {
    width: 370px;
    height: 280px;
    margin: 10px auto;
    border: 1px solid red;
  }
  .hot .xian {
    width: 4px;
    height: 24px;
    background: #ff8b47;
    float: left;
    margin-top: 15px;
  }
  .hot .car {
    font-size: 18px;
    font-weight: normal;
    height: 54px;
    line-height: 54px;
    margin: 0 24px 0 24px;
    border-bottom: 1px solid #eee;
  }
  .item {
    padding: 25px;
  }
  .item .left,
  .item .right {
    float: left;
    width: 120px;
  }
  .item .right {
    margin-left: 50px;
  }
  .item .left span,
  .item .right span {
    display: block;
    font-size: 16px;
    color: #666;
    line-height: 18px;
    margin: 0 14px 21px 0;
    cursor: pointer;
  }
  .item .left span:hover,
  .item .right span:hover {
    color: #ff8b47;
  }
</style>
