<template>
  <div>
  <Header></Header>
    <div class="box2" style="margin: 50px auto">
      <router-link :to="{name: 'ckyh',query: {userId: 1}}"><div class="item2"></div></router-link>
      <div class="item2"></div>
      <div class="item2"></div>
      <div class="item2"></div>
      <div class="item2"></div>
      <div class="item2"></div>
      <div class="item2"></div>
      <div class="item2"></div>
    </div>
    <div style="margin: 50px auto">
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item v-for="item in 4" :key="item">
          <h3 class="medium">{{ item }}</h3>
          <img src="../assets/news/new1.jpg">
        </el-carousel-item>
      </el-carousel>
    </div>
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
        <div class="item">
          <img src="../assets/carType/奔驰.png" alt="" />
          <span>奔驰</span>
        </div>
        <div class="item">
          <img src="../assets/carType/宝马.png" alt="" />
          <span>宝马</span>
        </div>
        <div class="item">
          <img src="../assets/carType/本田.png" alt="" />
          <span>本田</span>
        </div>
        <div class="item">
          <img src="../assets/carType/长城.png" alt="" />
          <span>长城</span>
        </div>
      </div>
      <div class="items">
        <div class="item">
          <img src="../assets/carType/大众.png" alt="" />
          <span>大众</span>
        </div>
        <div class="item">
          <img src="../assets/carType/丰田.png" alt="" />
          <span>丰田</span>
        </div>
        <div class="item">
          <img src="../assets/carType/福特.png" alt="" />
          <span>福特</span>
        </div>
        <div class="item">
          <img src="../assets/carType/日产.png" alt="" />
          <span>日产</span>
        </div>
        <div class="item">
          <img src="../assets/carType/雪佛兰.png" alt="" />
          <span>雪佛兰</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from '../components/header'
export default {
  name: 'home',
  components: { Header }
}
</script>

<style scoped>
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
    background-image: url(../assets/news/carType.png);
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
    margin: 20px auto;
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
