<template>
  <div>
    <Header></Header>
    <div style="margin-top: 35px">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/cyq' }">车友圈</el-breadcrumb-item>
        <el-breadcrumb-item>动态详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="checkbox">
    <div class="detail">
      <div style="height: 100px">
        <h1 style="color: dodgerblue;">{{essay.essayTitle}}</h1>
        <div style="float: right;margin-right: 30px">
          <el-button type="danger" circle icon="el-icon-delete" v-show="flag" @click="remove"></el-button>
        </div>
        <h4 style="color: red" v-if="essay.label">
          <span style="margin-right: 20px" v-for="item in essay.label">#{{item.labelText}}#</span>
        </h4>
      </div>
      <el-divider></el-divider>
      <div class="markdown-body" v-html="essay.essayText"></div>
    </div>
    <div id="homepage">
      <div class="box">
        <div class="header">
          <h2>评论</h2>
          <span class="all">共<span>{{essay.commentCount}}</span>条评论</span>
          <el-button style="margin-left: 600px" type="primary" circle icon="el-icon-s-promotion" @click="forward">{{essay.forwardCount}}</el-button>
          <el-button type="success" circle icon="el-icon-thumb" @click="agree">{{essay.agreeCount}}</el-button>
        </div>
        <div class="call">
          <div class="left">
            <img style="width: 60px;height: 60px" v-if="user.userId === 0" src="../../assets/static/搬砖.jpg" alt="logo" />
            <img style="width: 60px;height: 60px" v-else-if="user.photo" :src="user.photo">
            <el-avatar v-else :size="60"> {{user.userName}} </el-avatar>
          </div>
          <div class="right">
            <form>
              <textarea placeholder="评论" v-model="text"></textarea>
            </form>
            <div class="icon-left"></div>
            <div class="bottom">
              <div class="chose">
                <i class="icon-small"></i>
                <i class="icon-at"></i>
              </div>
              <div class="send">
                <span>140 </span>
                <a href="javascript:;" @click="fbpl()">发表</a>
              </div>
            </div>
          </div>
        </div>
        <div class="comments" v-if="page.total !== 0">
          <div class="top">最新评论</div>
          <div class="items">
            <ul>
              <li v-for="(item,i) in page.records" :key="i">
                <div class="left">
                  <router-link :to="{name: 'ckyh',query: {userId: item.user.userId}}">
                    <img v-if="item.user.photo" :src="item.user.photo">
                    <el-avatar v-else :size="54"> {{item.user.userName}} </el-avatar>
                  </router-link>
                </div>
                <div class="right">
                  <div class="up">
                    <router-link :to="{name: 'ckyh',query: {userId: item.user.userId}}"><a href="#">{{item.user.userName}}</a></router-link>
                    <i class="icon-wangyi"></i>
                    <i class="icon-vip"><img src="../../assets/icons/vip.png" alt="vip" /> </i>
                    &nbsp;:&nbsp;<span class="letter">{{item.commentText}}</span>
                  </div>
                  <div class="down">
                    <div class="time">{{item.createTime}}</div>
                    <el-button @click="scpl(item.id)" style="margin-right: 450px" type="text" icon="el-icon-delete" v-show="item.user.userId === user.userId">删除</el-button>
                    <div class="zan">
                      <a href="javascript:;" @click="agreePl(item.id)"><i class="icon-zan"></i></a>
                      <span class="nums">(<span class="num">{{item.count}}</span>)</span>
                      <span>&nbsp;|&nbsp;</span> <a href="javascript:;"><span>回复</span></a>
                    </div>

                  </div>

                </div>

              </li>
            </ul>
          </div>
          <div style="margin-top: 20px">
            <el-pagination
              background="true"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="page.current"
              :page-sizes="[5, 8, 10, 15]"
              :page-size="page.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="page.total">
            </el-pagination>
          </div>
        </div>
        <div style="margin-left: 80px" v-else><h4 style="color: #475669">快来坐沙发吧...</h4></div>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
import Header from '../../components/header'
export default {
  components: { Header },
  // 页面刷新
  inject: ['reload'],
  name: 'dtxq',
  data () {
    return {
      essay: {},
      // 判断是不是本人操作
      flag: false,
      // 是否是本人评论 登录人信息
      user: {
        userId: 0,
        userName: '杜兰特',
        photo: ''
      },
      // 评论
      page: {
        records: [],
        current: 1,
        total: 20,
        size: 10
      },
      // 评论正文
      text: ''
    }
  },
  methods: {
    handleSizeChange (val) {
      const that = this
      this.$http.get('/comment/itemByEssayId/?essayId=' + that.essay.essayId + '&size=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    handleCurrentChange (val) {
      const that = this
      this.$http.get('/comment/itemByEssayId/?essayId=' + that.essay.essayId + '&size=' + that.page.size + '&current=' + val).then(function (rest) {
        that.page = rest.data.data
      }, function (error) {
        console.log(error)
      })
    },
    // 删除评论
    scpl (id) {
      const user = this.$store.getters.GET_USER
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const that = this
        this.$http.post('/comment/delete', { userId: user.userId, essayId: that.essay.essayId, id: id }).then(rest => {
          that.reload()
        })
        this.$message({
          type: 'success',
          message: '评论已删除!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 发表评论
    fbpl () {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      if (!this.text) {
        this.msg('说点什么吧...')
        return false
      }
      const that = this
      this.$http.post('/comment/add', { userId: user.userId, essayId: this.essay.essayId, commentText: this.text }).then(rest => {
        that.reload()
        const msg = rest.data.msg
        that.msg(msg)
      })
    },
    // 删除动态
    remove () {
      this.$confirm('此操作将永久删除, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const that = this
        this.$http.post('/essay/delete', this.essay).then(rest => {
          that.$router.push('/wddt')
        })
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 转发
    forward () {
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
        this.$http.post('/forward/add', { userId: user.userId, essayId: that.essay.essayId, forwardTitle: value }).then(rest => {
          that.$router.push('/wdzf')
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
    // 点赞
    agree () {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.post('/agree/addDelete', { userId: user.userId, essayId: that.essay.essayId }).then(rest => {
        that.reload()
        const msg = rest.data.msg
        that.msg(msg)
      })
    },
    // 评论点赞
    agreePl (id) {
      const user = this.$store.getters.GET_USER
      // 判断是否已登录
      if (!user) {
        this.msg('您还没登录...')
        this.$router.push('/login')
        return false
      }
      const that = this
      this.$http.post('/agree-pl/addDelete', { userId: user.userId, commentId: id }).then(rest => {
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
    }
  },
  created () {
    const essayId = this.$route.query.essayId
    const that = this
    // 动态详情
    this.$http.get('/essay/item/?essayId=' + essayId).then(rest => {
      that.essay = rest.data.data
      // 转成Markdown显示
      const MarkdownIt = require('markdown-it')
      const md = new MarkdownIt()
      that.essay.essayText = md.render(that.essay.essayText)
      // 按钮显示 只有当是本人登录时才显示
      const user = that.$store.getters.GET_USER
      if (user) {
        that.flag = (rest.data.data.user.userId === user.userId)
        // 登录人信息赋值
        that.user = user
      }
    })
    // 评论初始化
    this.$http.get('/comment/itemByEssayId/?essayId=' + essayId).then(rest => {
      that.page = rest.data.data
    })
  }
}
</script>
<style scoped>

  span:hover {
    color: #ff6700;
  }
  .detail {
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    width: 100%;
    min-height: 700px;
    padding: 5px;
  }

  h1 {
    text-align: center;
  }
/*  */
  .page-bar {
    margin-top: 20px;
    text-align: center !important;
  }
  ul,
  li {
    margin: 0px;
    padding: 0px;
  }
  li {
    list-style: none;
  }
  .page-bar li:first-child > a {
    margin-left: 0px;
  }
  .page-bar ul{
    display: flex;
    justify-content: flex-start;
    text-align: center;
  }
  .page-bar a {
    border: 1px solid #ddd;
    text-decoration: none;
    padding: 6px 12px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #5d6062;
    cursor: pointer;
    margin-right: 20px;
  }
  .page-bar a:hover {
    background-color: #eee;
  }
  .page-bar a.banclick {
    cursor: not-allowed;
  }
  .page-bar .active a {
    color: #fff;
    cursor: default;
    background-color: #e96463;
    border-color: #e96463;
  }
  .page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }

  body {
    font-size: 12px;
    font-family: Arial, Helvetica, sans-serif;
  }
  ul {
    list-style: none;
  }
  a {
    text-decoration: none;
    color: #0c73c2;
  }
  .checkbox {
    margin: 50px 200px;
  }
  .box .header {
    padding: 5px 0;
    border-bottom: 2px solid #c20c0c;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .box .header h2 {
    font-weight: normal;
    font-size: 22px;
  }
  .box .header .all {
    margin-left: 20px;
    color: #666;
  }
  /* 评论 */
  .box .call {
    margin: 20px 0;
    display: flex;
    justify-content: flex-start;
  }
  .box .call .right {
    position: relative;
  }

  .box .call .right textarea {
    width: 800px;
    margin-left: 15px;
    height: 63px;
    padding: 5px 6px 6px;
    border: 1px solid #cdcdcd;
    border-radius: 2px;
    line-height: 19px;
    outline: 0;
  }
  .box .call .right .icon-left {
    content: "";
    width: 10px;
    height: 10px;
    border: 1px solid #cdcdcd;
    border-top-color: transparent;
    border-right-color: transparent;
    background-color: #fff;
    transform: rotate(45deg);
    position: absolute;
    top: 15px;
    left: 10px;
  }
  .box .call .right .bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-left: 15px;
  }

  .box .call .right .chose .icon-small,
  .box .call .right .chose .icon-at {
    display: inline-block;
    width: 18px;
    height: 18px;
    background-image: url(../../assets/icons/icon.png);
    background-repeat: no-repeat;
    margin-right: 10px;
  }
  .box .call .right .chose .icon-small {
    background-position: -40px -490px;
  }
  .box .call .right .chose .icon-at {
    background-position: -60px -490px;
  }
  .box .call .right .send {
    text-align: center;
  }
  .box .call .right .send span {
    color: #999;
    height: 25px;
    line-height: 25px;
  }
  .box .call .right .send a {
    display: inline-block;
    width: 46px;
    height: 25px;
    line-height: 25px;
    background-color: rgb(0, 153, 255);
    color: #fff;
    border-radius: 5px;
  }

  /* 热门评论 */
  .box .top {
    border-bottom: 1px solid #ccc;
    padding-bottom: 5px;
    font-weight: bold;
    margin-top: 20px;
  }
  .box .items ul li {
    padding: 15px 0;
    border-bottom: 1px solid #ccc;
    display: flex;
    justify-content: flex-start;
    position: relative;
  }
  .box .items ul li:last-child {
    border-bottom: 0;
  }
  .box .items ul li .left img {
    width: 50px;
    height: 50px;
  }
  .box .items ul li .right {
    width: 100%;
    margin-left: 10px;
  }
  .box .items ul li .son {
    width: 100%;
    background-color: #f4f4f4;
    margin-top: 10px;
    padding: 8px 19px;
    border: 1px solid #dedede;
    position: relative;
  }
  .box .items ul li .son i{
    content: "";
    width: 5px;
    height: 5px;
    border: 1px solid #dedede;
    border-top-color: transparent;
    border-right-color: transparent;
    background-color: #f4f4f4;
    transform: rotate(135deg);
    position: absolute;
    top: -4px;
    left: 15px;
  }
  .box .items ul li .right .up .icon-wangyi img {
    margin: 0 3px;
    width: 15px;
  }
  .box .items ul li .right .up .icon-vip img {
    margin: 0 3px;
    width: 30px;
  }
  .box .items ul li .right .down {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  .box .items ul li .right .down .time {
    color: #999;
  }

  .box .items ul li .right .down .zan {
    text-align: center;
  }
  .box .items ul li .right .down .zan .icon-zan {
    display: inline-block;
    width: 15px;
    height: 15px;
    background-image: url(../../assets/icons/icon2.png);
    background-repeat: no-repeat;
    background-position: -150px 0;
  }
  .right .down .zan .nums {
    color: #333;
    margin: 0 5px;
  }
  .right .down .zan a {
    color: #666;
    margin: 0 5px;
  }

  .pages ul {
    display: flex;
    justify-content: center;
  }
  .pages ul li {
    width: 30px;
    height: 30px;
    line-height: 30px;
    border: 1px solid #000;
    text-align: center;
    margin-left: 5px;
    cursor: pointer;
  }
  .pages ul li.active {
    background-color: red;
  }
  .pages ul li a{
    color: #000;
  }
  .pages ul li.active a {
    color: #fff;
  }
  .pages ul li.prev,
  .pages ul li.next {
    width: 60px;
    height: 30px;
    line-height: 30px;
  }
</style>
