<template>
  <div>
    <Header></Header>
      <div class="aside-col">
        <el-menu
          class="menu"
          :default-active="$route.path"
          router
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-menu-item index="/grzl">
            <i class="el-icon-tickets"></i>
            <span slot="title">个人资料</span>
          </el-menu-item>
          <el-menu-item index="/wdwz" v-if="this.$store.getters.GET_USER.sfrz === 1">
            <i class="el-icon-news"></i>
            <span slot="title">我的文章</span>
          </el-menu-item>
          <el-menu-item index="/wddt">
            <i class="el-icon-news"></i>
            <span slot="title">我的动态</span>
          </el-menu-item>
          <el-menu-item index="/wdzf">
            <i class="el-icon-position"></i>
            <span slot="title">我的转发</span>
          </el-menu-item>
          <el-menu-item index="/wdxx">
            <i class="el-icon-chat-dot-round"></i>
            <span slot="title">我的消息</span>
          </el-menu-item>
          <el-menu-item index="/wdsc">
            <i class="el-icon-star-off"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <el-menu-item index="/wdpl">
            <i class="el-icon-postcard"></i>
            <span slot="title">我的评论</span>
          </el-menu-item>
          <el-menu-item index="/wdgz">
            <i class="el-icon-view"></i>
            <span slot="title">我的关注</span>
          </el-menu-item>
          <el-menu-item index="/wdfs">
            <i class="el-icon-user"></i>
            <span slot="title">我的粉丝</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="main-col">
        <router-view></router-view>
      </div>
    </div>
</template>

<script>
import Header from '../../components/header'
export default {
  components: { Header },
  name: 'center',
  created () {
    const that = this
    this.$http.get('/user/user?userId=' + that.$store.getters.GET_USER.userId).then(function (rest) {
      that.user = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>
<style scoped>
.el-menu-item{
  text-align: left;
  border-bottom: 1px solid gray;
}
.aside-col{
  /* display: inline-block; */
  float: left;
  width: 200px;
  margin-top: 80px;
}
.main-col{
  display: inline-block;
  width: calc(100% - 200px);
  margin-top: 30px;
}

.home .center a {
  margin-left: 50px;
  font-weight: bold;
  text-decoration: none;
  color: #000;
}

.home a.router-link-exact-active {
  color: red;
}
.home .search {
  display: block;
  width: 500px;
  margin-left: 350px;
  border: 1px solid yellow;
  border-radius: 3px;
  position: relative;
}
.home .search i {
  text-align: center;
  width: 40px;
  height: 40px;
  line-height: 40px;
  position: absolute;
  top: 0;
  left: 0;
}
.home .search input {
  padding-left: 40px;
  width: 360px;
  height: 40px;
  border: 0;
  outline: 0;
}
.home .search #btn {
  width: 98px;
  height: 42px;
  line-height: 40px;
  color: #000;
  background-color: yellow;

  border: 0;
  outline: 0;
  cursor: pointer;
}
.home .center {
  position: relative;
}
.home .center .logo {
  display: inline-block;
  width: 300px;
  position: absolute;
  top: -39.5px;
  left: 0;
  cursor: pointer;
}
.home .center .title {
  height: 40px;
  line-height: 40px;
  margin-top: 20px;
  margin-left: 300px;
  border-top-right-radius: 3px;
  border-bottom-right-radius: 3px;
  z-index: 0;
}
.home .head {
  position: relative;
}
.head .people {
  display: inline-block;
  margin-right: 100px;
  position: absolute;
  right: 0;
  top: 0;
}
.head .people.show {
  display: block;
}
.head .people.hidden {
  display: none;
}
.head .people a.list {
  text-decoration: none;
  color: #000;
}

.head .people img {
  display: inline-block;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: relative;
  cursor: pointer;
}
.head .people:hover .others {
  opacity: 1;
  transition: all 1s;
}
.head .people .others {
  width: 100px;
  height: 100px;
  background-color: #fff;
  opacity: 0;
  z-index: 10;
  position: absolute;
  top: 30px;
  left: 0;
}
.head .people .others a {
  margin: 10px 5px;
  display: block;
  text-decoration: none;
  color: #000 !important;
}
.head .people .others a:hover {
  background-color: yellow;
}
</style>
