<template>
  <div>
    <Header></Header>
    <div class="xr1">
      <el-tabs v-model="activeName">
        <el-tab-pane label="评分排行" name="first">
          <div class="ytxw" v-for="(item,index) in pfph">
            <div class="xwyc" v-if="index === 0" style="background-color: #F96868">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">评分：{{item.pf}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 1" style="background-color: #926DDE">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">评分：{{item.pf}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 2" style="background-color: #15C377">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">评分：{{item.pf}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else>
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">评分：{{item.pf}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwt">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}">
                <img style="width: 100%;height: 100%" :src="item.style_photo">
              </router-link>
            </div>
            <div class="xwzj">
              <span v-if="index === 0" style="font-size: 70px;color: #F96868">{{index + 1}}</span>
              <span v-else-if="index === 1" style="font-size: 70px;color: #926DDE">{{index + 1}}</span>
              <span v-else-if="index === 2" style="font-size: 70px;color: #15C377">{{index + 1}}</span>
              <span v-else style="font-size: 70px">{{index + 1}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销量排行" name="second">
          <div class="ytxw" v-for="(item,index) in xlph">
            <div class="xwyc" v-if="index === 0" style="background-color: #F96868">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">销量：{{item.xl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 1" style="background-color: #926DDE">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">销量：{{item.xl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 2" style="background-color: #15C377">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">销量：{{item.xl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else>
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">销量：{{item.xl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwt">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}">
                <img style="width: 100%;height: 100%" :src="item.stylePhoto">
              </router-link>
            </div>
            <div class="xwzj">
              <span v-if="index === 0" style="font-size: 70px;color: #F96868">{{index + 1}}</span>
              <span v-else-if="index === 1" style="font-size: 70px;color: #926DDE">{{index + 1}}</span>
              <span v-else-if="index === 2" style="font-size: 70px;color: #15C377">{{index + 1}}</span>
              <span v-else style="font-size: 70px">{{index + 1}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="点击量" name="third">
          <div class="ytxw" v-for="(item,index) in djlph">
            <div class="xwyc" v-if="index === 0" style="background-color: #F96868">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">点击量：{{item.djl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 1" style="background-color: #926DDE">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">点击量：{{item.djl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 2" style="background-color: #15C377">
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">点击量：{{item.djl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else>
              <router-link :to="{name: 'cxq',query: {styleId: item.styleId}}"><h3 style="height: 60px;margin-left: 20px">{{item.styleName}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">点击量：{{item.djl}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwt">
              <router-link :to="{name: '',query: {styleId: item.styleId}}">
                <img style="width: 100%;height: 100%" :src="item.stylePhoto">
              </router-link>
            </div>
            <div class="xwzj">
              <span v-if="index === 0" style="font-size: 70px;color: #F96868">{{index + 1}}</span>
              <span v-else-if="index === 1" style="font-size: 70px;color: #926DDE">{{index + 1}}</span>
              <span v-else-if="index === 2" style="font-size: 70px;color: #15C377">{{index + 1}}</span>
              <span v-else style="font-size: 70px">{{index + 1}}</span>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收藏数" name="fourth">
          <div class="ytxw" v-for="(item,index) in scsph">
            <div class="xwyc" v-if="index === 0" style="background-color: #F96868">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">收藏数：{{item.count}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 1" style="background-color: #926DDE">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">收藏数：{{item.count}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else-if="index === 2" style="background-color: #15C377">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">收藏数：{{item.count}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwyc" v-else>
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}"><h3 style="height: 60px;margin-left: 20px">{{item.style_name}}</h3></router-link>
              <div style="margin-top: 10px;float: left">
                <h4 style="font-size: 14px;margin-left: 20px">收藏数：{{item.count}}</h4>
                <h4 style="font-size: 14px;margin-left: 20px">价格区间：{{item.jgqj}}</h4>
              </div>
              <h5 style="font-size: 14px;float: right"><span style="font-size: 25px;margin-right: 6px"></span>上市时间：{{item.sssj}}</h5>
            </div>
            <div class="xwt">
              <router-link :to="{name: 'cxq',query: {styleId: item.style_id}}">
                <img style="width: 100%;height: 100%" :src="item.style_photo">
              </router-link>
            </div>
            <div class="xwzj">
              <span v-if="index === 0" style="font-size: 70px;color: #F96868">{{index + 1}}</span>
              <span v-else-if="index === 1" style="font-size: 70px;color: #926DDE">{{index + 1}}</span>
              <span v-else-if="index === 2" style="font-size: 70px;color: #15C377">{{index + 1}}</span>
              <span v-else style="font-size: 70px">{{index + 1}}</span>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
<!--    即将上市-->
    <div class="xr2">
    <div class="section">
      <div class="athm-title clearfix">
        <div class="athm-title__name athm-title__name--green">即将上市</div>
      </div>
      <div class="box">
        <div class="timeline-wrap">
          <div class="list clearfix" v-for="item in page.records">
            <div class="info">
              <p><span class="time">{{item.sssj}}</span></p>
              <p>
                <router-link :to="{name: 'wzxq',query: {id: item.id}}"><a class="desc one" href="#">{{item.sscmc}}</a></router-link>
              </p>
            </div>
            <div class="pic">
              <router-link :to="{name: 'wzxq',query: {id: item.id}}"><a href="#" class="placeholderimg">
                <img
                  width="80"
                  height="60"
                  :src="item.newsPhoto"
                  alt=""
                  style="display: inline-block"
                />
              </a></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
      <div class="box3" style="height: 430px;width: 400px;float: left">
        <ul style="padding-left: 20px">
          <h2 style="margin-bottom: 20px">视频排行榜</h2>
          <li class="list" v-for="(item,index) in spPh">
          <span class="left">
            <span v-if="index === 0" class="num num1">{{index + 1}}</span>
            <span v-else-if="index === 1" class="num num2">{{index + 1}}</span>
            <span v-else-if="index === 2" class="num num3">{{index + 1}}</span>
            <span v-else class="num">{{index + 1}}</span>
            <router-link v-if="index === 0" style="font-size: 16px" :to="{name: 'spxq',query: {id: item.id}}"><span style="color: #e62021" class="content">{{item.videoTitle}}</span></router-link>
            <router-link v-else-if="index === 1" style="font-size: 16px" :to="{name: 'spxq',query: {id: item.id}}"><span style="color: #e65800" class="content">{{item.videoTitle}}</span></router-link>
            <router-link v-else-if="index === 2" style="font-size: 16px" :to="{name: 'spxq',query: {id: item.id}}"><span style="color: #f5b330" class="content">{{item.videoTitle}}</span></router-link>
            <router-link v-else style="font-size: 16px;height: 20px" :to="{name: 'spxq',query: {id: item.id}}"><span class="content">{{item.videoTitle}}</span></router-link>
          </span>
            <span class="bofang"> {{item.count}}次点击 </span>
          </li>
        </ul>
      </div>
      <!--      友情链接-->
      <div class="footer">
        <div class="footer1">
          <h2>友情链接</h2>
          <div class="cars">
            <span>今日头条</span>
            <span>爱卡汽车</span>
            <span>58汽车</span>
            <span>驾考宝典</span>
            <span>网通社汽车</span>
            <span>360汽车</span>
            <span>新浪汽车</span>
            <span>电动邦</span>
            <span>太平洋汽车</span>
            <span>大搜车家选</span>
            <span>24车汽车资讯</span>
            <span>车质网</span>
            <span>车秀网</span>
            <span>狮桥二手车</span>
            <span>卡车之家</span>
          </div>
        </div>
        <div class="footer2">
          <p class="connect">© 2021 懂车帝 www.dongchedi.com</p>
          <p class="connect">京公网安备 11010802026035号</p>

          <p class="connect">京ICP备17027026号-1</p>

          <p class="connect">增值电信业务经营许可证（京B2-20180202）</p>

          <p class="connect">违法和不良信息举报电话：400-140-2108</p>

          <p class="connect">中央网信办违法和不良信息举报中心</p>
          <p class="connect">网络文化经营许可证-京网文（2019）4715-493号</p>
          <span class="connect">懂车帝用户协议</span> |

          <span class="connect">懂车帝隐私政策</span> | <span class="connect">营业执照</span>

          <p><a href="#">侵权投诉</a> | <a href="#">我要反馈</a></p>
        </div>
      </div>
    </div>
  </div>
</template>
<!--排行-->
<script>
import Header from '../components/header'
export default {
  name: 'ph',
  components: { Header },
  data () {
    return {
      // 即将上市
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 5
      },
      activeName: 'second',
      xlph: [],
      pfph: [],
      djlph: [],
      scsph: [],
      spPh: []
    }
  },
  created () {
    const that = this
    // 即将上市
    this.$http.get('/news/listJjss').then(function (rest) {
      that.page = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 销量
    this.$http.get('/style/xlPh').then(function (rest) {
      that.xlph = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 评分
    this.$http.get('/style/pfPh').then(function (rest) {
      that.pfph = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 点击量
    this.$http.get('/style/djlPh').then(function (rest) {
      that.djlph = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 收藏
    this.$http.get('/style/scsPh').then(function (rest) {
      that.scsph = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 视频排行初始化
    this.$http.get('/video/itemPh').then(function (rest) {
      that.spPh = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  /*  排行榜*/
  ul,
  li {
    list-style: none;
  }
  .box3 {
    font-size: 0;
    margin-left: 40px;
  }
  .box3 ul {
    width: 400px;
    font-size: 14px;
  }
  .box3 ul li {
    display: flex;
    width: 100%;
    margin-bottom: 17px;
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
  .box3 .left .num3 {
    background-color: #f5b330;
    color: #ffffff;
  }
  .box3 .left .content {
    display: block;
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #1f2129;
  }
  .box3 ul li .bofang {
    margin-left: auto;
    font-size: 12px;
    color: #979aa8;
    padding-left: 6px;
  }
  /*  排行榜*/
  .ytxw {
    width: 750px;
    height: 150px;
    margin: 15px 0;
    border: 1px solid #ccc;
    float: left;
  }
  .xwzj {
    width: 70px;
    height: 110px;
    margin: 20px 0;
    float: left;
    text-align: right;
  }
  .xwt {
    width: 160px;
    height: 110px;
    float: left;
    margin: 20px;
  }
  a {
    text-decoration: none;
    color: #000;
  }
  a:hover {
    color: red;
  }
  .xwyc {
    width: 400px;
    height: 110px;
    margin: 20px 20px 20px 0;
    float: right;
  }

  .xr1{
    float: left;
    width: 750px;
    margin-left: 100px;
    margin-top: 20px;
  }
  .xr2{
    float: left;
    width: 450px;
  }
  /*友情链接*/
  .footer {
    float: right;
    width: 340px;
    margin: 30px;
    line-height: 20px;
    padding: 16px 20px;
    font-size: 12px;
    color: #666;
    background-color: #f7f8fc;
  }
  .footer .footer2 p {
    display: block;
  }
  .footer .footer2 p a{
    text-decoration: none;
    font-weight: 600;
    color: #666;
  }
  .footer .footer1{
    margin-bottom: 20px;
  }

  .footer .footer1 .cars {
    display: flex;
    flex-wrap: wrap;
  }
  .footer .footer1 .cars span {
    font-size: 14px;
    padding: 10px 25px 10px 0;
  }
  /*即将上市*/
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  body {
    font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
    font-size: 14px;
  }
  ul,
  li {
    list-style: none;
  }
  a {
    text-decoration: none;
  }
  .section {
    width: 300px;
    margin: 20px auto;
  }
  .athm-title {
    position: relative;
  }
  .athm-title__name {
    position: relative;
    float: left;
    color: #333;
    font-size: 20px;
    font-weight: 700;
    padding: 5px 0;
    margin-right: 30px;
  }
  .athm-title__name:before {
    content: "";
    position: relative;
    top: 5px;
    display: inline-block;
    width: 6px;
    height: 20px;
    margin-right: 10px;
    vertical-align: top;
    background-color: #5bc228;
  }
  .timeline-wrap {
    position: relative;
  }
  .timeline-wrap:before {
    content: "";
    position: absolute;
    top: 10px;
    left: 4px;
    bottom: 10px;
    width: 0;
    border-left: 1px solid #d0d0d0;
  }

  .timeline-wrap .list {
    position: relative;
    line-height: 20px;
    padding: 10px 0 14px 28px;
  }
  .timeline-wrap .list:before {
    content: "";
    position: absolute;
    top: 22px;
    left: 0;
    width: 9px;
    height: 9px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: #88a8e5;
  }
  .timeline-wrap .list:first-child:before {
    width: 15px;
    height: 15px;
    top: 20px;
    left: -3px;
    border: 2px solid #5bc228;
    background-color: #fff;
  }
  .timeline-wrap .info {
    float: left;
    padding-top: 3px;
    padding-left: 16px;
  }
  .timeline-wrap .time {
    position: relative;
    display: inline-block;
    height: 30px;
    line-height: 28px;
    color: #05f;
    padding: 0 12px 0 5px;
    box-sizing: border-box;
    border-radius: 0 5px 5px 0;
    border: 1px solid #88a8e5;
  }

  .timeline-wrap .list:first-child .time {
    color: #fff;
    border-color: #5bc228;
    background-color: #5bc228;
  }

  .timeline-wrap .time:before {
    content: "";
    position: absolute;
    top: -1px;
    left: -33px;
    z-index: 1;
    width: 0;
    height: 0;
    border-width: 15px 16px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0) #88a8e5 rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  }
  .timeline-wrap .list:first-child .info .time:before {
    border-right-color: #5bc228;
  }

  .timeline-wrap .time:after {
    content: "";
    position: absolute;
    top: 0;
    left: -30px;
    z-index: 2;
    width: 0;
    height: 0;
    border-width: 14px 15px;
    border-style: solid;
    border-color: rgba(0, 0, 0, 0) #fff rgba(0, 0, 0, 0) rgba(0, 0, 0, 0);
  }

  .timeline-wrap .pic {
    width: 80px;
    height: 60px;
    float: right;
  }
  .placeholderimg {
    display: inline-block;
    vertical-align: top;
    /*background: url(/holdimg_white.png) no-repeat 50%;*/
    background-color: #f2f2f2;
    background-size: 50% auto;
  }
  .timeline-wrap .list .info p .one {
    font-weight: 600;
  }

  .info p {
    margin-bottom: 10px;
  }

  .info p .desc {
    color: #000;
  }

  .info p .desc:hover {
    color: red;
  }
</style>
