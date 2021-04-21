<template>
  <div>
    <Header></Header>
    <div style="margin: 20px auto">
    <div class="left" style="text-align: center">
      <el-button @click="xcTj(1,'')" style="color: red" type="text" v-if="'' === map.csTj"><b>全部</b></el-button>
      <el-button @click="xcTj(1,'')" type="text" v-else><b>全部</b></el-button>
      <div style="width: 200px;height: 2px;background-color: #bbb"></div>
      <div v-for="(item,index) in cs" :key="index">
        <el-button @click="xcTj(1,item.id)" style="color: red" type="text" v-if="item.id === map.csTj">{{item.index}} - {{item.data}}</el-button>
        <el-button @click="xcTj(1,item.id)" type="text" v-else>{{item.index}} - {{item.data}}</el-button>
        <div style="width: 200px;height: 1px;background-color: #bbb"></div>
      </div>
    </div>
    <div class="right">
      <div class="right1">
        <div>
          <el-button style="float: right" @click="qc()" type="text"><b>清除所有条件</b></el-button>
          <h2>筛选条件</h2>
        </div>
        <div class="item">
          <el-button @click="xcTj(2,'')" style="color: red" type="text" v-if="'' === map.jbTj"><b>级别</b></el-button>
          <el-button @click="xcTj(2,'')" type="text" v-else><b>级别</b></el-button>
        <el-button disabled @click="xcTj(2,item.id)" style="color: black" v-for="(item,index) in jb" :key="index" v-if="item.id === map.jbTj"><b>{{item.data}}</b></el-button>
        <el-button @click="xcTj(2,item.id)" v-for="(item,index) in jb" :key="index" v-if="item.id !== map.jbTj" type="primary">{{item.data}}</el-button>
        </div>
        <div class="item">
          <el-button @click="xcTj(3,'')" style="color: red" type="text" v-if="'' === map.gbTj"><b>国别</b></el-button>
          <el-button @click="xcTj(3,'')" type="text" v-else><b>国别</b></el-button>
          <el-button disabled @click="xcTj(3,item.id)" style="color: black" v-for="(item,index) in gb" :key="index" v-if="item.id === map.gbTj"><b>{{item.data}}</b></el-button>
          <el-button @click="xcTj(3,item.id)" v-for="(item,index) in gb" :key="index" v-if="item.id !== map.gbTj" type="success">{{item.data}}</el-button>
        </div>
        <div class="item">
          <el-button @click="xcTj(4,'')" style="color: red" type="text" v-if="'' === map.hbbzTj"><b>环保</b></el-button>
          <el-button @click="xcTj(4,'')" type="text" v-else><b>环保</b></el-button>
          <el-button disabled @click="xcTj(4,item.id)" style="color: black" v-for="(item,index)  in hbbz" :key="index" v-if="item.id === map.hbbzTj"><b>{{item.data}}</b></el-button>
          <el-button @click="xcTj(4,item.id)" v-for="(item,index) in hbbz" :key="index" v-if="item.id !== map.hbbzTj" type="danger">{{item.data}}</el-button>
        </div>
        <div class="item">
          <el-button @click="xcTj(5,'')" style="color: red" type="text" v-if="'' === map.nylxTj"><b>能源</b></el-button>
          <el-button @click="xcTj(5,'')" type="text" v-else><b>能源</b></el-button>
          <el-button disabled @click="xcTj(5,item.id)" style="color: black" v-for="(item,index) in nylx" :key="index" v-if="item.id === map.nylxTj"><b>{{item.data}}</b></el-button>
          <el-button @click="xcTj(5,item.id)" v-for="(item,index) in nylx" :key="index" v-if="item.id !== map.nylxTj" type="warning">{{item.data}}</el-button>
        </div>
      </div>
      <div class="right2">
        <div>
          <el-row>
            <el-col :span="8" v-for="(item, index) in style" :key="index" :offset="0">
              <router-link :to="{name: '',query: {styleId: item.styleId}}">
                <el-card :body-style="{ padding: '10px' }" shadow="hover" style="margin: 10px">
                  <img style="height: 230px" :src="item.stylePhoto" class="image">
                  <div style="padding: 14px;">
                    <a><span>{{item.styleName}}</span></a>
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
      </div>
    </div>
    </div>
  </div>
</template>
<!--选车-->
<script>
import Header from '../components/header'
export default {
  name: 'xc',
  components: { Header },
  data () {
    return {
      cs: [],
      jb: [],
      gb: [],
      hbbz: [],
      nylx: [],
      style: [],
      // 条件
      map: {
        csTj: '',
        jbTj: '',
        gbTj: '',
        hbbzTj: '',
        nylxTj: ''
      }
    }
  },
  methods: {
    // 选车条件
    xcTj (flag, tj) {
      if (flag === 1) {
        this.map.csTj = tj
      } else if (flag === 2) {
        this.map.jbTj = tj
      } else if (flag === 3) {
        this.map.gbTj = tj
      } else if (flag === 4) {
        this.map.hbbzTj = tj
      } else {
        this.map.nylxTj = tj
      }
      const that = this
      this.$http.post('/style/xc', { csTj: this.map.csTj, jbTj: this.map.jbTj, gbTj: this.map.gbTj, hbbzTj: this.map.hbbzTj, nylxTj: this.map.nylxTj }).then(function (rest) {
        that.map = rest.data.data.tj
        that.style = rest.data.data.xr
      }, function (error) {
        console.log(error)
      })
    },
    // 清空条件
    qc () {
      this.map.csTj = ''
      this.map.jbTj = ''
      this.map.gbTj = ''
      this.map.hbbzTj = ''
      this.map.nylxTj = ''
      const that = this
      this.$http.post('/style/xc', { csTj: this.map.csTj, jbTj: this.map.jbTj, gbTj: this.map.gbTj, hbbzTj: this.map.hbbzTj, nylxTj: this.map.nylxTj }).then(function (rest) {
        that.map = rest.data.data.tj
        that.style = rest.data.data.xr
      }, function (error) {
        console.log(error)
      })
    }
  },
  created () {
    const that = this
    // 左侧厂商
    this.$http.get('/data-dictionary/itemCs').then(function (rest) {
      that.cs = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 头部级别
    this.$http.get('/data-dictionary/itemJb').then(function (rest) {
      that.jb = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 头部环保标准
    this.$http.get('/data-dictionary/itemHbbz').then(function (rest) {
      that.hbbz = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 头部能源类型
    this.$http.get('/data-dictionary/itemNylx').then(function (rest) {
      that.nylx = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 头部国别
    this.$http.get('/data-dictionary/itemGb').then(function (rest) {
      that.gb = rest.data.data
    }, function (error) {
      console.log(error)
    })
    const cs = this.$route.params.cs
    const jb = this.$route.params.jb
    if (cs) {
      this.map.csTj = cs
    }
    if (jb) {
      this.map.jbTj = jb
    }
    // style初始化
    this.$http.post('/style/xc', { csTj: this.map.csTj, jbTj: this.map.jbTj, gbTj: this.map.gbTj, hbbzTj: this.map.hbbzTj, nylxTj: this.map.nylxTj }).then(function (rest) {
      that.map = rest.data.data.tj
      that.style = rest.data.data.xr
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  .left {
    width: 200px;
    float: left;
    border: 1px solid #ccc;
  }
  .right {
    width: 1000px;
    float: left;
  }
  .right1 {
    width: 1100px;
    height: 320px;
    padding-left: 50px;
  }
  .right2 {
    width: 1000px;
    height: 1000px;
  }
  .item {
    margin-top: 20px;
  }
  a {
    text-decoration: none;
  }
  a:hover {
    color: red;
  }
</style>
