<template>
  <div>
    <Header></Header>
    <div class="checkbox">
    <div class="detail">
      <div style="height: 100px">
        <h1 style="color: dodgerblue;">{{essay.essayTitle}}</h1>
        <div style="margin-left: 800px">
          <el-button type="danger" circle icon="el-icon-delete" v-show="flag" @click="remove"></el-button>
        </div>
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
            <img src="../../assets/icons/people.jpg" alt="logo" />
          </div>
          <div class="right">
            <form>
              <textarea placeholder="评论"></textarea>
            </form>
            <div class="icon-left"></div>
            <div class="bottom">
              <div class="chose">
                <i class="icon-small"></i>
                <i class="icon-at"></i>
              </div>
              <div class="send">
                <span>140</span>
                <a href="javascript:;">发表</a>
              </div>
            </div>
          </div>
        </div>
        <div class="comments">
          <div class="top">最新评论</div>
          <div class="items">
            <ul>
              <li v-for="(b,i) in list" :key="i">
                <div class="left">
                  <img src="../../assets/people.png" alt="用户头像" />
                </div>
                <div class="right">
                  <div class="up">
                    <a href="#">{{b.name}}</a>
                    <i class="icon-wangyi"
                    >
                    </i>
                    <i class="icon-vip"><img src="../../assets/icons/vip.png" alt="vip" /> </i>

                    &nbsp;:&nbsp;<span class="letter"
                  >{{b.content}}</span
                  >
                  </div>

                  <div class="down">
                    <div class="time">{{b.time}}</div>
                    <div class="zan">
                      <i class="icon-zan"></i>
                      <span class="nums">(<span class="num">{{b.zan}}</span>)</span
                      ><span>&nbsp;|&nbsp;</span> <a href="#">回复</a>
                    </div>
                  </div>
                </div>

              </li>
            </ul>
          </div>
        </div>
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
      all: 10, // 总页数
      cur: 1, // 当前页码
      totalPage: 0, // 当前条数
      list: [
        {
          id: 1,
          src: require('../../assets/people.png'),
          name: '傻同桌',
          content: '新年快乐，祝弟兄们早日早日提车!',
          time: '2021-01-01',
          zan: '666'
        },
        {
          id: 2,
          src: require('../../assets/people.png'),
          name: '阿辉',
          content: '别瞒了，这杯我先干了！',
          time: '2021-01-01',
          zan: '6666'
        },
        {
          id: 3,
          src: require('../../assets/people.png'),
          name: '陈东',
          content: '咦中！中中中！！!',
          time: '2021-01-01',
          zan: '234'
        },
        {
          id: 4,
          src: require('../../assets/people.png'),
          name: '大柱',
          content: '都先别说类，你看这车真不赖！',
          time: '2021-01-01',
          zan: '425'
        },
        {
          id: 5,
          src: require('../../assets/people.png'),
          name: '杜部长',
          content: '我不中了，摸着天花板了。',
          time: '2021-01-01',
          zan: '123'
        },
        {
          id: 6,
          src: require('../../assets/people.png'),
          name: '高磊',
          content: '我出去一趟，回来接着整！',
          time: '2021-01-01',
          zan: '384'
        },
        {
          id: 7,
          src: require('../../assets/people.png'),
          name: '老表',
          content: '别欺负我不能喝啊。',
          time: '2021-01-01',
          zan: '222'
        },
        {
          id: 8,
          src: require('../../assets/people.png'),
          name: '盼盼',
          content: '这杯我替他喝了！',
          time: '2021-01-01',
          zan: '6868'
        },
        {
          id: 9,
          src: require('../../assets/people.png'),
          name: '梁兵',
          content: '来吧！雪碧管饱！',
          time: '2021-01-01',
          zan: '789'
        },
        {
          id: 8,
          src: require('../../assets/people.png'),
          name: '杨涛',
          content: '别着急，我先垫垫。一会洗jio去~',
          time: '2021-01-01',
          zan: '9876'
        },
        {
          id: 9,
          src: require('../../assets/people.png'),
          name: '袁总',
          content: '咋回事唉，我都提完了，你们还没动嘞！',
          time: '2021-01-01',
          zan: '6669'
        },
        {
          id: 10,
          src: require('../../assets/people.png'),
          name: 'people',
          content: '新年快乐！年年有余！',
          time: '2021-01-01',
          zan: '1234'
        }
      ]
    }
  },
  methods: {
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
      this.$prompt('说点什么吧...', '转发', {
        confirmButtonText: '转发',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        const that = this
        this.$http.post('/forward/add', { userId: that.$store.getters.GET_USER.userId, essayId: that.essay.essayId, forwardTitle: value }).then(rest => {
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
      const that = this
      this.$http.post('/agree/addDelete', { userId: that.$store.getters.GET_USER.userId, essayId: that.essay.essayId }).then(rest => {
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
    // if (this.$route.params.essayId !== null && this.$route.params.essayId !== this.$store.getters.GET_ESSAY) {
    //   this.$store.commit('SET_ESSAY', this.$route.params.essayId)
    // }
    const essayId = this.$route.params.essayId
    if (essayId) {
      const that = this
      this.$http.get('/essay/item/?essayId=' + essayId).then(rest => {
        that.essay = rest.data.data

        // 转成Markdown显示
        const MarkdownIt = require('markdown-it')
        const md = new MarkdownIt()
        that.essay.essayText = md.render(that.essay.essayText)

        // 按钮显示 只有当是本人登录时才显示
        that.flag = (rest.data.data.user.userId === that.$store.getters.GET_USER.userId)
      })
    }
  }
}
</script>
<style scoped>
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
