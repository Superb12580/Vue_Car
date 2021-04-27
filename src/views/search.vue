<template>
  <div>
  <div class="home">
    <div class="head">
      <div class="search">
        <i class="el-icon-search"></i>
        <input type="text" v-model="text" placeholder="请输入你要搜索的内容"/>
        <router-link :to="{name: 'search',query: {text: text}}"><button id="btn" @click="search()">搜索</button></router-link>
      </div>

      <div class="people">
        <img v-if="!user" src="../assets/static/搬砖.jpg" alt="头像"/>
        <img v-else-if="user.photo" :src="user.photo">
        <el-avatar v-else :size="60"> {{user.userName}} </el-avatar>
        <div class="others">
          <span v-show="user">
            <el-link type="primary"  @click="center">个人中心</el-link>
            <el-link type="danger" @click="layout">注 销</el-link>
          </span>
          <span v-show="!user">
            <router-link to="/login">登 录</router-link>
            <router-link to="/register">注 册</router-link>
          </span>
        </div>
      </div>
    </div>

    <div class="center">
      <router-link :to="{name: 'home'}"><img style="width: 370px" src="../assets/static/logo.png" alt="汽车之家" class="logo"/></router-link>
      <div class="title">
        <router-link to="/">首 页</router-link>
        <router-link to="/xc">选 车</router-link>
        <router-link to="/ph">排 行</router-link>
        <router-link to="/cyq">车友圈</router-link>
      </div>
    </div>
  </div>
    <div style="width: 900px;margin: 0 auto">
      <h2>搜索结果...</h2>
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="车型" name="first">
        <div v-if="pageStyle.total !== 0">
          <el-row>
            <el-col :span="8" v-for="(item, index) in pageStyle.records" :key="index">
              <router-link :to="{name: '',query: {styleId: item.styleId}}">
                <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 10px">
                  <img style="height: 230px" :src="item.stylePhoto" class="image">
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
          <div>
            <el-pagination
              background="true"
              @size-change="handleSizeChangeStyle"
              @current-change="handleCurrentChangeStyle"
              :current-page="pageStyle.current"
              :page-sizes="[6, 9, 12, 15]"
              :page-size="pageStyle.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageStyle.total">
            </el-pagination>
          </div>
        </div>
        <div style="margin: 200px 500px" v-else><h2 style="color: red">暂无数据</h2></div>
      </el-tab-pane>
      <el-tab-pane label="新闻" name="second">
        <div v-if="pageNews.total !== 0" class="left2">
          <!--一条新闻-->
          <div class="ytxw" v-for="news in pageNews.records">
            <!--新闻右侧-->
            <div class="xwyc">
              <router-link :to="{name: 'wzxq',query: {id: news.id}}"><h3 style="height: 60px">{{news.title}}</h3></router-link>
              <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><h4 style="float: left">{{news.user.userName}}</h4></router-link>
              <div style="margin-top: 25px;float: left">
                <i class="vip"><img src="../assets/icons/vip.png" alt="vip" /></i>
                <span style="font-size: 14px;margin-left: 20px">{{news.createTime}}</span>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{news.count}}</h5>
            </div>
            <!--新闻图-->
            <div class="xwt">
              <router-link :to="{name: 'wzxq',query: {id: news.id}}">
                <img style="width: 100%;height: 100%" v-if="news.newsPhoto" :src="news.newsPhoto">
                <img style="width: 100%;height: 100%" v-else src="../assets/carWzzs/0.jpg">
              </router-link>
            </div>
          </div>
          <div style="float: left;margin: 30px 0 30px 50px">
            <el-pagination
              background="true"
              @size-change="handleSizeChangeNews"
              @current-change="handleCurrentChangeNews"
              :current-page="pageNews.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="pageNews.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageNews.total">
            </el-pagination>
          </div>
        </div>
        <div style="padding: 200px 350px" v-else><h2 style="color: red">暂无数据</h2></div>
      </el-tab-pane>
      <el-tab-pane label="动态" name="third">
        <div v-if="pageEssay.total !== 0">
          <div>
            <el-timeline>
              <el-timeline-item v-for='(record,index) in pageEssay.records' :key="index" placement="top">
                <el-card style="padding-left: 50px">
                  <router-link :to="{name: 'ckyh',query: {userId: record.userId}}">
                    <img style="width: 60px;height: 60px" v-if="record.user.photo" :src="record.user.photo">
                    <el-avatar v-else :size="60" style="color: indianred"> {{record.user.userName}} </el-avatar>
                  </router-link>
                  <h2><router-link :to="{name: 'dtxq',query: {essayId: record.essayId}}">{{record.essayTitle}}</router-link></h2>
                  <h4 style="color: red" v-if="record.essayLabel">
                    <span style="margin-right: 20px" v-for="item in record.essayLabel">#{{item.labelText}}#</span>
                  </h4>
                  发表于 {{record.createTime}}
                  <el-badge :value="record.forwardCount" class="item2" type="primary">
                    <el-button size="small" @click="forward(record.essayId)">转发</el-button>
                  </el-badge>
                  <el-badge :value="record.agreeCount" class="item">
                    <el-button size="small" @click="agree(record.essayId)">点赞</el-button>
                  </el-badge>
                  <el-badge :value="record.commentCount" class="item" type="warning">
                    <el-button size="small" @click="comment(record.essayId)">评论</el-button>
                  </el-badge>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
          <div>
            <el-pagination
              background="true"
              @size-change="handleSizeChangeEssay"
              @current-change="handleCurrentChangeEssay"
              :current-page="pageEssay.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="pageEssay.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageEssay.total">
            </el-pagination>
          </div>
        </div>
        <div style="margin: 200px 500px" v-else><h2 style="color: red">暂无数据</h2></div>
      </el-tab-pane>
      <el-tab-pane label="视频" name="fourth">
        <div v-if="pageVideo.total !== 0" class="left2">
          <!--一条新闻-->
          <div class="ytxw" v-for="video in pageVideo.records">
            <!--新闻右侧-->
            <div class="xwyc">
              <router-link :to="{name: 'spxq',query: {id: video.id}}"><h3 style="height: 60px">{{video.videoTitle}}</h3></router-link>
              <router-link :to="{name: 'ckyh',query: {userId: video.user.userId}}"><h4 style="float: left">{{video.user.userName}}</h4></router-link>
              <div style="margin-top: 25px;float: left">
                <i class="vip"><img src="../assets/icons/vip.png" alt="vip" /></i>
                <span style="font-size: 14px;margin-left: 20px">{{video.createTime}}</span>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{video.count}}</h5>
            </div>
            <!--新闻图-->
            <div class="xwt">
              <router-link :to="{name: 'spxq',query: {id: video.id}}">
                <video style="width: 100%;height: 100%" :src="video.videoUrl"></video>
              </router-link>
            </div>
          </div>
          <div style="float: left;margin: 30px 0 30px 50px">
            <el-pagination
              background="true"
              @size-change="handleSizeChangeVideo"
              @current-change="handleCurrentChangeVideo"
              :current-page="pageVideo.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="pageVideo.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageVideo.total">
            </el-pagination>
          </div>
        </div>
        <div style="padding: 200px 350px" v-else><h2 style="color: red">暂无数据</h2></div>
      </el-tab-pane>
      <el-tab-pane label="用户" name="fifth">
        <div v-if="pageUser.total !== 0" style="margin: 50px auto">
          <el-row>
            <el-col style="margin-bottom: 50px" :span="4" v-for="(record, index) in pageUser.records" :key="index" :offset="2">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <router-link :to="{name: 'ckyh',query: {userId: record.userId}}">
                  <div style="margin-left: 35px">
                    <img style="width: 80px;height: 80px" v-if="record.photo" :src="record.photo">
                    <el-avatar v-else :size="80" style="color: indianred"> {{record.userName}} </el-avatar>
                  </div>
                  <h3 style="text-align: center">{{record.userName}}</h3>
                </router-link>
              </el-card>
            </el-col>
          </el-row>
          <div style="margin-left: 50px">
            <el-pagination
              background="true"
              @size-change="handleSizeChangeUser"
              @current-change="handleCurrentChangeUser"
              :current-page="pageUser.current"
              :page-sizes="[6, 10, 12, 18]"
              :page-size="pageUser.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="pageUser.total">
            </el-pagination>
          </div>
        </div>
        <div style="margin: 200px 500px" v-else><h2 style="color: red">暂无数据</h2></div>
      </el-tab-pane>
    </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: 'search',
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
      text: '',
      user: {},
      activeName: 'first',
      pageStyle: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      pageNews: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      pageUser: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      pageVideo: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      pageEssay: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      }
    }
  },
  methods: {
    handleSizeChangeNews (val) {
      const that = this
      this.$http.get('/news/search?text=' + this.text + '&size=' + val).then(function (rest) {
        that.pageNews = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeNews (val) {
      const that = this
      this.$http.get('/news/search?text=' + this.text + '&size=' + that.pageNews.size + '&current=' + val).then(function (rest) {
        that.pageNews = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChangeVideo (val) {
      const that = this
      this.$http.get('/video/search?text=' + this.text + '&size=' + val).then(function (rest) {
        that.pageVideo = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeVideo (val) {
      const that = this
      this.$http.get('/video/search?text=' + this.text + '&size=' + that.pageVideo.size + '&current=' + val).then(function (rest) {
        that.pageVideo = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChangeStyle (val) {
      const that = this
      this.$http.get('/style/search?text=' + this.text + '&size=' + val).then(function (rest) {
        that.pageStyle = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeStyle (val) {
      const that = this
      this.$http.get('/style/search?text=' + this.text + '&size=' + that.pageStyle.size + '&current=' + val).then(function (rest) {
        that.pageStyle = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChangeEssay (val) {
      const that = this
      this.$http.get('/essay/search?text=' + this.text + '&size=' + val).then(function (rest) {
        that.pageEssay = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeEssay (val) {
      const that = this
      this.$http.get('/essay/search?text=' + this.text + '&size=' + that.pageEssay.size + '&current=' + val).then(function (rest) {
        that.pageEssay = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChangeUser (val) {
      const that = this
      this.$http.get('/user/search?text=' + this.text + '&size=' + val).then(function (rest) {
        that.pageUser = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeUser (val) {
      const that = this
      this.$http.get('/user/search?text=' + this.text + '&size=' + that.pageUser.size + '&current=' + val).then(function (rest) {
        that.pageUser = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 转发
    forward (essayId) {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      this.$prompt('说点什么吧...', '转发', {
        confirmButtonText: '转发',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const that = this
        this.$http.post('/forward/add', { userId: user.userId, essayId: essayId, forwardTitle: value }).then(rest => {
          that.reload()
        })
        const msg = value == null ? '' : value
        this.$message({
          type: 'success',
          message: '已转发 ' + msg
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消转发'
        })
      })
    },
    // 评论
    comment (essayId) {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      this.$prompt('说说你的看法...', '评论', {
        confirmButtonText: '评论',
        cancelButtonText: '取消',
        inputPattern: /[^]/,
        inputErrorMessage: '说点什么吧...'
      }).then(({ value }) => {
        const that = this
        this.$http.post('/comment/add', { userId: user.userId, essayId: essayId, commentText: value }).then(rest => {
          that.reload()
        })
        this.$message({
          type: 'success',
          message: '已评论 ' + value
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消评论'
        })
      })
    },
    // 点赞
    agree (essayId) {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.post('/agree/addDelete', { userId: user.userId, essayId: essayId }).then(rest => {
        that.reload()
        const msg = rest.data.msg
        that.msg(msg)
      })
    },
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    },
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
    handleClick (tab, event) {
      console.log(tab, event)
    },
    search () {
      const that = this
      this.$http.get('/style/search?text=' + this.text).then(function (rest) {
        that.pageStyle = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.$http.get('/video/search?text=' + this.text).then(function (rest) {
        that.pageVideo = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.$http.get('/news/search?text=' + this.text).then(function (rest) {
        that.pageNews = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.$http.get('/essay/search?text=' + this.text).then(function (rest) {
        that.pageEssay = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.$http.get('/user/search?text=' + this.text).then(function (rest) {
        that.pageUser = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.user = this.$store.getters.GET_USER
    const xr = this.$route.query.text
    if (xr) {
      this.text = xr
    }
    this.search()
  }
}
</script>

<style scoped>

  .item {
    margin-top: 10px;
    margin-right: 40px;
  }
  .item2 {
    margin-top: 10px;
    margin-right: 40px;
    margin-left: 150px;
  }

  .home {
    /*background-color: #eee;*/
    padding: 10px 0;
    /*border: 1px solid #ccc;*/
  }

  .home .center a {
    margin-left: 150px;
    font-weight: bold;
    text-decoration: none;
    color: #000;
  }

  .home a.router-link-exact-active {
    color: #ff6700;
  }

  .home .search {
    display: block;
    width: 500px;
    margin-left: 550px;
    border: 1px solid #ff6700;;
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
    background-color: #ff6700;
    color: #000;
    border: 0;
    outline: 0;
    cursor: pointer;
  }

  .home .center {
    position: relative;
    width: 1150px;
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
    margin-left: 260px;
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
    width: 60px;
    height: 60px;
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
    height: 70px;
    background-color: #fff;
    opacity: 0;
    z-index: 10;
    position: absolute;
    top: 60px;
    left: 0;
  }

  .head .people .others a {
    margin: 10px 5px;
    display: block;
    text-decoration: none;
    color: #000 !important;
  }

  .head .people .others a:hover {
    background-color: #ff6700;
  }
  .left2 {
    width: 850px;
    float: left;
  }
  .left2 .ytxw {
    width: 810px;
    height: 200px;
    margin: 10px 20px;
    border: 1px solid #ccc;
    float: left;
  }
  .left2 .vip img{
    margin: 0 3px;
    width: 40px;
  }
  .left2 .xwt {
    width: 220px;
    height: 160px;
    float: left;
    margin: 20px;
  }
  .left2 .xwyc {
    width: 530px;
    height: 160px;
    margin: 20px 20px 20px 0;
    float: right;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  a:hover {
    color: red;
  }
</style>
