<template>
  <div>
    <Header></Header>
    <div style="margin-top: 35px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/wzlb' }">新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item>新闻详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right">
<!--      作者信息-->
      <div style="border: 1px solid #ccc;width: 370px;height: 330px;margin-left: 15px;padding-top: 20px">
      <span style="font-size: 18px;color: #333;margin-left: 10px">创作领域优质作者</span>
      <div class="author">
        <el-card :body-style="{ padding: '10px' }" shadow="hover">
          <router-link style="margin: 0 100px" :to="{name: 'ckyh',query: {userId: news.user.userId}}">
            <img style="width: 80px;height: 80px" v-if="news.user.photo" :src="news.user.photo">
            <el-avatar v-else :size="80"> {{news.user.userName}} </el-avatar>
          </router-link>
          <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><h5 style="text-align: center">{{news.user.userName}}</h5></router-link>
          <div style="padding: 14px;margin-left: 30px">
            <el-badge :value="news.newsCount" :max="10" type="primary">
              <router-link :to="{name: 'wzlb',query: {userId: news.user.userId}}"><el-button size="small">文章数</el-button></router-link>
            </el-badge>
            <el-badge style="margin-left: 50px" :value="news.fansCount" :max="10">
              <router-link :to="{name: 'ckfs',query: {userId: news.user.userId, userName: news.user.userName}}"><el-button size="small">粉丝数</el-button></router-link>
            </el-badge>
          </div>
        </el-card>
      </div>
      </div>
<!--      车家号-->
      <div class="hot2">
        <span class="xian2"></span>
        <div class="title clearfix">
          <span class="car2">车家号推荐</span>
          <a href="javascript:;" @click="hyh"><i></i>换一换</a>
        </div>
        <div class="item2 clearfix">
          <div class="top2">
            <div class="mess clearfix" v-for="item in cjh">
              <div class="authorCover fn-left">
                <router-link :to="{name: 'ckyh',query: {userId: item.userId}}">
                  <img v-if="item.photo" :src="item.photo">
                  <el-avatar v-else :size="58"> {{item.userName}} </el-avatar>
                  <i class="vip2"></i>
                </router-link>
              </div>
              <div class="info2 fn-right" style="margin-top: 5px">
                <router-link :to="{name: 'ckyh',query: {userId: item.userId}}"><div class="authorTitle">{{item.userName}}</div></router-link>
                  <div class="introduction">
                    {{item.sign}}
                  </div>
                <router-link :to="{name: 'ckyh',query: {userId: item.userId}}"><div class="author-follow">+ 关注</div></router-link>
              </div>
            </div>
          </div>
          <div class="foot"></div>
        </div>
      </div>
      <!--      车型信息-->
      <div style="border: 1px solid #ccc;width: 370px;height: 410px;margin-left: 14px;padding-top: 20px">
        <span style="font-size: 18px;color: #333;margin-left: 10px;">相关车型</span>
      <div class="style">
        <router-link :to="{name: '',query: {styleId: news.style.styleId}}">
          <el-card :body-style="{ padding: '10px' }" shadow="hover">
            <img style="width: 280px" :src="news.style.stylePhoto" class="image">
            <div style="padding: 10px;">
              <span>{{news.style.styleName}}</span>
              <div style="margin-top: 10px">
                <time>上市时间：{{news.style.sssj}}</time>
                <el-button style="margin-left: 10px" type="text" class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
        </router-link>
      </div>
      </div>
    </div>
    <div style="height: 1450px;width: 1px;float: right;background-color: #ff6700;margin-top: 30px;"></div>
    <div class="left2">
      <div class="title" style="text-align: center;padding-top: 15px"><h2>{{news.title}}</h2></div>
      <div class="time" style="text-align: center"><h4>发布时间：<span style="color: #ff6700;margin-right: 30px">{{news.createTime}}</span>点击量：<span style="color: #ff6700">{{news.count}}</span></h4></div>
      <div class="text">{{news.text1}}</div>
      <img class="imgs" v-if="news.photo[0]" :src="news.photo[0].photoUrl">
      <div class="text">{{news.text2}}</div>
      <img class="imgs" v-if="news.photo[1]" :src="news.photo[1].photoUrl">
      <div class="text">{{news.text3}}</div>
      <img class="imgs" v-if="news.photo[2]" :src="news.photo[2].photoUrl">
      <div class="text">{{news.text4}}</div>
      <img class="imgs" v-if="news.photo[3]" :src="news.photo[3].photoUrl">
      <div class="text">{{news.text5}}</div>
      <img class="imgs" v-if="news.photo[4]" :src="news.photo[4].photoUrl">
      <div class="text">{{news.text6}}</div>
      <img class="imgs" v-if="news.photo[5]" :src="news.photo[5].photoUrl">
      <div class="text">{{news.text7}}</div>
      <el-col style="margin-left: 50px;margin-top: 20px;margin-bottom: 20px" :span="6" v-for="(photo,index) in news.photo" :key="index" :offset="1">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-image style="width: 218px;height: 144px" :src="photo.photoUrl">
        <div slot="placeholder" class="image-slot">
          加载中<span class="dot">...</span>
        </div>
      </el-image>
      </el-card>
      </el-col>
    </div>
  </div>
</template>
<!--选车-->
<script>
import Header from '../../components/header'
export default {
  name: 'wzxq',
  components: { Header },
  data () {
    return {
      news: {},
      // 右侧车家号
      cjh: []
    }
  },
  methods: {
    hyh () {
      // 车家号
      const that = this
      this.$http.get('/user/listCjh').then(function (rest) {
        that.cjh = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    const id = this.$route.query.id
    const that = this
    // 初始化文章详情
    this.$http.get('/news/itemXq?id=' + id).then(function (rest) {
      that.news = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 车家号
    this.$http.get('/user/listCjh').then(function (rest) {
      that.cjh = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .imgs {
    width: 700px;
    margin-left: 90px;
    margin-top: 30px;
  }
  .left2 {
    margin-top: 5px;
    width: 880px;
  }
  .right {
    margin-top: 35px;
    float: right;
    width: 400px;
    margin-left: 20px;
  }
  a {
    text-decoration: none;
  }
  .title {
    margin: 0 auto;
    /*width: 800px;*/
    height: 70px;
  }
  .time {
    margin: 0 auto;
    width: 800px;
    height: 50px;
  }
  .text {
    width: 800px;
    margin: 0 auto;
    padding-top: 30px;
    text-indent: 35px;
  }
  .author,.style {
    width: 300px;
    margin: 30px auto;
  }
  /*车家号*/
  .hot2 a {
    text-decoration: none;
    word-wrap: break-word;
    word-break: break-all;
    color: #666;
  }
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  .hot2 {
    width: 370px;
    margin: 30px auto;
    border: 1px solid #ccc;
  }
  .hot2 .xian2 {
    width: 4px;
    height: 24px;
    background: #ccc;
    float: left;
    margin-top: 15px;
  }
  .hot2 .title {
    border-bottom: 1px solid #eee;
    font-size: 18px;
    font-weight: normal;
    height: 54px;
    line-height: 54px;
    margin: 0 24px 0 24px;
  }
  .hot2 .title .car2 {
    font-size: 18px;
    color: #333;
    float: left;
  }
  .hot2 .title a {
    float: right;
    text-decoration: none;
    font-size: 14px;
    color: #999;
  }
  .hot2 .title a:hover {
    color: #ff8b47;
  }
  .item2 {
    padding: 25px;
  }

  .item2 .top2 {
    border-bottom: 1px solid #eee;
  }
  .top2 .mess {
    margin-bottom: 24px;
  }

  .top2 .mess img {
    width: 58px;
    height: 58px;
    border: 1px solid #eee;
    border-radius: 50%;
  }
  .top2 .mess .vip2 {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    position: absolute;
    bottom: 4px;
    right: 4px;
    background-size: 18px 18px;
    background: url(../../assets/static/vip.png) no-repeat;
    background-position: center;
  }
  .fn-left {
    width: 60px;
    height: 60px;
    margin-right: 10px;
    position: relative;
    float: left;
  }
  .fn-right {
    float: right;
    width: 242px;
    position: relative;
  }
  .fn-right .authorTitle {
    max-width: 190px;
    height: 19px;
    line-height: 18px;
    font-size: 16px;
    color: #333;
    margin-bottom: 9px;
  }
  .fn-right .authorTitle:hover {
    color: #ff8b47;
  }
  .info2 .introduction {
    font-size: 12px;
    color: #666;
    height: 34px;
    overflow: hidden;
  }
  .fn-right .author-follow {
    width: 50px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    background: #ff8b47;
    color: #fff;
    font-size: 12px;
    position: absolute;
    right: 0;
    top: -4px;
    cursor: pointer;
  }
  .fn-right .author-follow:hover {
    background-color: #ff7423;
  }
  /*车家号*/
</style>
