<template>
  <div>
    <Header></Header>
    <div class="right">
<!--      作者信息-->
      <h2 style="font-size: 20px;margin-left: 10px">创作领域优质作者</h2>
      <div class="author">
        <el-card :body-style="{ padding: '10px' }" shadow="hover">
          <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><el-avatar style="margin: 0 100px" :size="80"> {{news.user.userName}} </el-avatar></router-link>
          <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><h5 style="text-align: center">{{news.user.userName}}</h5></router-link>
          <div style="padding: 14px;margin-left: 30px">
            <el-badge :value="news.newsCount" :max="10" type="primary">
              <el-button size="small" @click="">文章数</el-button>
            </el-badge>
            <el-badge style="margin-left: 50px" :value="news.fansCount" :max="10">
              <el-button size="small" @click="">粉丝数</el-button>
            </el-badge>
          </div>
        </el-card>
      </div>
<!--      车型信息-->
      <h2 style="font-size: 20px;margin-left: 10px">相关车型</h2>
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
<!--      文章排行-->
      <div class="box3" style="height: 400px;width: 400px;float: right">
          <ul>
            <router-link class="xr" style="float: right;font-size: 16px" :to="{name: ''}">更多 ></router-link>
            <h2 style="margin-bottom: 20px">文章排行榜</h2>
            <li class="list" v-for="(item,index) in wzPh">
          <span class="left">
            <span v-if="index === 0" class="num num1">{{index + 1}}</span>
            <span v-else-if="index === 1" class="num num2">{{index + 1}}</span>
            <span v-else class="num">{{index + 1}}</span>
            <router-link style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span class="content">{{item.title}}</span></router-link>
          </span>
              <span class="bofang"> {{item.count}}次点击 </span>
            </li>
          </ul>
        </div>
    </div>
    <div style="height: 1140px;width: 2px;float: right;background-color: #ff6700;margin-top: 30px;"></div>
    <div class="left2">
      <div class="title" style="text-align: center;padding-top: 15px"><h2>{{news.title}}</h2></div>
      <div class="time" style="text-align: center"><h4>发布时间：<span style="color: #ff6700;margin-right: 30px">{{news.createTime}}</span>点击量：<span style="color: #ff6700">{{news.count}}</span></h4></div>
      <div class="text">{{news.text}}</div>
      <el-col style="margin-left: 50px;margin-top: 20px" :span="6" v-for="photo in news.photo" :key="photo" :offset="1">
      <el-card :body-style="{ padding: '0px' }" shadow="hover">
      <el-image :src="photo.photoUrl">
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
      wzPh: []
    }
  },
  created () {
    const id = this.$route.query.id
    const that = this
    // 初始化文章详情
    this.$http.get('/news/itemXq?id=' + id).then(function (rest) {
      that.news = rest.data.data
      that.news.style.stylePhoto = require('../../assets/' + rest.data.data.style.stylePhoto)
      // 文章照片
      for (const i in rest.data.data.photo) {
        that.news.photo[i].photoUrl = require('../../assets/' + rest.data.data.photo[i].photoUrl)
      }
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
  .left2 {
    margin-top: 45px;
    width: 880px;
  }
  .right {
    margin-top: 35px;
    float: right;
    width: 400px;
    height: 1200px;
  }
  a {
    text-decoration: none;
  }
  .title {
    margin: 0 auto;
    width: 800px;
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
    padding-bottom: 50px;
  }
  .author,.style {
    width: 300px;
    margin: 15px auto;
  }

  ul,
  li {
    list-style: none;
  }
  .box3 {
    font-size: 0;
    margin-right: 30px;
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
  .xr:hover {
    color: #ff6700;
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
  .box3 .left .num2 {
    background-color: #f5b330;
    color: #ffffff;
  }
  .box3 .left .content {
    display: block;
    width: 260px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1f2129;
  }
  .box3 ul li .bofang {
    margin-left: auto;
    font-size: 12px;
    color: #979aa8;
    padding-left: 12px;
  }
  /*  排行榜*/

</style>
