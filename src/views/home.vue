<template>
  <div>
  <Header></Header>
<!--    1开始-->
    <div class="box2" style="margin: 50px auto">
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
      <router-link class="item2" :to="{name: 'ckyh',query: {userId: 1}}"></router-link>
    </div>
<!--    1结束-->
<!--    2开始-->
    <div style="margin: 50px auto">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="(item,index) in imgLbt" :key="index">
          <h3 class="medium">{{item.info}}</h3>
          <img :src="item.src" style="height: 300px">
        </el-carousel-item>
      </el-carousel>
    </div>
<!--    2结束-->
    <div>
<!--      3b开始-->
    <div class="box">
      <div class="top">
        <h2>热门品牌</h2>
        <a href="#">更多品牌 ></a>
      </div>
      <div class="items">
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/奥迪.png" alt="" />
          <span>奥迪</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/奔驰.png" alt="" />
          <span>奔驰</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/宝马.png" alt="" />
          <span>宝马</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/本田.png" alt="" />
          <span>本田</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/长城.png" alt="" />
          <span>长城</span>
        </div>
        </router-link>
      </div>
      <div class="items">
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/大众.png" alt="" />
          <span>大众</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/丰田.png" alt="" />
          <span>丰田</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/福特.png" alt="" />
          <span>福特</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/日产.png" alt="" />
          <span>日产</span>
        </div>
        </router-link>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">
        <div class="item">
          <img src="../assets/carType/雪佛兰.png" alt="" />
          <span>雪佛兰</span>
        </div>
        </router-link>
      </div>
    </div>
<!--      3b结束-->
<!--      3a开始-->
    <div style="height: 300px">
<!--      3a2开始-->
      <div style="float: left">
        <router-link :to="{name: '',query: {styleId: imgZb.style_id}}">
        <el-image :src="imgZb.style_photo" style="width: 350px">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        </router-link>
      </div>
<!--      3a2结束-->
<!--      3a1开始-->
      <div style="width: 450px;margin-left: 400px">
        <el-collapse v-model="imgZb.activeName" accordion>
          <el-collapse-item>
            <template slot="title">
              {{imgZb.title1}}<i class="header-icon el-icon-success"></i>
            </template>
            <div>{{imgZb.a_text1}}</div>
            <div>{{imgZb.a_text2}}</div>
          </el-collapse-item>
          <el-collapse-item name="1">
            <template slot="title">
              {{imgZb.title2}}<i class="header-icon el-icon-s-flag"></i>
            </template>
            <div>{{imgZb.b_text1}}</div>
            <div>{{imgZb.b_text2}}</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              {{imgZb.title3}}<i class="header-icon el-icon-menu"></i>
            </template>
            <div>{{imgZb.c_text1}}</div>
            <div>{{imgZb.c_text2}}</div>
          </el-collapse-item>
          <el-collapse-item>
            <template slot="title">
              {{imgZb.title4}}<i class="header-icon el-icon-info"></i>
            </template>
            <div>{{imgZb.d_text1}}</div>
            <div>{{imgZb.d_text2}}</div>
          </el-collapse-item>
        </el-collapse>
      </div>
<!--      3a1结束-->
    </div>
<!--      3a结束-->
    </div>
<!--    4开始-->
    <div style="height: 400px">
      <!--      4c开始-->
      <div style="height: 400px;width: 450px;float: right;background-color: rebeccapurple">
      </div>
      <!--      4c结束-->
<!--      4b开始-->
      <div style="height: 400px;width: 450px;float: right;background-color: #ff6700">
      </div>
<!--      4b结束-->
<!--      4a开始-->
      <div style="height: 400px;width: 450px;background-color: red">
      </div>
<!--      4a结束-->
    </div>
<!--    4结束-->
<!--    5开始-->
    <div>
      <el-row>
        <el-col :span="6" v-for="(item, index) in imgDb" :key="index" :offset="2">
          <router-link :to="{name: '',query: {styleId: item.styleId}}">
          <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 20px">
            <img style="height: 250px;" v-bind:src="item.stylePhoto" class="image">
            <div style="padding: 14px;">
              <span>{{item.styleName}}</span>
              <div class="bottom clearfix">
                <time class="time">上市时间：{{ item.sssj }}</time>
                <el-button type="text" class="button">查看详情</el-button>
              </div>
            </div>
          </el-card>
          </router-link>
        </el-col>
      </el-row>
    </div>
<!--    5结束-->
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  name: 'home',
  components: { Header },
  data () {
    return {
      // 轮播图
      imgLbt: [
        { src: require('../assets/carLbt/1.jpeg'), info: '消息' },
        { src: require('../assets/carLbt/1.jpeg'), info: '消息' },
        { src: require('../assets/carLbt/1.jpeg'), info: '消息' },
        { src: require('../assets/carLbt/1.jpeg'), info: '消息' }
      ],
      // 3a
      imgZb: {
        activeName: '',
        style_photo: require('../assets/carZb/1.jpeg'),
        style_id: 1,
        title1: '一致性 Consistency',
        a_text1: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
        a_text2: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。',
        title2: '一致性 Consistency',
        b_text1: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
        b_text2: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。',
        title3: '一致性 Consistency',
        c_text1: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
        c_text2: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。',
        title4: '一致性 Consistency',
        d_text1: '与现实生活一致：与现实生活保持一致，遵循用户习惯的语言和概念；',
        d_text2: '在界面中一致：比如：设计样式、图标和文本、元素的位置等。'
      },
      // 底部
      imgDb: [
        { stylePhoto: require('../assets/carDb/1.jpeg'), styleName: '奔驰E级', sssj: '2017-12-11', styleId: 1 },
        { stylePhoto: require('../assets/carDb/1.jpeg'), styleName: '宝马3系', sssj: '2017-12-11', styleId: 2 },
        { stylePhoto: require('../assets/carDb/1.jpeg'), styleName: '奥迪A6L', sssj: '2017-12-11', styleId: 3 },
        { stylePhoto: require('../assets/carDb/1.jpeg'), styleName: '五菱神车', sssj: '2017-12-11', styleId: 4 }
      ]
    }
  },
  created () {
    const that = this
    // 底部初始化
    this.$http.get('/style/item').then(function (rest) {
      that.imgDb = rest.data.data.records
      // 动态照片
      for (const i in rest.data.data.records) {
        that.imgDb[i].stylePhoto = require('../assets/' + rest.data.data.records[i].stylePhoto)
      }
    }, function (error) {
      console.log(error)
    })
    // 中部
    this.$http.get('/fold/item').then(function (rest) {
      that.imgZb = rest.data.data
      // 动态照片
      that.imgZb.style_photo = require('../assets/' + rest.data.data.style_photo)
      that.imgZb.activeName = '1'
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>

  .time {
    font-size: 13px;
    color: #999;
  }

  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }

  .clearfix:after {
    clear: both
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
  img {
    height: 300px;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .box2 {
    width: 1200px;
    margin: 20px auto;
    display: flex;
    justify-content: space-between;
  }
  .box2 .item2 {
    width: 149px;
    height: 56px;
    background-repeat: no-repeat;
    cursor: pointer;
    background-image: url(../assets/carType/雪碧图.png);
    background-size: 1196px 112px;
    background-position: -0px 0px;
  }

  .box2 .item2:nth-child(2) {
    background-position: -149px 0px;
  }
  .box2 .item2:nth-child(3) {
    background-position: -289px 0px;
  }
  .box2 .item2:nth-child(4) {
    background-position: -447px 0px;
  }
  .box2 .item2:nth-child(5) {
    background-position: -596px 0px;
  }
  .box2 .item2:nth-child(6) {
    background-position: -745px 0px;
  }
  .box2 .item2:nth-child(7) {
    background-position: -894px 0px;
  }
  .box2 .item2:nth-child(8) {
    background-position: -1043px 0px;
  }
  .box2 .item2:hover {
    background-position: -0px -56px;
  }
  .box2 .item2:nth-child(2):hover {
    background-position: -149px -56px;
  }
  .box2 .item2:nth-child(3):hover {
    background-position: -289px -56px;
  }
  .box2 .item2:nth-child(4):hover {
    background-position: -447px -56px;
  }
  .box2 .item2:nth-child(5):hover {
    background-position: -596px -56px;
  }
  .box2 .item2:nth-child(6):hover {
    background-position: -745px -56px;
  }
  .box2 .item2:nth-child(7):hover {
    background-position: -894px -56px;
  }
  .box2 .item2:nth-child(8):hover {
    background-position: -1043px -56px;
  }

  .box {
    width: 380px;
    margin: 0 auto;
    float: right;
  }
  .box .top {
    display: flex;
    justify-content: space-between;
    align-content: flex-start;
  }
  .box .top a {
    text-decoration: none;
    color: #1a1a1a;
  }
  .box .top a:hover {
    color: #e65800;
  }
  .box .items{
    padding: 20px 10px 0 10px;
    display: flex;
    justify-content: space-between;
    text-align: center;
  }
  .box .items .item img {
    display: block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-size: 40px 40px;
    margin-bottom: 2px;
  }

  .item:hover {
    color: #ff6700;
  }
  a {
    color: #000;
    text-decoration: none;
  }
</style>
