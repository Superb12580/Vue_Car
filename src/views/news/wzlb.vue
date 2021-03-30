<template>
  <div>
    <Header></Header>
    <div style="margin: 50px auto">
    <div class="right2">
<!--      热门车型-->
      <div class="rmcx">
        <div class="hot">
        <span class="xian"></span>
        <h2 class="car">热门车型</h2>
        <div class="item clearfix">
          <div class="left">
            <router-link :to="{name: '',query: {styleId: rmpp[0].styleId}}"><span>1.{{rmpp[0].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[1].styleId}}"><span>2.{{rmpp[1].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[2].styleId}}"><span>3.{{rmpp[2].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[3].styleId}}"><span>4.{{rmpp[3].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[4].styleId}}"><span>5.{{rmpp[4].styleName}}</span></router-link>
          </div>
          <div class="right">
            <router-link :to="{name: '',query: {styleId: rmpp[5].styleId}}"><span>6.{{rmpp[5].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[6].styleId}}"><span>7.{{rmpp[6].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[7].styleId}}"><span>8.{{rmpp[7].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[8].styleId}}"><span>9.{{rmpp[8].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[9].styleId}}"><span>10.{{rmpp[9].styleName}}</span></router-link>
          </div>
        </div>
        </div>
      </div>
<!--      排行-->
      <div class="box3" style="height: 430px;width: 400px;float: left">
        <ul style="padding-left: 20px">
          <h2 style="margin-bottom: 20px">文章排行榜</h2>
          <li class="list" v-for="(item,index) in wzPh">
          <span class="left">
            <span v-if="index === 0" class="num num1">{{index + 1}}</span>
            <span v-else-if="index === 1" class="num num2">{{index + 1}}</span>
            <span v-else-if="index === 2" class="num num3">{{index + 1}}</span>
            <span v-else class="num">{{index + 1}}</span>
            <router-link v-if="index === 0" style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span style="color: #e62021" class="content">{{item.title}}</span></router-link>
            <router-link v-else-if="index === 1" style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span style="color: #e65800" class="content">{{item.title}}</span></router-link>
            <router-link v-else-if="index === 2" style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span style="color: #f5b330" class="content">{{item.title}}</span></router-link>
            <router-link v-else style="font-size: 16px;height: 20px" :to="{name: 'wzxq',query: {id: item.id}}"><span class="content">{{item.title}}</span></router-link>
          </span>
            <span class="bofang"> {{item.count}}次点击 </span>
          </li>
        </ul>
      </div>
<!--      友情链接-->
      <div class="yqlj"></div>
    </div>
    <div style="width: 1px;height: 1360px;background-color: #ff6700;float: right;margin-right: 20px"></div>
    <div v-if="page.total !== 0" class="left2">
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
      },
      // 右侧热门品牌
      rmpp: [],
      // 文章排行
      wzPh: []
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
    const thatId = this.$route.query.userId
    // 所有
    if (!thatId) {
      this.$http.get('/news/list').then(function (rest) {
        that.page = rest.data.data
        // 动态照片
        for (const i in rest.data.data.records) {
          that.page.records[i].newsPhoto = require('../../assets/' + rest.data.data.records[i].newsPhoto)
        }
      }, function (error) {
        console.log(error)
      })
    } else {
      // 个人
      this.$http.get('/news/item?userId=' + thatId).then(function (rest) {
        that.page = rest.data.data
        // 动态照片
        for (const i in rest.data.data.records) {
          that.page.records[i].newsPhoto = require('../../assets/' + rest.data.data.records[i].newsPhoto)
        }
      }, function (error) {
        console.log(error)
      })
    }
    this.$http.get('/style/itemDjl').then(function (rest) {
      that.rmpp = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 文章排行初始化
    this.$http.get('/news/itemPh').then(function (rest) {
      that.wzPh = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .right2 {
    width: 400px;
    height: 1800px;
    float: right;
  }
  .left2 {
    width: 850px;
    float: left;
  }
  .ytxw {
    width: 810px;
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
  .yqlj {
    width: 360px;
    height: 500px;
    background-color: #409EFF;
    margin: 20px;
    float: right;
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
    padding-left: 20px;
    padding-top: 20px;
  }
  .item .left,
  .item .right {
    float: left;
    width: 140px;
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
/*  排行榜*/
  ul,
  li {
    list-style: none;
  }
  .box3 {
    font-size: 0;
    margin: 0 auto;
  }
  .box3 ul {
    width: 380px;
    font-size: 14px;
  }
  .box3 ul li {
    display: flex;
    width: 100%;
    margin-bottom: 17px;
  }
  .box3 .left {
    display: flex;
    cursor: pointer;
  }
  .box3 .list .left:hover .content{
    color: #e65800;
  }

  .box3 .left .num {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    font-stretch: normal;
    font-style: normal;
    line-height: 18px;
    width: 18px;
    height: 18px;
    border-radius: 2px;
    text-align: center;
    margin-right: 8px;
    color: #979aa8;
  }
  .box3 .left .num1 {
    background-color: #e62021;
    color: #ffffff;
  }
  .box3 .left .num2 {
    background-color: #e65800;
    color: #ffffff;
  }
  .box3 .left .num3 {
    background-color: #f5b330;
    color: #ffffff;
  }
  .box3 .left .content {
    display: block;
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1f2129;
  }
  .box3 ul li .bofang {
    margin-left: auto;
    font-size: 12px;
    color: #979aa8;
    padding-left: 6px;
  }
  /*  排行榜*/
</style>
