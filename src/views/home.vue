<template>
  <div>
  <Header></Header>
<!--    车类别开始-->
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
<!--    车类别结束-->
<!--    头部轮播图开始-->
    <div style="margin: 25px auto">
      <el-carousel :interval="4000" type="card" height="300px" style="width: 1200px;margin: 0 auto">
        <el-carousel-item v-for="(item,index) in imgLbt" :key="index">
          <img :src="item.src" style="height: 300px">
        </el-carousel-item>
      </el-carousel>
    </div>
<!--    头部轮播图结束-->
    <div>
<!--      热门品牌开始-->
    <div class="box">
      <div class="top">
        <h2>热门品牌</h2>
        <router-link :to="{name: 'ckyh',query: {userId: 1}}">更多品牌 ></router-link>
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
<!--      热门品牌结束-->
<!--      折叠开始-->
    <div style="height: 300px">
<!--      折叠图开始-->
      <div style="float: left">
        <router-link :to="{name: '',query: {styleId: imgZb.style_id}}">
        <el-image :src="imgZb.style_photo" style="width: 350px;height: 250px">
          <div slot="placeholder" class="image-slot">
            加载中<span class="dot">...</span>
          </div>
        </el-image>
        </router-link>
      </div>
<!--      折叠图结束-->
<!--      折叠文开始-->
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
<!--      折叠文结束-->
    </div>
<!--      折叠结束-->
    </div>
<!--    文章开始-->
    <div style="height: 400px">
      <!--      文章排行榜开始-->
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
            <span class="bofang"> {{item.count}}次播放 </span>
          </li>
        </ul>
      </div>
      <!--      文章排行榜结束-->
<!--      文章推荐开始-->
      <div class="box4" style="height: 400px;width: 450px;float: right">
        <router-link style="float: right;font-size: 16px" :to="{name: ''}">更多 ></router-link>
        <ul style="padding-top: 10px">
          <li v-for="item in wzTj">
            <router-link style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}">{{item.title}}</router-link>
          </li>
        </ul>
      </div>
<!--      文章推荐结束-->
<!--      文章左侧轮播开始-->
      <div style="height: 400px;width: 450px;float: left">
        <el-carousel direction="vertical" height="400px">
          <el-carousel-item v-for="item in zxLbt" :key="item">
            <router-link :to="{name: 'wzxq',query: {id: item.id}}"><img :src="item.newsPhoto" style="height: 400px"></router-link>
          </el-carousel-item>
        </el-carousel>
      </div>
<!--      文章左侧轮播结束-->
    </div>
<!--    文章结束-->
<!--    底部style图开始-->
    <div style="margin-top: 20px">
      <el-row>
        <el-col :span="6" v-for="(item, index) in imgDb" :key="index" :offset="2">
          <router-link :to="{name: '',query: {styleId: item.styleId}}">
          <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 10px">
            <img style="height: 230px" v-bind:src="item.stylePhoto" class="image">
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
<!--    底部style图结束-->
<!--    底部开始-->
    <div class="footer">
      <p>京公网安备 11010802026035号</p>
      |
      <p>京ICP备17027026号-1</p>
      |
      <p>增值电信业务经营许可证（京B2-20180202）</p>
      |
      <p>营业执照</p>
      |
      <p>违法和不良信息举报电话：400-140-2108</p>
      |
      <p>中央网信办违法和不良信息举报中心</p>
      |
      <p>汽车之家用户协议</p>
      |
      <p>汽车之家隐私政策</p>
      |
      <p>网络文化经营许可证-京网文（2019）4715-493号</p>
    </div>
<!--    底部结束-->
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
        { src: require('../assets/carLbt/1.jpg'), styId: '1' },
        { src: require('../assets/carLbt/2.jpg'), styId: '2' },
        { src: require('../assets/carLbt/3.jpg'), styId: '3' },
        { src: require('../assets/carLbt/4.jpg'), styId: '4' }
      ],
      // 文章纵向轮播
      zxLbt: [
        { newsPhoto: require('../assets/carWzzs/1.jpg'), styId: '1' },
        { newsPhoto: require('../assets/carWzzs/2.jpg'), styId: '2' },
        { newsPhoto: require('../assets/carWzzs/3.jpg'), styId: '3' },
        { newsPhoto: require('../assets/carWzzs/4.jpg'), styId: '4' }
      ],
      // 文章推荐
      wzTj: [
        {
          title: '文章推荐',
          id: '1',
          styleId: '1',
          userId: '1'
        },
        {
          title: '文章推荐2',
          id: '1',
          styleId: '1',
          userId: '1'
        },
        {
          title: '文章推荐3',
          id: '1',
          styleId: '1',
          userId: '1'
        }
      ],
      // 文章排行
      wzPh: [
        {
          title: '文章排行',
          id: '1',
          styleId: '1',
          userId: '1',
          count: 500
        },
        {
          title: '文章排行',
          id: '1',
          styleId: '1',
          userId: '1',
          count: 117
        },
        {
          title: '文章排行',
          id: '1',
          styleId: '1',
          userId: '1',
          count: 350
        }
      ],
      // 折叠
      imgZb: {
        activeName: '',
        style_photo: require('../assets/carZb/1.jpg'),
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
      // 底部轮播
      imgDb: [
        { stylePhoto: require('../assets/carDb/1.jpg'), styleName: '奔驰E级', sssj: '2017-12-11', styleId: 1 },
        { stylePhoto: require('../assets/carDb/2.jpg'), styleName: '宝马3系', sssj: '2017-12-11', styleId: 2 },
        { stylePhoto: require('../assets/carDb/3.jpg'), styleName: '奥迪A6L', sssj: '2017-12-11', styleId: 3 },
        { stylePhoto: require('../assets/carDb/4.jpg'), styleName: '五菱神车', sssj: '2017-12-11', styleId: 4 }
      ]
    }
  },
  created () {
    const that = this
    // 轮播图初始化
    this.$http.get('/style/itemLbt').then(function (rest) {
      that.imgLbt = rest.data.data
      // 动态照片
      for (const i in rest.data.data) {
        that.imgLbt[i].src = require('../assets/' + rest.data.data[i].imgLbt)
      }
    }, function (error) {
      console.log(error)
    })
    // 底部初始化
    this.$http.get('/style/item').then(function (rest) {
      that.imgDb = rest.data.data
      // 动态照片
      for (const i in rest.data.data) {
        that.imgDb[i].stylePhoto = require('../assets/' + rest.data.data[i].stylePhoto)
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
    // 文章轮播图初始化
    this.$http.get('/news/itemLbt').then(function (rest) {
      that.zxLbt = rest.data.data
      // 动态照片
      for (const i in rest.data.data) {
        that.zxLbt[i].newsPhoto = require('../assets/' + rest.data.data[i].newsPhoto)
      }
    }, function (error) {
      console.log(error)
    })
    // 文章展示初始化
    this.$http.get('/news/itemWz').then(function (rest) {
      that.wzTj = rest.data.data
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
  /*底部*/
  .footer {
    width: 1200px;
    margin: 10px auto;
    line-height: 20px;
    padding: 16px 20px;
    font-size: 12px;
    color: #666;
    background-color: #f7f8fc;
    text-align: center;
  }
  p {
    display: inline-block;
    margin: 0 5px 20px 5px;
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
  margin-left: 20px;
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
  /*文章列表*/
  .box4 {
    margin: 0 auto;
  }
  .box4 a {
    text-decoration: none;
    color: #000;
  }
  .box4 li {
    list-style: none;
    position: relative;
    width: 396px;
    height: 24px;
    line-height: 24px;
    margin-bottom: 15px;
    padding-left: 8px;
    font-size: 16px;
    color: #1a1a1a;
    cursor: pointer;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 25px;
    margin-top: 20px;
  }
  .box4 li::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: #d8d8d8;
    position: relative;
    right: 8px;
    top: -2px;
  }
  .box4 a:hover{
    color: #e65800;
  }
  /*文章列表*/

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
