<template>
  <div class="home">
    <div class="head">
      <div class="search">
        <i class="el-icon-search"></i>
        <input type="text" placeholder="请输入你要搜索的内容"/>
        <button id="btn">搜索</button>
      </div>

      <div class="people">
        <img src="../assets/people.png" alt="头像"/>
        <div class="others">
          <span v-show="flag">
            <el-link type="primary"  @click="center">个人中心</el-link>
            <el-link type="danger" @click="layout">注 销</el-link>
          </span>
          <span v-show="!flag">
            <router-link to="/login">登 录</router-link>
            <router-link to="/register">注 册</router-link>
          </span>
        </div>
      </div>
    </div>

    <div class="center">
      <router-link :to="{name: 'home'}"><img src="../assets/logo.png" alt="汽车之家" class="logo"/></router-link>
      <div class="title">
        <router-link to="/">首页</router-link>
        <router-link to="/xc">选车</router-link>
        <router-link to="/ph">排行</router-link>
        <router-link to="/cyq">车友圈</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      flag: false
    }
  },
  methods: {
    layout () {
      const user = this.$store.getters.GET_USER
      const that = this
      this.$http.post('/login/layout', user).then(function (rest) {
        // 提示消息
        that.msg('注销成功')
      }, function (error) {
        console.log(error)
      })
      // this.$store.commit('REMOVE_USER')
      this.$store.commit('SET_USER', '')
      this.$router.push('/login')
    },
    center () {
      this.$router.push('/grzl')
    },
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    }
  },
  created () {
    if (this.$store.getters.GET_USER) {
      this.flag = true
    }
  }
}
</script>

<style scoped>
  .aside-col {
    /* display: inline-block; */
    float: left;
    width: 200px;
  }

  .main-col {
    display: inline-block;
    width: calc(100% - 200px);
  }

  .home {
    background-color: #eee;
    padding-top: 10px;
    height: 105px;
    margin-bottom: 10px;
  }

  .home .center a {
    margin-left: 150px;
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
    margin-left: 550px;
    border: 1px solid yellow;
    border-radius: 3px;
    position: relative;
  }

  .home .search i {
    text-align: center;
    width: 40px;
    height: 50px;
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
    left: 50px;
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
    font-size: 25px;
  }

  .home .head {
    position: relative;
  }

  .head .people {
    display: inline-block;
    margin-right: 80px;
    position: absolute;
    right: 0;
    top: 8px;
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
