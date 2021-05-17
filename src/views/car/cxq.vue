<template>
  <div>
    <Header></Header>
    <div style="margin-top: 35px;margin-bottom: 35px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>Car详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="item1">
      <div class="demo1">
        <div>
          <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 10px">
            <img style="width: 300px;height: 225px" :src="style.stylePhoto" class="image">
            <div>
              <time class="time">上市时间：{{ style.sssj }}</time>
              <el-button type="text" class="button" @click="cktj()">查看图集</el-button>
            </div>
          </el-card>
        </div>
      </div>
      <div class="demo2">
        <h2>{{style.styleName}}</h2>
        <div style="float: left;width: 200px;height: 225px">
          <br>
          <label>价格区间：</label><span style="color: #ff6700">{{style.jgqj}}</span>
          <br>
          <br>
          <label>国别：</label><span style="color: #ff6700">{{style.gb.data}}</span>
          <br>
          <br>
          <label>销量：</label><span style="color: #ff6700">{{style.xl}}</span>
          <br>
          <br>
          <label>能源类型：</label><span style="color: #ff6700">{{style.nylx.data}}</span>
          <br>
          <br>
          <br>
          <el-switch
            v-model="value"
            @change="glxs"
            active-text="高亮显示不同参数">
          </el-switch>
        </div>
        <div style="float: left;width: 200px;height: 225px">
          <br>
          <br>
          <br>
          <label>级别：</label><span style="color: #ff6700">{{style.jb.data}}</span>
          <br>
          <br>
          <label>厂商：</label><span style="color: #ff6700">{{style.cs.data}}</span>
          <br>
          <br>
          <label>环保标准：</label><span style="color: #ff6700">{{style.hbbz.data}}</span>
        </div>
      </div>
      <div class="demo3">
        <div style="float: left;width: 250px;height: 300px;padding-top: 135px">
          口碑：
          <br>
          <br>
          <el-rate
            v-model="style.kb"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value}">
          </el-rate>
          <br>
          点击量：<span style="color: red">{{style.djl}}</span><br>
          <div style="margin-top: 30px">
            <el-button v-if="two" @click="sc()">已收藏该车型</el-button>
            <el-button v-else @click="sc()" type="primary">点击收藏该车型</el-button>
          </div>
        </div>
        <div style="float: left;width: 250px;height: 300px;padding-top: 135px">
          <div v-if="one">
            我的评分：
            <br>
            <br>
            <el-rate
              v-model="one.fs"
              disabled
              show-score
              text-color="#ff9900"
              score-template="{value}">
            </el-rate>
          </div>
          <div v-else>
            点击评分：
            <br>
            <br>
            <el-rate
              @change="pf"
              v-model="value2"
              show-text>
            </el-rate>
          </div>
          <br>
          评分人数：<span style="color: red">{{style.pfrs}}</span><br>
        </div>
      </div>
    </div>
    <div class="item2">
      <div class="box">
        <table border="1" class="table_text">
          <tr>
            <td colspan="17"><span style="color: #409EFF">{{style.styleName}}</span>车型对比表<span style="margin-left: 50px">共<b style="color: red">{{car.length}}</b>款车型</span></td>
          </tr>
          <tr>
            <th>car名称</th>
            <th>厂商指导价（万元）</th>
            <th>最大扭矩（N*m）</th>
            <th>长宽高（mm）</th>
            <th>轴距（mm）</th>
            <th>油箱容积（L）</th>
            <th>发动机型号</th>
            <th>排量（L）</th>
            <th>进气方式</th>
            <th>最大马力（Ps）</th>
            <th>最大功率（kW）</th>
            <th>驱动方式</th>
            <th>制动类型</th>
            <th>百公里加速（s）</th>
            <th>百公里油耗（L）</th>
            <th>最高车速（Km/h）</th>
            <th>燃油标号</th>
          </tr>
          <tr v-for="item in car">
            <td>{{item.carName}}</td>
            <td v-if="flag.cszdj === 1" style="color: red;">{{item.cszdj}}</td>
            <td v-else>{{item.cszdj}}</td>
            <td v-if="flag.zdnj === 1" style="color: red;">{{item.zdnj}}</td>
            <td v-else>{{item.zdnj}}</td>
            <td v-if="flag.cc === 1 || flag.ck === 1 || flag.cg === 1" style="color: red;">{{item.cc}}*{{item.ck}}*{{item.cg}}</td>
            <td v-else>{{item.cc}}*{{item.ck}}*{{item.cg}}</td>
            <td v-if="flag.zj === 1" style="color: red;">{{item.zj}}</td>
            <td v-else>{{item.zj}}</td>
            <td v-if="flag.yxrj === 1" style="color: red;">{{item.yxrj}}</td>
            <td v-else>{{item.yxrj}}</td>
            <td v-if="flag.fdjxh === 1" style="color: red;">{{item.fdjxh}}</td>
            <td v-else>{{item.fdjxh}}</td>
            <td v-if="flag.pl === 1" style="color: red;">{{item.pl}}</td>
            <td v-else>{{item.pl}}</td>
            <td v-if="flag.jqfs === 1" style="color: red;">{{item.jqfs.data}}</td>
            <td v-else>{{item.jqfs.data}}</td>
            <td v-if="flag.zdml === 1" style="color: red;">{{item.zdml}}</td>
            <td v-else>{{item.zdml}}</td>
            <td v-if="flag.zdgl === 1" style="color: red;">{{item.zdgl}}</td>
            <td v-else>{{item.zdgl}}</td>
            <td v-if="flag.qdfs === 1" style="color: red;">{{item.qdfs.data}}</td>
            <td v-else>{{item.qdfs.data}}</td>
            <td v-if="flag.zdlx === 1" style="color: red;">{{item.zdlx.data}}</td>
            <td v-else>{{item.zdlx.data}}</td>
            <td v-if="flag.bgljs === 1" style="color: red;">{{item.bgljs}}</td>
            <td v-else>{{item.bgljs}}</td>
            <td v-if="flag.bglyh === 1" style="color: red;">{{item.bglyh}}</td>
            <td v-else>{{item.bglyh}}</td>
            <td v-if="flag.zgcs === 1" style="color: red;">{{item.zgcs}}</td>
            <td v-else>{{item.zgcs}}</td>
            <td v-if="flag.rybh === 1" style="color: red;">{{item.rybh.data}}</td>
            <td v-else>{{item.rybh.data}}</td>
          </tr>
        </table>
      </div>
    </div>
    <div class="item3">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="相关文章" name="first">
          <div v-if="pageNews.total !== 0" class="left2">
            <!--一条新闻-->
            <div class="ytxw" v-for="news in pageNews.records">
              <!--新闻右侧-->
              <div class="xwyc">
                <router-link :to="{name: 'wzxq',query: {id: news.id}}"><h3 style="height: 60px">{{news.title}}</h3></router-link>
                <router-link :to="{name: 'ckyh',query: {userId: news.user.userId}}"><h4 style="float: left">{{news.user.userName}}</h4></router-link>
                <div style="margin-top: 25px;float: left">
                  <i class="vip"><img src="../../assets/icons/vip.png" alt="vip" /></i>
                  <span style="font-size: 14px;margin-left: 20px">{{news.createTime}}</span>
                </div>
                <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px" class="el-icon-s-help"></span>在看：{{news.count}}</h5>
              </div>
              <!--新闻图-->
              <div class="xwt">
                <router-link :to="{name: 'wzxq',query: {id: news.id}}">
                  <img style="width: 100%;height: 100%" v-if="news.newsPhoto" :src="news.newsPhoto">
                  <img style="width: 100%;height: 100%" v-else src="../../assets/carWzzs/0.jpg">
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
        <el-tab-pane label="相关视频" name="second">
          <div v-if="pageVideo.total !== 0" class="left2">
            <!--一条新闻-->
            <div class="ytxw" v-for="video in pageVideo.records">
              <!--新闻右侧-->
              <div class="xwyc">
                <router-link :to="{name: 'spxq',query: {id: video.id}}"><h3 style="height: 60px">{{video.videoTitle}}</h3></router-link>
                <router-link :to="{name: 'ckyh',query: {userId: video.user.userId}}"><h4 style="float: left">{{video.user.userName}}</h4></router-link>
                <div style="margin-top: 25px;float: left">
                  <i class="vip"><img src="../../assets/icons/vip.png" alt="vip" /></i>
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
      </el-tabs>
    </div>
    <el-dialog title="查看图集" :visible.sync="dialogVisible" width="1300px">
      <div v-if="tj.length !== 0">
        <el-row>
          <el-col :span="6" v-for="(item, index) in tj" :key="index">
            <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 10px">
              <img style="height: 230px" :src="item.photoUrl" class="image">
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div v-else style="color: red">暂无数据</div>
    </el-dialog>
  </div>
</template>
<!--车详情-->
<script>
import Header from '../../components/header'
export default {
  name: 'cxq',
  components: { Header },
  // 页面刷新
  inject: ['reload'],
  data () {
    return {
      // 评分
      value2: null,
      // 高亮显示
      value: false,
      // 查看图集
      tj: [],
      dialogVisible: false,
      activeName: 'first',
      iconClasses: ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'],
      pageNews: {
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
      car: [],
      style: {},
      styleId: '',
      // 高亮显示
      flag: {},
      // 登录评分
      one: {},
      // 登录收藏
      two: {}
    }
  },
  methods: {
    pf () {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.get('/reputation/pf?styleId=' + this.styleId + '&userId=' + user.userId + '&value=' + this.value2).then(function (rest) {
        that.reload()
      }, function (error) {
        console.log(error)
      })
    },
    sc () {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.post('/collection/addDelete', { userId: user.userId, styleId: this.styleId }).then(function (rest) {
        that.reload()
        that.msg(rest.data.msg)
      }, function (error) {
        console.log(error)
      })
    },
    // 高亮显示
    glxs () {
      // car
      const that = this
      if (this.value) {
        this.$http.get('/car/glxs?styleId=' + this.styleId).then(function (rest) {
          that.flag = rest.data.data
        }, function (error) {
          console.log(error)
        })
      } else {
        that.flag = ''
      }
    },
    // 提示
    msg (data) {
      this.$message({
        showClose: true,
        message: data,
        type: 'success'
      })
    },
    handleSizeChangeNews (val) {
      const that = this
      this.$http.get('/news/listNewsByStyleId?styleId=' + this.styleId + '&size=' + val).then(function (rest) {
        that.pageNews = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeNews (val) {
      const that = this
      this.$http.get('/news/listNewsByStyleId?styleId=' + this.styleId + '&size=' + that.pageNews.size + '&current=' + val).then(function (rest) {
        that.pageNews = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleSizeChangeVideo (val) {
      const that = this
      this.$http.get('/video/listVideoByStyleId?styleId=' + this.styleId + '&size=' + val).then(function (rest) {
        that.pageVideo = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChangeVideo (val) {
      const that = this
      this.$http.get('/video/listVideoByStyleId?styleId=' + this.styleId + '&size=' + that.pageVideo.size + '&current=' + val).then(function (rest) {
        that.pageVideo = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
    cktj () {
      this.dialogVisible = true
      const that = this
      this.$http.get('/photo/styleById?styleId=' + this.styleId).then(function (rest) {
        that.tj = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    this.styleId = this.$route.query.styleId
    const that = this
    // 相关新闻
    this.$http.get('/news/listNewsByStyleId?styleId=' + this.styleId).then(function (rest) {
      that.pageNews = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 相关视频
    this.$http.get('/video/listVideoByStyleId?styleId=' + this.styleId).then(function (rest) {
      that.pageVideo = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 车型
    this.$http.get('/style/xq?styleId=' + this.styleId).then(function (rest) {
      that.style = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // car
    this.$http.get('/car/xq?styleId=' + this.styleId).then(function (rest) {
      that.car = rest.data.data
    }, function (error) {
      console.log(error)
    })
    const user = this.$store.getters.GET_USER
    // 判断是否已登录
    // 默认未登录
    that.one = null
    that.two = null
    if (user) {
      this.$http.get('/reputation/item?styleId=' + this.styleId + '&userId=' + user.userId).then(function (rest) {
        that.one = rest.data.data
      }, function (error) {
        console.log(error)
      })
      this.$http.get('/collection/sfsc?styleId=' + this.styleId + '&userId=' + user.userId).then(function (rest) {
        that.two = rest.data.data
      }, function (error) {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
  a {
    color: #000;
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
  .item1 {
    width: 1300px;
    height: 300px;
  }
  .item2 {
  }
  .item3 {
    width: 1300px;
  }
  .demo1 {
    width: 350px;
    height: 300px;
    float: left;
  }
  .demo2 {
    width: 425px;
    height: 300px;
    float: left;
    padding-left: 25px;
  }
  .demo3 {
    width: 500px;
    height: 300px;
    float: left;
  }
  /*新闻*/
  .left2 {
    width: 1200px;
    float: left;
  }
  .left2 .ytxw {
    width: 1100px;
    height: 200px;
    margin: 10px 90px;
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
    width: 730px;
    height: 160px;
    margin: 20px 20px 20px 0;
    float: right;
  }

  .box{
    margin: 20px auto;
  }
  .table_text{
    /*font-family: "楷体";*/
    font-size: 22px;
    text-align: center;
    /* 让表格边线为单条线 */
    /*border-collapse: collapse;*/
    /*border: 1px solid red;*/
  }
</style>
