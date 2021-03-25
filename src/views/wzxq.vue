<template>
  <div>
    <Header></Header>
    <div class="right">
      <div class="author">作者</div>
      <div class="style">相关车型</div>
      <div class="ph">文章排行</div>
    </div>
    <div class="left">
      <div class="title">标题</div>
      <div class="time">时间 点击量</div>
      <div class="text">正文</div>
    </div>
  </div>
</template>
<!--选车-->
<script>
import Header from '../components/header'
export default {
  name: 'wzxq',
  components: { Header }
}
</script>

<style scoped>
  .left {
    margin-top: 45px;
    width: 880px;
    height: 2000px;
    background-color: #ff6700;
  }
  .right {
    margin-top: 30px;
    float: right;
    width: 400px;
    height: 2000px;
    background-color: rebeccapurple;
  }
  .title {
    margin: 0 auto;
    width: 800px;
    height: 100px;
    background-color: #0c73c2;
  }
  .time {
    margin: 0 auto;
    width: 800px;
    height: 50px;
    background-color: #e96463;
  }
  .text {
    width: 800px;
    height: 1000px;
    background-color: #ffb865;
    margin: 0 auto;
  }
  .author,.style {
    width: 300px;
    height: 200px;
    background-color: chartreuse;
    margin: 15px auto;
  }
  .ph {
    width: 400px;
    height: 600px;
    background-color: red;
  }
</style>
