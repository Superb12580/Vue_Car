<template>
  <div>
    <Header></Header>
    <div style="margin-top: 10px;">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/wzlb' }">新闻列表</el-breadcrumb-item>
        <el-breadcrumb-item>发布文章</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div style="margin: 15px auto">
    <div class="right2">
<!--      热门车型-->
      <div class="rmcx">
        <div class="hot">
        <span class="xian"></span>
        <h2 class="car">热门车型</h2>
        <div class="item clearfix">
          <div class="left">
            <router-link :to="{name: '',query: {styleId: rmpp[0].styleId}}"><span>1.{{rmpp[0].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[1].styleId}}"><span>2.{{rmpp[1].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[2].styleId}}"><span>3.{{rmpp[2].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[3].styleId}}"><span>4.{{rmpp[3].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[4].styleId}}"><span>5.{{rmpp[4].styleName}}</span></router-link>
          </div>
          <div class="right">
            <router-link :to="{name: '',query: {styleId: rmpp[5].styleId}}"><span>6.{{rmpp[5].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[6].styleId}}"><span>7.{{rmpp[6].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[7].styleId}}"><span>8.{{rmpp[7].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[8].styleId}}"><span>9.{{rmpp[8].styleName}}</span></router-link>
            <router-link :to="{name: '',query: {styleId: rmpp[9].styleId}}"><span>10.{{rmpp[9].styleName}}</span></router-link>
          </div>
        </div>
        </div>
      </div>
<!--      排行-->
      <div class="box3" style="height: 430px;width: 400px;float: left">
        <ul style="padding-left: 20px">
          <h2 style="margin-bottom: 20px">文章排行榜</h2>
          <li class="list" v-for="(item,index) in wzPh">
          <span class="left">
            <span v-if="index === 0" class="num num1">{{index + 1}}</span>
            <span v-else-if="index === 1" class="num num2">{{index + 1}}</span>
            <span v-else-if="index === 2" class="num num3">{{index + 1}}</span>
            <span v-else class="num">{{index + 1}}</span>
            <router-link v-if="index === 0" style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span style="color: #e62021" class="content">{{item.title}}</span></router-link>
            <router-link v-else-if="index === 1" style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span style="color: #e65800" class="content">{{item.title}}</span></router-link>
            <router-link v-else-if="index === 2" style="font-size: 16px" :to="{name: 'wzxq',query: {id: item.id}}"><span style="color: #f5b330" class="content">{{item.title}}</span></router-link>
            <router-link v-else style="font-size: 16px;height: 20px" :to="{name: 'wzxq',query: {id: item.id}}"><span class="content">{{item.title}}</span></router-link>
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
    <div style="width: 1px;height: 1360px;background-color: #ff6700;float: right;margin-right: 20px"></div>
      <div class="left2">
        <div style="margin-bottom: 50px">
        <el-steps :active="1" simple style="margin-top: 20px">
          <el-step icon="el-icon-edit" title="编辑文章 1" ></el-step>
          <el-step icon="el-icon-upload" title="上传图集 2" ></el-step>
          <el-step title="待审核 3" ></el-step>
          <el-step icon="el-icon-check" title="审核结果 4" ></el-step>
        </el-steps>
        </div>
        <div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px">
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title" placeholder="请输入标题，建议25字上下..." style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="关联车型">
            <el-select style="width: 300px" v-model="ruleForm.styleId" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.styleId"
                :label="item.styleName"
                :value="item.styleId">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上传封面" ref="uploadElement" prop="newsPhoto">
<!--            <el-input v-model="ruleForm.newsPhoto" v-if="false"></el-input>-->
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :show-file-list="false"
              action="http://localhost:8081/car/news/fbytwz"
              :before-upload="beforeUpload"
              :on-change="handleChange"
              :auto-upload="false"
              :on-success="success"
              :data="this.ruleForm">
              <img v-if="ruleForm.newsPhoto" :src="ruleForm.newsPhoto" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="段落1" prop="text1">
            <el-input type="textarea" :rows="3" placeholder="请输入第一段内容" v-model="ruleForm.text1"></el-input>
          </el-form-item>
          <el-form-item label="段落2" prop="text2">
            <el-input type="textarea" :rows="3" placeholder="请输入第二段内容" v-model="ruleForm.text2"></el-input>
          </el-form-item>
          <el-form-item label="段落3" prop="text3">
            <el-input type="textarea" :rows="3" placeholder="请输入第三段内容" v-model="ruleForm.text3"></el-input>
          </el-form-item>
          <el-form-item label="段落4" prop="text4">
            <el-input type="textarea" :rows="3" placeholder="请输入第四段内容" v-model="ruleForm.text4"></el-input>
          </el-form-item>
          <el-form-item label="段落5" prop="text5">
            <el-input type="textarea" :rows="3" placeholder="请输入第五段内容" v-model="ruleForm.text5"></el-input>
          </el-form-item>
          <el-form-item label="段落6" prop="text6">
            <el-input type="textarea" :rows="3" placeholder="请输入第六段内容" v-model="ruleForm.text6"></el-input>
          </el-form-item>
          <el-form-item label="段落7" prop="text7">
            <el-input type="textarea" :rows="3" placeholder="请输入第七段内容" v-model="ruleForm.text7"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">下一步</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
        </div>
      </div>
    </div>
  </div>
</template>
<!--选车-->
<script>
import Header from '../../components/header'
export default {
  name: 'fbwz',
  components: { Header },
  data () {
    return {
      // 下拉框
      options: [],
      // 右侧热门品牌
      rmpp: [],
      // 文章排行
      wzPh: [],
      // 第一步
      ruleForm: {
        title: '',
        newsPhoto: '',
        text1: '',
        text2: '',
        text3: '',
        text4: '',
        text5: '',
        text6: '',
        text7: '',
        userId: '',
        styleId: ''
      },
      rules: {
        title: [
          {
            required: true,
            message: '文章标题为必填项',
            trigger: 'blur'
          }
        ],
        text1: [
          {
            required: true,
            message: '第一段内容为必填项',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    // 提交表单上传成功之后
    success (response, file, fileList) {
      this.$router.push({ path: '/fbwz2', query: { id: response.data.id, title: response.data.title, userId: response.data.userId } })
      this.open()
    },
    submitForm (formName) {
      const that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.ruleForm.newsPhoto) {
            that.$refs.upload.submit()
          } else {
            this.$http.post('/news/fbwtwz', that.ruleForm).then(function (rest) {
              that.$router.push({ path: '/fbwz2', query: { id: rest.data.data.id, title: rest.data.data.title, userId: rest.data.data.userId } })
              that.open()
            }, function (error) {
              console.log(error)
            })
          }
        } else {
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    handleChange (file, fileList) {
      this.ruleForm.newsPhoto = URL.createObjectURL(file.raw)
    },
    beforeUpload (file) {
      return true
    },
    open () {
      this.$notify({
        title: '提示',
        message: '编辑文章完成，等待上传图集',
        offset: 145,
        type: 'success'
      })
    }
  },
  created () {
    // 初始化时赋值发布文章用户id
    this.ruleForm.userId = this.$store.getters.GET_USER.userId
    const that = this
    this.$http.get('/style/itemDjl').then(function (rest) {
      that.rmpp = rest.data.data
      that.options = rest.data.data
    }, function (error) {
      console.log(error)
    })
    // 文章排行初始化
    this.$http.get('/news/itemPh').then(function (rest) {
      that.wzPh = rest.data.data
    }, function (error) {
      console.log(error)
    })
  }
}
</script>

<style scoped>
  input[type="file"] {
    display: none;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #ff6700;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader {
    border: 1px dashed #ddd;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }

  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }

  .footer {
    float: right;
    width: 340px;
    margin: 30px auto;
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
  .right2 {
    width: 400px;
    height: 1800px;
    float: right;
  }
  .left2 {
    width: 850px;
    float: left;
    margin-top: 30px;
  }
  .vip img{
    margin: 0 3px;
    width: 40px;
  }
  .rmcx {
    width: 360px;
    height: 280px;
    margin: 20px;
  }

  a {
    text-decoration: none;
    color: #1f2129;
  }
  a:hover {
    color: red;
  }
/*  */
  .clearfix::after {
    content: "";
    display: block;
    clear: both;
  }
  .hot {
    width: 370px;
    height: 280px;
    margin: 10px auto;
    border: 1px solid red;
  }
  .hot .xian {
    width: 4px;
    height: 24px;
    background: #ff8b47;
    float: left;
    margin-top: 15px;
  }
  .hot .car {
    font-size: 18px;
    font-weight: normal;
    height: 54px;
    line-height: 54px;
    margin: 0 24px 0 24px;
    border-bottom: 1px solid #eee;
  }
  .item {
    padding-left: 20px;
    padding-top: 20px;
  }
  .item .left,
  .item .right {
    float: left;
    width: 140px;
  }
  .item .right {
    margin-left: 50px;
  }
  .item .left span,
  .item .right span {
    display: block;
    font-size: 16px;
    color: #666;
    line-height: 18px;
    margin: 0 14px 21px 0;
    cursor: pointer;
  }
  .item .left span:hover,
  .item .right span:hover {
    color: #ff8b47;
  }
/*  排行榜*/
  ul,
  li {
    list-style: none;
  }
  .box3 {
    font-size: 0;
    margin: 0 auto;
  }
  .box3 ul {
    width: 380px;
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
</style>
